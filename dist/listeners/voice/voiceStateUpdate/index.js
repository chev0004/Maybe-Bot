import { EmbedBuilder, } from "discord.js";
import { and, eq, isNull, sql } from "drizzle-orm";
import { config, isTestInstance } from "../../../config/env.js";
import { Colors } from "../../../constants/Colors.js";
import { db } from "../../../db/index.js";
import { activeVcSessions, channels, dailyChannelStats, dailyUserStats, hourlyActivity, users, voiceSessionParticipants, voiceSessions, } from "../../../db/schema.js";
import { createListener } from "../../../utils/builders/listenerBuilder.js";
const ensureChannelInDb = async (channelId, channel, client) => {
    const resolved = channel?.id === channelId
        ? channel
        : await client.channels.fetch(channelId).catch(() => null);
    if (!resolved || !resolved.isVoiceBased())
        return false;
    const voiceChannel = resolved;
    await db
        .insert(channels)
        .values({
        id: voiceChannel.id,
        name: voiceChannel.name,
        type: "voice",
    })
        .onConflictDoUpdate({
        target: channels.id,
        set: { name: voiceChannel.name, type: "voice" },
    });
    return true;
};
const activeChannelSessions = new Map();
/**
 * Formats milliseconds into a human-readable string (e.g., "1時間3分5秒").
 * @param {number} milliseconds The duration in milliseconds.
 * @returns {string} A formatted duration string.
 */
const formatDuration = (milliseconds) => {
    if (milliseconds < 0)
        milliseconds = 0;
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (hours > 0)
        return `${hours}時間${minutes % 60}分${seconds % 60}秒`;
    if (minutes > 0)
        return `${minutes}分${seconds % 60}秒`;
    return `${seconds}秒`;
};
/**
 * Logs the duration of a voice channel session to the database.
 * @param {string} userId The ID of the user whose session is being logged.
 * @param {string} username The username of the user.
 * @param {string} channelId The ID of the voice channel.
 * @param {string} channelName The name of the voice channel.
 * @param {"text" | "voice"} channelType The type of the channel.
 * @param {Date} startTime The start time of the session.
 * @param {Date} endTime The end time of the session.
 * @returns {Promise<void>}
 */
