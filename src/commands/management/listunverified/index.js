import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  EmbedBuilder,
  PermissionsBitField,
} from "discord.js";
import { Colors } from "../../../constants/Colors.js";
import { createChatCommand } from "../../../utils/commandBuilder.js";

export default createChatCommand(
  "listunverified",
  "認証ロールを持たないメンバーをリスト表示します。(Lists members without the verified role.)",
  async (interaction) => {
    await interaction.deferReply({ ephemeral: false });

    const guild = interaction.guild;
    const verifiedRoleId = process.env.VERIFIED_ROLE_ID;

    if (!guild) {
      return await interaction.editReply(
        "このコマンドはサーバー内でのみ実行できます。\nThis command can only be executed within a server.",
      );
    }

    if (!verifiedRoleId) {
      return await interaction.editReply(
        "認証ロールIDが設定されていません。管理者に連絡してください。\nVerified role ID is not configured. Please contact an administrator.",
      );
    }

    const role = guild.roles.cache.get(verifiedRoleId);
    if (!role) {
      return await interaction.editReply(
        `指定された認証ロール (ID: ${verifiedRoleId}) が見つかりませんでした。\nThe specified verified role (ID: ${verifiedRoleId}) was not found.`,
      );
    }

    const botMember = guild.members.me;
    if (!botMember?.permissions.has(PermissionsBitField.Flags.ViewChannel)) {
      return await interaction.editReply(
        "BOTにチャンネルの閲覧権限がないため、メンバーをリストできません。\nThe bot does not have permission to view channels, thus cannot list members.",
      );
    }

    try {
      await guild.members.fetch();
      const membersWithoutRole = guild.members.cache.filter(
        (member) => !member.user.bot && !member.roles.cache.has(role.id),
      );

      if (membersWithoutRole.size === 0) {
        const embed = new EmbedBuilder()
          .setTitle(`ロール「${role.name}」を持たないメンバーはいません。`)
          .setDescription(
            `全てのメンバーがロール「${role.name}」を所有しています。\nAll members currently have the role "${role.name}".`,
          )
          .setColor(Colors.green)
          .setFooter({
            text: interaction.user.username,
            iconURL: interaction.user.displayAvatarURL(),
          })
          .setTimestamp();
        await interaction.editReply({ embeds: [embed] });
        return;
      }

      const memberArray = Array.from(membersWithoutRole.values());
      let currentPage = 0;
      const itemsPerPage = 10;

      const sortModes = [
        {
          label: "名前 A-Z",
          sort: (a, b) => a.user.username.localeCompare(b.user.username),
        },
        {
          label: "名前 Z-A",
          sort: (a, b) => b.user.username.localeCompare(a.user.username),
        },
        {
          label: "参加日 新→古",
          sort: (a, b) => b.joinedTimestamp - a.joinedTimestamp,
        },
        {
          label: "参加日 古→新",
          sort: (a, b) => a.joinedTimestamp - b.joinedTimestamp,
        },
        {
          label: "作成日 新→古",
          sort: (a, b) => b.user.createdTimestamp - a.user.createdTimestamp,
        },
        {
          label: "作成日 古→新",
          sort: (a, b) => a.user.createdTimestamp - b.user.createdTimestamp,
        },
      ];
      let sortIndex = 0;

      memberArray.sort(sortModes[sortIndex].sort);

      const generatePage = () => {
        const totalPages = Math.ceil(memberArray.length / itemsPerPage);
        const start = currentPage * itemsPerPage;
        const end = start + itemsPerPage;
        const currentItems = memberArray.slice(start, end);

        const listContent =
          currentItems
            .map(
              (member) =>
                `**${member.user.username}** (${member.id}) - <@${member.id}>`,
            )
            .join("\n") || "このページにメンバーはいません。";

        const embed = new EmbedBuilder()
          .setTitle(
            `ロール「${role.name}」を持たないメンバー (${memberArray.length}人)`,
          )
          .setDescription(
            `以下の${memberArray.length}人のメンバーはロール「${role.name}」を所有していません。\nThe following ${memberArray.length} members do not have the role "${role.name}".`,
          )
          .setColor(Colors.yellow)
          .addFields({ name: "メンバーリスト", value: listContent })
          .setFooter({
            text: `ページ ${currentPage + 1} / ${totalPages}`,
          });

        const buttons = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("prev_page")
            .setLabel("◀")
            .setStyle(ButtonStyle.Primary)
            .setDisabled(currentPage === 0),
          new ButtonBuilder()
            .setCustomId("next_page")
            .setLabel("▶")
            .setStyle(ButtonStyle.Primary)
            .setDisabled(currentPage >= totalPages - 1),
          new ButtonBuilder()
            .setCustomId("sort")
            .setLabel(`⇅ 並べ替え (${sortModes[sortIndex].label})`)
            .setStyle(ButtonStyle.Secondary),
        );

        return { embeds: [embed], components: [buttons] };
      };

      const message = await interaction.editReply(generatePage());

      const collector = message.createMessageComponentCollector({
        componentType: ComponentType.Button,
        time: 4 * 60 * 1000,
      });

      collector.on("collect", async (i) => {
        if (i.user.id !== interaction.user.id) {
          await i.reply({
            content:
              "コマンドを実行したユーザーのみがボタンを使用できます。\nOnly the user who ran the command can use these buttons.",
            ephemeral: true,
          });
          return;
        }

        await i.deferUpdate();

        if (i.customId === "next_page") {
          currentPage++;
        } else if (i.customId === "prev_page") {
          currentPage--;
        } else if (i.customId === "sort") {
          sortIndex = (sortIndex + 1) % sortModes.length;
          memberArray.sort(sortModes[sortIndex].sort);
          currentPage = 0;
        }

        await message.edit(generatePage());
      });

      collector.on("end", async () => {
        const finalPage = generatePage();
        finalPage.components.forEach((row) => {
          row.components.forEach((button) => {
            button.setDisabled(true);
          });
        });
        await message.edit(finalPage).catch(() => {});
      });
    } catch (error) {
      console.error("Error fetching members without role:", error);
      const errorEmbed = new EmbedBuilder()
        .setColor(Colors.red)
        .setTitle("エラー")
        .setDescription(
          "メンバーリストの取得中にエラーが発生しました。\nAn error occurred while fetching the member list.",
        )
        .addFields({ name: "詳細", value: `\`\`\`${error.message}\`\`\`` });
      await interaction.editReply({ embeds: [errorEmbed] });
    }
  },
  {
    ownerOnly: true,
    setup: (builder) => builder.setDefaultMemberPermissions(0),
  },
);
