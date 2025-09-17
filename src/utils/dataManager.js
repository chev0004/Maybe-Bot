import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'bot_data.json');
const BACKUP_FILE = path.join(process.cwd(), 'bot_data.json.bak');

const createDefaultData = () => ({
  reminders: [],
  welcome: {
    botStickyMessageId: null,
  },
  restartInfo: null,
});

let dataCache = null;

/**
 * Loads data from the JSON file into memory.
 * - Tries to read the main DATA_FILE first.
 * - If that fails (e.g., corruption), it tries to load from the BACKUP_FILE.
 * - If both fail, it creates a new file with default data as a last resort.
 */
export async function loadData() {
  try {
    const fileContent = await fs.readFile(DATA_FILE, 'utf8');
    const loadedData = JSON.parse(fileContent);
    dataCache = { ...createDefaultData(), ...loadedData };
    console.log('[DataManager] Successfully loaded data from bot_data.json.');

  } catch (error) {
    console.warn(`[DataManager] Could not load main data file: ${error.message}. Attempting to load from backup...`);

    try {
      const backupContent = await fs.readFile(BACKUP_FILE, 'utf8');
      const backupData = JSON.parse(backupContent);
      dataCache = { ...createDefaultData(), ...backupData };
      console.log('[DataManager] Successfully loaded data from backup file bot_data.json.bak.');

    } catch (backupError) {
      console.error(`[DataManager] CRITICAL: Could not load backup file either: ${backupError.message}.`);
      console.error('[DataManager] Starting with a fresh, empty data set.');
      dataCache = createDefaultData();
      await saveData();
    }
  }
}

/**
 * Saves the current in-memory data to the JSON file atomically and with a backup.
 */
export async function saveData() {
  if (dataCache === null) {
    console.error('[DataManager] Attempted to save before data was loaded.');
    return;
  }

  const tempFile = DATA_FILE + '.tmp';

  try {
    await fs.writeFile(tempFile, JSON.stringify(dataCache, null, 2), 'utf8');

    try {
      await fs.access(DATA_FILE);
      await fs.rename(DATA_FILE, BACKUP_FILE);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }

    await fs.rename(tempFile, DATA_FILE);

  } catch (error) {
    console.error('[DataManager] Error during atomic save operation:', error);
    try {
      await fs.unlink(tempFile);
    } catch (cleanupError) {
    }
  }
}

/**
 * Returns the current data from memory.
 * @returns {object} The cached data object.
 */
export function getData() {
  if (dataCache === null) {
    console.warn('[DataManager] Data was accessed before being loaded. Initializing with default data.');
    dataCache = createDefaultData();
  }
  return dataCache;
}