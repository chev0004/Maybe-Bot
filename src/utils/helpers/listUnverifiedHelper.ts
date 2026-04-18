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
const MS_PER_YEAR = 365 * MS_PER_DAY;

const formatAccountAge = (createdTimestamp: number): string => {
  const ageMs = Date.now() - createdTimestamp;
  if (ageMs < 0) return "新規";
  const years = Math.floor(ageMs / MS_PER_YEAR);
  const days = Math.floor((ageMs % MS_PER_YEAR) / MS_PER_DAY);
  if (years > 0) return `${years}年${days}日`;
  return `${days}日`;
};

const formatMemberLine = (member: UnverifiedMember): string => {
  const createdUnix = Math.floor(member.user.createdTimestamp / 1000);
  const age = formatAccountAge(member.user.createdTimestamp);
  return `<@${member.id}> \`${member.user.username}\` - 作成 <t:${createdUnix}:D> (${age})`;
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
            label: "作成日 (Account Date)",
            value: "createdAt",
            default: sortCriteria === "createdAt",
          },
          {
            label: "参加日 (Join Date)",
            value: "joinedAt",
            default: sortCriteria === "joinedAt",
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
