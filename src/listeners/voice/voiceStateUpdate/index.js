import { EmbedBuilder } from "discord.js";
import { Colors } from "../../../constants/Colors.js";
import { createListener } from "../../../utils/builders/listenerBuilder.js";

const userJoinTimes = new Map();

const formatDuration = (milliseconds) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}時間${minutes % 60}分${seconds % 60}秒`;
  } else if (minutes > 0) {
    return `${minutes}分${seconds % 60}秒`;
  } else {
    return `${seconds}秒`;
  }
};

export default createListener(
  "voiceChannelLogger",
  "voiceStateUpdate",
  async (oldState, newState) => {
    const logChannelId = process.env.VOICE_LOG_CHANNEL_ID;
    const logChannel = await newState.client.channels
      .fetch(logChannelId)
      .catch(() => null);
    if (!logChannel) return;

    const member = newState.member || oldState.member;
    if (!member) return;

    const userId = member.id;

    const embed = new EmbedBuilder()
      .setAuthor({
        name: member.user.tag,
        iconURL: member.user.displayAvatarURL({ dynamic: true }),
      })
      .setFooter({
        text: `ID: ${member.user.id}`,
      })
      .setTimestamp();

    if (!oldState.channelId && newState.channelId) {
      userJoinTimes.set(userId, {
        channelId: newState.channelId,
        joinTime: Date.now(),
      });

      embed
        .setTitle("ボイスチャンネル参加")
        .setDescription(
          `${member} が <#${newState.channelId}> に参加しました。`,
        )
        .setColor(Colors.green);

      logChannel.send({ embeds: [embed] });
    } else if (oldState.channelId && !newState.channelId) {
      embed
        .setTitle("ボイスチャンネル退出")
        .setDescription(
          `${member} が <#${oldState.channelId}> から退出しました。`,
        )
        .setColor(Colors.red);

      const joinData = userJoinTimes.get(userId);
      if (joinData && joinData.channelId === oldState.channelId) {
        const duration = Date.now() - joinData.joinTime;
        const formattedDuration = formatDuration(duration);

        embed.addFields({
          name: "通話時間",
          value: formattedDuration,
          inline: true,
        });

        userJoinTimes.delete(userId);
      }

      logChannel.send({ embeds: [embed] });
    } else if (
      oldState.channelId &&
      newState.channelId &&
      oldState.channelId !== newState.channelId
    ) {
      embed
        .setTitle("ボイスチャンネル移動")
        .setDescription(
          `${member} が <#${oldState.channelId}> から <#${newState.channelId}> に移動しました。`,
        )
        .setColor(Colors.yellow);

      const joinData = userJoinTimes.get(userId);
      if (joinData && joinData.channelId === oldState.channelId) {
        const duration = Date.now() - joinData.joinTime;
        const formattedDuration = formatDuration(duration);

        embed.addFields({
          name: "前のチャンネルでの通話時間",
          value: formattedDuration,
          inline: true,
        });

        userJoinTimes.set(userId, {
          channelId: newState.channelId,
          joinTime: Date.now(),
        });
      } else {
        userJoinTimes.set(userId, {
          channelId: newState.channelId,
          joinTime: Date.now(),
        });
      }

      logChannel.send({ embeds: [embed] });
    }
  },
);
