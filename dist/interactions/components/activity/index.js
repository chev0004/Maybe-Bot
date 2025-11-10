import { generateActivityReply, } from "../../../utils/helpers/activityHelper.js";
const processActivityInteraction = async (interaction) => {
    if (!interaction.inGuild() || !interaction.guild)
        return;
    const parts = interaction.customId.split("-");
    const action = parts[1];
    let category, timeframe, showTimeframeButtons, isTestMode;
    if (action === "timeframe") {
        const subAction = parts[2];
        category = parts[3];
        timeframe = parts[4];
        isTestMode = parts[5] === "1";
        showTimeframeButtons = subAction === "show";
    }
    else if (action === "refresh") {
        category = parts[2];
        timeframe = parts[3];
        isTestMode = parts[4] === "1";
        showTimeframeButtons = false;
    }
    else if (interaction.isStringSelectMenu()) {
        category = interaction.values[0];
        timeframe = parts[2];
        showTimeframeButtons = parts[3] === "1";
        isTestMode = parts[4] === "1";
    }
    else {
        category = parts[2];
        timeframe = parts[3];
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
