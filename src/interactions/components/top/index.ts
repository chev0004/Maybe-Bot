
import type {
  ButtonInteraction,
  StringSelectMenuInteraction,
} from "discord.js";
import type { InteractionModule } from "../../../handlers/interactionHandler.js";
import {
  generateComponentsForTop,
  generateTopReply,
  type TopCategory,
  type TopTimeframe,
} from "../../../utils/helpers/topHelper.js";

async function processTopInteraction(
  interaction: ButtonInteraction | StringSelectMenuInteraction,
) {
  if (!interaction.inGuild() || !interaction.guild) return;

  const parts = interaction.customId.split("-");
  const action = parts[1];
  let category: TopCategory, timeframe: TopTimeframe, showTimeframeButtons: boolean;

  if (action === "timeframe") {
    const subAction = parts[2] as "show" | "back";
    category = parts[3] as TopCategory;
    timeframe = parts[4] as TopTimeframe;
    showTimeframeButtons = subAction === "show";

    const newComponents = generateComponentsForTop({
      category,
      timeframe,
      showTimeframeButtons,
    });
    await interaction.editReply({ components: newComponents });
    return;
  }

  if (interaction.isStringSelectMenu()) {
    category = interaction.values[0] as TopCategory;
    timeframe = parts[2] as TopTimeframe;
    showTimeframeButtons = parts[3] === "1";
  } else {
    category = parts[2] as TopCategory;
    timeframe = parts[3] as TopTimeframe;
    showTimeframeButtons = action === "select";
  }

  const reply = await generateTopReply({
    guild: interaction.guild,
    category,
    timeframe,
    showTimeframeButtons,
  });

  const { flags: _, ...rest } = reply;
  await interaction.editReply(rest);
}

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