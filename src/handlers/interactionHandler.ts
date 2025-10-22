import {
  type Client,
  Collection,
  type Interaction,
  type MessageComponentInteraction,
  MessageFlags,
  type ModalSubmitInteraction,
} from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import type { HandlerOptions } from "./commandHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface InteractionModule {
  customId: string;
  execute: (
    interaction: MessageComponentInteraction | ModalSubmitInteraction,
    client: Client,
    options: HandlerOptions,
  ) => Promise<void>;
}

const getFiles = (dir: string): string[] => {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let commandFiles: string[] = [];
  for (const file of files) {
    if (file.isDirectory()) {
      commandFiles = [...commandFiles, ...getFiles(path.join(dir, file.name))];
    } else if (file.name.endsWith(".js") || file.name.endsWith(".ts")) {
      commandFiles.push(path.join(dir, file.name));
    }
  }
  return commandFiles;
};

export default class InteractionHandler {
  public client: Client;
  public interactions: Collection<string, InteractionModule>;
  public options: HandlerOptions;

  constructor(client: Client, options: HandlerOptions) {
    this.client = client;
    this.interactions = new Collection();
    this.options = options;
  }

  public async loadInteractions(): Promise<void> {
    const interactionsPath = path.join(__dirname, "..", "interactions");

    if (
      !fs.existsSync(interactionsPath) ||
      !fs.lstatSync(interactionsPath).isDirectory()
    ) {
      console.warn(
        `[InteractionHandler] Directory not found: ${interactionsPath}. No interactions will be loaded.`,
      );
      return;
    }

    const interactionFiles = getFiles(interactionsPath);

    for (const file of interactionFiles) {
      try {
        const interactionModule = await import(`file://${file}`);
        const interaction: InteractionModule = interactionModule.default;

        if (interaction?.customId) {
          this.interactions.set(interaction.customId, interaction);
          console.log(`Loaded interaction: ${interaction.customId}`);
        } else {
          console.warn(
            `[InteractionHandler] Skipping file (no default export or customId): ${file}`,
          );
        }
      } catch (error) {
        console.error(
          `[InteractionHandler] Failed to load interaction file ${file}:`,
          error,
        );
      }
    }
  }

  public async handleInteraction(interaction: Interaction): Promise<void> {
    if (!interaction.isMessageComponent() && !interaction.isModalSubmit()) {
      return;
    }

    const handler = this.interactions.find((_, key) =>
      interaction.customId.startsWith(key),
    );

    if (!handler) {
      return;
    }

    try {
      await handler.execute(interaction, this.client, this.options);
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
