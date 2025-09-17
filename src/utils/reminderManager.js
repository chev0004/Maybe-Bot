import { EmbedBuilder } from 'discord.js';
import { Colors } from '../constants/Colors.js';
import { getData, saveData } from './dataManager.js';

const activeTimers = new Map();

/**
 * Reads reminders from the central data cache.
 * @returns {Array} An array of reminder objects.
 */
function getReminders() {
    return getData().reminders || [];
}

/**
 * Saves an array of reminders to the central data cache and file.
 * @param {Array} reminders The array of reminder objects to save.
 */
async function saveReminders(reminders) {
    getData().reminders = reminders;
    await saveData();
}

/**
 * Removes a reminder by its ID.
 * @param {string} reminderId The ID of the reminder to remove.
 */
async function removeReminder(reminderId) {
    let reminders = getReminders();
    reminders = reminders.filter(r => r.id !== reminderId);
    await saveReminders(reminders);

    if (activeTimers.has(reminderId)) {
        clearTimeout(activeTimers.get(reminderId));
        activeTimers.delete(reminderId);
    }
}

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
        await removeReminder(reminder.id);
    }
}

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

export async function scheduleReminder(reminderDetails, client) {
    const newReminder = {
        id: Date.now().toString(),
        ...reminderDetails
    };

    const reminders = getReminders();
    reminders.push(newReminder);
    await saveReminders(reminders);

    createTimeout(newReminder, client);
    console.log(`Scheduled new reminder ${newReminder.id} for ${new Date(newReminder.triggerAt).toLocaleTimeString()}`);
}

export async function loadAndProcessReminders(client) {
    console.log("Loading and processing pending reminders...");
    const reminders = getReminders();
    if (reminders.length === 0) {
        console.log("No pending reminders found.");
        return;
    }
    
    reminders.forEach(reminder => {
        console.log(`Found pending reminder: ${reminder.id}`);
        createTimeout(reminder, client);
    });
}