import { REST, Routes } from "discord.js";
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

export default class CommandHandler {
  constructor(client, options = {}) {
    this.client = client;
    this.commands = new Map();
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
            const command = commandModule.default;

            if (command.data && command.execute) {
              this.commands.set(command.data.name, command);
              this.commandsArray.push(command.data.toJSON());
              const commandType = type.charAt(0).toUpperCase() + type.slice(1);
              console.log(
                `Loaded [${commandType}] command: ${command.data.name}`,
              );
            } else {
              console.log(
                `[WARNING] Command at ${file} is missing required properties.`,
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

      console.log("Refreshing application commands.");
      const rest = new REST({ version: "10" }).setToken(TOKEN);

      await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
        body: this.commandsArray,
      });

      console.log("Successfully reloaded application commands.");
    } catch (error) {
      console.error("Error registering commands:", error);
    }
  }

  handleInteraction(interaction) {
    if (!interaction.isCommand() && !interaction.isContextMenuCommand()) return;

    const command = this.commands.get(interaction.commandName);
    if (!command) return;

    try {
      command.execute(interaction, this.client, this.options);
    } catch (error) {
      console.error(
        `Error executing command ${interaction.commandName}:`,
        error,
      );
      interaction
        .reply({
          content:
            "コマンドの実行中にエラーが発生しました。\nAn error occurred while executing this command.",
          flags: MessageFlags.Ephemeral,
        })
        .catch(console.error);
    }
  }
}
