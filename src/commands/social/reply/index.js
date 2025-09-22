import {
  ActionRowBuilder,
  MessageFlags,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { createChatCommand } from "../../../utils/commandBuilder.js";

export default createChatCommand(
  "reply",
  "特定の投稿に匿名で返信する。(Reply anonymously to a specific confession.)",
  async (interaction) => {
    const confessionsChannelId = process.env.CONFESSIONS_CHANNEL_ID;

    if (!confessionsChannelId) {
      return interaction.reply({
        content: "このコマンドは設定されていません。管理者に連絡してください。",
        flags: MessageFlags.Ephemeral,
      });
    }

    if (interaction.channelId !== confessionsChannelId) {
      return interaction.reply({
        content: `このコマンドはこのチャンネルでは使用できません。<#${confessionsChannelId}> で使用してください。`,
        flags: MessageFlags.Ephemeral,
      });
    }

    const targetId = interaction.options.getInteger("id");

    const modal = new ModalBuilder()
      .setCustomId(`reply_modal_${targetId}`)
      .setTitle("返信を投稿 / Post a Reply");

    const replyInput = new TextInputBuilder()
      .setCustomId("reply_input")
      .setLabel("返信メッセージ。The reply message.")
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder(
        "ここに返信を入力してください。\nWrite the reply message you want to send.",
      );

    const actionRow = new ActionRowBuilder().addComponents(replyInput);
    modal.addComponents(actionRow);

    await interaction.showModal(modal);
  },
  {
    setup: (builder) =>
      builder.addIntegerOption((option) =>
        option
          .setName("id")
          .setDescription(
            "返信したい投稿の番号。(The # of the confession to reply to.)",
          )
          .setRequired(true)
          .setMinValue(1),
      ),
  },
);
