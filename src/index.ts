import "dotenv/config";

import {
  ChannelType,
  Client,
  EmbedBuilder,
  GatewayIntentBits,
  type Interaction,
} from "discord.js";
import { Client as ExarotonClient } from "exaroton";
import { config } from "./config/env.js";
import { Colors } from "./constants/Colors.js";
import CommandHandler from "./handlers/commandHandler.js";
import InteractionHandler from "./handlers/interactionHandler.js";
import ListenerHandler from "./handlers/listenerHandler.js";
import {
  clearRestartInfo,
  getRestartInfo,
} from "./utils/managers/dataManager.js";
import { loadAndProcessReminders } from "./utils/managers/reminderManager.js";
import { populateInitialStats } from "./utils/services/statsPopulationService.js";

const DISCORD_TOKEN: string = config.tokens.discord;
const EXAROTON_API_TOKEN: string = config.tokens.exaroton;
const SERVER_ID: string = config.ids.server;

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

interface SharedOptions {
  exarotonClient: ExarotonClient;
  SERVER_ID: string;
  DISCORD_TOKEN: string;
}

const sharedOptions: SharedOptions = {
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

discordClient.once("clientReady", async (client: Client<true>) => {
  console.log(`Logged in as ${client.user.tag}! Bot is ready.`);
  await loadAndProcessReminders(client);

  try {
    const guild = await client.guilds.fetch(config.ids.guild);
    if (guild) {
      await populateInitialStats(guild);
    } else {
      console.error(
        "[Startup] Could not find the specified guild to populate stats.",
      );
    }
  } catch (error) {
    console.error("[Startup] Failed to populate initial stats:", error);
  }

  await loadAndProcessReminders(client);

  const restartInfo = getRestartInfo();

  if (restartInfo?.triggeringUserId && restartInfo.channelId) {
    const channel = await client.channels
      .fetch(restartInfo.channelId)
      .catch((err) => {
        console.error(
          `Failed to fetch channel ${restartInfo.channelId} for restart notification:`,
          err,
        );
        return null;
      });

    if (channel?.type === ChannelType.GuildText) {
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
        `Could not find channel ${restartInfo.channelId} or it's not a text channel to send restart notification.`,
      );
    }

    await clearRestartInfo();
    console.log(`Cleared restart info.`);
  }
});

discordClient.on("interactionCreate", async (interaction: Interaction) => {
  if (interaction.isCommand() || interaction.isContextMenuCommand()) {
    commandHandler.handleInteraction(interaction);
  } else if (interaction.isMessageComponent() || interaction.isModalSubmit()) {
    interactionHandler.handleInteraction(interaction);
  }
});

discordClient.login(DISCORD_TOKEN);
