import {
  type Client,
  Collection,
  type CommandInteraction,
  type ContextMenuCommandBuilder,
  type ContextMenuCommandInteraction,
  MessageFlags,
  type PermissionResolvable,
  REST,
  type RESTPostAPIApplicationCommandsJSONBody,
  Routes,
  type SlashCommandBuilder,
} from "discord.js";
import type { Client as ExarotonClient } from "exaroton";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface Command {
  data:
    | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
    | ContextMenuCommandBuilder;
  execute: (
    interaction: CommandInteraction | ContextMenuCommandInteraction,
    client: Client,
    options: HandlerOptions,
  ) => Promise<void>;
  ownerOnly?: boolean;
  adminOnly?: boolean;
  guildOnly?: boolean;
  allowedChannels?: string[];
  requiredPermissions?: PermissionResolvable[];
}

export interface HandlerOptions {
  exarotonClient: ExarotonClient;
  SERVER_ID: string;
  DISCORD_TOKEN: string;
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

export default class CommandHandler {
  public client: Client;
  public commands: Collection<string, Command>;
  public commandsArray: RESTPostAPIApplicationCommandsJSONBody[];
  public options: HandlerOptions;

  constructor(client: Client, options: HandlerOptions) {
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
            const commandModule = await import(`file://${file}`);
            const command: Command = commandModule.default;

            this.commands.set(command.data.name, command);
            this.commandsArray.push(command.data.toJSON());
            const commandType = type.charAt(0).toUpperCase() + type.slice(1);
            console.log(
              `Loaded [${commandType}] command: ${command.data.name}`,
            );
          }
        }
      }
    } catch (error) {
      console.error("Error loading commands:", error);
    }
  }

  async registerCommands() {
    try {
      const { CLIENT_ID, GUILD_ID, TOKEN } = process.env;

      if (!CLIENT_ID || !GUILD_ID || !TOKEN) {
        console.error(
          "Missing CLIENT_ID, GUILD_ID, or TOKEN for command registration.",
        );
        return;
      }

      console.log("Refreshing application (/) commands.");
      const rest = new REST({ version: "10" }).setToken(TOKEN);

      await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
        body: this.commandsArray,
      });

      console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
      console.error("Error registering commands:", error);
    }
  }

  handleInteraction(
    interaction: CommandInteraction | ContextMenuCommandInteraction,
  ) {
    const command = this.commands.get(interaction.commandName);
    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`,
      );
      return;
    }

    try {
      command.execute(interaction, this.client, this.options);
    } catch (error) {
      console.error(`Error executing ${interaction.commandName}:`, error);
      if (interaction.replied || interaction.deferred) {
        interaction.followUp({
          content: "There was an error while executing this command!",
          flags: MessageFlags.Ephemeral,
        });
      } else {
        interaction.reply({
          content: "There was an error while executing this command!",
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  }
}
