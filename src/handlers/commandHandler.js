import { REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
      const categoryFolders = fs.readdirSync(commandsPath);

      for (const category of categoryFolders) {
        const categoryPath = path.join(commandsPath, category);
        if (!fs.statSync(categoryPath).isDirectory()) continue;

        const commandFolders = fs.readdirSync(categoryPath);

        for (const folder of commandFolders) {
          const commandPath = path.join(categoryPath, folder);
          if (!fs.statSync(commandPath).isDirectory()) continue;

          const commandFile = path.join(commandPath, "index.js");

          if (fs.existsSync(commandFile)) {
            const commandModule = await import(`file://${commandFile}`);
            const command = commandModule.default;

            if (command.data && command.execute) {
              this.commands.set(command.data.name, command);
              this.commandsArray.push(command.data.toJSON());
              console.log(`Loaded command: ${category}/${command.data.name}`);
            } else {
              console.log(
                `[WARNING] Command at ${commandFile} is missing required properties.`,
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

  handleInteraction(interaction) {
    if (!interaction.isCommand()) return;

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
            "エラーが発生しました。An error occurred while executing this command.",
          ephemeral: true,
        })
        .catch(console.error);
    }
  }
}
