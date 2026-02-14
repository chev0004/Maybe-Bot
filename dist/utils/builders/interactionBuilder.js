import { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, } from "discord.js";
const defaultIcons = {
    back: "1423520590261780541",
    timeframe: "1423521666159611914",
    refresh: "1423520588638453850",
};
export function buildComponents(config, state) {
    const { prefix, categoryOptions, interactions } = config;
    const { category, timeframe, showTimeframeButtons, isTestMode = false, } = state;
    const icons = { ...defaultIcons, ...config.icons };
    const showTimeframeFlag = showTimeframeButtons ? "1" : "0";
    const testModeFlag = isTestMode ? "1" : "0";
    const components = [];
    if (interactions.includes("dropdown")) {
        const currentCategoryLabel = categoryOptions.find((opt) => opt.value === category)?.label ||
            "Select a category...";
        const dropdown = new StringSelectMenuBuilder()
            .setCustomId(`${prefix}-category-${timeframe}-${showTimeframeFlag}-${testModeFlag}`)
            .setPlaceholder(currentCategoryLabel)
            .addOptions(categoryOptions.map((opt) => ({
            ...opt,
            default: opt.value === category,
        })));
        components.push(new ActionRowBuilder().addComponents(dropdown));
    }
    const hasTimeframe = interactions.includes("timeframe");
    const hasRefresh = interactions.includes("refresh");
    if (hasTimeframe && showTimeframeButtons) {
        const tfOptions = config.timeframeOptions ?? [];
        const timeButtons = new ActionRowBuilder().addComponents(new ButtonBuilder()
            .setCustomId(`${prefix}-timeframe-back-${category}-${timeframe}-${testModeFlag}`)
            .setEmoji({ id: icons.back })
            .setStyle(ButtonStyle.Secondary), ...tfOptions.map((opt) => new ButtonBuilder()
            .setCustomId(`${prefix}-select-${category}-${opt.value}-${testModeFlag}`)
            .setLabel(opt.label)
            .setStyle(timeframe === opt.value
            ? ButtonStyle.Primary
            : ButtonStyle.Secondary)));
        components.push(timeButtons);
    }
    else if (hasTimeframe || hasRefresh) {
        const buttons = [];
        if (hasTimeframe) {
            buttons.push(new ButtonBuilder()
                .setCustomId(`${prefix}-timeframe-show-${category}-${timeframe}-${testModeFlag}`)
                .setEmoji({ id: icons.timeframe })
                .setStyle(ButtonStyle.Secondary));
        }
        if (hasRefresh) {
            buttons.push(new ButtonBuilder()
                .setCustomId(`${prefix}-refresh-${category}-${timeframe}-${testModeFlag}`)
                .setEmoji({ id: icons.refresh })
                .setStyle(ButtonStyle.Secondary));
        }
        components.push(new ActionRowBuilder().addComponents(...buttons));
    }
    return components;
}
export function parseInteraction(interaction) {
    const parts = interaction.customId.split("-");
    const action = parts[1];
    if (action === "timeframe") {
        const subAction = parts[2];
        return {
            category: parts[3],
            timeframe: parts[4],
            isTestMode: parts[5] === "1",
            showTimeframeButtons: subAction === "show",
            isTimeframeToggleOnly: true,
        };
    }
    if (action === "refresh") {
        return {
            category: parts[2],
            timeframe: parts[3],
            isTestMode: parts[4] === "1",
            showTimeframeButtons: false,
            isTimeframeToggleOnly: false,
        };
    }
    if (interaction.isStringSelectMenu()) {
        return {
            category: interaction.values[0],
            timeframe: parts[2],
            showTimeframeButtons: parts[3] === "1",
            isTestMode: parts[4] === "1",
            isTimeframeToggleOnly: false,
        };
    }
    return {
        category: parts[2],
        timeframe: parts[3],
        isTestMode: parts[4] === "1",
        showTimeframeButtons: true,
        isTimeframeToggleOnly: false,
    };
}
