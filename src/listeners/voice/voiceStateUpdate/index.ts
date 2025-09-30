import {
  EmbedBuilder,
  type GuildTextBasedChannel,
  type VoiceState,
} from "discord.js";
import { sql } from "drizzle-orm";
import { Colors } from "../../../constants/Colors.js";
import { db } from "../../../db/index.js";
import {
  channelStats,
  channels,
  userStats,
  users,
  userVcChannelHours,
} from "../../../db/schema.js";
import { createListener } from "../../../utils/builders/listenerBuilder.js";

/**
 * Formats milliseconds into a human-readable string (e.g., "1時間3分5秒").
 * @param {number} milliseconds The duration in milliseconds.
 * @returns {string} A formatted duration string.
 */
const formatDuration = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}時間${minutes % 60}分${seconds % 60}秒`;
  } else if (minutes > 0) {
    return `${minutes}分${seconds % 60}秒`;
  } else {
    return `${seconds}秒`;
  }
};

/**
 * Logs the duration of a voice channel session to the database.
 * @param {string} userId The ID of the user whose session is being logged.
 * @param {string} channelId The ID of the voice channel.
 * @param {number} durationMs The duration of the session in milliseconds.
 * @returns {Promise<void>}
 */
const logVcSession = async (
  userId: string,
  channelId: string,
  durationMs: number,
): Promise<void> => {
  if (durationMs <= 0) return;
  const durationHours = durationMs / (1000 * 60 * 60);
  try {
    await db.insert(users).values({ id: userId }).onConflictDoNothing();
    await db.insert(channels).values({ id: channelId }).onConflictDoNothing();
    await db
      .insert(userStats)
      .values({ userId, vcHours: durationHours })
      .onConflictDoUpdate({
        target: userStats.userId,
        set: {
          vcHours: sql`${userStats.vcHours} + ${durationHours}`,
          lastUpdated: new Date(),
        },
      });
    await db
      .insert(channelStats)
      .values({ channelId, vcHours: durationHours })
      .onConflictDoUpdate({
        target: channelStats.channelId,
        set: {
          vcHours: sql`${channelStats.vcHours} + ${durationHours}`,
          lastUpdated: new Date(),
        },
      });
    await db
      .insert(userVcChannelHours)
      .values({ userId, channelId, hours: durationHours })
      .onConflictDoUpdate({
        target: [userVcChannelHours.userId, userVcChannelHours.channelId],
        set: {
          hours: sql`${userVcChannelHours.hours} + ${durationHours}`,
        },
      });
  } catch (error) {
    console.error("Error logging VC session:", error);
  }
};

/**
 * Silently logs the duration of a streaming session to the database.
 * @param {string} userId The ID of the user whose session is being logged.
 * @param {number} durationMs The duration of the session in milliseconds.
 * @returns {Promise<void>}
 */
const logStreamSession = async (
  userId: string,
  durationMs: number,
): Promise<void> => {
  if (durationMs <= 0) return;
  const durationHours = durationMs / (1000 * 60 * 60);
  try {
    await db.insert(users).values({ id: userId }).onConflictDoNothing();
    await db
      .insert(userStats)
      .values({ userId, streamHours: durationHours })
      .onConflictDoUpdate({
        target: userStats.userId,
        set: {
          streamHours: sql`${userStats.streamHours} + ${durationHours}`,
          lastUpdated: new Date(),
        },
      });
  } catch (error) {
    console.error("Error logging stream session:", error);
  }
};

const userJoinTimes = new Map<
  string,
  { channelId: string; joinTime: number }
>();
const userStreamTimes = new Map<string, number>();

export default createListener(
  "voiceChannelLoggerAndStats",
  "voiceStateUpdate",
  async (oldState: VoiceState, newState: VoiceState) => {
    const logChannelId = process.env.VOICE_LOG_CHANNEL_ID;
    if (!logChannelId) return;

    const member = newState.member || oldState.member;
    if (!member || member.user.bot) return;

    const fetched = await newState.client.channels
      .fetch(logChannelId)
      .catch(() => null);
    if (!fetched || !fetched.isTextBased()) return;
    const logChannel = fetched as GuildTextBasedChannel;

    const userId = member.id;
    const now = Date.now();

    const embed = new EmbedBuilder()
      .setAuthor({
        name: member.user.tag,
        iconURL: member.user.displayAvatarURL({ size: 128 }),
      })
      .setFooter({ text: `ID: ${userId}` })
      .setTimestamp();

    if (!oldState.channelId && newState.channelId) {
      userJoinTimes.set(userId, {
        channelId: newState.channelId,
        joinTime: now,
      });

      embed
        .setTitle("ボイスチャンネル参加")
        .setDescription(
          `${member} が <#${newState.channelId}> に参加しました。`,
        )
        .setColor(Colors.green);
      await logChannel.send({ embeds: [embed] });
    } else if (oldState.channelId && !newState.channelId) {
      embed
        .setTitle("ボイスチャンネル退出")
        .setDescription(
          `${member} が <#${oldState.channelId}> から退出しました。`,
        )
        .setColor(Colors.red);

      const joinData = userJoinTimes.get(userId);
      if (joinData && joinData.channelId === oldState.channelId) {
        const duration = now - joinData.joinTime;

        await logVcSession(userId, oldState.channelId, duration);

        embed.addFields({
          name: "通話時間",
          value: formatDuration(duration),
          inline: true,
        });
        userJoinTimes.delete(userId);
      }

      if (oldState.streaming) {
        const startTime = userStreamTimes.get(userId);
        if (startTime) {
          const streamDuration = now - startTime;
          await logStreamSession(userId, streamDuration);
          userStreamTimes.delete(userId);
          embed.addFields({
            name: "配信時間",
            value: formatDuration(streamDuration),
            inline: true,
          });
        }
      }

      await logChannel.send({ embeds: [embed] });
    } else if (
      oldState.channelId &&
      newState.channelId &&
      oldState.channelId !== newState.channelId
    ) {
      embed
        .setTitle("ボイスチャンネル移動")
        .setDescription(
          `${member} が <#${oldState.channelId}> から <#${newState.channelId}> に移動しました。`,
        )
        .setColor(Colors.yellow);

      const joinData = userJoinTimes.get(userId);
      if (joinData && joinData.channelId === oldState.channelId) {
        const duration = now - joinData.joinTime;
        await logVcSession(userId, oldState.channelId, duration);
        embed.addFields({
          name: "前のチャンネルでの通話時間",
          value: formatDuration(duration),
          inline: true,
        });
      }
      userJoinTimes.set(userId, {
        channelId: newState.channelId,
        joinTime: now,
      });
      await logChannel.send({ embeds: [embed] });
    }

    if (oldState.streaming !== newState.streaming) {
      if (newState.streaming) {
        userStreamTimes.set(userId, now);
      } else if (oldState.streaming && newState.channelId) {
        const startTime = userStreamTimes.get(userId);
        if (startTime) {
          const duration = now - startTime;
          await logStreamSession(userId, duration);
          userStreamTimes.delete(userId);
        }
      }
    }
  },
);
