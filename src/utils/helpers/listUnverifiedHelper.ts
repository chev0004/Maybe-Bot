import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  type Guild,
  type GuildMember,
  type InteractionReplyOptions,
  StringSelectMenuBuilder,
} from "discord.js";
import { config } from "../../config/env.js";
import { Colors } from "../../constants/Colors.js";

export const PAGE_SIZE = 10;

export type SortCriteria = "username" | "joinedAt" | "createdAt";
export type SortOrder = "asc" | "desc";

export type UnverifiedMember =
  | GuildMember
  | {
      id: string;
      joinedTimestamp: number | null;
      user: {
        id: string;
        username: string;
        createdTimestamp: number;
      };
    };

export const sortFunctions: Record<
  SortCriteria,
  (a: UnverifiedMember, b: UnverifiedMember) => number
> = {
  username: (a, b) => a.user.username.localeCompare(b.user.username),
  joinedAt: (a, b) =>
    (a.joinedTimestamp ?? Number.POSITIVE_INFINITY) -
    (b.joinedTimestamp ?? Number.POSITIVE_INFINITY),
  createdAt: (a, b) => a.user.createdTimestamp - b.user.createdTimestamp,
};

export const getUnverifiedMembers = async (
  guild: Guild,
): Promise<GuildMember[]> => {
  const verifiedRoleId = config.roles.verified;
  if (!verifiedRoleId) return [];
  const role = guild.roles.cache.get(verifiedRoleId);
  if (!role) return [];

  if (guild.members.cache.size < guild.memberCount) {
    await guild.members.fetch();
  }

  return Array.from(
    guild.members.cache
      .filter((member) => !member.user.bot && !member.roles.cache.has(role.id))
      .values(),
  );
};

const MS_PER_DAY = 86_400_000;

const formatTenureSinceJoin = (joinedTimestamp: number): string => {
  const ageMs = Date.now() - joinedTimestamp;
  if (ageMs < 0) return "—";
  if (ageMs < MS_PER_DAY) return "1日未満";

  const start = new Date(joinedTimestamp);
  const end = new Date();
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();
  if (days < 0) {
    months--;
    const prevMonthEnd = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonthEnd.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const parts: string[] = [];
  if (years > 0) parts.push(`${years}年`);
  if (months > 0) parts.push(`${months}ヶ月`);
  if (days > 0 || parts.length === 0) parts.push(`${days}日`);
  return parts.join("");
};

const formatMemberLine = (member: UnverifiedMember): string => {
  const name = `\`${member.user.username}\``;
  const mention = `<@${member.id}>`;
  if (member.joinedTimestamp == null) {
    return `${mention} ${name} - 参加日不明`;
  }
  const joinUnix = Math.floor(member.joinedTimestamp / 1000);
  const tenure = formatTenureSinceJoin(member.joinedTimestamp);
  return `${mention} ${name} - 参加日 <t:${joinUnix}:D>（在籍 ${tenure}）`;
};

export const generatePage = (
  memberArray: UnverifiedMember[],
  sortCriteria: SortCriteria,
  sortOrder: SortOrder,
  currentPage: number,
  isTestMode = false,
): InteractionReplyOptions => {
  const totalPages = Math.max(1, Math.ceil(memberArray.length / PAGE_SIZE));
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const currentItems = memberArray.slice(start, end);
  const listContent =
    currentItems.map(formatMemberLine).join("\n") ||
    "このページにメンバーはいません。";

  const title = `未認証メンバー (${memberArray.length}人)${
    isTestMode ? " [TEST MODE]" : ""
  }`;
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
      `**${criteriaLabel}** を **${sortLabel}** で表示。\n\n${listContent}`,
    )
    .setColor(Colors.yellow)
    .setFooter({ text: `ページ ${currentPage + 1} / ${totalPages}` });
  const testModeFlag = isTestMode ? "1" : "0";

  const buttonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
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
  const selectMenuRow =
    new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId(
          `listunverified_select_${currentPage}_${sortOrder}_${testModeFlag}`,
        )
        .setPlaceholder("並べ替えの基準を選択")
        .addOptions(
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
          {
            label: "名前 (Username)",
            value: "username",
            default: sortCriteria === "username",
          },
        ),
    );
  return { embeds: [embed], components: [selectMenuRow, buttonRow] };
};
