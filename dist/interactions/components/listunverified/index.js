import { MessageFlags, } from "discord.js";
import { generateFakeMembers } from "../../../commands/slash/management/listunverified/index.js";
import { config } from "../../../config/env.js";
import { generatePage, } from "../../../utils/helpers/listUnverifiedHelper.js";
const sortFunctions = {
    username: (a, b) => a.user.username.localeCompare(b.user.username),
    joinedAt: (a, b) => (a.joinedTimestamp ?? 0) - (b.joinedTimestamp ?? 0),
    createdAt: (a, b) => a.user.createdTimestamp - b.user.createdTimestamp,
};
const getUnverifiedMembers = async (guild) => {
    const verifiedRoleId = config.roles.verified;
    if (!verifiedRoleId)
        return [];
    const role = guild.roles.cache.get(verifiedRoleId);
    if (!role)
        return [];
    await guild.members.fetch();
    return Array.from(guild.members.cache
        .filter((member) => !member.user.bot && !member.roles.cache.has(role.id))
        .values());
};
export default {
    customId: "listunverified",
    async execute(interaction) {
        if (!interaction.message.interactionMetadata ||
            interaction.user.id !== interaction.message.interactionMetadata.user.id) {
            return await interaction.reply({
                content: "あなたはこのインタラクションの元の使用者ではありません。\nYou are not the original user of this interaction.",
                flags: MessageFlags.Ephemeral,
            });
        }
        await interaction.deferUpdate();
        let currentPage = 0, sortCriteria = "username", sortOrder = "asc", action, isTestMode = false, testModeFlag;
        let memberArray;
        if (interaction.isButton()) {
            let currentPageStr;
            [, action, currentPageStr, sortCriteria, sortOrder, testModeFlag] =
                interaction.customId.split("_");
            currentPage = parseInt(currentPageStr, 10);
            isTestMode = testModeFlag === "1";
            if (action === "prev" && currentPage > 0)
                currentPage--;
            else if (action === "next")
                currentPage++;
            else if (action === "sort")
                sortOrder = sortOrder === "asc" ? "desc" : "asc";
        }
        else if (interaction.isStringSelectMenu()) {
            let currentPageStr;
            [, action, currentPageStr, sortOrder, testModeFlag] =
                interaction.customId.split("_");
            currentPage = parseInt(currentPageStr, 10);
            sortCriteria = interaction.values[0];
            isTestMode = testModeFlag === "1";
        }
        if (isTestMode) {
            memberArray = generateFakeMembers();
        }
        else {
            if (!interaction.guild) {
                await interaction.followUp({
                    content: "ギルド情報が取得できませんでした。\nGuild information could not be retrieved.",
                    flags: MessageFlags.Ephemeral,
                });
                return;
            }
            memberArray = await getUnverifiedMembers(interaction.guild);
        }
        memberArray.sort((a, b) => {
            const comparison = sortFunctions[sortCriteria](a, b);
            return sortOrder === "asc" ? comparison : -comparison;
        });
        const updatedPage = generatePage(memberArray, sortCriteria, sortOrder, currentPage, isTestMode);
        if ("flags" in updatedPage) {
            const { flags: _, ...rest } = updatedPage;
            await interaction.editReply(rest);
        }
        else {
            const { _flags: _, ...rest } = updatedPage;
            await interaction.editReply(rest);
        }
    },
};
