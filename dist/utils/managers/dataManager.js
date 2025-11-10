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
    }
    catch (error) {
        if (error.code === "ENOENT") {
            memoryStore = { ...defaultData };
            await saveData();
        }
        else {
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
        const tempFile = `${BOT_DATA_FILE}.${Date.now()}.tmp`;
        await fs.writeFile(tempFile, JSON.stringify(memoryStore, null, 2));
        await fs.rename(tempFile, BOT_DATA_FILE);
    }
    catch (error) {
        console.error("[DataManager] Error saving data:", error);
    }
};
(async () => {
    await loadData();
})();
const ensureStoreLoaded = async () => {
    if (!memoryStore) {
        await loadData();
    }
    if (!memoryStore) {
        throw new Error("DataManager failed to initialize memoryStore.");
    }
    return memoryStore;
};
export const getReminders = () => {
    return memoryStore?.reminders ?? [];
};
export const addReminder = async (reminder) => {
    const store = await ensureStoreLoaded();
    store.reminders.push(reminder);
    await saveData();
};
export const removeReminderById = async (reminderId) => {
    const store = await ensureStoreLoaded();
    const initialLength = store.reminders.length;
    store.reminders = store.reminders.filter((r) => r.id !== reminderId);
    if (store.reminders.length < initialLength) {
        await saveData();
    }
};
export const getStickyMessageId = () => {
    return memoryStore?.stickyMessage?.botStickyMessageId ?? null;
};
export const setStickyMessageId = async (id) => {
    const store = await ensureStoreLoaded();
    store.stickyMessage.botStickyMessageId = id;
    await saveData();
};
export const getRestartInfo = () => {
    return memoryStore?.restartInfo ?? null;
};
export const setRestartInfo = async (info) => {
    const store = await ensureStoreLoaded();
    store.restartInfo = info;
    await saveData();
};
export const clearRestartInfo = async () => {
    const store = await ensureStoreLoaded();
    store.restartInfo = null;
    await saveData();
};
