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
  "特定のロールを持たないメンバーをリスト表示します。(Lists members without a specific role.)",
  async (interaction) => {
    await interaction.deferReply({ ephemeral: false });

    const guild = interaction.guild;
    if (!guild) {
      await interaction.editReply({
        content:
          "このコマンドはサーバー内でのみ実行できます。\nThis command can only be executed within a server.",
      });
      return;
    }

    const role = interaction.options.getRole("role");
    if (!role) {
      await interaction.editReply({
        content: `指定されたロールが見つかりませんでした。\nThe specified role was not found.`,
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
      });
      return;
    }

    if (!botMember.permissions.has(PermissionsBitField.Flags.ViewChannel)) {
      await interaction.editReply({
        content:
          "BOTにチャンネルの閲覧権限がないため、メンバーをリストできません。\nThe bot does not have permission to view channels, thus cannot list members.",
      });
      return;
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
      let sortOrder = "asc";
      let currentPage = 0;
      const itemsPerPage = 10;

      memberArray.sort((a, b) =>
        a.user.username.localeCompare(b.user.username),
      );

      const generatePage = () => {
        const totalPages = Math.ceil(memberArray.length / itemsPerPage);
        const start = currentPage * itemsPerPage;
        const end = start + itemsPerPage;
        const currentItems = memberArray.slice(start, end);

        const listContent =
          currentItems
            .map(
              (member) =>
                `**${member.user.username}** (${member.id}) - \`@${member.user.username}\``,
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
            .setLabel(`⇅ ソート (${sortOrder === "asc" ? "A-Z" : "Z-A"})`)
            .setStyle(ButtonStyle.Secondary),
        );

        return { embeds: [embed], components: [buttons] };
      };

      const message = await interaction.editReply(generatePage());

      const collector = message.createMessageComponentCollector({
        componentType: ComponentType.Button,
        time: 5 * 60 * 1000,
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
          sortOrder = sortOrder === "asc" ? "desc" : "asc";
          memberArray.sort((a, b) => {
            const comparison = a.user.username.localeCompare(b.user.username);
            return sortOrder === "asc" ? comparison : -comparison;
          });
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
    setup: (builder) =>
      builder
        .addRoleOption((option) =>
          option
            .setName("role")
            .setDescription(
              "メンバーが持っているか確認するロール。(The role to check for.)",
            )
            .setRequired(true),
        )
        .setDefaultMemberPermissions(0),
  },
);
