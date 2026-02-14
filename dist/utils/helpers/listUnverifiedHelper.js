import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  StringSelectMenuBuilder,
} from "discord.js";
import { Colors } from "../../constants/Colors.js";
export const PAGE_SIZE = 10;
export const generatePage = (
  memberArray,
  sortCriteria,
  sortOrder,
  currentPage,
  isTestMode = false,
) => {
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
  const title = `未認証メンバー (${memberArray.length}人)${isTestMode ? " [TEST MODE]" : ""}`;
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
  const testModeFlag = isTestMode ? "1" : "0";
  const buttonRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(
        `listunverified_prev_${currentPage}_${sortCriteria}_${sortOrder}_${testModeFlag}`,
      )
      .setLabel("◀")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(currentPage === 0),
    new ButtonBuilder()
      .setCustomId(
        `listunverified_sort_${currentPage}_${sortCriteria}_${sortOrder}_${testModeFlag}`,
      )
      .setLabel(sortOrder === "asc" ? "昇順 ▲" : "降順 ▼")
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId(
        `listunverified_next_${currentPage}_${sortCriteria}_${sortOrder}_${testModeFlag}`,
      )
      .setLabel("▶")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(currentPage >= totalPages - 1),
  );
  const selectMenuRow = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId(
        `listunverified_select_${currentPage}_${sortOrder}_${testModeFlag}`,
      )
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
