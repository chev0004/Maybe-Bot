import { EmbedBuilder } from "discord.js";
import { Colors } from "../../constants/Colors.js";
import {
  addReminder,
  getReminders,
  removeReminderById,
} from "./dataManager.js";

const activeTimers = new Map();

/**
 * The core function that executes when a timer is up.
 * @param {object} reminder The reminder object.
 * @param {Client} client The Discord client instance.
 */
const executeReminder = async (reminder, client) => {
  try {
    const channel = await client.channels
      .fetch(reminder.channelId)
      .catch(() => null);
    if (!channel) {
      console.warn(
        `Could not find channel ${reminder.channelId} for reminder.`,
      );
      await removeReminderById(reminder.id);
      return;
    }

    const embedMsg = new EmbedBuilder()
      .setColor(Colors.green)
      .setTitle("バンプタイムです！")
      .setDescription(
        "2時間経ちました。もう一度 /bump が出来るようになりました！",
      )
      .setTimestamp();

    await channel.send({
      content: `<@&${reminder.roleId}>`,
      embeds: [embedMsg],
    });
    console.log(`Sent bump reminder to channel ${reminder.channelId}.`);
  } catch (error) {
    console.error("Failed to execute reminder:", error);
  } finally {
    await removeReminderById(reminder.id);
    if (activeTimers.has(reminder.id)) {
      activeTimers.delete(reminder.id);
    }
  }
};

/**
 * Creates an in-memory setTimeout for a given reminder.
 * @param {object} reminder The reminder object.
 * @param {Client} client The Discord client instance.
 */
const createTimeout = (reminder, client) => {
  if (activeTimers.has(reminder.id)) {
    clearTimeout(activeTimers.get(reminder.id));
  }

  const now = Date.now();
  const delay = reminder.triggerAt - now;

  if (delay <= 0) {
    console.log(`Executing overdue reminder ${reminder.id} immediately.`);
    executeReminder(reminder, client);
  } else {
    const timeoutId = setTimeout(() => {
      executeReminder(reminder, client);
    }, delay);
    activeTimers.set(reminder.id, timeoutId);
  }
};

/**
 * Schedules a new reminder and saves it.
 * @param {object} reminderDetails Details for the new reminder.
 * @param {Client} client The Discord client instance.
 */
export const scheduleReminder = async (reminderDetails, client) => {
  const newReminder = {
    id: Date.now().toString(),
    ...reminderDetails,
  };

  await addReminder(newReminder);
  createTimeout(newReminder, client);
  console.log(
    `Scheduled new reminder ${newReminder.id} for ${new Date(newReminder.triggerAt).toLocaleTimeString()}`,
  );
};

/**
 * Loads all reminders from the data store on bot startup and schedules them.
 * @param {Client} client The Discord client instance.
 */
export const loadAndProcessReminders = async (client) => {
  console.log("Loading and processing pending reminders...");
  const reminders = await getReminders();
  if (reminders.length === 0) {
    console.log("No pending reminders found.");
    return;
  }

  reminders.forEach((reminder) => {
    console.log(`Found pending reminder: ${reminder.id}`);
    createTimeout(reminder, client);
  });
};
