import {
  EmbedBuilder,
  type GuildTextBasedChannel,
  type VoiceState,
} from "discord.js";
import { eq, sql } from "drizzle-orm";
import { config } from "../../../config/env.js";
import { Colors } from "../../../constants/Colors.js";
import { db } from "../../../db/index.js";
import {
  activeVcSessions,
  channels,
  dailyChannelStats,
  dailyUserStats,
  users,
} from "../../../db/schema.js";
import { createListener } from "../../../utils/builders/listenerBuilder.js";

/**
 * Formats milliseconds into a human-readable string (e.g., "1時間3分5秒").
 * @param {number} milliseconds The duration in milliseconds.
 * @returns {string} A formatted duration string.
 */
const formatDuration = (milliseconds: number): string => {
  if (milliseconds < 0) milliseconds = 0;
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  if (hours > 0) return `${hours}時間${minutes % 60}分${seconds % 60}秒`;
  if (minutes > 0) return `${minutes}分${seconds % 60}秒`;
  return `${seconds}秒`;
};

/**
 * Logs the duration of a voice channel session to the database.
 * @param {string} userId The ID of the user whose session is being logged.
 * @param {string} username The username of the user.
 * @param {string} channelId The ID of the voice channel.
 * @param {string} channelName The name of the voice channel.
 * @param {"text" | "voice"} channelType The type of the channel.
 * @param {number} durationMs The duration of the session in milliseconds.
 * @returns {Promise<void>}
 */
const logVcSession = async (
  userId: string,
  username: string,
  channelId: string,
  channelName: string,
  channelType: "text" | "voice",
  durationMs: number,
): Promise<void> => {
  if (durationMs <= 0) return;
  const durationHours = durationMs / (1000 * 60 * 60);
  const today = new Date().toISOString().slice(0, 10);

  try {
    await db
      .insert(users)
      .values({ id: userId, username })
      .onConflictDoUpdate({ target: users.id, set: { username } });

    await db
      .insert(channels)
      .values({ id: channelId, name: channelName, type: channelType })
      .onConflictDoUpdate({
        target: channels.id,
        set: { name: channelName, type: channelType },
      });

    await db
      .insert(dailyUserStats)
      .values({ userId, date: today, vcHours: durationHours })
      .onConflictDoUpdate({
        target: [dailyUserStats.userId, dailyUserStats.date],
        set: { vcHours: sql`${dailyUserStats.vcHours} + ${durationHours}` },
      });

    await db
      .insert(dailyChannelStats)
      .values({ channelId, date: today, vcHours: durationHours })
      .onConflictDoUpdate({
        target: [dailyChannelStats.channelId, dailyChannelStats.date],
        set: { vcHours: sql`${dailyChannelStats.vcHours} + ${durationHours}` },
      });
  } catch (error) {
    console.error("Error logging VC session:", error);
  }
};

/**
 * Silently logs the duration of a streaming session to the database.
 * @param {string} userId The ID of the user whose session is being logged.
 * @param {string} username The username of the user.
 * @param {number} durationMs The duration of the session in milliseconds.
 * @returns {Promise<void>}
 */
const logStreamSession = async (
  userId: string,
  username: string,
  durationMs: number,
): Promise<void> => {
  if (durationMs <= 0) return;
  const durationHours = durationMs / (1000 * 60 * 60);
  const today = new Date().toISOString().slice(0, 10);

  try {
    await db
      .insert(users)
      .values({ id: userId, username })
      .onConflictDoUpdate({ target: users.id, set: { username } });

    await db
      .insert(dailyUserStats)
      .values({ userId, date: today, streamHours: durationHours })
      .onConflictDoUpdate({
        target: [dailyUserStats.userId, dailyUserStats.date],
        set: {
          streamHours: sql`${dailyUserStats.streamHours} + ${durationHours}`,
        },
      });
  } catch (error) {
    console.error("Error logging stream session:", error);
  }
};

export default createListener(
  "voiceChannelLoggerAndStats",
  "voiceStateUpdate",
  async (oldState: VoiceState, newState: VoiceState) => {
    if (newState.guild.id === config.ids.testGuild) {
      return;
    }

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
    const username = member.user.username;
    const now = new Date();

    const embed = new EmbedBuilder()
      .setAuthor({
        name: member.user.tag,
        iconURL: member.user.displayAvatarURL({ size: 128 }),
      })
      .setFooter({ text: `ID: ${userId}` })
      .setTimestamp();

    if (!oldState.channelId && newState.channelId) {
      await db
        .insert(activeVcSessions)
        .values({
          userId,
          channelId: newState.channelId,
          joinTime: now,
        })
        .onConflictDoNothing();
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

      const session = await db.query.activeVcSessions.findFirst({
        where: eq(activeVcSessions.userId, userId),
      });

      if (session && oldState.channel) {
        const duration = now.getTime() - session.joinTime.getTime();
        await logVcSession(
          userId,
          username,
          oldState.channelId,
          oldState.channel.name,
          "voice",
          duration,
        );
        embed.addFields({
          name: "通話時間",
          value: formatDuration(duration),
          inline: true,
        });

        if (session.isStreaming && session.streamStartTime) {
          const streamDuration =
            now.getTime() - session.streamStartTime.getTime();
          await logStreamSession(userId, username, streamDuration);
          embed.addFields({
            name: "配信時間",
            value: formatDuration(streamDuration),
            inline: true,
          });
        }

        await db
          .delete(activeVcSessions)
          .where(eq(activeVcSessions.userId, userId));
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

      const session = await db.query.activeVcSessions.findFirst({
        where: eq(activeVcSessions.userId, userId),
      });

      if (session && oldState.channel) {
        const duration = now.getTime() - session.joinTime.getTime();
        await logVcSession(
          userId,
          username,
          oldState.channelId,
          oldState.channel.name,
          "voice",
          duration,
        );
        embed.addFields({
          name: "前のチャンネルでの通話時間",
          value: formatDuration(duration),
          inline: true,
        });
      }

      await db
        .insert(activeVcSessions)
        .values({
          userId,
          channelId: newState.channelId,
          joinTime: now,
          isStreaming: session?.isStreaming ?? false,
          streamStartTime: session?.streamStartTime,
        })
        .onConflictDoUpdate({
          target: activeVcSessions.userId,
          set: { channelId: newState.channelId, joinTime: now },
        });

      await logChannel.send({ embeds: [embed] });
    }

    if (oldState.streaming !== newState.streaming) {
      if (newState.streaming) {
        await db
          .update(activeVcSessions)
          .set({
            isStreaming: true,
            streamStartTime: now,
          })
          .where(eq(activeVcSessions.userId, userId));
      } else {
        const session = await db.query.activeVcSessions.findFirst({
          where: eq(activeVcSessions.userId, userId),
        });
        if (session?.isStreaming && session.streamStartTime) {
          const streamDuration =
            now.getTime() - session.streamStartTime.getTime();
          await logStreamSession(userId, username, streamDuration);
          await db
            .update(activeVcSessions)
            .set({
              isStreaming: false,
              streamStartTime: null,
            })
            .where(eq(activeVcSessions.userId, userId));
        }
      }
    }
  },
);
