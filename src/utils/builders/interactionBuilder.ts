import {
  ActionRowBuilder,
  ButtonBuilder,
  type ButtonInteraction,
  ButtonStyle,
  StringSelectMenuBuilder,
  type StringSelectMenuInteraction,
} from "discord.js";

export type InteractionType =
  | "dropdown"
  | "navigation"
  | "timeframe"
  | "refresh";

export interface CategoryOption {
  label: string;
  value: string;
}

export interface TimeframeOption {
  label: string;
  value: string;
}

export interface InteractionIcons {
  back?: string;
  timeframe?: string;
  refresh?: string;
}

const defaultIcons: Required<InteractionIcons> = {
  back: "1423520590261780541",
  timeframe: "1423521666159611914",
  refresh: "1423520588638453850",
};

export interface InteractionConfig {
  prefix: string;
  categoryOptions: CategoryOption[];
  interactions: InteractionType[];
  timeframeOptions?: TimeframeOption[];
  icons?: InteractionIcons;
}

export interface InteractionState {
  category: string;
  timeframe: string;
  showTimeframeButtons: boolean;
  isTestMode?: boolean;
  page?: number;
  hasNextPage?: boolean;
}

export function buildComponents(
  config: InteractionConfig,
  state: InteractionState,
): ActionRowBuilder<StringSelectMenuBuilder | ButtonBuilder>[] {
  const { prefix, categoryOptions, interactions } = config;
  const {
    category,
    timeframe,
    showTimeframeButtons,
    isTestMode = false,
    page = 0,
    hasNextPage = false,
  } = state;

  const icons = { ...defaultIcons, ...config.icons };
  const showTimeframeFlag = showTimeframeButtons ? "1" : "0";
  const testModeFlag = isTestMode ? "1" : "0";

  const components: ActionRowBuilder<
    StringSelectMenuBuilder | ButtonBuilder
  >[] = [];

  if (interactions.includes("dropdown")) {
    const currentCategoryLabel =
      categoryOptions.find((opt) => opt.value === category)?.label ||
      "Select a category...";

    const dropdown = new StringSelectMenuBuilder()
      .setCustomId(
        `${prefix}-category-${timeframe}-${showTimeframeFlag}-${testModeFlag}`,
      )
      .setPlaceholder(currentCategoryLabel)
      .addOptions(
        categoryOptions.map((opt) => ({
          ...opt,
          default: opt.value === category,
        })),
      );

    components.push(
      new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(dropdown),
    );
  }

  if (interactions.includes("navigation") && category !== "overview") {
    const previousButton = new ButtonBuilder()
      .setCustomId(
        `${prefix}-page-${Math.max(0, page - 1)}-${category}-${timeframe}-${testModeFlag}`,
      )
      .setLabel("←")
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(page === 0);
    const nextButton = new ButtonBuilder()
      .setCustomId(
        `${prefix}-page-${page + 1}-${category}-${timeframe}-${testModeFlag}`,
      )
      .setLabel("→")
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(!hasNextPage);

    components.push(
      new ActionRowBuilder<ButtonBuilder>().addComponents(
        previousButton,
        nextButton,
      ),
    );
  }

  const hasTimeframe = interactions.includes("timeframe");
  const hasRefresh = interactions.includes("refresh");

  if (hasTimeframe && showTimeframeButtons) {
    const tfOptions = config.timeframeOptions ?? [];
    const maxPerRow = 4;
    const backButton = new ButtonBuilder()
      .setCustomId(
        `${prefix}-timeframe-back-${category}-${timeframe}-${testModeFlag}-${page}`,
      )
      .setEmoji({ id: icons.back })
      .setStyle(ButtonStyle.Secondary);
    const timeframeButtons = tfOptions.map((opt) =>
      new ButtonBuilder()
        .setCustomId(
          `${prefix}-select-${category}-${opt.value}-${testModeFlag}`,
        )
        .setLabel(opt.label)
        .setStyle(
          timeframe === opt.value ? ButtonStyle.Primary : ButtonStyle.Secondary,
        ),
    );
    const firstRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      backButton,
      ...timeframeButtons.slice(0, maxPerRow),
    );
    components.push(firstRow);
    if (timeframeButtons.length > maxPerRow) {
      const secondRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
        ...timeframeButtons.slice(maxPerRow),
      );
      components.push(secondRow);
    }
  } else if (hasTimeframe || hasRefresh) {
    const buttons: ButtonBuilder[] = [];

    if (hasTimeframe) {
      buttons.push(
        new ButtonBuilder()
          .setCustomId(
            `${prefix}-timeframe-show-${category}-${timeframe}-${testModeFlag}-${page}`,
          )
          .setEmoji({ id: icons.timeframe })
          .setStyle(ButtonStyle.Secondary),
      );
    }

    if (hasRefresh) {
      buttons.push(
        new ButtonBuilder()
          .setCustomId(
            `${prefix}-refresh-${category}-${timeframe}-${testModeFlag}-${page}`,
          )
          .setEmoji({ id: icons.refresh })
          .setStyle(ButtonStyle.Secondary),
      );
    }

    components.push(
      new ActionRowBuilder<ButtonBuilder>().addComponents(...buttons),
    );
  }

  return components;
}

export interface ParsedInteraction {
  category: string;
  timeframe: string;
  showTimeframeButtons: boolean;
  isTestMode: boolean;
  page: number;
}

export function parseInteraction(
  interaction: ButtonInteraction | StringSelectMenuInteraction,
): ParsedInteraction {
  const parts = interaction.customId.split("-");
  const action = parts[1];

  if (action === "timeframe") {
    const subAction = parts[2] as "show" | "back";
    return {
      category: parts[3],
      timeframe: parts[4],
      isTestMode: parts[5] === "1",
      showTimeframeButtons: subAction === "show",
      page: Number(parts[6] ?? 0),
    };
  }

  if (action === "refresh") {
    return {
      category: parts[2],
      timeframe: parts[3],
      isTestMode: parts[4] === "1",
      showTimeframeButtons: false,
      page: Number(parts[5] ?? 0),
    };
  }

  if (action === "page") {
    return {
      page: Number(parts[2]),
      category: parts[3],
      timeframe: parts[4],
      isTestMode: parts[5] === "1",
      showTimeframeButtons: false,
    };
  }

  if (interaction.isStringSelectMenu()) {
    return {
      category: interaction.values[0],
      timeframe: parts[2],
      showTimeframeButtons: parts[3] === "1",
      isTestMode: parts[4] === "1",
      page: 0,
    };
  }

  return {
    category: parts[2],
    timeframe: parts[3],
    isTestMode: parts[4] === "1",
    showTimeframeButtons: true,
    page: 0,
  };
}
