import { desc, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import {
  channelStats,
  topChannels,
  topUsers,
  userStats,
} from "../../db/schema.js";

/**
 * Filters channels to only include those with VC hours > 0 for VC hours leaderboard
 * This effectively excludes text channels since they can never have VC hours
 */
const filterVoiceChannels = (
  channels: { channelId: string; value: number | null }[],
) => {
  return channels.filter(
    (channel) => channel.value !== null && channel.value > 0,
  );
};

const LEADERBOARD_SIZE = 10;

/**
 * Periodically queries the raw stats tables (user_stats, channel_stats)
 * and updates the leaderboard tables (top_users, top_channels) with the top entries.
 */
export const updateLeaderboards = async (): Promise<void> => {
  console.log("[Leaderboard] Starting leaderboard update...");
  try {
    await db.transaction(async (tx) => {
      const userCategories = {
        messages: userStats.messages,
        vcHours: userStats.vcHours,
        bumps: userStats.bumps,
        streamHours: userStats.streamHours,
      };

      for (const [category, column] of Object.entries(userCategories)) {
        const topUsersData = await tx
          .select({
            userId: userStats.userId,
            value: column,
          })
          .from(userStats)
          .orderBy(desc(column))
          .limit(LEADERBOARD_SIZE);

        await tx.delete(topUsers).where(eq(topUsers.category, category));

        if (topUsersData.length > 0) {
          const filteredUsers = topUsersData
            .filter((user) => user.value !== null)
            .map((user, index) => ({
              category: category,
              rank: index + 1,
              userId: user.userId,
              value: user.value as number,
            }));

          if (filteredUsers.length > 0) {
            await tx.insert(topUsers).values(filteredUsers);
          }
        }
      }

      const channelCategories = {
        messages: channelStats.messages,
        vcHours: channelStats.vcHours,
      };

      for (const [category, column] of Object.entries(channelCategories)) {
        const topChannelsData = await tx
          .select({
            channelId: channelStats.channelId,
            value: column,
          })
          .from(channelStats)
          .orderBy(desc(column))
          .limit(LEADERBOARD_SIZE);

        await tx.delete(topChannels).where(eq(topChannels.category, category));

        if (topChannelsData.length > 0) {
          let filteredChannels = topChannelsData.filter(
            (channel) => channel.value !== null,
          );

          if (category === "vcHours") {
            filteredChannels = filterVoiceChannels(filteredChannels);
          }

          const finalChannels = filteredChannels.map((channel, index) => ({
            category: category,
            rank: index + 1,
            channelId: channel.channelId,
            value: channel.value as number,
          }));

          if (finalChannels.length > 0) {
            await tx.insert(topChannels).values(finalChannels);
          }
        }
      }
    });
    console.log("[Leaderboard] Successfully updated leaderboards.");
  } catch (error) {
    console.error("[Leaderboard] Failed to update leaderboards:", error);
  }
};
