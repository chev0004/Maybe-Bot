import { type Client, EmbedBuilder, type TextChannel } from "discord.js";
import { Colors } from "../../constants/Colors.js";
import {
  addReminder,
  getReminders,
  type Reminder,
  removeReminderById,
} from "./dataManager.js";

const activeTimers = new Map<string, NodeJS.Timeout>();

/**
 * The core function that executes when a timer is up.
 * @param reminder The reminder object.
 * @param client The Discord client instance.
 */
const executeReminder = async (
  reminder: Reminder,
  client: Client,
): Promise<void> => {
  try {
    const channel = await client.channels
      .fetch(reminder.channelId)
      .catch(() => null);

    if (!channel || !channel.isTextBased()) {
      console.warn(
        `Could not find channel ${reminder.channelId} for reminder, or it's not a text channel.`,
      );
      await removeReminderById(reminder.id);
      return;
    }

    const bumpSource = reminder.source;
    const title = `${bumpSource}のバンプタイムです！`;

    const embedMsg = new EmbedBuilder()
      .setColor(Colors.blue)
      .setTitle(title)
      .setDescription(
        `2時間経ちました。もう一度 **${bumpSource}** の \`\`/bump\`\` が出来るようになりました！`,
      )
      .setTimestamp();

    await (channel as TextChannel).send({
      content: `<@&${reminder.roleId}>`,
      embeds: [embedMsg],
    });
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
 * @param reminder The reminder object.
 * @param client The Discord client instance.
 */
const createTimeout = (reminder: Reminder, client: Client): void => {
  if (activeTimers.has(reminder.id)) {
    clearTimeout(activeTimers.get(reminder.id));
  }

  const now = Date.now();
  const delay = reminder.triggerAt - now;

  if (delay <= 0) {
    void executeReminder(reminder, client);
  } else {
    const timeoutId = setTimeout(() => {
      void executeReminder(reminder, client);
    }, delay);
    activeTimers.set(reminder.id, timeoutId);
  }
};

/**
 * Schedules a new reminder, replacing any existing reminder for the same source.
 * @param reminderDetails Details for the new reminder.
 * @param client The Discord client instance.
 */
export const scheduleReminder = async (
  reminderDetails: Omit<Reminder, "id">,
  client: Client,
): Promise<void> => {
  const reminders = getReminders();
  const existingReminder = reminders.find(
    (r) => r.source === reminderDetails.source,
  );

  if (existingReminder) {
    if (activeTimers.has(existingReminder.id)) {
      clearTimeout(activeTimers.get(existingReminder.id));
      activeTimers.delete(existingReminder.id);
    }
    await removeReminderById(existingReminder.id);
  }

  const newReminder: Reminder = {
    id: Date.now().toString(),
    ...reminderDetails,
  };

  await addReminder(newReminder);
  createTimeout(newReminder, client);
};

/**
 * Loads all reminders from the data store on bot startup and schedules them.
 * @param client The Discord client instance.
 */
export const loadAndProcessReminders = async (
  client: Client,
): Promise<void> => {
  const reminders = getReminders();
  if (reminders.length === 0) {
    return;
  }

  for (const reminder of reminders) {
    createTimeout(reminder, client);
  }
};
