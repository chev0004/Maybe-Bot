import { createListener } from "../../utils/builders/listenerBuilder.js";
import { scheduleReminder } from "../../utils/managers/reminderManager.js";

/**
 * Recursively checks if a given text exists anywhere in an embed's fields.
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

export default createListener(
  "disboardBumpHandler",
  "messageCreate",
  async (message, client) => {
    if (!message.embeds || message.embeds.length === 0) return;

    const embed = message.embeds[0];

    console.log(embed);

    const isDisboardBump = isTextInEmbed(embed, "をアップしたよ");

    if (!isDisboardBump) return;

    console.log("Disboard bump detected!");
    const bumpSource = "Disboard";

    const interval = 2 * 60 * 60 * 1000;
    const triggerAt = Date.now() + interval;

    const reminderDetails = {
      channelId: process.env.BUMP_CHANNEL_ID,
      roleId: process.env.BUMP_ROLE_ID,
      triggerAt: triggerAt,
      source: bumpSource,
    };

    await scheduleReminder(reminderDetails, client);
  },
  {
    ignoreBots: false,
    requiredEnvVars: ["BUMP_CHANNEL_ID", "BUMP_ROLE_ID"],
    channels: [process.env.BUMP_CHANNEL_ID],
    users: ["302050872383242240"],
  },
);
