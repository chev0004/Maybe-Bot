import { EmbedBuilder, PermissionsBitField } from "discord.js";
import { config } from "../../../../config/env.js";
import { Colors } from "../../../../constants/Colors.js";
import { Strings } from "../../../../constants/Strings.js";
import { createCommand } from "../../../../utils/builders/commandBuilder.js";
import { generatePage } from "../../../../utils/helpers/listUnverifiedHelper.js";
import { mockData as listUnverifiedMockData } from "./listunverified.mock.js";

const sortFunctions = {
  username: (a, b) => a.user.username.localeCompare(b.user.username),
  joinedAt: (a, b) => a.joinedTimestamp - b.joinedTimestamp,
  createdAt: (a, b) => a.user.createdTimestamp - b.user.createdTimestamp,
};
/**
 * Generates fake members for testing purposes.
 * Note: This function is only intended for use within the test mode of the command.
 * @returns An array of fake member objects adhering to the UnverifiedMember structure.
 */
export const generateFakeMembers = () => {
  return listUnverifiedMockData.default();
};
export default createCommand(
  "listunverified",
  "認証ロールを持たないメンバーをリスト表示します。Lists members without the verified role.",
  async (interaction) => {
    await interaction.deferReply();
    const isTestMode = interaction.options.getBoolean("test") ?? false;
    const guild = interaction.guild;
    let memberArray = [];
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
      const role = guild.roles.cache.get(verifiedRoleId);
      const botMember = guild.members.me;
      if (!botMember?.permissions.has(PermissionsBitField.Flags.ViewChannel)) {
        await interaction.editReply(Strings.Permissions.BotViewChannel);
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
      memberArray = Array.from(membersWithoutRole.values());
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
    await interaction.editReply(replyOptions);
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
