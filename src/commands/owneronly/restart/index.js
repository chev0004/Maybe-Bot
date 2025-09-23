import { EmbedBuilder } from "discord.js";
import { Colors } from "../../../constants/Colors.js";
import { createCommand } from "../../../utils/builders/commandBuilder.js";
import { setRestartInfo } from "../../../utils/managers/dataManager.js";

export default createCommand(
  "restart",
  "BOTを再起動します。Restarts the bot.",
  async (interaction) => {
    await interaction.deferReply();

    const embed = new EmbedBuilder()
      .setTitle("BOTの再起動")
      .setColor(Colors.yellow)
      .setDescription("BOTを再起動しています...")
      .setFooter({ text: "しばらくお待ちください。" })
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
      console.error(
        "Failed to write restart info during manual restart:",
        writeError,
      );
      embed
        .setColor(Colors.red)
        .setDescription("再起動情報の保存に失敗しました。再起動を中止します。")
        .setFooter({ text: "エラーが発生しました。" });
      await interaction.editReply({ embeds: [embed] });
      return;
    }

    setTimeout(() => {
      console.log(
        `Bot restarting due to /restart command issued by ${interaction.user.tag}...`,
      );
      process.exit(0);
    }, 3000);
  },
  {
    ownerOnly: true,
    setup: (builder) => builder.setDefaultMemberPermissions(0),
  },
);
