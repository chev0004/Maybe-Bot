import { sql } from "drizzle-orm";
import { db } from "../../../db/index.js";
import {
  channelStats,
  channels,
  userStats,
  users,
} from "../../../db/schema.js";
import { createListener } from "../../../utils/builders/listenerBuilder.js";

export default createListener(
  "messageStatTracker",
  "messageCreate",
  async (message) => {
    const userId = message.author.id;
    const username = message.author.username;
    const channelId = message.channel.id;

    try {
      await db
        .insert(users)
        .values({ id: userId, username })
        .onConflictDoNothing();
      await db.insert(channels).values({ id: channelId }).onConflictDoNothing();

      await db
        .insert(userStats)
        .values({ userId, messages: 1 })
        .onConflictDoUpdate({
          target: userStats.userId,
          set: {
            messages: sql`${userStats.messages} + 1`,
            lastUpdated: new Date(),
          },
        });

      await db
        .insert(channelStats)
        .values({ channelId, messages: 1 })
        .onConflictDoUpdate({
          target: channelStats.channelId,
          set: {
            messages: sql`${channelStats.messages} + 1`,
            lastUpdated: new Date(),
          },
        });
    } catch (error) {
      console.error("Error logging message stats:", error);
    }
  },
);
