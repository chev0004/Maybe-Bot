import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import {
  getConfessionData,
  getNextConfessionId,
  logConfession,
} from "../../../utils/confessionManager.js";
import {
  generateAnonymousId,
  getRandomColor,
} from "../../../utils/confessionUtils.js";

export default {
  data: new SlashCommandBuilder()
    .setName("reply")
    .setDescription(
      "特定の投稿に匿名で返信する。(Reply anonymously to a specific confession.)",
    )
    .addIntegerOption((option) =>
      option
        .setName("id")
        .setDescription(
          "返信したい投稿の番号。(The # of the confession to reply to.)",
        )
        .setRequired(true)
        .setMinValue(1),
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("返信メッセージ。(The reply message.)")
        .setRequired(true),
    ),

  async execute(interaction) {
    const confessionsChannelId = process.env.CONFESSIONS_CHANNEL_ID;

    if (!confessionsChannelId) {
      return interaction.reply({
        content: "このコマンドは設定されていません。管理者に連絡してください。",
        ephemeral: true,
      });
    }

    if (interaction.channelId !== confessionsChannelId) {
      return interaction.reply({
        content: `このコマンドはこのチャンネルでは使用できません。<#${confessionsChannelId}> で使用してください。`,
        ephemeral: true,
      });
    }

    const targetId = interaction.options.getInteger("id");
    const replyMessage = interaction.options.getString("message");

    const confessionData = await getConfessionData();
    const originalMessageId = confessionData.messageMap[targetId];

    if (!originalMessageId) {
      return interaction.reply({
        content: `投稿 #${targetId} が見つかりませんでした。番号が正しいか確認してください。\nPost #${targetId} could not be found. Please check the number.`,
        ephemeral: true,
      });
    }

    try {
      const originalMessage =
        await interaction.channel.messages.fetch(originalMessageId);
      const originalEmbed = originalMessage.embeds[0];

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

      const replyEmbed = new EmbedBuilder()
        .setTitle(`${newAnonymousId} (#${newReplyId})`)
        .setColor(randomColor)
        .setDescription(`${quotedText}${replyMessage}`)
        .setFooter({
          text: "投稿するか返信したい場合は、/confess または /reply を使用してください。",
        });

      const sentMessage = await interaction.channel.send({
        embeds: [replyEmbed],
      });

      await logConfession(newReplyId, sentMessage.id);

      await interaction.reply({
        content: `投稿 #${targetId} に匿名で返信しました。\nYour anonymous reply to post #${targetId} has been posted.`,
        ephemeral: true,
      });
    } catch (error) {
      console.error(`Error fetching original confession #${targetId}:`, error);
      if (error.code === 10008) {
        return interaction.reply({
          content: `投稿 #${targetId} は削除されたようです。\nIt seems post #${targetId} has been deleted.`,
          ephemeral: true,
        });
      }
      return interaction.reply({
        content:
          "返信の処理中にエラーが発生しました。\nAn error occurred while processing your reply.",
        ephemeral: true,
      });
    }
  },
};