const logVcSession = async (userId, username, channelId, channelName, channelType, startTime, endTime) => {
    const durationMs = endTime.getTime() - startTime.getTime();
    if (durationMs <= 0)
        return;
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
            set: { vcHours: sql `${dailyUserStats.vcHours} + ${durationHours}` },
        });
        await db
            .insert(dailyChannelStats)
            .values({ channelId, date: today, vcHours: durationHours })
            .onConflictDoUpdate({
            target: [dailyChannelStats.channelId, dailyChannelStats.date],
            set: { vcHours: sql `${dailyChannelStats.vcHours} + ${durationHours}` },
        });
        let currentHourStart = new Date(startTime);
        currentHourStart.setUTCMinutes(0, 0, 0);
        while (currentHourStart < endTime) {
            const nextHourStart = new Date(currentHourStart);
            nextHourStart.setUTCHours(nextHourStart.getUTCHours() + 1);
            const effectiveEnd = endTime < nextHourStart ? endTime : nextHourStart;
            const effectiveStart = startTime > currentHourStart ? startTime : currentHourStart;
            const durationInHourMs = effectiveEnd.getTime() - effectiveStart.getTime();
            if (durationInHourMs > 0) {
                const durationInHour = durationInHourMs / (1000 * 60 * 60);
                const date = currentHourStart.toISOString().slice(0, 10);
                const hour = currentHourStart.getUTCHours();
                await db
                    .insert(hourlyActivity)
                    .values({ date, hour, vcHours: durationInHour })
                    .onConflictDoUpdate({
                    target: [hourlyActivity.date, hourlyActivity.hour],
                    set: {
                        vcHours: sql `${hourlyActivity.vcHours} + ${durationInHour}`,
                    },
                });
            }
            currentHourStart = nextHourStart;
        }
    }
    catch (error) {
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
const logStreamSession = async (userId, username, durationMs) => {
    if (durationMs <= 0)
        return;
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
                streamHours: sql `${dailyUserStats.streamHours} + ${durationHours}`,
            },
        });
    }
    catch (error) {
        console.error("Error logging stream session:", error);
    }
};
export default createListener("voiceStateUpdate", "voiceStateUpdate", async (oldState, newState) => {
    if (!isTestInstance &&
        config.ids.testGuild &&
        newState.guild.id === config.ids.testGuild) {
        return;
    }
    const member = newState.member || oldState.member;
    if (!member || member.user.bot)
        return;
    const userId = member.id;
    try {
        // --- User Joins or Moves INTO a channel ---
        if (newState.channelId && newState.channelId !== oldState.channelId) {
            if (newState.channel && newState.channel.members.size === 1) {
                const channelOk = await ensureChannelInDb(newState.channelId, newState.channel, newState.client);
                if (channelOk) {
                    const newSession = await db
                        .insert(voiceSessions)
                        .values({
                        channelId: newState.channelId,
                        startTime: new Date(),
                    })
                        .returning({ id: voiceSessions.id });
                    if (newSession.length > 0) {
                        const sessionId = newSession[0].id;
                        activeChannelSessions.set(newState.channelId, {
                            sessionId,
                            participants: new Set(newState.channel.members.map((m) => m.id)),
                        });
                    }
                }
            }
            else if (newState.channel) {
                const sessionInfo = activeChannelSessions.get(newState.channelId);
                if (sessionInfo) {
                    sessionInfo.participants.add(userId);
                }
                else {
                    const openSession = await db.query.voiceSessions.findFirst({
                        where: and(eq(voiceSessions.channelId, newState.channelId), isNull(voiceSessions.endTime)),
                    });
                    if (openSession) {
                        const currentParticipants = newState.channel.members.map((m) => m.id);
                        activeChannelSessions.set(newState.channelId, {
                            sessionId: openSession.id,
                            participants: new Set(currentParticipants),
                        });
                    }
                    else {
                        const channelOk = await ensureChannelInDb(newState.channelId, newState.channel, newState.client);
                        if (channelOk) {
                            const fallbackSession = await db
                                .insert(voiceSessions)
                                .values({
                                channelId: newState.channelId,
                                startTime: new Date(),
                            })
                                .returning({ id: voiceSessions.id });
                            if (fallbackSession.length > 0) {
                                activeChannelSessions.set(newState.channelId, {
                                    sessionId: fallbackSession[0].id,
                                    participants: new Set(newState.channel.members.map((m) => m.id)),
                                });
                            }
                        }
                    }
                }
            }
        }
        // --- User Leaves or Moves FROM a channel ---
        if (oldState.channelId && oldState.channelId !== newState.channelId) {
            if (oldState.channel && oldState.channel.members.size === 0) {
                const sessionInfo = activeChannelSessions.get(oldState.channelId);
                if (sessionInfo) {
                    const endTime = new Date();
                    const sessionRecord = await db.query.voiceSessions.findFirst({
                        where: eq(voiceSessions.id, sessionInfo.sessionId),
                    });
                    if (sessionRecord) {
                        const durationSeconds = Math.floor((endTime.getTime() - sessionRecord.startTime.getTime()) / 1000);
                        const uniqueParticipants = Array.from(sessionInfo.participants);
                        await db
                            .update(voiceSessions)
                            .set({
                            endTime,
                            durationSeconds,
                            totalUniqueParticipants: uniqueParticipants.length,
                        })
                            .where(eq(voiceSessions.id, sessionInfo.sessionId));
                        if (uniqueParticipants.length > 0) {
                            await db
                                .insert(voiceSessionParticipants)
                                .values(uniqueParticipants.map((uid) => ({
                                sessionId: sessionInfo.sessionId,
                                userId: uid,
                            })))
                                .onConflictDoNothing();
                        }
                    }
                    activeChannelSessions.delete(oldState.channelId);
                }
            }
        }
    }
    catch (e) {
        console.error("Error in new voice session tracking logic:", e);
    }
    const logChannelId = process.env.VOICE_LOG_CHANNEL_ID;
    if (!logChannelId)
        return;
    const username = member.user.username;
    const now = new Date();
    const fetched = await newState.client.channels
        .fetch(logChannelId)
        .catch(() => null);
    if (!fetched || !fetched.isTextBased())
        return;
    const logChannel = fetched;
    const embed = new EmbedBuilder()
        .setAuthor({
        name: member.user.tag,
        iconURL: member.user.displayAvatarURL({ size: 128 }),
    })
        .setFooter({ text: `ID: ${userId}` })
        .setTimestamp();
    if (!oldState.channelId && newState.channelId) {
        const channelOk = await ensureChannelInDb(newState.channelId, newState.channel, newState.client);
        if (channelOk) {
            await db
                .insert(activeVcSessions)
                .values({
                userId,
                channelId: newState.channelId,
                joinTime: now,
            })
                .onConflictDoNothing();
        }
        embed
            .setTitle("ボイスチャンネル参加")
            .setDescription(`${member} が <#${newState.channelId}> に参加しました。`)
            .setColor(Colors.green);
        await logChannel.send({ embeds: [embed] });
    }
    else if (oldState.channelId && !newState.channelId) {
        embed
            .setTitle("ボイスチャンネル退出")
            .setDescription(`${member} が <#${oldState.channelId}> から退出しました。`)
            .setColor(Colors.red);
        const session = await db.query.activeVcSessions.findFirst({
            where: eq(activeVcSessions.userId, userId),
        });
        if (session && oldState.channel) {
            const duration = now.getTime() - session.joinTime.getTime();
            await logVcSession(userId, username, oldState.channelId, oldState.channel.name, "voice", session.joinTime, now);
            embed.addFields({
                name: "通話時間",
                value: formatDuration(duration),
                inline: true,
            });
            if (session.isStreaming && session.streamStartTime) {
                const streamDuration = now.getTime() - session.streamStartTime.getTime();
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
    }
    else if (oldState.channelId &&
        newState.channelId &&
        oldState.channelId !== newState.channelId) {
        embed
            .setTitle("ボイスチャンネル移動")
            .setDescription(`${member} が <#${oldState.channelId}> から <#${newState.channelId}> に移動しました。`)
            .setColor(Colors.yellow);
        const session = await db.query.activeVcSessions.findFirst({
            where: eq(activeVcSessions.userId, userId),
        });
        if (session && oldState.channel) {
            const duration = now.getTime() - session.joinTime.getTime();
            await logVcSession(userId, username, oldState.channelId, oldState.channel.name, "voice", session.joinTime, now);
            embed.addFields({
                name: "前のチャンネルでの通話時間",
                value: formatDuration(duration),
                inline: true,
            });
        }
        const channelOk = await ensureChannelInDb(newState.channelId, newState.channel, newState.client);
        if (channelOk) {
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
        }
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
        }
        else {
            const session = await db.query.activeVcSessions.findFirst({
                where: eq(activeVcSessions.userId, userId),
            });
            if (session?.isStreaming && session.streamStartTime) {
                const streamDuration = now.getTime() - session.streamStartTime.getTime();
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
});
