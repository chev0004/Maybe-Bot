import { Client, GatewayIntentBits } from 'discord.js';
import { Client as ExarotonClient } from 'exaroton';
import dotenv from 'dotenv';
import CommandHandler from './src/handlers/commandHandler.js';

dotenv.config();

const DISCORD_TOKEN = process.env.TOKEN;
const EXAROTON_API_TOKEN = process.env.API_TOKEN;
const SERVER_ID = process.env.SERVER_ID;

const discordClient = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions],
});
const exarotonClient = new ExarotonClient(EXAROTON_API_TOKEN);

const commandHandler = new CommandHandler(discordClient, {
  exarotonClient,
  SERVER_ID
});

(async () => {
  await commandHandler.loadCommands();
  await commandHandler.registerCommands();
})();

discordClient.once('ready', async () => {
  console.log(`Logged in as ${discordClient.user.tag}!`);
});

discordClient.on('interactionCreate', (interaction) => {
  commandHandler.handleInteraction(interaction);
});

discordClient.login(DISCORD_TOKEN);
