import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { Colors } from '../../../constants/Colors.js';
import { getData, saveData } from '../../../utils/dataManager.js';

export default {
  data: new SlashCommandBuilder()
    .setName('restart')
    .setDescription('BOTを再起動します。(Restarts the bot.)')
    .setDefaultMemberPermissions(0),

  async execute(interaction) {
    const ownerId = process.env.OWNER_ID;

    if (interaction.user.id !== ownerId) {
      return interaction.reply({
        content: 'このコマンドを使用する権限がありません。\nYou are not authorized to use this command.',
        ephemeral: true,
      });
    }

    await interaction.deferReply({ ephemeral: false });

    const embed = new EmbedBuilder()
      .setTitle('BOTの再起動')
      .setColor(Colors.yellow)
      .setDescription('BOTを再起動しています...')
      .setFooter({ text: 'しばらくお待ちください。' })
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });

    getData().restartInfo = {
      triggeringUserId: interaction.user.id,
      channelId: interaction.channel.id,
      timestamp: Date.now(),
    };
    await saveData();
    console.log(`Restart info saved to bot_data.json by /restart command.`);

    setTimeout(() => {
      console.log(`Bot restarting due to /restart command issued by ${interaction.user.tag}...`);
      process.exit(0);
    }, 3000);
  },
};