import { ChannelType, type Guild } from "discord.js";
import { sql } from "drizzle-orm";
import { db } from "../../db/index.js";
import {
  channels,
  dailyChannelStats,
  dailyUserStats,
  users,
} from "../../db/schema.js";

export const populateInitialStats = async (guild: Guild): Promise<void> => {
  console.log(
    "[Stats Population] Starting population of users and channels...",
  );

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

    // FIX: Add an explicit type annotation here
    const channelData: { id: string; name: string; type: "text" | "voice" }[] =
      allChannels
        .filter(
          (channel) =>
            channel &&
            (textChannelTypes.includes(channel.type) ||
              voiceChannelTypes.includes(channel.type)),
        )
        .filter((channel) => channel !== null)
        .map((channel) => ({
          id: channel.id, // Using non-null assertion as we filtered out nulls
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
        .values(channelData) // This will now work without error
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

    console.log(
      `[Stats Population] Finished. Processed ${memberData.length} members and ${channelData.length} channels.`,
    );
  } catch (error) {
    console.error(
      "[Stats Population] An error occurred during stats population:",
      error,
    );
  }
};
