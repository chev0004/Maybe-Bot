import { EmbedBuilder, PermissionsBitField } from "discord.js";
import { Colors } from "../../../constants/Colors.js";
import { createChatCommand } from "../../../utils/commandBuilder.js";

export default createChatCommand(
  "listunverified",
  "特定のロールを持たないメンバーをリスト表示します。(Lists members without a specific role.)",
  async (interaction) => {
    await interaction.deferReply({ ephemeral: false });

    const guild = interaction.guild;
    if (!guild) {
      await interaction.editReply({
        content:
          "このコマンドはサーバー内でのみ実行できます。\nThis command can only be executed within a server.",
        flags: [Discord.InteractionResponseFlags.Ephemeral],
      });
      return;
    }

    const role = guild.roles.cache.get(targetRoleId);
    if (!role) {
      await interaction.editReply({
        content: `指定されたロール (ID: ${targetRoleId}) が見つかりませんでした。\nThe specified role (ID: ${targetRoleId}) was not found.`,
        flags: [Discord.InteractionResponseFlags.Ephemeral],
      });
      return;
    }

    const botMember = guild.members.me;
    if (!botMember) {
      console.error(
        "listunverified command: Could not get bot's member object.",
      );
      await interaction.editReply({
        content:
          "BOTのメンバー情報を取得できませんでした。\nCould not retrieve bot's member information.",
        flags: [Discord.InteractionResponseFlags.Ephemeral],
      });
      return;
    }

    if (!botMember.permissions.has(PermissionsBitField.Flags.ViewChannel)) {
      await interaction.editReply({
        content:
          "BOTにチャンネルの閲覧権限がないため、メンバーをリストできません。\nThe bot does not have permission to view channels, thus cannot list members.",
        flags: [Discord.InteractionResponseFlags.Ephemeral],
      });
      return;
    }

    const embed = new EmbedBuilder()
      .setFooter({
        text: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setTimestamp();

    try {
      const members = await guild.members.fetch();

      const membersWithoutRole = members.filter(
        (member) => !member.user.bot && !member.roles.cache.has(targetRoleId),
      );

      if (membersWithoutRole.size === 0) {
        embed
          .setTitle(`ロール「${role.name}」を持たないメンバーはいません。`)
          .setDescription(
            `全てのメンバーがロール「${role.name}」を所有しています。\nAll members currently have the role "${role.name}".`,
          )
          .setColor(Colors.green);
      } else {
        const memberList = membersWithoutRole
          .map((member) => `- ${member.user.tag} (ID: ${member.id})`)
          .join("\n");

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
          truncatedMessage = `\n...他 ${
            membersWithoutRole.size - lastIndex
          }名 (${membersWithoutRole.size - lastIndex} more)`;

          if (membersWithoutRole.size - lastIndex === 0) {
            truncatedMessage = "";
          }
        } else {
          displayList = memberList;
        }

        embed
          .setTitle(
            `ロール「${role.name}」を持たないメンバー (${membersWithoutRole.size}人)`,
          )
          .setDescription(
            `以下の${membersWithoutRole.size}人のメンバーはロール「${role.name}」を所有していません。\nThe following ${membersWithoutRole.size} members do not have the role "${role.name}".`,
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
      console.error("Error fetching members without role:", error);
      embed
        .setColor(Colors.red)
        .setTitle("エラー")
        .setDescription(
          "メンバーリストの取得中にエラーが発生しました。\nAn error occurred while fetching the member list.",
        )
        .addFields({ name: "詳細", value: `\`\`\`${error.message}\`\`\`` });
      await interaction.editReply({ embeds: [embed] });
    }
  },
  {
    ownerOnly: true,
    setup: (builder) => builder.setDefaultMemberPermissions(0),
  },
);
