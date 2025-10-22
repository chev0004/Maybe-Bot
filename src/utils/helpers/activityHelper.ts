import {
  ActionRowBuilder,
  AttachmentBuilder,
  ButtonBuilder,
  ButtonStyle,
  type Guild,
  type InteractionReplyOptions,
  StringSelectMenuBuilder,
} from "discord.js";
import {
  getMockActivityData,
  type MessageActivityData,
  type VoiceActivityData,
} from "../../commands/slash/stats/activity/activity.mock.js";
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

  if (isTestMode) {
    const data = getMockActivityData(category, timeframe);
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
  } else {
    // TODO: Replace with real data fetching logic
    console.warn(
      `[ActivityHelper] Using mock data as real data fetch is not implemented.`,
    );
    const data = getMockActivityData(category, timeframe);
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
