import { parseInteraction } from "../../../utils/builders/interactionBuilder.js";
import { generateActivityReply, } from "../../../utils/helpers/activityHelper.js";
const processActivityInteraction = async (interaction) => {
    if (!interaction.inGuild() || !interaction.guild)
        return;
    const parsed = parseInteraction(interaction);
    const category = parsed.category;
    const timeframe = parsed.timeframe;
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
    async execute(interaction) {
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
};
