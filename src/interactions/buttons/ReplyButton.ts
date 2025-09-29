import {
  ActionRowBuilder,
  type ButtonInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import type { InteractionModule } from "../../handlers/interactionHandler.js";

export default {
  customId: "reply_button",
  async execute(interaction: ButtonInteraction) {
    const confessionId = interaction.customId.split("_")[2];

    const modal = new ModalBuilder()
      .setCustomId(`reply_modal_${confessionId}`)
      .setTitle("返信を投稿 / Post a Reply");

    const replyInput = new TextInputBuilder()
      .setCustomId("reply_input")
      .setLabel("返信メッセージ。The reply message.")
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder(
        "ここに返信を入力してください。\nWrite the reply message you want to send.",
      );

    const actionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(
      replyInput,
    );
    modal.addComponents(actionRow);

    await interaction.showModal(modal);
  },
} as InteractionModule;
