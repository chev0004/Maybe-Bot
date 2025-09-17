import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'bot_data.json');

const createDefaultData = () => ({
  reminders: [],
  welcome: {
    botStickyMessageId: null,
  },
  restartInfo: null,
});

let dataCache = null;
let isReadOnly = false;

/**
 * Loads data from the JSON file into memory.
 * If the file is missing, it creates one.
 * If the file is corrupt or unreadable, it enters a read-only mode for the session to prevent data loss.
 */
export async function loadData() {
  try {
    const fileContent = await fs.readFile(DATA_FILE, 'utf8');
    const loadedData = JSON.parse(fileContent);

    dataCache = { ...createDefaultData(), ...loadedData };

  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('[DataManager] bot_data.json not found. Creating a new one.');
      dataCache = createDefaultData();
      await saveData();
    } else {
      isReadOnly = true;
      console.error(
        '[DataManager] CRITICAL: Could not read or parse bot_data.json. The file may be corrupt or was locked.',
        'To prevent data loss, the bot will run in a temporary read-only state for this session.',
        'No data will be saved until the bot is restarted cleanly.',
        error
      );
      dataCache = createDefaultData();
    }
  }
}

/**
 * Saves the current in-memory data to the JSON file.
 * Will refuse to save if the bot is in read-only mode.
 */
export async function saveData() {
  if (isReadOnly) {
    console.warn('[DataManager] Save prevented: The bot is in a read-only data state due to a startup error.');
    return;
  }
  
  if (dataCache === null) {
    console.error('[DataManager] Attempted to save before data was loaded.');
    return;
  }

  try {
    const tempFile = DATA_FILE + '.tmp';
    await fs.writeFile(tempFile, JSON.stringify(dataCache, null, 2), 'utf8');
    await fs.rename(tempFile, DATA_FILE);
  } catch (error) {
    console.error('[DataManager] Error during atomic save operation:', error);
  }
}

/**
 * Returns the current data from memory.
 * @returns {object} The cached data object.
 */
export function getData() {
  if (dataCache === null) {
    console.warn('[DataManager] Data was accessed before being loaded. This should not happen on startup.');
    return createDefaultData();
  }
  return dataCache;
}