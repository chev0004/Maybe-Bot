import {
  type ButtonInteraction,
  MessageFlags,
  type StringSelectMenuInteraction,
} from "discord.js";
import { generateFakeMembers } from "../../../commands/slash/management/listunverified/index.js";
import type { InteractionModule } from "../../../handlers/interactionHandler.js";
import {
  generatePage,
  getUnverifiedMembers,
  type SortCriteria,
  type SortOrder,
  sortFunctions,
  type UnverifiedMember,
} from "../../../utils/helpers/listUnverifiedHelper.js";

export default {
  customId: "listunverified",
  async execute(interaction: ButtonInteraction | StringSelectMenuInteraction) {
    if (
      !interaction.message.interactionMetadata ||
      interaction.user.id !== interaction.message.interactionMetadata.user.id
    ) {
      return await interaction.reply({
        content:
          "あなたはこのインタラクションの元の使用者ではありません。\nYou are not the original user of this interaction.",
        flags: MessageFlags.Ephemeral,
      });
    }

    await interaction.deferUpdate();

    let currentPage = 0;
    let sortCriteria: SortCriteria = "joinedAt";
    let sortOrder: SortOrder = "asc";
    let action = "";
    let isTestMode = false;
    let testModeFlag = "0";
    let memberArray: UnverifiedMember[];

    if (interaction.isButton()) {
      let currentPageStr: string;
      [, action, currentPageStr, sortCriteria, sortOrder, testModeFlag] =
        interaction.customId.split("_") as [
          string,
          string,
          string,
          SortCriteria,
          SortOrder,
          string,
        ];
      currentPage = parseInt(currentPageStr, 10);
      isTestMode = testModeFlag === "1";

      if (action === "prev" && currentPage > 0) currentPage--;
      else if (action === "next") currentPage++;
      else if (action === "sort")
        sortOrder = sortOrder === "asc" ? "desc" : "asc";
    } else if (interaction.isStringSelectMenu()) {
      let currentPageStr: string;
      [, action, currentPageStr, sortOrder, testModeFlag] =
        interaction.customId.split("_") as [
          string,
          string,
          string,
          SortOrder,
          string,
        ];
      currentPage = parseInt(currentPageStr, 10);
      sortCriteria = interaction.values[0] as SortCriteria;
      isTestMode = testModeFlag === "1";
    }

    if (isTestMode) {
      memberArray = generateFakeMembers();
    } else {
      if (!interaction.guild) {
        await interaction.followUp({
          content:
            "ギルド情報が取得できませんでした。\nGuild information could not be retrieved.",
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

    const updatedPage = generatePage(
      memberArray,
      sortCriteria,
      sortOrder,
      currentPage,
      isTestMode,
    );
    if ("flags" in updatedPage) {
      const { flags: _, ...rest } = updatedPage;
      await interaction.editReply(rest);
    } else {
      const { _flags: _, ...rest } = updatedPage as Record<string, unknown>;
      await interaction.editReply(rest);
    }
  },
} as InteractionModule;
