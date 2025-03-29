import { EmbedBuilder } from 'discord.js';
import { Colors } from '../../constants/Colors.js';

export default {
  name: 'voiceChannelLogger',
  event: 'voiceStateUpdate',
  
  async execute(oldState, newState, client) {
    const logChannelId = process.env.VOICE_LOG_CHANNEL_ID;
    if (!logChannelId) return;
    
    const logChannel = await client.channels.fetch(logChannelId).catch(() => null);
    if (!logChannel) return;
    
    const member = newState.member || oldState.member;
    if (!member) return;

    const embed = new EmbedBuilder()
      .setAuthor({
        name: member.user.tag,
        iconURL: member.user.displayAvatarURL({ dynamic: true })
      })
      .setFooter({
        text: `ID: ${member.user.id}`
      })
      .setTimestamp();
    
    if (!oldState.channelId && newState.channelId) {
      embed
        .setTitle('ボイスチャンネル参加')
        .setDescription(`${member} が <#${newState.channelId}> に参加しました。`)
        .setColor(Colors.green);
      
      logChannel.send({ embeds: [embed] });
    }
    else if (oldState.channelId && !newState.channelId) {
      embed
        .setTitle('ボイスチャンネル退出')
        .setDescription(`${member} が <#${oldState.channelId}> から退出しました。`)
        .setColor(Colors.red)
      
      logChannel.send({ embeds: [embed] });
    }
    else if (oldState.channelId && newState.channelId && oldState.channelId !== newState.channelId) {
      embed
        .setTitle('ボイスチャンネル移動')
        .setDescription(`${member} が <#${oldState.channelId}> から <#${newState.channelId}> に移動しました。`)
        .setColor(Colors.yellow);
      
      logChannel.send({ embeds: [embed] });
    }
    else if (oldState.channelId && newState.channelId && oldState.channelId === newState.channelId) {
      if (oldState.serverMute !== newState.serverMute ||
          oldState.serverDeaf !== newState.serverDeaf ||
          oldState.selfMute !== newState.selfMute ||
          oldState.selfDeaf !== newState.selfDeaf) {
        
        embed
          .setTitle('ボイスステータス変更')
          .setDescription(`${member} が <#${newState.channelId}> でステータスを変更しました。`)
          .setColor(Colors.purple);
        
        const changes = [];
        
        if (oldState.serverMute !== newState.serverMute) {
          const status = newState.serverMute ? 'サーバーミュート: オン' : 'サーバーミュート: オフ';
          changes.push(status);
        }
        
        if (oldState.serverDeaf !== newState.serverDeaf) {
          const status = newState.serverDeaf ? 'サーバースピーカーミュート: オン' : 'サーバースピーカーミュート: オフ';
          changes.push(status);
        }
        
        if (oldState.selfMute !== newState.selfMute) {
          const status = newState.selfMute ? 'ミュート: オン' : 'セルフミュート: オフ';
          changes.push(status);
        }
        
        if (oldState.selfDeaf !== newState.selfDeaf) {
          const status = newState.selfDeaf ? 'スピーカーミュート: オン' : 'スピーカーミュート: オフ';
          changes.push(status);
        }
        
        if (changes.length > 0) {
          embed.addFields({ name: 'ステータス変更', value: changes.join('\n'), inline: false });
          logChannel.send({ embeds: [embed] });
        }
      }
    }
  }
};
