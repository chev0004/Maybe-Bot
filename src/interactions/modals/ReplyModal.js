import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  MessageFlags,
} from "discord.js";
import {
  generateAnonymousId,
  getRandomColor,
} from "../../utils/helpers/confessionHelper.js";
import {
  getConfessionData,
  getNextConfessionId,
  logConfession,
} from "../../utils/managers/confessionManager.js";

export default {
  customId: "reply_modal",
  async execute(interaction) {
    const targetIdStr = interaction.customId.split("_")[2];

    const targetId = parseInt(targetIdStr, 10);
    const replyMessage = interaction.fields.getTextInputValue("reply_input");

    const confessionData = await getConfessionData();
    const originalMessageId = confessionData.messageMap[targetId];

    if (!originalMessageId) {
      console.warn(`Confession #${targetId} not found in messageMap.`);
      return interaction.reply({
        content: `投稿 #${targetId} が見つかりませんでした。番号が正しいか確認してください。\nPost #${targetId} could not be found. Please check the number.`,
        flags: MessageFlags.Ephemeral,
      });
    }

    try {
      const originalMessage =
        await interaction.channel.messages.fetch(originalMessageId);
      const originalEmbed = originalMessage.embeds[0];
      console.log(`Fetched original message for reply to #${targetId}.`);

      const titleMatch = originalEmbed.title.match(/(.+) \(#\d+\)/);
      const originalAuthorName = titleMatch
        ? titleMatch[1].trim()
        : originalEmbed.title;
      const originalDescription = originalEmbed.description || "";

      let contentToQuote = "";
      if (originalDescription.includes("\n> ")) {
        contentToQuote = originalDescription.split("\n\n").pop();
      } else {
        contentToQuote = originalDescription;
      }

      const messageUrl = `https://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${originalMessageId}`;
      const quotedText = `> **${originalAuthorName}** **([#${targetId}](${messageUrl}))**\n> ${contentToQuote.split("\n").join("\n> ")}\n\n`;

      const newAnonymousId = generateAnonymousId();
      const newReplyId = await getNextConfessionId();
      const randomColor = getRandomColor();

      const replyButton = new ButtonBuilder()
        .setCustomId(`reply_button_${newReplyId}`)
        .setLabel("返信 / Reply")
        .setStyle(ButtonStyle.Primary);

      const row = new ActionRowBuilder().addComponents(replyButton);

      const replyEmbed = new EmbedBuilder()
        .setTitle(`${newAnonymousId} (#${newReplyId})`)
        .setColor(randomColor)
        .setDescription(`${quotedText}${replyMessage}`)
        .setFooter({
          text: "投稿するか返信したい場合は、/confess または /reply を使用してください。",
        });

      const sentMessage = await interaction.channel.send({
        embeds: [replyEmbed],
        components: [row],
      });

      await logConfession(newReplyId, sentMessage.id);
      console.log(
        `Logged reply #${newReplyId} with message ID ${sentMessage.id}`,
      );
      await interaction.deferUpdate();
    } catch (error) {
      console.error(
        `Error processing reply to confession #${targetId}:`,
        error,
      );
      if (error.code === 10008) {
        return interaction.reply({
          content: `投稿 #${targetId} は削除されたようです。\nIt seems post #${targetId} has been deleted.`,
          flags: MessageFlags.Ephemeral,
        });
      }
      return interaction.reply({
        content:
          "返信の処理中にエラーが発生しました。\nAn error occurred while processing your reply.",
        flags: MessageFlags.Ephemeral,
      });
    }
  },
  allowedChannels: [process.env.CONFESSIONS_CHANNEL_ID],
  requiredEnvVars: ["CONFESSIONS_CHANNEL_ID"],
};
