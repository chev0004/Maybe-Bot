import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  MessageFlags,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { createCommand } from "../../../utils/builders/commandBuilder.js";
import {
  generateAnonymousId,
  getRandomColor,
} from "../../../utils/helpers/confessionHelper.js";
import {
  getNextConfessionId,
  logConfession,
} from "../../../utils/managers/confessionManager.js";

const handleModalSubmit = async (interaction) => {
  const confessionsChannelId = process.env.CONFESSIONS_CHANNEL_ID;
  if (interaction.channelId !== confessionsChannelId) {
    console.error("confessModal: Interaction channel ID mismatch. Aborting.");
    return;
  }

  const confessionMessage =
    interaction.fields.getTextInputValue("confession_input");
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
    const sentMessage = await interaction.channel.send({
      embeds: [confessionEmbed],
      components: [row],
    });
    await logConfession(confessionId, sentMessage.id);
    console.log(
      `Logged confession #${confessionId} with message ID ${sentMessage.id}`,
    );

    await interaction.deferUpdate();
  } catch (error) {
    console.error("Error posting confession message:", error);
    await interaction.reply({
      content:
        "メッセージの投稿中にエラーが発生しました。\nAn error occurred while posting your message.",
      flags: MessageFlags.Ephemeral,
    });
  }
};

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

    try {
      const modalInteraction = await interaction.awaitModalSubmit({
        filter: (i) =>
          i.customId === "confess_modal" && i.user.id === interaction.user.id,
        time: 600_000,
      });
      console.log(`Confess modal submitted by user ${interaction.user.tag}`);
      await handleModalSubmit(modalInteraction);
    } catch (err) {
      console.warn(
        `Confess modal error for user ${interaction.user.tag} `,
        err,
      );
    }
  },
  {
    allowedChannels: [process.env.CONFESSIONS_CHANNEL_ID],
  },
);
