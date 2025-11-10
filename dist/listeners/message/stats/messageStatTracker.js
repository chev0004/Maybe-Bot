import { sql } from "drizzle-orm";
import { config } from "../../../config/env.js";
import { db } from "../../../db/index.js";
import { channels, dailyChannelStats, dailyUserStats, hourlyActivity, hourlyUserActivity, users, } from "../../../db/schema.js";
import { createListener } from "../../../utils/builders/listenerBuilder.js";
export default createListener("messageStatTracker", "messageCreate", async (message) => {
    if (!message.inGuild())
        return;
    if (message.guild.id === config.ids.testGuild) {
        return;
    }
    const userId = message.author.id;
    const username = message.author.username;
    const channelId = message.channel.id;
    const channelName = message.channel.name;
    const today = new Date().toISOString().slice(0, 10);
    const hour = message.createdAt.getUTCHours();
    try {
        await db
            .insert(users)
            .values({ id: userId, username })
            .onConflictDoUpdate({ target: users.id, set: { username } });
        await db
            .insert(channels)
            .values({ id: channelId, name: channelName, type: "text" })
            .onConflictDoUpdate({
            target: channels.id,
            set: { name: channelName, type: "text" },
        });
        await db
            .insert(dailyUserStats)
            .values({ userId, date: today, messages: 1 })
            .onConflictDoUpdate({
            target: [dailyUserStats.userId, dailyUserStats.date],
            set: {
                messages: sql `${dailyUserStats.messages} + 1`,
            },
        });
        await db
            .insert(dailyChannelStats)
            .values({ channelId, date: today, messages: 1 })
            .onConflictDoUpdate({
            target: [dailyChannelStats.channelId, dailyChannelStats.date],
            set: {
                messages: sql `${dailyChannelStats.messages} + 1`,
            },
        });
        await db
            .insert(hourlyActivity)
            .values({ date: today, hour, messages: 1 })
            .onConflictDoUpdate({
            target: [hourlyActivity.date, hourlyActivity.hour],
            set: {
                messages: sql `${hourlyActivity.messages} + 1`,
            },
        });
        await db
            .insert(hourlyUserActivity)
            .values({ date: today, hour, userId })
            .onConflictDoNothing();
    }
    catch (error) {
        console.error("Error logging message stats:", error);
    }
}, {
    ignoreChannels: [config.channels.introduction],
});
