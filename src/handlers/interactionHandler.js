import { MessageFlags } from "discord.js";
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
      commandFiles = [...commandFiles, ...getFiles(`${dir}/${file.name}`)];
    } else if (file.name.endsWith(".js")) {
      commandFiles.push(`${dir}/${file.name}`);
    }
  }
  return commandFiles;
};

export default class InteractionHandler {
  constructor(client, options = {}) {
    this.client = client;
    this.interactions = new Map();
    this.options = options;
  }

  async loadInteractions() {
    const interactionPaths = [
      path.join(__dirname, "..", "interactions"),
      path.join(__dirname, "..", "menu-commands"),
    ];

    for (const interactionsPath of interactionPaths) {
      if (!fs.existsSync(interactionsPath)) continue;

      const interactionFiles = getFiles(interactionsPath);

      for (const file of interactionFiles) {
        const interactionModule = await import(`file://${file}`);
        const interaction = interactionModule.default;

        const key = interaction.customId || interaction.data?.name;
        if (key && interaction.execute) {
          this.interactions.set(key, interaction);
          console.log(`Loaded interaction: ${key}`);
        } else {
          console.log(
            `[WARNING] Interaction at ${file} is missing a key ('customId' or 'data.name') or 'execute' property.`,
          );
        }
      }
    }
  }

  async handleInteraction(interaction) {
    if (!interaction.isMessageComponent() && !interaction.isModalSubmit())
      return;

    const handler = Array.from(this.interactions.keys()).find((key) =>
      interaction.customId.startsWith(key),
    );

    if (!handler) {
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
          content:
            "このインタラクションの実行中にエラーが発生しました。\nThere was an error while executing this interaction!",
          flags: MessageFlags.Ephemeral,
        });
      } else {
        await interaction.reply({
          content:
            "このインタラクションの実行中にエラーが発生しました。\nThere was an error while executing this interaction!",
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  }
}
