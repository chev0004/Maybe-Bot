import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  EmbedBuilder,
  PermissionsBitField,
  StringSelectMenuBuilder,
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

      let sortCriteria = "username"; // 'username', 'joinedAt', 'createdAt'
      let sortOrder = "asc"; // 'asc', 'desc'

      const sortFunctions = {
        username: (a, b) => a.user.username.localeCompare(b.user.username),
        joinedAt: (a, b) => a.joinedTimestamp - b.joinedTimestamp,
        createdAt: (a, b) => a.user.createdTimestamp - b.user.createdTimestamp,
      };

      const performSort = () => {
        memberArray.sort((a, b) => {
          const comparison = sortFunctions[sortCriteria](a, b);
          return sortOrder === "asc" ? comparison : -comparison;
        });
      };

      performSort();

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

        const buttonRow = new ActionRowBuilder().addComponents(
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
            .setCustomId("toggle_sort_order")
            .setLabel(sortOrder === "asc" ? "昇順 ▲" : "降順 ▼")
            .setStyle(ButtonStyle.Secondary),
        );

        const selectMenuRow = new ActionRowBuilder().addComponents(
          new StringSelectMenuBuilder()
            .setCustomId("select_sort_criteria")
            .setPlaceholder("並べ替えの基準を選択")
            .addOptions(
              {
                label: "名前 (Username)",
                value: "username",
                default: sortCriteria === "username",
              },
              {
                label: "参加日 (Join Date)",
                value: "joinedAt",
                default: sortCriteria === "joinedAt",
              },
              {
                label: "作成日 (Account Date)",
                value: "createdAt",
                default: sortCriteria === "createdAt",
              },
            ),
        );

        return { embeds: [embed], components: [selectMenuRow, buttonRow] };
      };

      const message = await interaction.editReply(generatePage());

      const collector = message.createMessageComponentCollector({
        componentType: ComponentType.Button | ComponentType.StringSelect,
        time: 5 * 60 * 1000,
      });

      collector.on("collect", async (i) => {
        if (i.user.id !== interaction.user.id) {
          await i.reply({
            content:
              "コマンドを実行したユーザーのみがコンポーネントを使用できます。\nOnly the user who ran the command can use these components.",
            ephemeral: true,
          });
          return;
        }

        await i.deferUpdate();

        if (i.isButton()) {
          if (i.customId === "next_page") {
            currentPage++;
          } else if (i.customId === "prev_page") {
            currentPage--;
          } else if (i.customId === "toggle_sort_order") {
            sortOrder = sortOrder === "asc" ? "desc" : "asc";
          }
        } else if (i.isStringSelectMenu()) {
          sortCriteria = i.values[0];
          currentPage = 0;
        }

        performSort();
        await message.edit(generatePage());
      });

      collector.on("end", async () => {
        const finalPage = generatePage();
        finalPage.components.forEach((row) => {
          row.components.forEach((component) => {
            component.setDisabled(true);
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
      await interaction.editReply({ embeds: [errorEmbed], components: [] });
    }
  },
  {
    ownerOnly: true,
    setup: (builder) => builder.setDefaultMemberPermissions(0),
  },
);
