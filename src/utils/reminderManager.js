import fs from 'fs/promises';
import path from 'path';
import { EmbedBuilder } from 'discord.js';
import { Colors } from '../constants/Colors.js';

const REMINDERS_FILE = path.join(process.cwd(), 'reminders.json');

const activeTimers = new Map();

/**
 * Reads reminders from the JSON file.
 * @returns {Promise<Array>} An array of reminder objects.
 */
async function getReminders() {
    try {
        await fs.access(REMINDERS_FILE);
        const data = await fs.readFile(REMINDERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist or is empty, return an empty array
        if (error.code === 'ENOENT') {
            return [];
        }
        console.error('Error reading reminders file:', error);
        return [];
    }
}

/**
 * Saves an array of reminders to the JSON file.
 * @param {Array} reminders The array of reminder objects to save.
 */
async function saveReminders(reminders) {
    try {
        await fs.writeFile(REMINDERS_FILE, JSON.stringify(reminders, null, 2));
    } catch (error) {
        console.error('Error saving reminders file:', error);
    }
}

/**
 * Removes a reminder by its ID from the file.
 * @param {string} reminderId The ID of the reminder to remove.
 */
async function removeReminder(reminderId) {
    let reminders = await getReminders();
    reminders = reminders.filter(r => r.id !== reminderId);
    await saveReminders(reminders);

    // Also clear it from active memory
    if (activeTimers.has(reminderId)) {
        clearTimeout(activeTimers.get(reminderId));
        activeTimers.delete(reminderId);
    }
}

/**
 * The core function that executes when a timer is up.
 * @param {object} reminder The reminder object.
 * @param {Client} client The Discord client instance.
 */
async function executeReminder(reminder, client) {
    try {
        const channel = await client.channels.fetch(reminder.channelId).catch(() => null);
        if (!channel) {
            console.warn(`Could not find channel ${reminder.channelId} for reminder.`);
            await removeReminder(reminder.id);
            return;
        }

        const embedMsg = new EmbedBuilder()
            .setColor(Colors.green)
            .setTitle("バンプタイムです！")
            .setDescription("2時間経ちました。もう一度 /bump が出来るようになりました！")
            .setTimestamp();

        await channel.send({ content: `<@&${reminder.roleId}>`, embeds: [embedMsg] });
        console.log(`Sent bump reminder to channel ${reminder.channelId}.`);

    } catch (error) {
        console.error('Failed to execute reminder:', error);
    } finally {
        // Always remove the reminder after attempting to send it.
        await removeReminder(reminder.id);
    }
}

/**
 * Creates an in-memory setTimeout for a given reminder.
 * @param {object} reminder The reminder object.
 * @param {Client} client The Discord client instance.
 */
function createTimeout(reminder, client) {
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
}

/**
 * Schedules a new reminder and saves it to the file.
 * @param {object} reminderDetails Details for the new reminder.
 * @param {Client} client The Discord client instance.
 */
export async function scheduleReminder(reminderDetails, client) {
    const newReminder = {
        id: Date.now().toString(),
        ...reminderDetails
    };

    const reminders = await getReminders();
    reminders.push(newReminder);
    await saveReminders(reminders);

    createTimeout(newReminder, client);
    console.log(`Scheduled new reminder ${newReminder.id} for ${new Date(newReminder.triggerAt).toLocaleTimeString()}`);
}

/**
 * Loads all reminders from the file on bot startup and schedules them.
 * @param {Client} client The Discord client instance.
 */
export async function loadAndProcessReminders(client) {
    console.log("Loading and processing pending reminders...");
    const reminders = await getReminders();
    if (reminders.length === 0) {
        console.log("No pending reminders found.");
        return;
    }
    
    reminders.forEach(reminder => {
        console.log(`Found pending reminder: ${reminder.id}`);
        createTimeout(reminder, client);
    });
}