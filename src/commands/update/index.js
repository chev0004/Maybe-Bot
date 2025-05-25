import { SlashCommandBuilder } from "discord.js";
import { exec } from "child_process";
import util from "util";

const execPromise = util.promisify(exec);

export default {
  data: new SlashCommandBuilder()
    .setName("update")
    .setDescription(
      "GitHubから最新のコミットを取得し、BOTを再起動する。(Pulls the latest changes from GitHub and restarts the bot.)"
    )
    .setDefaultMemberPermissions(0),

  async execute(interaction) {
    const ownerId = process.env.OWNER_ID;

    if (interaction.user.id !== ownerId) {
      await interaction.reply({
        content:
          "このコマンドを使用する権限がありません。\nYou are not authorized to use this command.",
        ephemeral: true,
      });
      return;
    }

    await interaction.deferReply({ ephemeral: false });

    try {
      await interaction.editReply(
        "最新のコミットを取得中...\nPulling latest commits from GitHub..."
      );

      const { stdout: gitStdout, stderr: gitStderr } = await execPromise(
        "git pull origin develop"
      );

      let replyMessageJP = "プル成功。\n";
      let replyMessageEN = "Git pull successful.\n";

      if (gitStdout) {
        const formattedStdout = `\`\`\`\n${gitStdout.substring(
          0,
          800
        )}\n\`\`\`\n`;
        replyMessageJP += formattedStdout;
        replyMessageEN += formattedStdout;
      }
      if (gitStderr) {
        const formattedStderr = `\`\`\`stderr:\n${gitStderr.substring(
          0,
          800
        )}\n\`\`\`\n`;
        replyMessageJP += formattedStderr;
        replyMessageEN += formattedStderr;
      }

      const fullReply = `${replyMessageJP}\n---\n${replyMessageEN}`;

      if (gitStdout.includes("Already up to date.")) {
        await interaction.editReply(
          `${fullReply}\n変更はありません。BOTは再起動しません。\nNo new changes. Bot will not restart.`
        );
        return;
      }

      await interaction.editReply(
        `${fullReply}\nBOTが再起動中...\nRestarting bot...`
      );

      setTimeout(() => {
        console.log(
          "Bot restarting due to /update command (develop branch)..."
        );
        process.exit(0);
      }, 3000);
    } catch (error) {
      console.error("Error during update process:", error);
      let errorMessageJP = "更新プロセス中にエラーが発生しました。\n";
      let errorMessageEN = "An error occurred during the update process.\n";

      if (error.stdout) {
        const formattedStdout = `\`\`\`stdout:\n${error.stdout.substring(
          0,
          700
        )}\n\`\`\`\n`;
        errorMessageJP += formattedStdout;
        errorMessageEN += formattedStdout;
      }
      if (error.stderr) {
        const formattedStderr = `\`\`\`stderr:\n${error.stderr.substring(
          0,
          700
        )}\n\`\`\`\n`;
        errorMessageJP += formattedStderr;
        errorMessageEN += formattedStderr;
      }
      if (error.message && !error.stdout && !error.stderr) {
        const formattedError = `\`\`\`\n${error.message.substring(
          0,
          700
        )}\n\`\`\``;
        errorMessageJP += formattedError;
        errorMessageEN += formattedError;
      }

      const fullErrorMessage = `${errorMessageJP}\n---\n${errorMessageEN}`;

      await interaction.editReply(fullErrorMessage.substring(0, 1990));
    }
  },
};
