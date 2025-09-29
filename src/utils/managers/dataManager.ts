import fs from "fs/promises";
import path from "path";

export interface Reminder {
  id: string;
  channelId: string;
  roleId: string;
  triggerAt: number;
  source: string;
}

export interface RestartInfo {
  triggeringUserId: string;
  channelId: string;
  timestamp: number;
}

interface StickyMessage {
  botStickyMessageId: string | null;
}

interface BotData {
  reminders: Reminder[];
  stickyMessage: StickyMessage;
  restartInfo: RestartInfo | null;
}

const BOT_DATA_FILE = path.join(process.cwd(), "bot_data.json");

const defaultData: BotData = {
  reminders: [],
  stickyMessage: {
    botStickyMessageId: null,
  },
  restartInfo: null,
};

let memoryStore: BotData | null = null;

const loadData = async (): Promise<void> => {
  try {
    await fs.access(BOT_DATA_FILE);
    const data = await fs.readFile(BOT_DATA_FILE, "utf8");
    const parsedData = JSON.parse(data) as Partial<BotData>;
    memoryStore = { ...defaultData, ...parsedData };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
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

const saveData = async (): Promise<void> => {
  if (memoryStore === null) {
    console.error("[DataManager] Attempted to save before data was loaded.");
    return;
  }
  try {
    const tempFile = `${BOT_DATA_FILE}.${Date.now()}.tmp`;
    await fs.writeFile(tempFile, JSON.stringify(memoryStore, null, 2));
    await fs.rename(tempFile, BOT_DATA_FILE);
  } catch (error) {
    console.error("[DataManager] Error saving data:", error);
  }
};

(async () => {
  await loadData();
  console.log("[DataManager] Persistent data loaded into memory.");
})();

const ensureStoreLoaded = async (): Promise<BotData> => {
  if (!memoryStore) {
    await loadData();
  }
  if (!memoryStore) {
    throw new Error("DataManager failed to initialize memoryStore.");
  }
  return memoryStore;
};

export const getReminders = (): Reminder[] => {
  return memoryStore?.reminders ?? [];
};

export const addReminder = async (reminder: Reminder): Promise<void> => {
  const store = await ensureStoreLoaded();
  store.reminders.push(reminder);
  await saveData();
};

export const removeReminderById = async (reminderId: string): Promise<void> => {
  const store = await ensureStoreLoaded();
  const initialLength = store.reminders.length;
  store.reminders = store.reminders.filter((r) => r.id !== reminderId);
  if (store.reminders.length < initialLength) {
    await saveData();
  }
};

export const getStickyMessageId = (): string | null => {
  return memoryStore?.stickyMessage?.botStickyMessageId ?? null;
};

export const setStickyMessageId = async (id: string | null): Promise<void> => {
  const store = await ensureStoreLoaded();
  store.stickyMessage.botStickyMessageId = id;
  await saveData();
};

export const getRestartInfo = (): RestartInfo | null => {
  return memoryStore?.restartInfo ?? null;
};

export const setRestartInfo = async (info: RestartInfo): Promise<void> => {
  const store = await ensureStoreLoaded();
  store.restartInfo = info;
  await saveData();
};

export const clearRestartInfo = async (): Promise<void> => {
  const store = await ensureStoreLoaded();
  store.restartInfo = null;
  await saveData();
};
