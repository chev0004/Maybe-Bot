import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { exec } from "child_process";
import util from "util";
import fs from "fs/promises";
import path from "path";
import { Colors } from "../../../constants/Colors.js";

const execPromise = util.promisify(exec);
const COMMIT_LOG_MAX_LEN = 950;
const FILE_CHANGES_MAX_LEN = 950;
const RESTART_INFO_FILE = path.join(process.cwd(), "restart.json");
const PULLED_BRANCH = "develop";

const MAX_PATH_LENGTH = 38;
const TRUNCATE_START = 12;
const TRUNCATE_END = 20;

function truncatePath(filePath) {
  if (filePath.length <= MAX_PATH_LENGTH) return filePath;
  return `${filePath.substring(0, TRUNCATE_START)}...${filePath.substring(filePath.length - TRUNCATE_END)}`;
}

function colorizeGitOutput(text) {
  if (!text) return "";
  let coloredText = text;
  
  coloredText = coloredText.replace(/(\+\d+)/g, "\u001b[2;36m$1\u001b[0m");
  coloredText = coloredText.replace(/(\-\d+)/g, "\u001b[2;31m$1\u001b[0m");

  const branchPattern = PULLED_BRANCH.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  coloredText = coloredText.replace(new RegExp(`(\\b${branchPattern}\\b)`, "g"), `\u001b[2;34m$1\u001b[0m`);
  
  return coloredText;
}

