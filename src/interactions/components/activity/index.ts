import type {
  ButtonInteraction,
  StringSelectMenuInteraction,
} from "discord.js";
import type { InteractionModule } from "../../../handlers/interactionHandler.js";
import {
  type ActivityCategory,
  generateActivityReply,
} from "../../../utils/helpers/activityHelper.js";
import type { TopTimeframe } from "../../../utils/helpers/topHelper.js";

const processActivityInteraction = async (
  interaction: ButtonInteraction | StringSelectMenuInteraction,
) => {
  if (!interaction.inGuild() || !interaction.guild) return;

  const parts = interaction.customId.split("-");
  const action = parts[1];
  let category: ActivityCategory,
    timeframe: TopTimeframe,
    showTimeframeButtons: boolean,
    isTestMode: boolean;

  if (action === "timeframe") {
    const subAction = parts[2] as "show" | "back";
    category = parts[3] as ActivityCategory;
    timeframe = parts[4] as TopTimeframe;
    isTestMode = parts[5] === "1";
    showTimeframeButtons = subAction === "show";
  } else if (action === "refresh") {
    category = parts[2] as ActivityCategory;
    timeframe = parts[3] as TopTimeframe;
    isTestMode = parts[4] === "1";
    showTimeframeButtons = false;
  } else if (interaction.isStringSelectMenu()) {
    category = interaction.values[0] as ActivityCategory;
    timeframe = parts[2] as TopTimeframe;
    showTimeframeButtons = parts[3] === "1";
    isTestMode = parts[4] === "1";
  } else {
    category = parts[2] as ActivityCategory;
    timeframe = parts[3] as TopTimeframe;
    isTestMode = parts[4] === "1";
    showTimeframeButtons = true;
  }

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
