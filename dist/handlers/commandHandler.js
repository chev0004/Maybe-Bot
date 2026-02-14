import { Collection, MessageFlags, PermissionsBitField, REST, Routes, } from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "../config/env.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFiles = (dir) => {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    let commandFiles = [];
    for (const file of files) {
        if (file.isDirectory()) {
            commandFiles = [...commandFiles, ...getFiles(path.join(dir, file.name))];
        }
        else if (file.name === "index.js" || file.name === "index.ts") {
            commandFiles.push(path.join(dir, file.name));
        }
    }
    return commandFiles;
};
export default class CommandHandler {
    client;
    commands;
    commandsArray;
    options;
    constructor(client, options) {
        this.client = client;
        this.commands = new Collection();
        this.commandsArray = [];
        this.options = options;
    }
    async loadCommands() {
        try {
            const commandsPath = path.join(__dirname, "..", "commands");
            const commandTypes = fs.readdirSync(commandsPath);
            for (const type of commandTypes) {
                const typePath = path.join(commandsPath, type);
                if (fs.statSync(typePath).isDirectory()) {
                    const commandFiles = getFiles(typePath);
                    for (const file of commandFiles) {
                        try {
                            const commandModule = await import(`file://${file}`);
                            if (!commandModule.default?.data) {
                                console.warn(`[WARNING] File ${file} seems to be an index file but lacks a proper default export with a 'data' property. Skipping.`);
                                continue;
                            }
                            const command = commandModule.default;
                            this.commands.set(command.data.name, command);
                            this.commandsArray.push(command.data.toJSON());
                            const commandType = type.charAt(0).toUpperCase() + type.slice(1);
                            console.log(`Loaded [${commandType}] command: ${command.data.name}`);
                        }
                        catch (importError) {
                            console.error(`Error importing command file ${file}:`, importError);
                        }
                    }
                }
            }
        }
        catch (error) {
            console.error("Error loading commands:", error);
        }
    }
    async registerCommands() {
        try {
            const { CLIENT_ID, GUILD_ID, TEST_GUILD_ID, TOKEN } = process.env;
            if (!CLIENT_ID || !GUILD_ID || !TOKEN) {
                console.error("Missing CLIENT_ID, GUILD_ID, or TOKEN for command registration.");
                return;
            }
            const guildIds = [GUILD_ID];
            if (TEST_GUILD_ID && TEST_GUILD_ID !== GUILD_ID) {
                guildIds.push(TEST_GUILD_ID);
            }
            console.log("Refreshing application (/) commands.");
            const rest = new REST({ version: "10" }).setToken(TOKEN);
            for (const guildId of guildIds) {
                await rest.put(Routes.applicationGuildCommands(CLIENT_ID, guildId), {
                    body: this.commandsArray,
                });
            }
            console.log("Successfully reloaded application (/) commands.");
        }
        catch (error) {
            console.error("!!! FAILED to register commands:", error);
            if (error && typeof error === "object" && "rawError" in error) {
                console.error("Discord API Raw Error:", JSON.stringify(error.rawError, null, 2));
            }
        }
    }
    handleInteraction(interaction) {
        const command = this.commands.get(interaction.commandName);
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
        try {
            if (command.ownerOnly && interaction.user.id !== config.ids.owner) {
                interaction.reply({
                    content: "このコマンドを使用する権限がありません。\nYou are not authorized to use this command.",
                    flags: MessageFlags.Ephemeral,
                });
                return;
            }
            if (command.adminOnly &&
                interaction.inGuild() &&
                !(interaction.member?.permissions instanceof PermissionsBitField &&
                    interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))) {
                interaction.reply({
                    content: "このコマンドは管理者のみが使用できます。\nOnly administrators can use this command.",
                    flags: MessageFlags.Ephemeral,
                });
                return;
            }
            if (command.allowedChannels?.length &&
                interaction.inGuild() &&
                interaction.channelId) {
                const requiredChannelIds = command.allowedChannels
                    .map((key) => config.channels[key])
                    .filter(Boolean);
                if (!requiredChannelIds.includes(interaction.channelId)) {
                    const allowedChannelsMentions = requiredChannelIds
                        .map((id) => `<#${id}>`)
                        .join("、");
                    interaction.reply({
                        content: `このコマンドはこのチャンネルでは使用できません。${allowedChannelsMentions} で使用してください。`,
                        flags: MessageFlags.Ephemeral,
                    });
                    return;
                }
            }
            if (command.requiredPermissions?.length &&
                interaction.inGuild() &&
                interaction.member?.permissions instanceof PermissionsBitField) {
                const missingPerms = interaction.member.permissions.missing(command.requiredPermissions);
                if (missingPerms.length > 0) {
                    interaction.reply({
                        content: `このコマンドを使用するには、次の権限が必要です: ${missingPerms.join(", ")}\nYou are missing the following permissions to use this command: ${missingPerms.join(", ")}`,
                        flags: MessageFlags.Ephemeral,
                    });
                    return;
                }
            }
            command.execute(interaction, this.client, this.options);
        }
        catch (error) {
            console.error(`Error executing ${interaction.commandName}:`, error);
            if (interaction.replied || interaction.deferred) {
                interaction.followUp({
                    content: "There was an error while executing this command!",
                    flags: MessageFlags.Ephemeral,
                });
            }
            else {
                interaction.reply({
                    content: "There was an error while executing this command!",
                    flags: MessageFlags.Ephemeral,
                });
            }
        }
    }
}
