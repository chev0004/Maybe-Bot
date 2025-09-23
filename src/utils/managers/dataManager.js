import fs from "fs/promises";
import path from "path";

const BOT_DATA_FILE = path.join(process.cwd(), "bot_data.json");

const defaultData = {
  reminders: [],
  stickyMessage: {
    botStickyMessageId: null,
  },
  restartInfo: null,
};

let memoryStore = null;

const loadData = async () => {
  try {
    await fs.access(BOT_DATA_FILE);
    const data = await fs.readFile(BOT_DATA_FILE, "utf8");
    const parsedData = JSON.parse(data);

    memoryStore = { ...defaultData, ...parsedData };
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(
        "[DataManager] bot_data.json not found. Creating with default data.",
      );
      memoryStore = { ...defaultData };
      await saveData();
    } else {
      console.error("[DataManager] Error loading data file:", error);
      memoryStore = { ...defaultData };
    }
  }
};

const saveData = async () => {
  if (memoryStore === null) {
    console.error("[DataManager] Attempted to save before data was loaded.");
    return;
  }
  try {
    // Atomic write: write to a temp file then rename
    const tempFile = `${BOT_DATA_FILE}.${Date.now()}.tmp`;
    await fs.writeFile(tempFile, JSON.stringify(memoryStore, null, 2));
    await fs.rename(tempFile, BOT_DATA_FILE);
  } catch (error) {
    console.error("[DataManager] Error saving data:", error);
  }
};

// Initialize and load data
(async () => {
  await loadData();
  console.log("[DataManager] Persistent data loaded into memory.");
})();

// Reminder Functions
export const getReminders = async () => {
  return memoryStore.reminders;
};

export const addReminder = async (reminder) => {
  memoryStore.reminders.push(reminder);
  await saveData();
};

export const removeReminderById = async (reminderId) => {
  const initialLength = memoryStore.reminders.length;
  memoryStore.reminders = memoryStore.reminders.filter(
    (r) => r.id !== reminderId,
  );
  if (memoryStore.reminders.length < initialLength) {
    await saveData();
  }
};

// Sticky Message Functions
export const getStickyMessageId = () => {
  return memoryStore.stickyMessage.botStickyMessageId;
};

export const setStickyMessageId = async (id) => {
  memoryStore.stickyMessage.botStickyMessageId = id;
  await saveData();
};

// Restart Info Functions
export const getRestartInfo = () => {
  return memoryStore.restartInfo;
};

export const setRestartInfo = async (info) => {
  memoryStore.restartInfo = info;
  await saveData();
};

export const clearRestartInfo = async () => {
  memoryStore.restartInfo = null;
  await saveData();
};
