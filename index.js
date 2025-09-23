import { Client, EmbedBuilder, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import { Client as ExarotonClient } from "exaroton";
import { Colors } from "./src/constants/Colors.js";
import CommandHandler from "./src/handlers/commandHandler.js";
import InteractionHandler from "./src/handlers/interactionHandler.js";
import ListenerHandler from "./src/handlers/listenerHandler.js";
import {
  clearRestartInfo,
  getRestartInfo,
} from "./src/utils/managers/dataManager.js";
import { loadAndProcessReminders } from "./src/utils/managers/reminderManager.js";

dotenv.config();

const DISCORD_TOKEN = process.env.TOKEN;
const EXAROTON_API_TOKEN = process.env.API_TOKEN;
const SERVER_ID = process.env.SERVER_ID;

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
const interactionHandler = new InteractionHandler(discordClient, sharedOptions);

(async () => {
  await commandHandler.loadCommands();
  await commandHandler.registerCommands();
  await listenerHandler.loadListeners();
  await interactionHandler.loadInteractions();
})();

discordClient.once("ready", async () => {
  console.log(`Logged in as ${discordClient.user.tag}! Bot is ready.`);
  await loadAndProcessReminders(discordClient);

  const restartInfo = getRestartInfo();

  if (restartInfo?.triggeringUserId && restartInfo.channelId) {
    const channel = await discordClient.channels
      .fetch(restartInfo.channelId)
      .catch((err) => {
        console.error(
          `Failed to fetch channel ${restartInfo.channelId} for restart notification:`,
          err,
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
          `Sent restart notification embed to channel ${restartInfo.channelId} for user ${restartInfo.triggeringUserId}`,
        );
      } catch (sendError) {
        console.error(
          `Failed to send restart notification embed to channel ${restartInfo.channelId}:`,
          sendError,
        );
      }
    } else {
      console.warn(
        `Could not find channel ${restartInfo.channelId} to send restart notification.`,
      );
    }

    await clearRestartInfo();
    console.log(`Cleared restart info.`);
  }
});

discordClient.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    commandHandler.handleInteraction(interaction);
  } else if (interaction.isMessageComponent() || interaction.isModalSubmit()) {
    interactionHandler.handleInteraction(interaction);
  }
});

discordClient.login(DISCORD_TOKEN);
