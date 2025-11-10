import { EmbedBuilder, MessageFlags } from "discord.js";
import { Colors } from "../../../../constants/Colors.js";
import { createCommand } from "../../../../utils/builders/commandBuilder.js";

/**
 * Formats milliseconds into a human-readable string (e.g., "1日 3時間 5分 22秒").
 * @param {number} milliseconds The total milliseconds of uptime.
 * @returns {string} A formatted uptime string.
 */
const formatUptime = (milliseconds) => {
  let totalSeconds = Math.floor(milliseconds / 1000);
  const days = Math.floor(totalSeconds / 86400);
  totalSeconds %= 86400;
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const parts = [];
  if (days > 0) {
    parts.push(`${days}日`);
  }
  if (hours > 0) {
    parts.push(`${hours}時間`);
  }
  if (minutes > 0) {
    parts.push(`${minutes}分`);
  }
  parts.push(`${seconds}秒`);
  return parts.join(" ");
};
export default createCommand(
  "uptime",
  "BOTの稼働時間を表示します。Displays the bot's uptime.",
  async (interaction, client) => {
    if (!client.readyAt) {
      await interaction.reply({
        content: "Bot is not ready yet. Please try again in a moment.",
        flags: MessageFlags.Ephemeral,
      });
      return;
    }
    const uptimeMilliseconds = Date.now() - client.readyAt.getTime();
    const uptimeString = formatUptime(uptimeMilliseconds);
    const startTime = Math.floor(client.readyAt.getTime() / 1000);
    const startTimeString = `<t:${startTime}:F>`;
    const embed = new EmbedBuilder()
      .setTitle("BOT Uptime")
      .setColor(Colors.green)
      .addFields(
        {
          name: "稼働時間 / Uptime",
          value: uptimeString,
          inline: false,
        },
        {
          name: "起動日時 / Started At",
          value: startTimeString,
          inline: false,
        },
      )
      .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
);
