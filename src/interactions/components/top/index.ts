import type {
  ButtonInteraction,
  StringSelectMenuInteraction,
} from "discord.js";
import type { InteractionModule } from "../../../handlers/interactionHandler.js";
import {
  buildComponents,
  parseInteraction,
} from "../../../utils/builders/interactionBuilder.js";
import {
  generateTopReply,
  type TopCategory,
  type TopTimeframe,
  topInteractionConfig,
} from "../../../utils/helpers/topHelper.js";

const processTopInteraction = async (
  interaction: ButtonInteraction | StringSelectMenuInteraction,
) => {
  if (!interaction.inGuild() || !interaction.guild) return;

  const parsed = parseInteraction(interaction);
  const category = parsed.category as TopCategory;
  const timeframe = parsed.timeframe as TopTimeframe;
  const { showTimeframeButtons, isTestMode } = parsed;

  if (parsed.isTimeframeToggleOnly) {
    const newComponents = buildComponents(topInteractionConfig, {
      category,
      timeframe,
      showTimeframeButtons,
      isTestMode,
    });
    await interaction.editReply({ components: newComponents });
    return;
  }

  const reply = await generateTopReply({
    guild: interaction.guild,
    client: interaction.client,
    category,
    timeframe,
    showTimeframeButtons,
    isTestMode,
  });

  const { flags: _, ...rest } = reply;
  await interaction.editReply(rest);
};

export default {
  customId: "top-",
  async execute(interaction: ButtonInteraction | StringSelectMenuInteraction) {
    await interaction.deferUpdate();

    processTopInteraction(interaction).catch((err) => {
      console.error("Failed to process /top interaction:", err);
      interaction
        .followUp({
          content: "An error occurred while processing your request.",
          ephemeral: true,
        })
        .catch(console.error);
    });
  },
} as InteractionModule;
