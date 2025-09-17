import { Client, GatewayIntentBits, EmbedBuilder } from "discord.js";
import { Client as ExarotonClient } from "exaroton";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import CommandHandler from "./src/handlers/commandHandler.js";
import ListenerHandler from "./src/handlers/listenerHandler.js";
import { Colors } from "./src/constants/Colors.js";
import { loadAndProcessReminders } from "./src/utils/reminderManager.js";
import { loadData, getData, saveData } from "./src/utils/dataManager.js";

dotenv.config();

const DISCORD_TOKEN = process.env.TOKEN;
const EXAROTON_API_TOKEN = process.env.API_TOKEN;
const SERVER_ID = process.env.SERVER_ID;
const RESTART_INFO_FILE = path.join(process.cwd(), 'restart_info.json');

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

(async () => {
  await loadData();
  await commandHandler.loadCommands();
  await commandHandler.registerCommands();
  await listenerHandler.loadListeners();
})();

discordClient.once("ready", async () => {
  console.log(`Logged in as ${discordClient.user.tag}! Bot is ready.`);
  await loadAndProcessReminders(discordClient);

  let restartInfo = null;
  try {
    const restartInfoRaw = await fs.readFile(RESTART_INFO_FILE, 'utf8');
    restartInfo = JSON.parse(restartInfoRaw);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error('Error reading restart_info.json:', error);
    }
  }

  if (restartInfo && restartInfo.triggeringUserId && restartInfo.channelId) {
    const channel = await discordClient.channels
      .fetch(restartInfo.channelId)
      .catch((err) => {
        console.error(
          `Failed to fetch channel ${restartInfo.channelId} for restart notification:`,
          err
        );
        return null;
      });

    if (channel) {
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
        console.log(
          `Sent restart notification embed to channel ${restartInfo.channelId} for user ${restartInfo.triggeringUserId}`
        );
      } catch (sendError) {
        console.error(
          `Failed to send restart notification embed to channel ${restartInfo.channelId}:`,
          sendError
        );
      }
    } else {
      console.warn(
        `Could not find channel ${restartInfo.channelId} to send restart notification.`
      );
    }

    try {
      await fs.unlink(RESTART_INFO_FILE);
      console.log('Cleared restart_info.json');
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error('Error deleting restart_info.json:', error);
      }
    }
  }
});

discordClient.on("interactionCreate", (interaction) => {
  commandHandler.handleInteraction(interaction);
});

discordClient.login(DISCORD_TOKEN);