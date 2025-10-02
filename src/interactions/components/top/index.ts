// src/interactions/components/top/index.ts

import type {
  ButtonInteraction,
  StringSelectMenuInteraction,
} from "discord.js";
import type { InteractionModule } from "../../../handlers/interactionHandler.js";
import {
  generateTopReply,
  type TopCategory,
  type TopTimeframe,
} from "../../../utils/helpers/topHelper.js";

export default {
  customId: "top_",
  async execute(interaction: ButtonInteraction | StringSelectMenuInteraction) {
    if (!interaction.inGuild() || !interaction.guild) return;
    await interaction.deferUpdate();

    const parts = interaction.customId.split("_");
    const action = parts[1];

    let category: TopCategory = "overview";
    let timeframe: TopTimeframe = "all";
    let showTimeframeButtons = false;

    if (interaction.isStringSelectMenu()) {
      // category change
      category = interaction.values[0] as TopCategory;
      timeframe = parts[2] as TopTimeframe;
    } else if (action === "refresh") {
      // refresh button
      category = parts[2] as TopCategory;
      timeframe = parts[3] as TopTimeframe;
    } else if (action === "timeframe") {
      // "Timeframe" button clicked
      const subAction = parts[2];
      category = parts[3] as TopCategory;
      timeframe = parts[4] as TopTimeframe;
      showTimeframeButtons = subAction === "show";
    } else if (action === "select") {
      // 1d, 7d, etc. button clicked
      category = parts[2] as TopCategory;
      timeframe = parts[3] as TopTimeframe;
      showTimeframeButtons = true;
    }

    const reply = await generateTopReply({
      guild: interaction.guild,
      category,
      timeframe,
      showTimeframeButtons,
    });

    const { flags: _, ...rest } = reply;
    await interaction.editReply(rest);
  },
} as InteractionModule;
