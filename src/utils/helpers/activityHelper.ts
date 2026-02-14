import {
  AttachmentBuilder,
  type Guild,
  type InteractionReplyOptions,
} from "discord.js";
import {
  and,
  count,
  countDistinct,
  gte,
  isNotNull,
  sql,
  sum,
} from "drizzle-orm";
import {
  getMockActivityData,
  type MessageActivityData,
  type VoiceActivityData,
} from "../../commands/slash/stats/activity/activity.mock.js";
import { db } from "../../db/index.js";
import {
  hourlyActivity,
  hourlyUserActivity,
  voiceSessions,
} from "../../db/schema.js";
import {
  buildComponents,
  type InteractionConfig,
} from "../builders/interactionBuilder.js";
import {
  generateMessageActivityImage,
  generateVoiceActivityImage,
} from "../services/activityImageGenerator.js";
import { type TopTimeframe, timeframeLabels } from "./topHelper.js";

export type ActivityCategory = "message" | "voice";

export const activityInteractionConfig: InteractionConfig = {
  prefix: "activity",
  categoryOptions: [
    { label: "Message Activity", value: "message" },
    { label: "Voice Activity", value: "voice" },
  ],
  interactions: ["dropdown", "timeframe", "refresh"],
  timeframeOptions: [
    { value: "1", label: "1日" },
    { value: "7", label: "7日" },
    { value: "14", label: "14日" },
    { value: "30", label: "30日" },
    { value: "all", label: "全期間" },
  ],
};

const fetchActivityData = async (
  category: ActivityCategory,
  timeframe: TopTimeframe,
): Promise<MessageActivityData | VoiceActivityData> => {
  const days = timeframe === "all" ? 9999 : parseInt(timeframe, 10);
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  const startDateString = startDate.toISOString().slice(0, 10);
  const dateCondition =
    timeframe === "all" ? undefined : gte(hourlyActivity.date, startDateString);

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

  const jstHourlyData = Array(24).fill(0);
  for (const result of hourlyResults) {
    const utcHour = result.hour;
    const jstHour = (utcHour + 9) % 24;
    jstHourlyData[jstHour] = result.total;
  }

  let averageParticipants = 0;

  if (category === "voice") {
    const avgResult = await db
      .select({
        average:
          sql<number>`avg(${voiceSessions.totalUniqueParticipants})`.mapWith(
            Number,
          ),
      })
      .from(voiceSessions)
      .where(
        and(
          timeframe === "all"
            ? undefined
            : gte(voiceSessions.startTime, startDate),
          isNotNull(voiceSessions.endTime),
          isNotNull(voiceSessions.totalUniqueParticipants),
        ),
      );

    averageParticipants = avgResult[0]?.average ?? 0;
  } else {
    const participantHoursResult = await db
      .select({
        count: count(hourlyUserActivity.userId),
      })
      .from(hourlyUserActivity)
      .where(
        timeframe === "all"
          ? undefined
          : gte(hourlyUserActivity.date, startDateString),
      );
    const totalParticipantHours = participantHoursResult[0]?.count ?? 0;

    const activeHoursResult = await db
      .select({
        count: countDistinct(
          sql`(${hourlyUserActivity.date}, ${hourlyUserActivity.hour})`,
        ),
      })
      .from(hourlyUserActivity)
      .where(
        timeframe === "all"
          ? undefined
          : gte(hourlyUserActivity.date, startDateString),
      );
    const totalActiveHours = activeHoursResult[0]?.count ?? 0;

    averageParticipants =
      totalActiveHours > 0 ? totalParticipantHours / totalActiveHours : 0;
  }

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
  const peakIndex = jstHourlyData.indexOf(Math.max(...jstHourlyData, 0));

  if (category === "message") {
    return {
      hourlyActivity: jstHourlyData,
      totalMessages: totalValue,
      averageParticipants,
      mostActiveHour: peakIndex,
    };
  }
  return {
    hourlyActivity: jstHourlyData,
    totalDurationHours: totalValue,
    averageParticipants,
    peakHour: peakIndex,
  };
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
}) =>
  buildComponents(activityInteractionConfig, {
    category,
    timeframe,
    showTimeframeButtons,
    isTestMode,
  });

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
