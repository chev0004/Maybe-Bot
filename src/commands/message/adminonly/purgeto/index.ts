import {
  ActionRowBuilder,
  ApplicationCommandType,
  ButtonBuilder,
  type ButtonInteraction,
  ButtonStyle,
  ComponentType,
  type ContextMenuCommandInteraction,
  EmbedBuilder,
  type GuildTextBasedChannel,
  type Message,
  MessageFlags,
  PermissionsBitField,
} from "discord.js";
import { Colors } from "../../../../constants/Colors.js";
import { createMenuCommand } from "../../../../utils/builders/menuCommandBuilder.js";

const FOURTEEN_DAYS_IN_MS = 1000 * 60 * 60 * 24 * 14;

export default createMenuCommand(
  "Purge to here",
  ApplicationCommandType.Message,
  async (
    interaction: ContextMenuCommandInteraction,
    _client,
    _options,
  ): Promise<void> => {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    if (
      !interaction.guild ||
      !interaction.channel ||
      !interaction.channel.isTextBased()
    ) {
      await interaction.editReply({
        content:
          "このコマンドはサーバーのテキストチャンネルでのみ使用できます。\nThis command can only be used in a server text channel.",
      });
      return;
    }

    if (
      !interaction.guild.members.me ||
      !interaction.guild.members.me.permissions.has(
        PermissionsBitField.Flags.ManageMessages,
      )
    ) {
      await interaction.editReply({
        content:
          "ボットに「メッセージの管理」権限がありません。\nI don't have the 'Manage Messages' permission to perform this action.",
      });
      return;
    }

    if (!interaction.isMessageContextMenuCommand()) {
      await interaction.editReply({
        content:
          "このコマンドはメッセージのコンテキストメニューからのみ使用できます。\nThis command can only be used from a message context menu.",
      });
      return;
    }

    const targetMessage = interaction.targetMessage;
    let messagesToDelete: Message[] = [];
    let tooOldCount = 0;

    try {
      const fetchedMessages = await interaction.channel.messages.fetch({
        limit: 100,
      });
      const messageArray = Array.from(fetchedMessages.values()).sort(
        (a, b) => b.createdTimestamp - a.createdTimestamp,
      );
      const targetIndex = messageArray.findIndex(
        (msg) => msg.id === targetMessage.id,
      );

      if (targetIndex === -1) {
        await interaction.editReply({
          content:
            "選択されたメッセージは直近100件のメッセージ内に見つかりませんでした。\nCould not find the target message within the last 100 messages.",
        });
        return;
      }

      const rawMessagesToDelete = messageArray.slice(0, targetIndex + 1);
      messagesToDelete = rawMessagesToDelete.filter(
        (msg) => Date.now() - msg.createdTimestamp < FOURTEEN_DAYS_IN_MS,
      );
      tooOldCount = rawMessagesToDelete.length - messagesToDelete.length;
    } catch (error) {
      console.error("Error during message fetching for purge:", error);
      await interaction.editReply({
        content:
          "メッセージの取得中にエラーが発生しました。\nAn error occurred while fetching messages.",
      });
      return;
    }

    if (messagesToDelete.length === 0) {
      const noMessagesEmbed = new EmbedBuilder()
        .setColor(Colors.purple)
        .setTitle("削除対象メッセージなし / No Messages to Delete")
        .setDescription(
          "削除対象のメッセージが見つかりませんでした。\nNo messages were found to delete.",
        );
      if (tooOldCount > 0) {
        noMessagesEmbed.addFields({
          name: "注意 / Warning",
          value: `(${tooOldCount}件の古いメッセージは無視されます。)\n(${tooOldCount} older messages will be ignored.)`,
        });
      }
      await interaction.editReply({ embeds: [noMessagesEmbed] });
      return;
    }

    const confirmButton = new ButtonBuilder()
      .setCustomId("confirm_purge")
      .setLabel("確認")
      .setStyle(ButtonStyle.Danger);

    const cancelButton = new ButtonBuilder()
      .setCustomId("cancel_purge")
      .setLabel("キャンセル")
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      confirmButton,
      cancelButton,
    );

    const confirmationEmbed = new EmbedBuilder()
      .setColor(Colors.purple)
      .setTitle("削除の確認 / Deletion Confirmation")
      .setDescription(
        `選択されたメッセージまで${messagesToDelete.length}件のメッセージを削除してもよろしいですか？\n` +
          `Are you sure you want to delete ${messagesToDelete.length} message(s) up to the selected message?`,
      );

    if (tooOldCount > 0) {
      confirmationEmbed.addFields({
        name: "注意 / Warning",
        value:
          `${tooOldCount}件のメッセージは14日以上経過しているため削除できません。\n` +
          `${tooOldCount} messages are older than 14 days and will be ignored.`,
      });
    }

    const confirmationMessage = await interaction.editReply({
      embeds: [confirmationEmbed],
      components: [row],
    });

    const filter = (i: ButtonInteraction) => i.user.id === interaction.user.id;

    try {
      const confirmation = await confirmationMessage.awaitMessageComponent({
        filter,
        componentType: ComponentType.Button,
        time: 15_000,
      });

      if (confirmation.customId === "confirm_purge") {
        const purgingEmbed = new EmbedBuilder()
          .setColor(Colors.yellow)
          .setDescription("メッセージを削除しています...\nPurging messages...");
        await confirmation.update({ embeds: [purgingEmbed], components: [] });

        const guildTextChannel =
          interaction.channel as unknown as GuildTextBasedChannel;
        await guildTextChannel.bulkDelete(messagesToDelete, true);

        const successEmbed = new EmbedBuilder()
          .setColor(Colors.green)
          .setTitle("成功 / Success")
          .setDescription(
            `✅ ${messagesToDelete.length}件のメッセージを正常に削除しました。\nSuccessfully deleted ${messagesToDelete.length} messages.`,
          );

        if (tooOldCount > 0) {
          successEmbed.addFields({
            name: "注意 / Warning",
            value: `⚠️ ${tooOldCount}件のメッセージは14日以上経過しているため削除できませんでした。\n${tooOldCount} messages were older than 14 days and could not be deleted.`,
          });
        }

        await interaction.editReply({ embeds: [successEmbed], components: [] });
      } else if (confirmation.customId === "cancel_purge") {
        const cancelEmbed = new EmbedBuilder()
          .setColor(Colors.red)
          .setTitle("キャンセル済み / Canceled")
          .setDescription("パージがキャンセルされました。\nPurge canceled.");
        await confirmation.update({ embeds: [cancelEmbed], components: [] });
      }
    } catch {
      const timedOutEmbed = new EmbedBuilder()
        .setColor(Colors.yellow)
        .setTitle("タイムアウト / Timed Out")
        .setDescription(
          "15秒以内に確認が取れなかったため、キャンセルしました。\nConfirmation not received within 15 seconds, canceling.",
        );

      const timedOutRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
        confirmButton.setDisabled(true),
        cancelButton.setDisabled(true),
      );

      await interaction.editReply({
        embeds: [timedOutEmbed],
        components: [timedOutRow],
      });
    }
  },
  {
    requiredPermissions: [PermissionsBitField.Flags.ManageMessages],
  },
);
