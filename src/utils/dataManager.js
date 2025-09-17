import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'bot_data.json');

// Default structure for the data file
const defaultData = {
  reminders: [],
  welcome: {
    botStickyMessageId: null,
  },
  restartInfo: null,
};

let dataCache = null;

export async function loadData() {
  try {
    const fileContent = await fs.readFile(DATA_FILE, 'utf8');
    const loadedData = JSON.parse(fileContent);
    dataCache = { ...defaultData, ...loadedData };
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('[DataManager] bot_data.json not found. Creating a new one.');
      dataCache = defaultData;
      await saveData();
    } else {
      console.error('[DataManager] Error loading data:', error);
      dataCache = defaultData;
    }
  }
}

export async function saveData() {
  if (!dataCache) return;
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(dataCache, null, 2));
  } catch (error) {
    console.error('[DataManager] Error saving data:', error);
  }
}

export function getData() {
  if (!dataCache) {
    console.warn('[DataManager] Data accessed before being loaded.');
    return defaultData;
  }
  return dataCache;
}