import {
  ActionRowBuilder,
  AttachmentBuilder,
  ButtonBuilder,
  ButtonStyle,
  type Guild,
  type InteractionReplyOptions,
  StringSelectMenuBuilder,
} from "discord.js";
import { and, countDistinct, gte, sql, sum } from "drizzle-orm";
import {
  getMockActivityData,
  type MessageActivityData,
  type VoiceActivityData,
} from "../../commands/slash/stats/activity/activity.mock.js";
import { db } from "../../db/index.js";
import { dailyUserStats, hourlyActivity } from "../../db/schema.js";
import {
  generateMessageActivityImage,
  generateVoiceActivityImage,
} from "../services/activityImageGenerator.js";
import { type TopTimeframe, timeframeLabels } from "./topHelper.js";

export type ActivityCategory = "message" | "voice";

const categoryOptions = [
  { label: "Message Activity", value: "message" },
  { label: "Voice Activity", value: "voice" },
];

const fetchActivityData = async (
  category: ActivityCategory,
  timeframe: TopTimeframe,
): Promise<MessageActivityData | VoiceActivityData> => {
  const days = timeframe === "all" ? 9999 : parseInt(timeframe, 10);
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  const dateCondition =
    timeframe === "all"
      ? undefined
      : gte(hourlyActivity.date, startDate.toISOString().slice(0, 10));

  const hourlyResults = await db
    .select({
      hour: hourlyActivity.hour,
      total:
        category === "message"
          ? sql<number>`sum(${hourlyActivity.messages})`.mapWith(Number)
          : sql<number>`sum(${hourlyActivity.vcHours})`.mapWith(Number),
    })
    .from(hourlyActivity)
    .where(dateCondition)
    .groupBy(hourlyActivity.hour);

  // Convert UTC hours from DB to JST hours for the chart
  const jstHourlyData = Array(24).fill(0);
  for (const result of hourlyResults) {
    const utcHour = result.hour;
    const jstHour = (utcHour + 9) % 24;
    jstHourlyData[jstHour] = result.total;
  }

  const participantResults = await db
    .select({
      count: countDistinct(dailyUserStats.userId),
    })
    .from(dailyUserStats)
    .where(
      and(
        timeframe === "all"
          ? undefined
          : gte(dailyUserStats.date, startDate.toISOString().slice(0, 10)),
        category === "message"
          ? gte(dailyUserStats.messages, 1)
          : gte(dailyUserStats.vcHours, 0.001),
      ),
    );

  const totalParticipants = participantResults[0]?.count ?? 0;
  const averageParticipants =
    totalParticipants / (timeframe === "all" ? days : Math.min(days, 365));

  const totalSumResult = await db
    .select({
      total:
        category === "message"
          ? sum(hourlyActivity.messages)
          : sum(hourlyActivity.vcHours),
    })
    .from(hourlyActivity)
    .where(dateCondition);

  const totalValue = Number(totalSumResult[0]?.total ?? 0);
  const peakIndex = jstHourlyData.indexOf(Math.max(...jstHourlyData));

  if (category === "message") {
    return {
      hourlyActivity: jstHourlyData,
      totalMessages: totalValue,
      averageParticipants,
      mostActiveHour: peakIndex,
    };
  } else {
    return {
      hourlyActivity: jstHourlyData,
      totalDurationHours: totalValue,
      averageParticipants,
      peakHour: peakIndex,
    };
  }
};

export const generateComponentsForActivity = ({
  category,
  timeframe,
  showTimeframeButtons,
  isTestMode = false,
}: {
  category: ActivityCategory;
  timeframe: TopTimeframe;
  showTimeframeButtons: boolean;
  isTestMode?: boolean;
}) => {
  const showTimeframeFlag = showTimeframeButtons ? "1" : "0";
  const testModeFlag = isTestMode ? "1" : "0";
  const currentCategoryLabel =
    categoryOptions.find((opt) => opt.value === category)?.label ||
    "Select an activity type";

  const dropdown = new StringSelectMenuBuilder()
    .setCustomId(
      `activity-category-${timeframe}-${showTimeframeFlag}-${testModeFlag}`,
    )
    .setPlaceholder(currentCategoryLabel)
    .addOptions(
      categoryOptions.map((opt) => ({
        ...opt,
        default: opt.value === category,
      })),
    );

  const components: ActionRowBuilder<
    StringSelectMenuBuilder | ButtonBuilder
  >[] = [
    new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(dropdown),
  ];

  if (showTimeframeButtons) {
    const timeButtons = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(
          `activity-timeframe-back-${category}-${timeframe}-${testModeFlag}`,
        )
        .setEmoji({ id: "1423520590261780541" })
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId(`activity-select-${category}-1-${testModeFlag}`)
        .setLabel("1日")
        .setStyle(
          timeframe === "1" ? ButtonStyle.Primary : ButtonStyle.Secondary,
        ),
      new ButtonBuilder()
        .setCustomId(`activity-select-${category}-7-${testModeFlag}`)
        .setLabel("7日")
        .setStyle(
          timeframe === "7" ? ButtonStyle.Primary : ButtonStyle.Secondary,
        ),
      new ButtonBuilder()
        .setCustomId(`activity-select-${category}-30-${testModeFlag}`)
        .setLabel("30日")
        .setStyle(
          timeframe === "30" ? ButtonStyle.Primary : ButtonStyle.Secondary,
        ),
      new ButtonBuilder()
        .setCustomId(`activity-select-${category}-all-${testModeFlag}`)
        .setLabel("全期間")
        .setStyle(
          timeframe === "all" ? ButtonStyle.Primary : ButtonStyle.Secondary,
        ),
    );
    components.push(timeButtons);
  } else {
    const actionButtons = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(
          `activity-timeframe-show-${category}-${timeframe}-${testModeFlag}`,
        )
        .setEmoji({ id: "1423521666159611914" })
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId(
          `activity-refresh-${category}-${timeframe}-${testModeFlag}`,
        )
        .setEmoji({ id: "1423520588638453850" })
        .setStyle(ButtonStyle.Secondary),
    );
    components.push(actionButtons);
  }
  return components;
};

export const generateActivityReply = async ({
  guild,
  category,
  timeframe,
  showTimeframeButtons,
  isTestMode,
}: {
  guild: Guild;
  category: ActivityCategory;
  timeframe: TopTimeframe;
  showTimeframeButtons: boolean;
  isTestMode: boolean;
}): Promise<InteractionReplyOptions> => {
  const serverIconUrl = guild.iconURL({ extension: "png", size: 128 });
  const timeframeLabel = timeframeLabels[timeframe];
  let imageBuffer: Buffer;

  const data = isTestMode
    ? getMockActivityData(category, timeframe)
    : await fetchActivityData(category, timeframe);

  if (category === "message") {
    imageBuffer = await generateMessageActivityImage(
      data as MessageActivityData,
      serverIconUrl,
      guild.name,
      timeframeLabel,
    );
  } else {
    imageBuffer = await generateVoiceActivityImage(
      data as VoiceActivityData,
      serverIconUrl,
      guild.name,
      timeframeLabel,
    );
  }

  const attachment = new AttachmentBuilder(imageBuffer, {
    name: "activity-stats.png",
  });
  const components = generateComponentsForActivity({
    category,
    timeframe,
    showTimeframeButtons,
    isTestMode,
  });

  return { files: [attachment], components };
};
