import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { createCommand } from "../../../../utils/builders/commandBuilder.js";

export default createCommand(
  "confess",
  "匿名でメッセージを投稿します。Post a message anonymously.",
  async (interaction) => {
    const modal = new ModalBuilder()
      .setCustomId("confess_modal")
      .setTitle("匿名で投稿 / Post an Anonymous Confession");

    const messageInput = new TextInputBuilder()
      .setCustomId("confession_input")
      .setLabel("投稿したいメッセージ。The message you want to confess.")
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder(
        "ここにメッセージを入力してください。\nWrite the anonymous message you want to send.",
      );

    const actionRow = new ActionRowBuilder().addComponents(messageInput);
    modal.addComponents(actionRow);

    await interaction.showModal(modal);
  },
  {
    allowedChannels: [process.env.CONFESSIONS_CHANNEL_ID],
  },
);
