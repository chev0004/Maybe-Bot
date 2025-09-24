import { MessageFlags } from "discord.js";
import { paginationState } from "../../../commands/management/listunverified/index.js";
import { generatePage } from "../../../utils/helpers/listUnverifiedHelper.js";

const PAGE_SIZE = 10;
const sortFunctions = {
  username: (a, b) => a.user.username.localeCompare(b.user.username),
  joinedAt: (a, b) => a.joinedTimestamp - b.joinedTimestamp,
  createdAt: (a, b) => a.user.createdTimestamp - b.user.createdTimestamp,
};

export default {
  customId: "listunverified",
  async execute(interaction) {
    const state = paginationState.get(interaction.message.interaction.id);

    if (
      !state ||
      interaction.user.id !== interaction.message.interaction.user.id
    ) {
      return await interaction.reply({
        content:
          "このインタラクションのデータが見つからないか、あなたはコマンドを実行したユーザーではありません。\nThis interaction data could not be found or you did not run the original command.",
        flags: MessageFlags.Ephemeral,
      });
    }

    await interaction.deferUpdate();

    if (interaction.isButton()) {
      const action = interaction.customId.split("_")[1];
      if (action === "prev") {
        if (state.page > 0) state.page--;
      } else if (action === "next") {
        const totalPages = Math.ceil(state.data.length / PAGE_SIZE);
        if (state.page < totalPages - 1) state.page++;
      } else if (action === "sort") {
        state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
        state.data.sort((a, b) => {
          const comparison = sortFunctions[state.sortCriteria](a, b);
          return state.sortOrder === "asc" ? comparison : -comparison;
        });
        state.page = 0;
      }
    } else if (interaction.isStringSelectMenu()) {
      state.sortCriteria = interaction.values[0];
      state.data.sort((a, b) => {
        const comparison = sortFunctions[state.sortCriteria](a, b);
        return state.sortOrder === "asc" ? comparison : -comparison;
      });
      state.page = 0;
    }

    const totalPages = Math.ceil(state.data.length / PAGE_SIZE);
    const updatedPage = generatePage(
      state.data,
      state.sortCriteria,
      state.sortOrder,
      state.page,
      totalPages,
    );
    await interaction.editReply(updatedPage);
  },
};
