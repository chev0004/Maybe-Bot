import { ChannelType } from "discord.js";
import { sql } from "drizzle-orm";
import { config } from "../../config/env.js";
import { db } from "../../db/index.js";
import {
  channels,
  dailyChannelStats,
  dailyUserStats,
  users,
} from "../../db/schema.js";
export const populateInitialStats = async (guild) => {
  if (guild.id === config.ids.testGuild) {
    return;
  }
  try {
    const allMembers = await guild.members.fetch();
    const allChannels = await guild.channels.fetch();
    const memberData = allMembers
      .filter((member) => !member.user.bot)
      .map((member) => ({
        id: member.id,
        username: member.user.username,
      }));
    const textChannelTypes = [
      ChannelType.GuildText,
      ChannelType.GuildAnnouncement,
    ];
    const voiceChannelTypes = [
      ChannelType.GuildVoice,
      ChannelType.GuildStageVoice,
    ];
    const channelData = allChannels
      .filter(
        (channel) =>
          channel &&
          (textChannelTypes.includes(channel.type) ||
            voiceChannelTypes.includes(channel.type)),
      )
      .filter((channel) => channel !== null)
      .map((channel) => ({
        id: channel.id,
        name: channel.name,
        type: textChannelTypes.includes(channel.type) ? "text" : "voice",
      }));
    const today = new Date().toISOString().slice(0, 10);
    if (memberData.length > 0) {
      await db
        .insert(users)
        .values(memberData)
        .onConflictDoUpdate({
          target: users.id,
          set: { username: sql`excluded.username` },
        });
      await db
        .insert(dailyUserStats)
        .values(memberData.map((m) => ({ userId: m.id, date: today })))
        .onConflictDoNothing();
    }
    if (channelData.length > 0) {
      await db
        .insert(channels)
        .values(channelData)
        .onConflictDoUpdate({
          target: channels.id,
          set: {
            name: sql`excluded.name`,
            type: sql`excluded.type`,
          },
        });
      await db
        .insert(dailyChannelStats)
        .values(channelData.map((c) => ({ channelId: c.id, date: today })))
        .onConflictDoNothing();
    }
  } catch (error) {
    console.error(
      "[Stats Population] An error occurred during stats population:",
      error,
    );
  }
};
