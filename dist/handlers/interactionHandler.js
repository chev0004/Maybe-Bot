import { Collection, MessageFlags, } from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFiles = (dir) => {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    let commandFiles = [];
    for (const file of files) {
        if (file.isDirectory()) {
            commandFiles = [...commandFiles, ...getFiles(path.join(dir, file.name))];
        }
        else if (file.name.endsWith(".js") || file.name.endsWith(".ts")) {
            commandFiles.push(path.join(dir, file.name));
        }
    }
    return commandFiles;
};
export default class InteractionHandler {
    client;
    interactions;
    options;
    constructor(client, options) {
        this.client = client;
        this.interactions = new Collection();
        this.options = options;
    }
    async loadInteractions() {
        const interactionsPath = path.join(__dirname, "..", "interactions");
        if (!fs.existsSync(interactionsPath) ||
            !fs.lstatSync(interactionsPath).isDirectory()) {
            console.warn(`[InteractionHandler] Directory not found: ${interactionsPath}. No interactions will be loaded.`);
            return;
        }
        const interactionFiles = getFiles(interactionsPath);
        for (const file of interactionFiles) {
            try {
                const interactionModule = await import(`file://${file}`);
                const interaction = interactionModule.default;
                if (interaction?.customId) {
                    this.interactions.set(interaction.customId, interaction);
                    console.log(`Loaded interaction: ${interaction.customId}`);
                }
                else {
                    console.warn(`[InteractionHandler] Skipping file (no default export or customId): ${file}`);
                }
            }
            catch (error) {
                console.error(`[InteractionHandler] Failed to load interaction file ${file}:`, error);
            }
        }
    }
    async handleInteraction(interaction) {
        if (!interaction.isMessageComponent() && !interaction.isModalSubmit()) {
            return;
        }
        const handler = this.interactions.find((_, key) => interaction.customId.startsWith(key));
        if (!handler) {
            return;
        }
        try {
            await handler.execute(interaction, this.client, this.options);
        }
        catch (error) {
            console.error(`Error executing interaction for ${interaction.customId}:`, error);
            if (interaction.deferred || interaction.replied) {
                await interaction.followUp({
                    content: "このインタラクションの実行中にエラーが発生しました。\nThere was an error while executing this interaction!",
                    flags: MessageFlags.Ephemeral,
                });
            }
            else {
                await interaction.reply({
                    content: "このインタラクションの実行中にエラーが発生しました。\nThere was an error while executing this interaction!",
                    flags: MessageFlags.Ephemeral,
                });
            }
        }
    }
}