export default {
  data: new SlashCommandBuilder()
    .setName("update")
    .setDescription("GitHubから最新のコミットを取得し、BOTを再起動する。(Pulls the latest changes from GitHub and restarts the bot.)")
    .addBooleanOption((option) => option.setName("test").setDescription("テストモードで実行し、実際の更新や再起動は行いません。(Run in test mode without actual update/restart.)").setRequired(false))
    .setDefaultMemberPermissions(0),

  async execute(interaction) {
    const ownerId = process.env.OWNER_ID;
    if (interaction.user.id !== ownerId) {
      await interaction.reply({ content: "このコマンドを使用する権限がありません。\nYou are not authorized to use this command.", ephemeral: true });
      return;
    }

    const isTestMode = interaction.options.getBoolean("test") ?? false;

    if (isTestMode) {
      await interaction.deferReply({ ephemeral: false });
      const embed = new EmbedBuilder().setTitle("BOTの更新 (テストモード)").setColor(Colors.yellow).setDescription("テスト用のGitプルシミュレーション完了。").setTimestamp().setFooter({ text: "これはテスト実行です。BOTは実際の更新や再起動を行いません。" });
      await interaction.editReply({ embeds: [embed] });
      
      const fakeCommitLog = `a1b2c3d - feat: Add commit messages to update command\ne4f5g6h - fix: Correctly handle API rate limits\n7h8i9j0 - docs: Update README with new commands`;
      
      const fakeFileChanges = [
        { path: 'src/commands/update/index.js', num: '88' },
        { path: 'package.json', num: '2' }
      ];
      
      const truncatedChanges = fakeFileChanges.map(c => ({ ...c, path: truncatePath(c.path) }));
      const maxPathLength = Math.max(...truncatedChanges.map(c => c.path.length));
      
      const alignedLines = truncatedChanges.map(change => {
        const padding = ' '.repeat(maxPathLength - change.path.length);
        return ` ${change.path}${padding} | ${change.num}`;
      }).join('\n');

      const summaryLine = `\n 2 files changed, +69, -21`;

      const fakeGitStdout = `Updating abc1234..def5678\nFast-forward\n${alignedLines}\n${summaryLine}`;
      const fakeGitStderr = `From https://github.com/chev0004/Maybe-Bot\n * branch      ${PULLED_BRANCH}     -> FETCH_HEAD`;
      
      embed.addFields(
        { name: "更新内容 / Changes (Simulated)", value: `\`\`\`\n${fakeCommitLog}\n\`\`\`` },
        { name: "Git Output (Simulated stdout)", value: `\`\`\`ansi\n${colorizeGitOutput(fakeGitStdout)}\n\`\`\`` },
        { name: "Git Output (Simulated stderr)", value: `\`\`\`ansi\n${colorizeGitOutput(fakeGitStderr)}\n\`\`\`` },
        { name: "NPM Install (Simulated)", value: "```\nDependencies in package.json changed. `npm install` would run here.\n```" }
      ).setColor(Colors.green);

      await interaction.editReply({ embeds: [embed] });
      return;
    }

    await interaction.deferReply({ ephemeral: false });
    const embed = new EmbedBuilder().setTitle("BOTの更新").setColor(Colors.yellow).setDescription(`最新のコミット (${PULLED_BRANCH} ブランチ) を確認中...`).setTimestamp();
    await interaction.editReply({ embeds: [embed] });
    try {
      await execPromise('git fetch origin');
      const { stdout: packageJsonDiff } = await execPromise(`git diff HEAD..origin/${PULLED_BRANCH} -- package.json`);
      const needsNpmInstall = packageJsonDiff.length > 0;
      const { stdout: commitLog } = await execPromise(`git log HEAD..origin/${PULLED_BRANCH} --pretty=format:"%h - %s"`);
      const { stdout: diffOutput } = await execPromise(`git diff --name-status HEAD..origin/${PULLED_BRANCH}`);
      const hasFileChanges = diffOutput.trim().length > 0;
      if (!commitLog && !needsNpmInstall && !hasFileChanges) {
        embed.setColor(Colors.purple).setDescription(`ボットは既に最新の状態です (${PULLED_BRANCH} ブランチ)。`).setFooter({ text: "変更はありません。BOTは再起動しません。" });
        await interaction.editReply({ embeds: [embed] });
        return;
      }
      if (commitLog) {
        let formattedCommits = commitLog;
        if (commitLog.length > COMMIT_LOG_MAX_LEN) {
          formattedCommits = commitLog.substring(0, COMMIT_LOG_MAX_LEN - 50) + `\n...他コミット多数`;
        }
        embed.addFields({ name: "更新内容 / Changes", value: `\`\`\`\n${formattedCommits}\n\`\`\`` });
      } else if (needsNpmInstall) {
        embed.addFields({ name: "更新内容 / Changes", value: "```\npackage.json の依存関係が変更されました。\nDependencies in package.json have been changed.\n```" });
      }
      const fileChanges = diffOutput.trim().split('\n').filter(line => line).map(line => {
        const parts = line.split('\t');
        const status = parts[0].trim();
        const oldFile = truncatePath(parts[1].trim());
        const newFile = parts[2] ? truncatePath(parts[2].trim()) : null;
        switch (status.charAt(0)) {
          case 'R': return `• **[MOVED]** \`${oldFile}\` → \`${newFile}\``;
          case 'A': return `• **[ADDED]** \`${oldFile}\``;
          case 'M': return `• **[MODIFIED]** \`${oldFile}\``;
          case 'D': return `• **[DELETED]** \`${oldFile}\``;
          default: return `• **[${status}]** \`${oldFile}\``;
        }
      });
      if (fileChanges.length > 0) {
        let changesDescription = fileChanges.join('\n');
        if (changesDescription.length > FILE_CHANGES_MAX_LEN) {
          let truncated = '';
          let visibleCount = 0;
          for (const change of fileChanges) {
            if (truncated.length + change.length + 1 > FILE_CHANGES_MAX_LEN) break;
            truncated += change + '\n';
            visibleCount++;
          }
          const remaining = fileChanges.length - visibleCount;
          changesDescription = truncated + `\n...他 ${remaining} 件の変更 (...and ${remaining} more changes)`;
        }
        embed.addFields({ name: `ファイル変更点 / File Changes (${fileChanges.length})`, value: changesDescription });
      }
      embed.setDescription(`更新を適用中... (${PULLED_BRANCH} ブランチ)`);
      await interaction.editReply({ embeds: [embed] });
      await execPromise(`git pull origin ${PULLED_BRANCH}`);
      if (needsNpmInstall) {
        embed.setDescription('更新を適用しました。依存関係をインストール中...');
        await interaction.editReply({ embeds: [embed] });
        try {
          const { stdout: npmStdout } = await execPromise('npm install');
          embed.addFields({ name: "NPM Install Output", value: `\`\`\`\n${npmStdout.substring(0, 1000)}\n\`\`\`` });
        } catch (npmError) {
          console.error("Error during npm install:", npmError);
          embed.setColor(Colors.red).setDescription("依存関係のインストール中にエラーが発生しました。再起動を中止します。").addFields({ name: "NPM Error (stderr)", value: `\`\`\`\n${(npmError.stderr || "N/A").substring(0, 1000)}\n\`\`\`` });
          await interaction.editReply({ embeds: [embed] });
          return;
        }
      }
      embed.setColor(Colors.green).setDescription(`通常に更新されました。`).setFooter({ text: "BOTが再起動中..." });
      await interaction.editReply({ embeds: [embed] });
      const restartInfo = { triggeringUserId: interaction.user.id, channelId: interaction.channel.id, timestamp: Date.now() };
      await fs.writeFile(RESTART_INFO_FILE, JSON.stringify(restartInfo));
      console.log(`Restart info saved to ${RESTART_INFO_FILE}`);
      setTimeout(() => {
        console.log(`Bot restarting due to /update command (${PULLED_BRANCH} branch)...`);
        process.exit(0);
      }, 3000);
    } catch (error) {
      console.error("Error during update process:", error);
      embed.setColor(Colors.red).setDescription("更新プロセス中にエラーが発生しました。").setFields({ name: "Error (stderr)", value: `\`\`\`\n${(error.stderr || "N/A").substring(0, 1000)}\n\`\`\`` });
      await interaction.editReply({ embeds: [embed] });
    }
  },
};