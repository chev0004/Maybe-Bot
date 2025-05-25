import { SlashCommandBuilder } from "discord.js";
import { exec } from "child_process";
import util from "util";

const execPromise = util.promisify(exec);

export default {
  data: new SlashCommandBuilder()
    .setName("update")
    .setDescription(
      "Pulls the latest changes from GitHub and restarts the bot."
    )
    .setDefaultMemberPermissions(0),

  async execute(interaction) {
    const ownerId = process.env.OWNER_ID;

    if (interaction.user.id !== ownerId) {
      await interaction.reply({
        content: "You are not authorized to use this command.",
        ephemeral: true,
      });
      return;
    }

    await interaction.deferReply({ ephemeral: true });

    try {
      await interaction.editReply("Pulling latest changes from GitHub...");
      const { stdout: gitStdout, stderr: gitStderr } = await execPromise(
        "git pull origin develop"
      );

      let replyMessage = "Git pull successful.\n";
      if (gitStdout) replyMessage += `\`\`\`\n${gitStdout}\n\`\`\`\n`;
      if (gitStderr) replyMessage += `\`\`\`stderr:\n${gitStderr}\n\`\`\`\n`;

      if (gitStdout.includes("Already up to date.")) {
        await interaction.editReply(
          replyMessage + "No new changes. Bot will not restart."
        );
        return;
      }

      await interaction.editReply(replyMessage + "Restarting bot...");

      setTimeout(() => {
        console.log("Bot restarting due to /update command...");
        process.exit(0);
      }, 2000);
    } catch (error) {
      console.error("Error during update process:", error);
      let errorMessage = "An error occurred during the update process.\n";
      if (error.stdout)
        errorMessage += `\`\`\`stdout:\n${error.stdout}\n\`\`\`\n`;
      if (error.stderr)
        errorMessage += `\`\`\`stderr:\n${error.stderr}\n\`\`\`\n`;
      if (error.message && !error.stdout && !error.stderr)
        errorMessage += `\`\`\`\n${error.message}\n\`\`\``;

      await interaction.editReply(errorMessage.substring(0, 2000));
    }
  },
};
