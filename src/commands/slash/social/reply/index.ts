import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { createCommand } from "../../../../utils/builders/commandBuilder.js";

export default createCommand(
  "reply",
  "特定の投稿に匿名で返信する。Reply anonymously to a specific confession.",
  async (interaction) => {
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

    const actionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(
      replyInput,
    );
    modal.addComponents(actionRow);

    await interaction.showModal(modal);
  },
  {
    allowedChannels: [process.env.CONFESSIONS_CHANNEL_ID].filter(
      (id): id is string => typeof id === "string",
    ),
    setup: (builder) => {
      builder.addIntegerOption((option) =>
        option
          .setName("id")
          .setDescription(
            "返信したい投稿の番号。The # of the confession to reply to.",
          )
          .setRequired(true)
          .setMinValue(1),
      );
      return builder;
    },
  },
);
