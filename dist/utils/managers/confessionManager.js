import { eq, sql } from "drizzle-orm";
import { db } from "../../db/index.js";
import { confessions } from "../../db/schema.js";
/**
 * Gets the next available ID for a new confession by finding the max ID in the table.
 * @returns {Promise<number>} The next confession ID.
 */
export const getNextConfessionId = async () => {
    const result = await db
        .select({ maxId: sql `max(${confessions.id})` })
        .from(confessions);
    const maxId = result[0]?.maxId ?? 0;
    return maxId + 1;
};
/**
 * Retrieves the message ID for a given confession ID from the database.
 * @param {number} confessionId The confession's sequential ID.
 * @returns {Promise<string | undefined>} The Discord message ID, or undefined if not found.
 */
export const getConfessionMessageId = async (confessionId) => {
    const result = await db
        .select({ messageId: confessions.messageId })
        .from(confessions)
        .where(eq(confessions.id, confessionId));
    return result[0]?.messageId;
};
/**
 * Logs a new confession by inserting its ID and Discord message ID into the database.
 * @param {number} confessionId The confession's sequential ID.
 * @param {string} messageId The Discord message ID.
 */
export const logConfession = async (confessionId, messageId) => {
    try {
        await db.insert(confessions).values({ id: confessionId, messageId });
    }
    catch (error) {
        console.error("Error logging confession to database:", error);
    }
};
