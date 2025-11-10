import "dotenv/config";
import { ChannelType, Client, EmbedBuilder, GatewayIntentBits, } from "discord.js";
import { eq, isNull } from "drizzle-orm";
import { Client as ExarotonClient } from "exaroton";
import { config } from "./config/env.js";
import { Colors } from "./constants/Colors.js";
import { db } from "./db/index.js";
import { activeVcSessions, voiceSessions } from "./db/schema.js";
import CommandHandler from "./handlers/commandHandler.js";
import InteractionHandler from "./handlers/interactionHandler.js";
import ListenerHandler from "./handlers/listenerHandler.js";
import { clearRestartInfo, getRestartInfo, } from "./utils/managers/dataManager.js";
import { loadAndProcessReminders } from "./utils/managers/reminderManager.js";
import { populateInitialStats } from "./utils/services/statsPopulationService.js";
const DISCORD_TOKEN = config.tokens.discord;
const EXAROTON_API_TOKEN = config.tokens.exaroton;
const SERVER_ID = config.ids.server;
const discordClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers,
    ],
});
const exarotonClient = new ExarotonClient(EXAROTON_API_TOKEN);
const sharedOptions = {
    exarotonClient,
    SERVER_ID,
    DISCORD_TOKEN,
};
const commandHandler = new CommandHandler(discordClient, sharedOptions);
const listenerHandler = new ListenerHandler(discordClient, sharedOptions);
const interactionHandler = new InteractionHandler(discordClient, sharedOptions);
(async () => {
    await commandHandler.loadCommands();
    await commandHandler.registerCommands();
    await listenerHandler.loadListeners();
    await interactionHandler.loadInteractions();
})();
discordClient.once("clientReady", async (client) => {
    console.log(`Logged in as ${client.user.tag}! Bot is ready.`);
    await loadAndProcessReminders(client);
    try {
        const guild = await client.guilds.fetch(config.ids.guild);
        if (guild) {
            await populateInitialStats(guild);
        }
        else {
            console.error("[Startup] Could not find the specified guild to populate stats.");
        }
    }
    catch (error) {
        console.error("[Startup] Failed to populate initial stats:", error);
    }
    try {
        console.log("[VC Recovery] Closing orphaned voice sessions from previous run...");
        const now = new Date();
        const openSessions = await db.query.voiceSessions.findMany({
            where: isNull(voiceSessions.endTime),
        });
        if (openSessions.length > 0) {
            for (const session of openSessions) {
                const durationSeconds = Math.floor((now.getTime() - session.startTime.getTime()) / 1000);
                await db
                    .update(voiceSessions)
                    .set({
                    endTime: now,
                    durationSeconds,
                    totalUniqueParticipants: null,
                })
                    .where(eq(voiceSessions.id, session.id));
            }
            console.log(`[VC Recovery] Closed ${openSessions.length} orphaned sessions.`);
        }
        else {
            console.log("[VC Recovery] No orphaned sessions found.");
        }
        console.log("[VC Recovery] Reconciling active voice sessions...");
        await db.delete(activeVcSessions);
        const guild = await client.guilds.fetch(config.ids.guild);
        const voiceStates = guild.voiceStates.cache;
        if (voiceStates.size > 0) {
            const activeSessions = [];
            for (const vs of voiceStates.values()) {
                if (vs.channelId) {
                    activeSessions.push({
                        userId: vs.id,
                        channelId: vs.channelId,
                        joinTime: now,
                        isStreaming: vs.streaming ?? false,
                        streamStartTime: vs.streaming ? now : null,
                    });
                }
            }
            if (activeSessions.length > 0) {
                await db.insert(activeVcSessions).values(activeSessions);
                console.log(`[VC Recovery] Re-established ${activeSessions.length} active voice sessions.`);
            }
            else {
                console.log("[VC Recovery] No active voice sessions found on startup.");
            }
        }
        else {
            console.log("[VC Recovery] No active voice sessions found on startup.");
        }
    }
    catch (error) {
        console.error("[VC Recovery] Failed to reconcile voice sessions:", error);
    }
    const restartInfo = getRestartInfo();
    if (restartInfo?.triggeringUserId && restartInfo.channelId) {
        const channel = await client.channels
            .fetch(restartInfo.channelId)
            .catch((err) => {
            console.error(`Failed to fetch channel ${restartInfo.channelId} for restart notification:`, err);
            return null;
        });
        if (channel?.type === ChannelType.GuildText) {
            try {
                const restartEmbed = new EmbedBuilder()
                    .setColor(Colors.green)
                    .setTitle("BOTオンライン")
                    .setDescription("BOTが通常に更新されて再起動されました。")
                    .setTimestamp()
                    .setFooter({ text: "よかったね" });
                await channel.send({
                    content: `<@${restartInfo.triggeringUserId}>`,
                    embeds: [restartEmbed],
                });
            }
            catch (sendError) {
                console.error(`Failed to send restart notification embed to channel ${restartInfo.channelId}:`, sendError);
            }
        }
        else {
            console.warn(`Could not find channel ${restartInfo.channelId} or it's not a text channel to send restart notification.`);
        }
        await clearRestartInfo();
    }
});
discordClient.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
        commandHandler.handleInteraction(interaction);
    }
    else if (interaction.isMessageComponent() || interaction.isModalSubmit()) {
        interactionHandler.handleInteraction(interaction);
    }
});
discordClient.login(DISCORD_TOKEN);
