import type {
  ButtonInteraction,
  StringSelectMenuInteraction,
} from "discord.js";
import type { InteractionModule } from "../../../handlers/interactionHandler.js";
import { parseInteraction } from "../../../utils/builders/interactionBuilder.js";
import {
  type ActivityCategory,
  generateActivityReply,
} from "../../../utils/helpers/activityHelper.js";
import type { TopTimeframe } from "../../../utils/helpers/topHelper.js";

const processActivityInteraction = async (
  interaction: ButtonInteraction | StringSelectMenuInteraction,
) => {
  if (!interaction.inGuild() || !interaction.guild) return;

  const parsed = parseInteraction(interaction);
  const category = parsed.category as ActivityCategory;
  const timeframe = parsed.timeframe as TopTimeframe;
  const { showTimeframeButtons, isTestMode } = parsed;

  const reply = await generateActivityReply({
    guild: interaction.guild,
    category,
    timeframe,
    showTimeframeButtons,
    isTestMode,
  });

  const { flags: _, ...rest } = reply;
  await interaction.editReply(rest);
};

export default {
  customId: "activity-",
  async execute(interaction: ButtonInteraction | StringSelectMenuInteraction) {
    await interaction.deferUpdate();

    processActivityInteraction(interaction).catch((err) => {
      console.error("Failed to process /activity interaction:", err);
      interaction
        .followUp({
          content: "An error occurred while processing your request.",
          ephemeral: true,
        })
        .catch(console.error);
    });
  },
} as InteractionModule;
