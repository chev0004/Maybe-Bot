import {
  AuditLogEvent,
  EmbedBuilder,
  type GuildAuditLogsEntry,
  type GuildMember,
  type GuildTextBasedChannel,
  type PartialGuildMember,
} from "discord.js";
import { asc, isNotNull } from "drizzle-orm";
import { config, isTestInstance } from "../../../config/env.js";
import { Colors } from "../../../constants/Colors.js";
import { db } from "../../../db/index.js";
import { memberBans, memberKicks, memberLeaves } from "../../../db/schema.js";
import { createListener } from "../../../utils/builders/listenerBuilder.js";

const formatDuration = (milliseconds: number): string => {
  if (milliseconds < 0) milliseconds = 0;
  const totalSeconds = Math.floor(milliseconds / 1000);
  const secPerYear = 365 * 86400;
  const secPerDay = 86400;
  const years = Math.floor(totalSeconds / secPerYear);
  let rest = totalSeconds % secPerYear;
  const days = Math.floor(rest / secPerDay);
  rest %= secPerDay;
  const hours = Math.floor(rest / 3600);
  rest %= 3600;
  const minutes = Math.floor(rest / 60);
  const seconds = rest % 60;
  if (years > 0) return `${years}年${days}日${hours}時間${minutes}分`;
  if (days > 0) return `${days}日${hours}時間${minutes}分`;
  if (hours > 0) return `${hours}時間${minutes}分`;
  if (minutes > 0) return `${minutes}分${seconds}秒`;
  return `${seconds}秒`;
};

type RemovalType = "leave" | "kick" | "ban";

const AUDIT_LOG_WINDOW_MS = 10_000;

const findAuditEntry = async (
  member: GuildMember | PartialGuildMember,
  type: AuditLogEvent.MemberKick | AuditLogEvent.MemberBanAdd,
): Promise<GuildAuditLogsEntry<typeof type> | null> => {
  try {
    const logs = await member.guild.fetchAuditLogs({ type, limit: 5 });
    const now = Date.now();
    const entry = logs.entries.find(
      (e) =>
        e.target?.id === member.id &&
        now - e.createdTimestamp < AUDIT_LOG_WINDOW_MS,
    );
    return (entry ?? null) as GuildAuditLogsEntry<typeof type> | null;
  } catch (error) {
    console.warn(
      `[memberLeave] Failed to read audit log (${AuditLogEvent[type]}):`,
      error,
    );
    return null;
  }
};

const classifyRemoval = async (
  member: GuildMember | PartialGuildMember,
): Promise<RemovalType> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  if (await findAuditEntry(member, AuditLogEvent.MemberBanAdd)) return "ban";
  if (await findAuditEntry(member, AuditLogEvent.MemberKick)) return "kick";
  return "leave";
};

interface FastestRow {
  username: string;
  stayMs: number | null;
}

const renderLeaderboard = (
  name: string,
  rows: FastestRow[],
): { name: string; value: string } | null => {
  if (rows.length === 0) return null;
  const medals = ["🥇", "🥈", "🥉"];
  const lines = rows.map((row, i) => {
    const prefix = medals[i] ?? `${i + 1}.`;
    const dur = row.stayMs !== null ? formatDuration(row.stayMs) : "不明";
    return `${prefix} **${row.username}** ー ${dur}`;
  });
  return { name, value: lines.join("\n") };
};

export default createListener(
  "memberLeave",
  "guildMemberRemove",
  async (member: GuildMember | PartialGuildMember) => {
    if (member.user.bot) return;
    if (
      !isTestInstance &&
      config.ids.testGuild &&
      member.guild.id === config.ids.testGuild
    ) {
      return;
    }

    const now = new Date();
    const joinedAt = member.joinedAt ?? null;
    const stayMs = joinedAt ? now.getTime() - joinedAt.getTime() : null;
    const accountCreatedAt = member.user.createdAt;
    const accountAgeMs = now.getTime() - accountCreatedAt.getTime();
    const username = member.user.username;

    const type = await classifyRemoval(member);

    try {
      if (type === "ban") {
        await db.insert(memberBans).values({
          userId: member.id,
          username,
          joinedAt,
          bannedAt: now,
          stayMs,
          accountCreatedAt,
        });
      } else if (type === "kick") {
        await db.insert(memberKicks).values({
          userId: member.id,
          username,
          joinedAt,
          kickedAt: now,
          stayMs,
          accountCreatedAt,
        });
      } else {
        await db.insert(memberLeaves).values({
          userId: member.id,
          username,
          joinedAt,
          leftAt: now,
          stayMs,
          accountCreatedAt,
        });
      }
    } catch (error) {
      console.error(`[memberLeave] Failed to insert ${type} record:`, error);
    }

    if (type !== "leave") return;

    const leaveChannelId = config.channels.leave;
    if (!leaveChannelId) return;

    const [fastestLeaves, fastestKicks, fastestBans] = await Promise.all([
      db
        .select({
          username: memberLeaves.username,
          stayMs: memberLeaves.stayMs,
        })
        .from(memberLeaves)
        .where(isNotNull(memberLeaves.stayMs))
        .orderBy(asc(memberLeaves.stayMs))
        .limit(5),
      db
        .select({ username: memberKicks.username, stayMs: memberKicks.stayMs })
        .from(memberKicks)
        .where(isNotNull(memberKicks.stayMs))
        .orderBy(asc(memberKicks.stayMs))
        .limit(5),
      db
        .select({ username: memberBans.username, stayMs: memberBans.stayMs })
        .from(memberBans)
        .where(isNotNull(memberBans.stayMs))
        .orderBy(asc(memberBans.stayMs))
        .limit(5),
    ]);

    const fetched = await member.client.channels
      .fetch(leaveChannelId)
      .catch(() => null);
    if (!fetched || !fetched.isTextBased()) return;
    const leaveChannel = fetched as GuildTextBasedChannel;

    const embed = new EmbedBuilder()
      .setAuthor({
        name: member.user.tag,
        iconURL: member.user.displayAvatarURL({ size: 128 }),
      })
      .setTitle("メンバー退出")
      .setColor(Colors.red)
      .setFooter({ text: `ID: ${member.id}` })
      .setTimestamp(now);

    const stayLabel =
      stayMs !== null
        ? `${formatDuration(stayMs)}で退出`
        : "参加日時不明で退出";
    embed.setDescription(`<@${member.id}> が ${stayLabel}。`);

    embed.addFields(
      {
        name: "サーバー滞在時間",
        value: stayMs !== null ? formatDuration(stayMs) : "不明",
        inline: true,
      },
      {
        name: "アカウント年齢",
        value: formatDuration(accountAgeMs),
        inline: true,
      },
    );

    const leaderboards = [
      renderLeaderboard("最速退出ランキング", fastestLeaves),
      renderLeaderboard("最速キックランキング", fastestKicks),
      renderLeaderboard("最速バンランキング", fastestBans),
    ].filter((x): x is { name: string; value: string } => x !== null);

    if (leaderboards.length > 0) {
      embed.addFields(...leaderboards);
    }

    await leaveChannel.send({ embeds: [embed] });
  },
  { ignoreBots: false, ignoreSelf: false },
);
