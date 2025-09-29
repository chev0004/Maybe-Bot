import {
  ChannelType,
  Client,
  EmbedBuilder,
  GatewayIntentBits,
  type Interaction,
} from "discord.js";
import dotenv from "dotenv";
import { Client as ExarotonClient } from "exaroton";
import { Colors } from "./constants/Colors.js";
import CommandHandler from "./handlers/commandHandler.js";
import InteractionHandler from "./handlers/interactionHandler.js";
import ListenerHandler from "./handlers/listenerHandler.js";
import {
  clearRestartInfo,
  getRestartInfo,
} from "./utils/managers/dataManager.js";
import { loadAndProcessReminders } from "./utils/managers/reminderManager.js";
import { validateEnvVars } from "./utils/validators/envValidator.js";

dotenv.config();

validateEnvVars([
  "TOKEN",
  "API_TOKEN",
  "SERVER_ID",
  "CLIENT_ID",
  "GUILD_ID",
  "OWNER_ID",
  "BUMP_CHANNEL_ID",
  "BUMP_ROLE_ID",
  "CONFESSIONS_CHANNEL_ID",
  "VOICE_LOG_CHANNEL_ID",
  "VOICE_CATEGORY_ID",
  "WELCOME_CHANNEL_ID",
  "VERIFIED_ROLE_ID",
]);

if (!process.env.TOKEN || !process.env.API_TOKEN || !process.env.SERVER_ID) {
  throw new Error("FATAL: Core environment variables are not defined!");
}
const DISCORD_TOKEN: string = process.env.TOKEN;
const EXAROTON_API_TOKEN: string = process.env.API_TOKEN;
const SERVER_ID: string = process.env.SERVER_ID;

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

discordClient.once("ready", async (client: Client<true>) => {
  console.log(`Logged in as ${client.user.tag}! Bot is ready.`);
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
