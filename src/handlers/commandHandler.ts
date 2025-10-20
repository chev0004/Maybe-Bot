import {
  type Client,
  Collection,
  type CommandInteraction,
  type ContextMenuCommandBuilder,
  type ContextMenuCommandInteraction,
  MessageFlags,
  type PermissionResolvable,
  PermissionsBitField,
  REST,
  type RESTPostAPIApplicationCommandsJSONBody,
  Routes,
  type SlashCommandBuilder,
} from "discord.js";
import type { Client as ExarotonClient } from "exaroton";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "../config/env.js";

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
    } else if (file.name === "index.js" || file.name === "index.ts") {
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
            try {
              const commandModule = await import(`file://${file}`);
              if (!commandModule.default?.data) {
                console.warn(
                  `[WARNING] File ${file} seems to be an index file but lacks a proper default export with a 'data' property. Skipping.`,
                );
                continue;
              }
              const command: Command = commandModule.default;

              this.commands.set(command.data.name, command);
              this.commandsArray.push(command.data.toJSON());
              const commandType = type.charAt(0).toUpperCase() + type.slice(1);
              console.log(
                `Loaded [${commandType}] command: ${command.data.name}`,
              );
            } catch (importError) {
              console.error(
                `Error importing command file ${file}:`,
                importError,
              );
            }
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
      console.log("Attempting to register the following commands JSON:");
      console.log(
        JSON.stringify(
          this.commandsArray,
          (_key, value) =>
            typeof value === "bigint" ? value.toString() : value,
          2,
        ),
      );
      const topCommandData = this.commandsArray.find(
        (cmd) => cmd.name === "top",
      );
      console.log(
        "/top command data being sent:",
        JSON.stringify(topCommandData, null, 2),
      );

      await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
        body: this.commandsArray,
      });

      console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
      console.error("!!! FAILED to register commands:", error);
      if (error && typeof error === "object" && "rawError" in error) {
        console.error(
          "Discord API Raw Error:",
          JSON.stringify((error as { rawError: unknown }).rawError, null, 2),
        );
      }
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
      if (command.ownerOnly && interaction.user.id !== config.ids.owner) {
        interaction.reply({
          content:
            "このコマンドを使用する権限がありません。\nYou are not authorized to use this command.",
          flags: MessageFlags.Ephemeral,
        });
        return;
      }

      if (
        command.adminOnly &&
        interaction.inGuild() &&
        !(
          interaction.member?.permissions instanceof PermissionsBitField &&
          interaction.member.permissions.has(
            PermissionsBitField.Flags.Administrator,
          )
        )
      ) {
        interaction.reply({
          content:
            "このコマンドは管理者のみが使用できます。\nOnly administrators can use this command.",
          flags: MessageFlags.Ephemeral,
        });
        return;
      }

      if (
        command.allowedChannels?.length &&
        interaction.inGuild() &&
        interaction.channelId
      ) {
        const requiredChannelIds = command.allowedChannels
          .map((key) => config.channels[key as keyof typeof config.channels])
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
      if (
        command.requiredPermissions?.length &&
        interaction.inGuild() &&
        interaction.member?.permissions instanceof PermissionsBitField
      ) {
        const missingPerms = interaction.member.permissions.missing(
          command.requiredPermissions,
        );
        if (missingPerms.length > 0) {
          interaction.reply({
            content: `このコマンドを使用するには、次の権限が必要です: ${missingPerms.join(", ")}\nYou are missing the following permissions to use this command: ${missingPerms.join(", ")}`,
            flags: MessageFlags.Ephemeral,
          });
          return;
        }
      }

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
