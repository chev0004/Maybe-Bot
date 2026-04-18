import {
  EmbedBuilder,
  type Guild,
  type InteractionEditReplyOptions,
  PermissionsBitField,
  type Role,
} from "discord.js";
import { config } from "../../../../config/env.js";

import { Colors } from "../../../../constants/Colors.js";

import { Strings } from "../../../../constants/Strings.js";
import { createCommand } from "../../../../utils/builders/commandBuilder.js";
import {
  generatePage,
  getUnverifiedMembers,
  type SortCriteria,
  type SortOrder,
  sortFunctions,
  type UnverifiedMember,
} from "../../../../utils/helpers/listUnverifiedHelper.js";
import { mockData as listUnverifiedMockData } from "./listunverified.mock.js";

export const generateFakeMembers = (): UnverifiedMember[] => {
  return listUnverifiedMockData.default();
};

export default createCommand(
  "listunverified",
  "認証ロールを持たないメンバーをリスト表示します。Lists members without the verified role.",
  async (interaction): Promise<void> => {
    await interaction.deferReply();

    const isTestMode = interaction.options.getBoolean("test") ?? false;
    const sortCriteria =
      (interaction.options.getString("sort") as SortCriteria | null) ??
      "createdAt";
    const sortOrder =
      (interaction.options.getString("order") as SortOrder | null) ?? "asc";

    const guild = interaction.guild as Guild;
    let memberArray: UnverifiedMember[] = [];

    if (isTestMode) {
      memberArray = listUnverifiedMockData.default();
    } else {
      const verifiedRoleId = config.roles.verified;
      if (!verifiedRoleId) {
        await interaction.editReply(
          Strings.Errors.ConfigNotSet("VERIFIED_ROLE_ID"),
        );
        return;
      }
      const role = guild.roles.cache.get(verifiedRoleId) as Role | undefined;
      if (!role) {
        await interaction.editReply(
          Strings.Errors.ConfigNotSet("VERIFIED_ROLE_ID"),
        );
        return;
      }

      const botMember = guild.members.me;
      if (!botMember?.permissions.has(PermissionsBitField.Flags.ViewChannel)) {
        await interaction.editReply(Strings.Permissions.BotViewChannel);
        return;
      }

      memberArray = await getUnverifiedMembers(guild);

      if (memberArray.length === 0) {
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
    }

    memberArray.sort((a, b) => {
      const comparison = sortFunctions[sortCriteria](a, b);
      return sortOrder === "asc" ? comparison : -comparison;
    });

    const initialPage = generatePage(
      memberArray,
      sortCriteria,
      sortOrder,
      0,
      isTestMode,
    );
    const { flags: _, ...replyOptions } = initialPage;
    await interaction.editReply(replyOptions as InteractionEditReplyOptions);
  },
  {
    adminOnly: true,
    setup: (builder) => {
      builder
        .addStringOption((option) =>
          option
            .setName("sort")
            .setDescription(
              "並べ替え基準 / Sort criteria (default: アカウント作成日)",
            )
            .setRequired(false)
            .addChoices(
              { name: "作成日 (Account Date)", value: "createdAt" },
              { name: "参加日 (Join Date)", value: "joinedAt" },
              { name: "名前 (Username)", value: "username" },
            ),
        )
        .addStringOption((option) =>
          option
            .setName("order")
            .setDescription("並び順 / Order (default: 昇順)")
            .setRequired(false)
            .addChoices(
              { name: "昇順 / Ascending (oldest/A first)", value: "asc" },
              { name: "降順 / Descending (newest/Z first)", value: "desc" },
            ),
        )
        .addBooleanOption((option) =>
          option
            .setName("test")
            .setDescription(
              "テストモードで実行し、偽のデータを生成します。(Run in test mode with fake data.)",
            )
            .setRequired(false),
        )
        .setDefaultMemberPermissions(0);
      return builder;
    },
  },
);
