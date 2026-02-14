import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, MessageFlags, } from "discord.js";
import { generateAnonymousId, getRandomColor, } from "../../utils/helpers/confessionHelper.js";
import { getNextConfessionId, logConfession, } from "../../utils/managers/confessionManager.js";
export default {
    customId: "confess_modal",
    async execute(interaction) {
        await interaction.deferUpdate();
        const confessionMessage = interaction.fields.getTextInputValue("confession_input");
        const anonymousId = generateAnonymousId();
        const confessionId = await getNextConfessionId();
        const randomColor = getRandomColor();
        const replyButton = new ButtonBuilder()
            .setCustomId(`reply_button_${confessionId}`)
            .setLabel("返信 / Reply")
            .setStyle(ButtonStyle.Primary);
        const row = new ActionRowBuilder().addComponents(replyButton);
        const confessionEmbed = new EmbedBuilder()
            .setTitle(`${anonymousId} (#${confessionId})`)
            .setColor(randomColor)
            .setDescription(confessionMessage)
            .setFooter({
            text: "投稿するか返信したい場合は、/confess または /reply を使用してください。",
        });
        try {
            if (!interaction.channel) {
                await interaction.followUp({
                    content: "チャンネルが見つかりませんでした。\nCould not find the channel to post your confession.",
                    flags: MessageFlags.Ephemeral,
                });
                return;
            }
            const sentMessage = await interaction.channel.send({
                embeds: [confessionEmbed],
                components: [row],
            });
            await logConfession(confessionId, sentMessage.id);
            console.log(`Logged confession #${confessionId} with message ID ${sentMessage.id} by user ${interaction.user.tag}`);
        }
        catch (error) {
            console.error("Error posting confession message:", error);
            await interaction.followUp({
                content: "メッセージの投稿中にエラーが発生しました。\nAn error occurred while posting your message.",
                flags: MessageFlags.Ephemeral,
            });
        }
    },
};
