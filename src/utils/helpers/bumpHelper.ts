// src/utils/helpers/bumpHelper.ts
import type { Client, Embed, Message, PartialMessage } from "discord.js";
import { sql } from "drizzle-orm";
import { config } from "../../config/env.js";
import { db } from "../../db/index.js";
import { dailyUserStats, users } from "../../db/schema.js";
import { scheduleReminder } from "../managers/reminderManager.js";

/**
 * Checks if a given text exists anywhere in an embed's fields.
 * @param {Embed} embed The embed object to check.
 * @param {string} text The text to search for.
 * @returns {boolean}
 */
const isTextInEmbed = (embed: Embed, text: string): boolean => {
  if (!embed) return false;
  const searchText = text.toLowerCase();
  if (embed.title?.toLowerCase().includes(searchText)) return true;
  if (embed.description?.toLowerCase().includes(searchText)) return true;
  if (embed.footer?.text?.toLowerCase().includes(searchText)) return true;
  if (embed.fields) {
    for (const field of embed.fields) {
      if (field.name?.toLowerCase().includes(searchText)) return true;
      if (field.value?.toLowerCase().includes(searchText)) return true;
    }
  }

  return false;
};

/**
 * Logs a bump event for a specific user to the database.
 * @param {string} userId The ID of the user who bumped the server.
 * @param {string} username The username of the user.
 * @returns {Promise<void>}
 */
const logBump = async (userId: string, username: string): Promise<void> => {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format
  try {
    // Upsert user to ensure they exist with the latest username
    await db
      .insert(users)
      .values({ id: userId, username })
      .onConflictDoUpdate({ target: users.id, set: { username } });

    // Increment daily user stats for bumps
    await db
      .insert(dailyUserStats)
      .values({ userId, date: today, bumps: 1 })
      .onConflictDoUpdate({
        target: [dailyUserStats.userId, dailyUserStats.date],
        set: {
          bumps: sql`${dailyUserStats.bumps} + 1`,
        },
      });
  } catch (error) {
    console.error(`Error logging bump for user ${userId}:`, error);
  }
};

/**
 * Handles the logic for processing a bump message, including logging and setting reminders.
 * @param {Message | PartialMessage} message The message object from the event.
 * @param {Client} client The Discord client instance.
 * @param {string} bumpSource The name of the bump source (e.g., "Disboard").
 * @param {string} bumpIdentifierText The text to identify the bump embed.
 */
export const handleBump = async (
  message: Message | PartialMessage,
  client: Client,
  bumpSource: string,
  bumpIdentifierText: string,
): Promise<void> => {
  if (!message.embeds || message.embeds.length === 0) return;
  const embed = message.embeds[0];

  if (!isTextInEmbed(embed, bumpIdentifierText)) return;

  const interactionUser = message.interaction?.user;
  if (!interactionUser) {
    console.warn(`Could not identify bumper for a ${bumpSource} bump.`);
    return;
  }

  console.log(`${bumpSource} bump detected by ${interactionUser.username}!`);

  await logBump(interactionUser.id, interactionUser.username);

  const interval = 2 * 60 * 60 * 1000;
  const triggerAt = Date.now() + interval;
  const reminderDetails = {
    channelId: config.channels.bump,
    roleId: config.roles.bump,
    triggerAt: triggerAt,
    source: bumpSource,
  };
  await scheduleReminder(reminderDetails, client);
};
