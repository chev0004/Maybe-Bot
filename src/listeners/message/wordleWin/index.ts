import type { Message } from "discord.js";
import { sql } from "drizzle-orm";
import { config, isTestInstance } from "../../../config/env.js";
import { db } from "../../../db/index.js";
import { dailyUserStats, users } from "../../../db/schema.js";
import { createListener } from "../../../utils/builders/listenerBuilder.js";

const WORDLE_BOT_ID = "1211781489931452447";

const firstPlaceLineRegex = /👑\s*3\/6:\s*(.+)/;

const logWordleWin = async (
  userId: string,
  username: string,
): Promise<void> => {
  const today = new Date().toISOString().slice(0, 10);
  try {
    await db
      .insert(users)
      .values({ id: userId, username })
      .onConflictDoUpdate({ target: users.id, set: { username } });

    await db
      .insert(dailyUserStats)
      .values({ userId, date: today, wordleWins: 1 })
      .onConflictDoUpdate({
        target: [dailyUserStats.userId, dailyUserStats.date],
        set: {
          wordleWins: sql`${dailyUserStats.wordleWins} + 1`,
        },
      });
  } catch (error) {
    console.error(`Error logging Wordle win for user ${userId}:`, error);
  }
};

export default createListener(
  "wordleWinHandler",
  "messageCreate",
  async (message: Message) => {
    if (!message.inGuild()) return;

    if (
      !isTestInstance &&
      config.ids.testGuild &&
      message.guild.id === config.ids.testGuild
    ) {
      return;
    }

    const content = message.content;
    if (!content) return;

    const firstPlaceMatch = content.match(firstPlaceLineRegex);
    if (!firstPlaceMatch) return;

    const lineContent = firstPlaceMatch[1];
    const mentionRegex = /<@(\d+)>/g;
    const userIds = [...lineContent.matchAll(mentionRegex)].map((m) => m[1]);

    for (const userId of userIds) {
      const user = await message.client.users.fetch(userId).catch(() => null);
      await logWordleWin(userId, user?.username ?? "Unknown");
    }
  },
  {
    ignoreBots: false,
    users: [WORDLE_BOT_ID],
  },
);
