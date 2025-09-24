import { scheduleReminder } from "../managers/reminderManager.js";

/**
 * Checks if a given text exists anywhere in an embed's fields.
 * @param {object} embed The embed object to check.
 * @param {string} text The text to search for.
 * @returns {boolean}
 */
const isTextInEmbed = (embed, text) => {
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
 * Handles the logic for processing a bump message.
 * @param {import('discord.js').Message} message The message object from the event.
 * @param {import('discord.js').Client} client The Discord client instance.
 * @param {string} bumpSource The name of the bump source (e.g., "Disboard").
 * @param {string} bumpIdentifierText The text to identify the bump embed.
 */
export const handleBump = async (
  message,
  client,
  bumpSource,
  bumpIdentifierText,
) => {
  if (!message.embeds || message.embeds.length === 0) return;

  const embed = message.embeds[0];

  const isBump = isTextInEmbed(embed, bumpIdentifierText);
  if (!isBump) return;

  console.log(`${bumpSource} bump detected!`);

  const interval = 2 * 60 * 60 * 1000;
  const triggerAt = Date.now() + interval;

  const reminderDetails = {
    channelId: process.env.BUMP_CHANNEL_ID,
    roleId: process.env.BUMP_ROLE_ID,
    triggerAt: triggerAt,
    source: bumpSource,
  };

  await scheduleReminder(reminderDetails, client);
};
