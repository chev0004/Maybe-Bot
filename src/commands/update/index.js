import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { exec } from "child_process";
import util from "util";
import { Colors } from "../../constants/Colors.js";

const execPromise = util.promisify(exec);
const RAW_OUTPUT_MAX_LEN = 450;

function colorizeGitOutput(text) {
  if (!text) return "";
  let coloredText = text;

  coloredText = coloredText.replace(
    /^((?:[^|\n])+?\s*\|\s*\d+\s*)[+-]+$/gm,
    "$1"
  );

  coloredText = coloredText.replace(
    /^(\s*\*\s*branch)\s+([a-zA-Z0-9_\-\/]+)\s*(->)\s*(.+)/gm,
    "$1 $2 $3 $4"
  );

  coloredText = coloredText.replace(
    /(\d+)\s+insertions?\(\+\)/g,
    "\u001b[2;36m+\u001b[0m" + "\u001b[2;36m$1\u001b[0m"
  );

  coloredText = coloredText.replace(
    /(\d+)\s+deletions?\(\-\)/g,
    "\u001b[2;31m-\u001b[0m" + "\u001b[2;31m$1\u001b[0m"
  );

  coloredText = coloredText.replace(
    /^(\*\s*branch\s+)([a-zA-Z0-9_\-\/]+)(\s*->\s*)(.+)/gm,
    (_, p1, p2, p3, p4) => `${p1}\u001b[2;34m${p2}\u001b[0m${p3}${p4}`
  );

  coloredText = coloredText.replace(
    /^(\s*\*\s*branch\s+)([a-zA-Z0-9_\-\/]+)(\s*->\s*)(.+)/gm,
    (_, p1, p2, p3, p4) => `${p1}\u001b[2;34m${p2}\u001b[0m${p3}${p4}`
  );

  return coloredText;
}

export default {
  data: new SlashCommandBuilder()
    .setName("update")
    .setDescription(
      "GitHubから最新のコミットを取得し、BOTを再起動する。(Pulls the latest changes from GitHub and restarts the bot.)"
    )
    .addBooleanOption((option) =>
      option
        .setName("test")
        .setDescription(
          "テストモードで実行し、実際の更新や再起動は行いません。(Run in test mode without actual update/restart.)"
        )
        .setRequired(false)
    )
    .setDefaultMemberPermissions(0),

  async execute(interaction) {
    const ownerId = process.env.OWNER_ID;
    const isTestMode = interaction.options.getBoolean("test") ?? false;

    if (interaction.user.id !== ownerId) {
      await interaction.reply({
        content:
          "このコマンドを使用する権限がありません。\nYou are not authorized to use this command.",
        ephemeral: true,
      });
      return;
    }

    await interaction.deferReply({ ephemeral: false });

    const embedTitle = isTestMode ? "BOTの更新 (テストモード)" : "BOTの更新";
    const initialDescription = isTestMode
      ? "テスト用のGitプルシミュレーション中..."
      : "最新のコミットを取得中...";

    const embed = new EmbedBuilder()
      .setTitle(embedTitle)
      .setColor(Colors.yellow)
      .setDescription(initialDescription)
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });

    if (isTestMode) {
      const fakeGitStdout = `Updating abc1234...def5678
Fast-forward
 src/commands/update/index.js | 88 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++--------------------
 1 file changed, 68 insertions(+), 20 deletions(-)`;
      const fakeGitStderr = `From https://github.com/chev0004/Maybe-Bot
 * branch develop -> FETCH_HEAD`;

      const fields = [];
      if (fakeGitStdout) {
        const colorizedStdout = colorizeGitOutput(
          fakeGitStdout.substring(0, RAW_OUTPUT_MAX_LEN)
        );
        fields.push({
          name: "Simulated Git Output (stdout)",
          value: `\`\`\`ansi\n${colorizedStdout}\n\`\`\``,
          inline: false,
        });
      }
      if (fakeGitStderr) {
        const colorizedStderr = colorizeGitOutput(
          fakeGitStderr.substring(0, RAW_OUTPUT_MAX_LEN)
        );
        fields.push({
          name: "Simulated Git Output (stderr)",
          value: `\`\`\`ansi\n${colorizedStderr}\n\`\`\``,
          inline: false,
        });
      }

      embed
        .setFields(fields)
        .setColor(Colors.purple)
        .setDescription(
          "テスト用のGitプルシミュレーション完了。\nSimulated Git pull complete."
        )
        .setFooter({
          text: "これはテスト実行です。BOTは実際の更新や再起動を行いません。",
        });

      await interaction.editReply({ embeds: [embed] });
      console.log("Update command executed in test mode.");
      return;
    }

    try {
      const { stdout: gitStdout, stderr: gitStderr } = await execPromise(
        "git pull origin develop"
      );

      const fields = [];
      if (gitStdout) {
        const colorizedStdout = colorizeGitOutput(
          gitStdout.substring(0, RAW_OUTPUT_MAX_LEN)
        );
        fields.push({
          name: "Git Output (stdout)",
          value: `\`\`\`ansi\n${colorizedStdout}\n\`\`\``,
          inline: false,
        });
      }
      if (gitStderr) {
        const colorizedStderr = colorizeGitOutput(
          gitStderr.substring(0, RAW_OUTPUT_MAX_LEN)
        );
        fields.push({
          name: "Git Output (stderr)",
          value: `\`\`\`ansi\n${colorizedStderr}\n\`\`\``,
          inline: false,
        });
      }

      embed.setFields(fields);

      if (gitStdout.includes("Already up to date.")) {
        embed
          .setColor(Colors.purple)
          .setDescription("通常に更新されました。")
          .setFooter({
            text: "変更はありません。BOTは再起動しません。\nNo new changes. Bot will not restart.",
          });
        await interaction.editReply({ embeds: [embed] });
        return;
      }

      embed
        .setColor(Colors.green)
        .setDescription("通常に更新されました。")
        .setFooter({
          text: "BOTが再起動中...",
        });
      await interaction.editReply({ embeds: [embed] });

      setTimeout(() => {
        console.log(
          "Bot restarting due to /update command (develop branch)..."
        );
        process.exit(0);
      }, 3000);
    } catch (error) {
      console.error("Error during update process:", error);
      embed
        .setColor(Colors.red)
        .setDescription("更新プロセス中にエラーが発生しました。")
        .setFooter("BOTの更新に失敗しました。");

      const errorFields = [];
      if (error.stdout) {
        const colorizedErrorStdout = colorizeGitOutput(
          error.stdout.substring(0, RAW_OUTPUT_MAX_LEN)
        );
        errorFields.push({
          name: "Error Output (stdout)",
          value: `\`\`\`ansi\n${colorizedErrorStdout}\n\`\`\``,
        });
      }
      if (error.stderr) {
        const colorizedErrorStderr = colorizeGitOutput(
          error.stderr.substring(0, RAW_OUTPUT_MAX_LEN)
        );
        errorFields.push({
          name: "Error Output (stderr)",
          value: `\`\`\`ansi\n${colorizedErrorStderr}\n\`\`\``,
        });
      }
      if (error.message && !error.stdout && !error.stderr) {
        errorFields.push({
          name: "Error Message",
          value: `\`\`\`\n${error.message.substring(
            0,
            RAW_OUTPUT_MAX_LEN * 2
          )}\n\`\`\``,
        });
      }
      embed.setFields(errorFields);

      await interaction.editReply({ embeds: [embed] });
    }
  },
};
