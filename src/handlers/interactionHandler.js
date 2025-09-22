import { MessageFlags } from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class InteractionHandler {
  constructor(client, options = {}) {
    this.client = client;
    this.interactions = new Map();
    this.options = options;
  }

  async loadInteractions() {
    const interactionsPath = path.join(__dirname, "..", "interactions");
    if (!fs.existsSync(interactionsPath)) return;

    const interactionFolders = fs.readdirSync(interactionsPath);

    for (const folder of interactionFolders) {
      const folderPath = path.join(interactionsPath, folder);
      if (!fs.statSync(folderPath).isDirectory()) continue;

      const interactionFiles = fs
        .readdirSync(folderPath)
        .filter((file) => file.endsWith(".js"));

      for (const file of interactionFiles) {
        const filePath = path.join(folderPath, file);
        const interactionModule = await import(`file://${filePath}`);
        const interaction = interactionModule.default;

        if (interaction.customId && interaction.execute) {
          this.interactions.set(interaction.customId, interaction);
          console.log(`Loaded interaction: ${folder}/${interaction.customId}`);
        } else {
          console.log(
            `[WARNING] Interaction at ${filePath} is missing 'customId' or 'execute' property.`,
          );
        }
      }
    }
  }

  async handleInteraction(interaction) {
    if (!interaction.isMessageComponent() && !interaction.isModalSubmit())
      return;

    // Find a handler that matches the start of the interaction's customId
    const handler = Array.from(this.interactions.keys()).find((key) =>
      interaction.customId.startsWith(key),
    );

    if (!handler) {
      console.warn(`No handler found for customId: ${interaction.customId}`);
      return;
    }

    const interactionExecutor = this.interactions.get(handler);

    try {
      await interactionExecutor.execute(interaction, this.client, this.options);
    } catch (error) {
      console.error(
        `Error executing interaction for ${interaction.customId}:`,
        error,
      );
      if (interaction.deferred || interaction.replied) {
        await interaction.followUp({
          content: "There was an error while executing this interaction!",
          flags: MessageFlags.Ephemeral,
        });
      } else {
        await interaction.reply({
          content: "There was an error while executing this interaction!",
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  }
}
