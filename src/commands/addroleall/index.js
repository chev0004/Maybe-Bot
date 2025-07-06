// src/commands/listunverified/index.js

import {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} from "discord.js";

// And also import the main object
import * as Discord from "discord.js";
import { Colors } from "../../constants/Colors.js";

export default {
  data: new SlashCommandBuilder()
    .setName("listunverified")
    .setDescription(
      "特定のロールを持たないメンバーをリスト表示します。(Lists members without a specific role.)"
    )
    .setDefaultMemberPermissions(0),

  async execute(interaction) {
    const ownerId = process.env.OWNER_ID;
    const targetRoleId = process.env.VERIFIED_ROLE_ID;

    // Check for owner permission first
    if (interaction.user.id !== ownerId) {
      await interaction.reply({
        content:
          "このコマンドを使用する権限がありません。\nYou are not authorized to use this command.",
        // [FIX 1] Use the new 'flags' syntax for ephemeral messages
        flags: [Discord.InteractionResponseFlags.Ephemeral],
      });
      return;
    }

    // [FIX 1 & 2] Defer the reply as EPHEMERAL immediately.
    // This makes the entire interaction private and solves the logic error.
    await interaction.deferReply({
      flags: [Discord.InteractionResponseFlags.Ephemeral],
    });

    const guild = interaction.guild;
    if (!guild) {
      // Now you don't need 'ephemeral: true' here because the whole reply is already private.
      await interaction.editReply({
        content:
          "このコマンドはサーバー内でのみ実行できます。\nThis command can only be executed within a server.",
      });
      return;
    }

    const role = guild.roles.cache.get(targetRoleId);
    if (!role) {
      await interaction.editReply({
        content: `指定されたロール (ID: ${targetRoleId}) が見つかりませんでした。\nThe specified role (ID: ${targetRoleId}) was not found.`,
      });
      return;
    }

    // You don't need to check for botMember permissions because you already set
    // .setDefaultMemberPermissions(0), which means only administrators can run it.
    // An administrator will always have permission to view channels. This check can be removed for simplicity.

    const embed = new EmbedBuilder()
      .setFooter({
        text: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setTimestamp();

    try {
      // [FIX 3] Use the cache instead of fetching all members.
      // This is MUCH faster and more efficient.
      const members = guild.members.cache;

      const membersWithoutRole = members.filter(
        (member) => !member.user.bot && !member.roles.cache.has(targetRoleId)
      );

      if (membersWithoutRole.size === 0) {
        embed
          .setTitle(`ロール「${role.name}」を持たないメンバーはいません。`)
          .setDescription(
            `全てのメンバーがロール「${role.name}」を所有しています。\nAll members currently have the role "${role.name}".`
          )
          .setColor(Colors.green);
      } else {
        const memberList = membersWithoutRole
          .map((member) => `- ${member.user.tag} (ID: ${member.id})`)
          .join("\n");

        // Your list truncation logic is great, no changes needed here.
        const maxLen = 1000;
        let displayList;
        let truncatedMessage = "";

        if (memberList.length > maxLen) {
          const lines = memberList.split("\n");
          let currentLength = 0;
          let lastIndex = 0;
          for (let i = 0; i < lines.length; i++) {
            if (currentLength + lines[i].length + 1 > maxLen) {
              lastIndex = i;
              break;
            }
            currentLength += lines[i].length + 1;
            lastIndex = i + 1;
          }
          displayList = lines.slice(0, lastIndex).join("\n");
          if (membersWithoutRole.size - lastIndex > 0) {
            truncatedMessage = `\n...他 ${
              membersWithoutRole.size - lastIndex
            }名 (${membersWithoutRole.size - lastIndex} more)`;
          }
        } else {
          displayList = memberList;
        }

        embed
          .setTitle(
            `ロール「${role.name}」を持たないメンバー (${membersWithoutRole.size}人)`
          )
          .setDescription(
            `以下の${membersWithoutRole.size}人のメンバーはロール「${role.name}」を所有していません。\nThe following ${membersWithoutRole.size} members do not have the role "${role.name}".`
          )
          .setColor(Colors.yellow)
          .addFields({
            name: "メンバーリスト / Member List",
            value: `\`\`\`\n${displayList}${truncatedMessage}\n\`\`\``,
            inline: false,
          });
      }

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error("Error processing listunverified command:", error);
      embed
        .setColor(Colors.red)
        .setTitle("エラー")
        .setDescription(
          "メンバーリストの取得中にエラーが発生しました。\nAn error occurred while fetching the member list."
        )
        .addFields({ name: "詳細", value: `\`\`\`${error.message}\`\`\`` });
      await interaction.editReply({ embeds: [embed] });
    }
  },
};
