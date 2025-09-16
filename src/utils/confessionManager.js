import fs from 'fs/promises';
import path from 'path';

const CONFESSIONS_FILE = path.join(process.cwd(), 'confessions_log.json');

/**
 * Reads confession data from the JSON file.
 * Creates the file with default values if it doesn't exist.
 * @returns {Promise<{lastId: number, messageMap: {[key: string]: string}}>}
 */
export async function getConfessionData() {
    try {
        await fs.access(CONFESSIONS_FILE);
        const data = await fs.readFile(CONFESSIONS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // File doesn't exist, create it with initial data
            const initialData = { lastId: 0, messageMap: {} };
            await saveConfessionData(initialData);
            return initialData;
        }
        console.error('Error reading confessions file:', error);
        // Return default data on other errors to prevent crashes
        return { lastId: 0, messageMap: {} };
    }
}

/**
 * Saves the confession data object to the JSON file.
 * @param {object} data The data to save.
 */
async function saveConfessionData(data) {
    try {
        await fs.writeFile(CONFESSIONS_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error saving confessions file:', error);
    }
}

/**
 * Gets the next available ID for a new confession.
 * This function reads, increments, and saves the counter atomically.
 * @returns {Promise<number>} The next confession ID.
 */
export async function getNextConfessionId() {
    const data = await getConfessionData();
    const nextId = data.lastId + 1;
    data.lastId = nextId;
    await saveConfessionData(data);
    return nextId;
}

/**
 * Logs a new confession by mapping its ID to its Discord message ID.
 * @param {number} confessionId The confession's sequential ID.
 * @param {string} messageId The Discord message ID.
 */
export async function logConfession(confessionId, messageId) {
    const data = await getConfessionData();
    data.messageMap[confessionId] = messageId;
    await saveConfessionData(data);
}