import { EmbedBuilder, PermissionsBitField } from "discord.js";
import { Colors } from "../../../constants/Colors.js";
import { createCommand } from "../../../utils/builders/commandBuilder.js";
import { generatePage } from "../../../utils/helpers/listUnverifiedHelper.js";

export const paginationState = new Map();
const PAGE_SIZE = 10;

const sortFunctions = {
  username: (a, b) => a.user.username.localeCompare(b.user.username),
  joinedAt: (a, b) => a.joinedTimestamp - b.joinedTimestamp,
  createdAt: (a, b) => a.user.createdTimestamp - b.user.createdTimestamp,
};

export default createCommand(
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
      const verifiedRoleId = process.env.VERIFIED_ROLE_ID;
      const role = guild.roles.cache.get(verifiedRoleId);
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
