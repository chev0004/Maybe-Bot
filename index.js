import { Client, EmbedBuilder, GatewayIntentBits, REST, Routes, SlashCommandBuilder } from 'discord.js';
import { Client as ExarotonClient } from 'exaroton';
import dotenv from 'dotenv';

dotenv.config();

const DISCORD_TOKEN = process.env.TOKEN;
const EXAROTON_API_TOKEN = process.env.API_TOKEN;
const SERVER_ID = process.env.SERVER_ID;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const discordClient = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions],
});
const exarotonClient = new ExarotonClient(EXAROTON_API_TOKEN);

const commands = [
  new SlashCommandBuilder()
    .setName('startserver')
    .setDescription('マイクラサーバーを起動させる。Starts the MineCraft server.')
    .toJSON(),
  new SlashCommandBuilder()
    .setName('statusserver')
    .setDescription('マイクラサーバーの現在状況を表示。Display the current server stats'),
  new SlashCommandBuilder()
    .setName('smite')
    .setDescription('人に神罰を与える。Punish someone with the God\'s Wrath.')
    .addStringOption(option =>
      option
        .setName('victim')
        .setDescription('神罰を受ける者の名を入力。Enter the username of the victim to be smitten')
        .setRequired(true)
    ),
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
});

const handleApprovalProcess = async (interaction, requiredApprovals, actionMessage, actionMessageEN, successCallback, failureMessage) =>{
  await interaction.deferReply({ ephemeral: false });
  try {
    const pollMessage = await interaction.editReply(
      `${actionMessage}には${requiredApprovals}つの承認が必要です。\n✅を押して承認してください。\nWe need ${requiredApprovals} ${requiredApprovals === 1 ? 'approval' : 'approvals'} to ${actionMessageEN}.\nReact with ✅ to approve.`
    );

    await pollMessage.react('✅');

    const filter = (reaction, user) => {
      return reaction.emoji.name === '✅' && !user.bot;
    };

    const uniqueApprovals = new Set();

    const collector = pollMessage.createReactionCollector({ filter, time: 60000 });

    collector.on('collect', (_, user) => {
      uniqueApprovals.add(user.id);
      if (uniqueApprovals.size >= requiredApprovals) {
        collector.stop('enough_approvals');
      }
    });

    collector.on('end', async (_, reason) => {
      if (reason === 'enough_approvals') {
        try {
          await successCallback(pollMessage);
        } catch (error) {
          console.error(error);
          await pollMessage.reply(failureMessage);
        }
      } else {
        await pollMessage.reply('タイムアウトまたは承認不足のため、操作をキャンセルしました。');
      }
    });

  } catch (error) {
    console.error(error);
    await interaction.editReply('エラーが発生しました。');
  }
}

discordClient.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'startserver') {
    const requiredApprovals = 1;
    const actionMessage = 'サーバーを起動する';
    const actionMessageEN = 'start the server';
  
    await handleApprovalProcess(
      interaction,
      requiredApprovals,
      actionMessage,
      actionMessageEN,
      async (pollMessage) => {
        const server = exarotonClient.server(SERVER_ID);
        await server.get();
        await server.start();
        const startMsg = await pollMessage.reply('サーバーが起動中...');
        let attempts = 0;
        const maxAttempts = 18;
        const pollInterval = 10000;
        const intervalId = setInterval(async () => {
          attempts++;
          try {
            await server.get();
            if (server.status === 1) {
              clearInterval(intervalId);
              await startMsg.edit('サーバーが起動しました！');
            } else if (attempts >= maxAttempts) {
              clearInterval(intervalId);
              await startMsg.edit('サーバーの起動確認がタイムアウトしました。');
            }
          } catch (err) {
            clearInterval(intervalId);
            await startMsg.edit('サーバー状態の確認に失敗しました。');
          }
        }, pollInterval);
      },
      'サーバーの起動に失敗しました。'
    );
  } else if (interaction.commandName === 'statusserver') {
    await interaction.deferReply({ ephemeral: false });
    try {
      const server = exarotonClient.server(SERVER_ID);
      await server.get();
  
      const statusCode = server.status;
      const statusMap = {
        0: 'オフライン',
        1: 'オンライン',
        2: '起動中',
        3: '再起動中',
        4: '保存中',
        5: 'ロード中',
        6: '停止中',
        7: '保留中',
      };
      const statusString = statusMap[statusCode] || 'Unknown';
  
      let embedColor = 0x5865F2;
      if (statusCode === 1) {
        embedColor = 0x57F287;
      } else if ([2,3,4,5,6,7].includes(statusCode)) {
        embedColor = 0xFEE75C;
      } else if (statusCode === 0) {
        embedColor = 0xED4245;
      }
  
      const embed = new EmbedBuilder()
        .setTitle('サーバーの現在状況')
        .setColor(embedColor)
        .setFooter({ text: 'サーバー情報' })
        .setTimestamp();
  
      embed.setDescription(`**ステータス**: ${statusString}`);
  
      if (statusCode === 1) {
        const playerCount = server.players.count;
        const playerMax = server.players.max;
        const playerList = server.players.list;
  
        embed.addFields(
          {
            name: 'プレーヤー数',
            value: `${playerCount} / ${playerMax}`,
            inline: true,
          },
          {
            name: 'プレーヤーリスト',
            value: playerCount > 0 ? playerList.join(', ') : 'なし',
            inline: false,
          }
        );
      }
  
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error('Error fetching server status:', error);
      await interaction.editReply('サーバー情報の取得に失敗しました。');
    }
  } else if (interaction.commandName === 'smite') {
    const victim = interaction.options.getString('victim');
    
    const requiredApprovals = 1;
    const actionMessage = `${victim} に神罰を与える`;
    const actionMessageEN = `Smite ${victim} with God's Wrath`;
  
    await handleApprovalProcess(
      interaction,
      requiredApprovals,
      actionMessage,
      actionMessageEN,
      async (pollMessage) => {
        const server = exarotonClient.server(SERVER_ID);
        const command = Array(100)
          .fill(`execute at ${victim} run summon minecraft:lightning_bolt ~ ~ ~`)
          .join('\n');
  
        await server.executeCommand(command);
        await pollMessage.reply(`${victim} に神罰を与えました。`);
      },
      '神罰が失敗しました。'
    );
  }
});

discordClient.login(DISCORD_TOKEN);
