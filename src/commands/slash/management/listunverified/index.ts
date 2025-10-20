import {
  EmbedBuilder,
  type Guild,
  type InteractionEditReplyOptions,
  PermissionsBitField,
  type Role,
} from "discord.js";
import { config } from "../../../../config/env.js";

import { Colors } from "../../../../constants/Colors.js";

import { createCommand } from "../../../../utils/builders/commandBuilder.js";
import {
  generatePage,
  type UnverifiedMember,
} from "../../../../utils/helpers/listUnverifiedHelper.js";
import { mockData as listUnverifiedMockData } from "./listunverified.mock.js";

const sortFunctions = {
  username: (
    a: { user: { username: string } },
    b: { user: { username: string } },
  ) => a.user.username.localeCompare(b.user.username),
  joinedAt: (a: { joinedTimestamp: number }, b: { joinedTimestamp: number }) =>
    a.joinedTimestamp - b.joinedTimestamp,
  createdAt: (
    a: { user: { createdTimestamp: number } },
    b: { user: { createdTimestamp: number } },
  ) => a.user.createdTimestamp - b.user.createdTimestamp,
};

/**
 * Generates fake members for testing purposes.
 * Note: This function is only intended for use within the test mode of the command.
 * @returns An array of fake member objects adhering to the UnverifiedMember structure.
 */
export const generateFakeMembers = (): UnverifiedMember[] => {
  return listUnverifiedMockData.default();
};

export default createCommand(
  "listunverified",
  "認証ロールを持たないメンバーをリスト表示します。Lists members without the verified role.",
  async (interaction): Promise<void> => {
    await interaction.deferReply();

    const isTestMode = interaction.options.getBoolean("test") ?? false;
    const guild = interaction.guild as Guild;
    let memberArray: UnverifiedMember[] = [];

    if (isTestMode) {
      memberArray = listUnverifiedMockData.default();
    } else {
      const verifiedRoleId = config.roles.verified;
      if (!verifiedRoleId) {
        await interaction.editReply(
          "`VERIFIED_ROLE_ID` が設定されていません。\nThe VERIFIED_ROLE_ID environment variable is not set.",
        );
        return;
      }
      const role = guild.roles.cache.get(verifiedRoleId) as Role;

      const botMember = guild.members.me;
      if (!botMember?.permissions.has(PermissionsBitField.Flags.ViewChannel)) {
        await interaction.editReply(
          "BOTにチャンネルの閲覧権限がないため、メンバーをリストできません。\nThe bot does not have permission to view channels, thus cannot list members.",
        );
        return;
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
      memberArray = Array.from(
        membersWithoutRole.values(),
      ) as UnverifiedMember[];
    }

    const initialSortCriteria = "username";
    const initialSortOrder = "asc";
    memberArray.sort(sortFunctions[initialSortCriteria]);
    const initialPage = generatePage(
      memberArray,
      initialSortCriteria,
      initialSortOrder,
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
