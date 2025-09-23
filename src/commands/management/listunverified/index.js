import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  PermissionsBitField,
  StringSelectMenuBuilder,
} from "discord.js";
import { Colors } from "../../../constants/Colors.js";
import { createChatCommand } from "../../../utils/commandBuilder.js";

export const paginationState = new Map();
const PAGE_SIZE = 10;

const generatePage = (memberArray, sortCriteria, sortOrder, currentPage) => {
  const totalPages = Math.ceil(memberArray.length / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const currentItems = memberArray.slice(start, end);
  const listContent =
    currentItems
      .map(
        (member) =>
          `**${member.user.username}** (${member.id}) - <@${member.id}>`,
      )
      .join("\n") || "このページにメンバーはいません。";

  const title = `未認証メンバー (${memberArray.length}人)`;
  const sortLabel = sortOrder === "asc" ? "昇順 ▲" : "降順 ▼";
  const criteriaLabel =
    {
      username: "名前",
      joinedAt: "参加日",
      createdAt: "作成日",
    }[sortCriteria] || "名前";

  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(
      `認証ロールを持っていないメンバーの一覧です。\nリストは**${criteriaLabel}**で**${sortLabel}**に並べ替えられています。\nList of members without the verified role, sorted by **${criteriaLabel}** in **${sortOrder}** order.`,
    )
    .setColor(Colors.yellow)
    .addFields({ name: "メンバーリスト", value: listContent })
    .setFooter({ text: `ページ ${currentPage + 1} / ${totalPages}` });

  const buttonRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("listunverified_prev")
      .setLabel("◀")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(currentPage === 0),
    new ButtonBuilder()
      .setCustomId("listunverified_sort")
      .setLabel(sortOrder === "asc" ? "昇順 ▲" : "降順 ▼")
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId("listunverified_next")
      .setLabel("▶")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(currentPage >= totalPages - 1),
  );

  const selectMenuRow = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("listunverified_select_sort")
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

const sortFunctions = {
  username: (a, b) => a.user.username.localeCompare(b.user.username),
  joinedAt: (a, b) => a.joinedTimestamp - b.joinedTimestamp,
  createdAt: (a, b) => a.user.createdTimestamp - b.user.createdTimestamp,
};

export default createChatCommand(
  "listunverified",
  "認証ロールを持たないメンバーをリスト表示します。Lists members without the verified role.",
  async (interaction) => {
    await interaction.deferReply({ ephemeral: false });

    const isTestMode = interaction.options.getBoolean("test") ?? false;
    const guild = interaction.guild;
    let memberArray;

    if (isTestMode) {
      const fakeMembers = [];
      const totalFakes = 151;
      for (let i = 0; i < totalFakes; i++) {
        const fakeId = (
          BigInt(Date.now()) -
          BigInt(i * 100000) +
          BigInt(Math.floor(Math.random() * 10000))
        ).toString();
        const threeYearsInMillis = 3 * 365 * 24 * 60 * 60 * 1000;
        const createdAt =
          Date.now() - Math.floor(Math.random() * threeYearsInMillis);
        const joinedAt =
          createdAt + Math.floor(Math.random() * (Date.now() - createdAt));

        fakeMembers.push({
          id: fakeId,
          joinedTimestamp: joinedAt,
          user: {
            id: fakeId,
            bot: false,
            username: `FakeUser${String(i + 1).padStart(3, "0")}`,
            createdTimestamp: createdAt,
          },
          roles: {
            cache: {
              has: () => false,
            },
          },
        });
      }
      memberArray = fakeMembers;
    } else {
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
      memberArray = Array.from(membersWithoutRole.values());
    }

    const initialSortCriteria = "username";
    const initialSortOrder = "asc";

    memberArray.sort(sortFunctions[initialSortCriteria]);

    paginationState.set(interaction.id, {
      data: memberArray,
      page: 0,
      sortOrder: initialSortOrder,
      sortCriteria: initialSortCriteria,
      roleName: guild.roles.cache.get(process.env.VERIFIED_ROLE_ID)?.name,
      guildId: guild.id,
    });

    const totalPages = Math.ceil(memberArray.length / PAGE_SIZE);
    const initialPage = generatePage(
      memberArray,
      initialSortCriteria,
      initialSortOrder,
      0,
      totalPages,
      guild.roles.cache.get(process.env.VERIFIED_ROLE_ID)?.name,
    );

    await interaction.editReply(initialPage);
  },
  {
    ownerOnly: true,
    requiredEnvVars: ["VERIFIED_ROLE_ID"],
    setup: (builder) =>
      builder
        .addBooleanOption((option) =>
          option
            .setName("test")
            .setDescription(
              "テストモードで実行し、偽のデータを生成します。(Run in test mode with fake data.)",
            )
            .setRequired(false),
        )
        .setDefaultMemberPermissions(0),
  },
);
