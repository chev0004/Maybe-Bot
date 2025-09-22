import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import {
  getNextConfessionId,
  logConfession,
} from "../../../utils/confessionManager.js";
import {
  generateAnonymousId,
  getRandomColor,
} from "../../../utils/confessionUtils.js";

export default {
  data: new SlashCommandBuilder()
    .setName("confess")
    .setDescription(
      "匿名でメッセージを投稿します。(Post a message anonymously.)",
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription(
          "投稿したいメッセージ。(The message you want to confess.)",
        )
        .setRequired(true),
    ),

  async execute(interaction) {
    // Get channel id
    const confessionsChannelId = process.env.CONFESSIONS_CHANNEL_ID;

    // Send this if no id is found
    if (!confessionsChannelId) {
      return interaction.reply({
        content:
          "このコマンドは設定されていません。管理者に連絡してください。\nThis command is not configured. Please contact an administrator.",
        ephemeral: true,
      });
    }

    // Send this if the command is used in a different channel
    if (interaction.channelId !== confessionsChannelId) {
      return interaction.reply({
        content: `このコマンドはこのチャンネルでは使用できません。<#${confessionsChannelId}> で使用してください。\nThis command can only be used in the <#${confessionsChannelId}> channel.`,
        ephemeral: true,
      });
    }

    const confessionMessage = interaction.options.getString("message");
    const anonymousId = generateAnonymousId();
    const randomColor = getRandomColor();
    const confessionId = await getNextConfessionId();

    const confessionEmbed = new EmbedBuilder()
      .setTitle(`${anonymousId} (#${confessionId})`)
      .setDescription(confessionMessage)
      .setColor(randomColor)
      .setFooter({
        text: "投稿するか返信したい場合は、/confess または /reply を使用してください。",
      });

    try {
      const sentMessage = await interaction.channel.send({
        embeds: [confessionEmbed],
      });
      await logConfession(confessionId, sentMessage.id);

      // Send this if all things go smooth
      await interaction.reply({
        content:
          "あなたのメッセージは匿名で投稿されました。\nYour confession has been posted anonymously.",
        ephemeral: true,
      });
    } catch (error) {
      console.error("Error processing confession:", error);
      await interaction.reply({
        content:
          "メッセージの投稿中にエラーが発生しました。\nAn error occurred while posting your message.",
        ephemeral: true,
      });
    }
  },
};
