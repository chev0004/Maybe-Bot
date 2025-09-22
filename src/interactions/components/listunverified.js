import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  MessageFlags,
  StringSelectMenuBuilder,
} from "discord.js";
import { paginationState } from "../../commands/management/listunverified/index.js";
import { Colors } from "../../constants/Colors.js";

const PAGE_SIZE = 10;
const sortFunctions = {
  username: (a, b) => a.user.username.localeCompare(b.user.username),
  joinedAt: (a, b) => a.joinedTimestamp - b.joinedTimestamp,
  createdAt: (a, b) => a.user.createdTimestamp - b.user.createdTimestamp,
};

const generatePage = (
  memberArray,
  sortCriteria,
  sortOrder,
  currentPage,
  totalPages,
) => {
  const start = currentPage * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, memberArray.length);
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
