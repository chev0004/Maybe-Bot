import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { setRestartInfo } from '../../../utils/dataManager.js';
import { Colors } from '../../../constants/Colors.js';

export default {
  data: new SlashCommandBuilder()
    .setName('restart')
    .setDescription('BOTを再起動します。(Restarts the bot.)')
    .setDefaultMemberPermissions(0),

  async execute(interaction) {
    const ownerId = process.env.OWNER_ID;

    if (interaction.user.id !== ownerId) {
      await interaction.reply({
        content: 'このコマンドを使用する権限がありません。\nYou are not authorized to use this command.',
        ephemeral: true,
      });
      return;
    }

    await interaction.deferReply({ ephemeral: false });

    const embed = new EmbedBuilder()
      .setTitle('BOTの再起動')
      .setColor(Colors.yellow)
      .setDescription('BOTを再起動しています...')
      .setFooter({ text: 'しばらくお待ちください。' })
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });

    const restartInfo = {
      triggeringUserId: interaction.user.id,
      channelId: interaction.channel.id,
      timestamp: Date.now(),
    };

    try {
      await setRestartInfo(restartInfo);
      console.log(`Restart info saved by /restart command.`);
    } catch (writeError) {
      console.error('Failed to write restart info during manual restart:', writeError);
      embed
        .setColor(Colors.red)
        .setDescription('再起動情報の保存に失敗しました。再起動を中止します。')
        .setFooter({ text: 'エラーが発生しました。' });
      await interaction.editReply({ embeds: [embed] });
      return;
    }

    setTimeout(() => {
      console.log(`Bot restarting due to /restart command issued by ${interaction.user.tag}...`);
      process.exit(0);
    }, 3000);
  },
};