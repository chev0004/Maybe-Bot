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

/**
 * Loads data from the JSON file into the in-memory cache.
 * Creates the file with a default structure if it doesn't exist.
 */
export async function loadData() {
  try {
    const fileContent = await fs.readFile(DATA_FILE, 'utf8');
    const loadedData = JSON.parse(fileContent);
    
    dataCache = createDefaultData();
    if (loadedData.reminders) dataCache.reminders = loadedData.reminders;
    if (loadedData.welcome) dataCache.welcome = loadedData.welcome;
    if (loadedData.restartInfo) dataCache.restartInfo = loadedData.restartInfo;

  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('[DataManager] bot_data.json not found. Creating a new one.');
      dataCache = createDefaultData();
      await saveData();
    } else {
      console.error('[DataManager] Error loading data from bot_data.json. The file might be corrupt or was being written to. Using default data for this session ONLY to prevent data loss.', error);
      dataCache = createDefaultData();
    }
  }
}

/**
 * Saves the current in-memory cache to the JSON file.
 */
export async function saveData() {
  if (dataCache === null) {
    console.error('[DataManager] Attempted to save before data was loaded.');
    return;
  }
  try {
    // Write to a temporary file first, then rename. This makes the write atomic.
    const tempFile = DATA_FILE + '.tmp';
    await fs.writeFile(tempFile, JSON.stringify(dataCache, null, 2));
    await fs.rename(tempFile, DATA_FILE);
  } catch (error) {
    console.error('[DataManager] Error saving data:', error);
  }
}

/**
 * Returns the current data cache.
 * @returns {object} The cached data.
 */
export function getData() {
  if (dataCache === null) {
    console.warn('[DataManager] Data was accessed before being loaded. Returning a temporary default object.');
    return createDefaultData();
  }
  return dataCache;
}