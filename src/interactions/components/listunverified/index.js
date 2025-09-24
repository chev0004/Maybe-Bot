import { MessageFlags } from "discord.js";
import { generateFakeMembers } from "../../../commands/management/listunverified/index.js";
import { generatePage } from "../../../utils/helpers/listUnverifiedHelper.js";

const sortFunctions = {
  username: (a, b) => a.user.username.localeCompare(b.user.username),
  joinedAt: (a, b) => a.joinedTimestamp - b.joinedTimestamp,
  createdAt: (a, b) => a.user.createdTimestamp - b.user.createdTimestamp,
};

const getUnverifiedMembers = async (guild) => {
  const verifiedRoleId = process.env.VERIFIED_ROLE_ID;
  if (!verifiedRoleId) return [];
  const role = guild.roles.cache.get(verifiedRoleId);
  if (!role) return [];
  await guild.members.fetch();
  return Array.from(
    guild.members.cache
      .filter((member) => !member.user.bot && !member.roles.cache.has(role.id))
      .values(),
  );
};

export default {
  customId: "listunverified",
  async execute(interaction) {
    if (interaction.user.id !== interaction.message.interaction.user.id) {
      return await interaction.reply({
        content:
          "あなたはこのインタラクションの元の使用者ではありません。\nYou are not the original user of this interaction.",
        flags: MessageFlags.Ephemeral,
      });
    }

    await interaction.deferUpdate();

    let currentPage, sortCriteria, sortOrder, action, isTestMode, testModeFlag;
    let memberArray;

    if (interaction.isButton()) {
      [, action, currentPage, sortCriteria, sortOrder, testModeFlag] =
        interaction.customId.split("_");
      currentPage = parseInt(currentPage, 10);
      isTestMode = testModeFlag === "1";

      if (action === "prev" && currentPage > 0) currentPage--;
      else if (action === "next") currentPage++;
      else if (action === "sort")
        sortOrder = sortOrder === "asc" ? "desc" : "asc";
    } else if (interaction.isStringSelectMenu()) {
      [, action, currentPage, sortOrder, testModeFlag] =
        interaction.customId.split("_");
      currentPage = 0;
      sortCriteria = interaction.values[0];
      isTestMode = testModeFlag === "1";
    }

    if (isTestMode) {
      memberArray = generateFakeMembers();
    } else {
      memberArray = await getUnverifiedMembers(interaction.guild);
    }

    memberArray.sort((a, b) => {
      const comparison = sortFunctions[sortCriteria](a, b);
      return sortOrder === "asc" ? comparison : -comparison;
    });

    const updatedPage = generatePage(
      memberArray,
      sortCriteria,
      sortOrder,
      currentPage,
      isTestMode,
    );

    await interaction.editReply(updatedPage);
  },
};
