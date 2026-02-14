import { generateComponentsForTop, generateTopReply, } from "../../../utils/helpers/topHelper.js";
const processTopInteraction = async (interaction) => {
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
        const newComponents = generateComponentsForTop({
            category,
            timeframe,
            showTimeframeButtons,
            isTestMode,
        });
        await interaction.editReply({ components: newComponents });
        return;
    }
    if (action === "refresh") {
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
        showTimeframeButtons = action === "select";
        isTestMode = parts[4] === "1";
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
    async execute(interaction) {
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
};
