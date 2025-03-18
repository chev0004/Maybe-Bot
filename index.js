import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } from 'discord.js';
import { Client as ExarotonClient } from 'exaroton';
import dotenv from 'dotenv';

dotenv.config();

const DISCORD_TOKEN = process.env.TOKEN;
const EXAROTON_API_TOKEN = process.env.API_TOKEN;
const SERVER_ID = process.env.SERVER_ID;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds] });
const exarotonClient = new ExarotonClient(EXAROTON_API_TOKEN);
const server = exarotonClient.server(SERVER_ID);

const commands = [
  new SlashCommandBuilder()
    .setName('startserver')
    .setDescription('Starts the exaroton server')
    .toJSON()
];

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);
(async () => {
  try {
    console.log('Refreshing application (/) commands.');
    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

discordClient.once('ready', async () => {
  console.log(`Logged in as ${discordClient.user.tag}!`);

  try {
    const servers = await exarotonClient.getServers();
    servers.forEach(server => {
      console.log(`Server Name: ${server.name}`);
      console.log(`Server Status: ${server.status}`);
      console.log(`Players Online: ${server.players.count}/${server.players.max}`);
      console.log(`Server ID: ${server.id}`);
      console.log('---');
    });
  } catch (error) {
    console.error('Error fetching servers:', error);
  }
});

discordClient.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'startserver') {
    await interaction.deferReply();
    try {
      await server.start();
      await interaction.editReply('サーバーが起動中...');
    } catch (error) {
      console.error(error);
      await interaction.editReply('サーバーの起動に失敗しました。');
    }
  }
});

discordClient.login(DISCORD_TOKEN);
