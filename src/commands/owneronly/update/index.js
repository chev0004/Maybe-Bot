import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { exec } from "child_process";
import util from "util";
import { setRestartInfo } from "../../../utils/dataManager.js";
import { Colors } from "../../../constants/Colors.js";
import { appendFile } from "fs/promises";
import path from "path";

const execPromise = util.promisify(exec);
const RAW_OUTPUT_MAX_LEN = 450;
const COMMIT_LOG_MAX_LEN = 950;
const PULLED_BRANCH = "develop";
const GIT_LOG_FILE = path.join(process.cwd(), "git_outputs.txt");

function colorizeGitOutput(text, branchToHighlight) {
  if (!text) return "";
  let coloredText = text;

  const branchPattern = branchToHighlight
    ? branchToHighlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    : null;

  coloredText = coloredText.replace(
    /^((?:[^|\n])+?\s*\|\s*\d+\s*)[+-]+$/gm,
    "$1"
  );

  coloredText = coloredText.replace(
    /^(\s*\*\s*branch\s+)([a-zA-Z0-9_\-\/]+)((?:\s*->\s*.+)?|\s*\(.+\)|\s+[0-9a-fA-F]{7,}\s+.+)?/gm,
    (_, p1, p2, p3) => {
      const refinedP1 = p1.replace(/\s+$/, " ");
      const refinedP3 = p3 ? p3.replace(/^\s+/, " ").replace(/\s+$/, "") : "";
      return `${refinedP1}\u001b[2;34m${p2}\u001b[0m${refinedP3 || ""}`;
    }
  );

  coloredText = coloredText.replace(
    /(\d+)\s+insertions?\(\+\)/g,
    "\u001b[2;36m+\u001b[0m" + "\u001b[2;36m$1\u001b[0m"
  );

  coloredText = coloredText.replace(
    /(\d+)\s+deletions?\(\-\)/g,
    "\u001b[2;31m-\u001b[0m" + "\u001b[2;31m$1\u001b[0m"
  );

  if (branchPattern) {
    coloredText = coloredText.replace(
      new RegExp(`(\\b${branchPattern}\\b)(\\s*->)`, "g"),
      `\u001b[2;34m$1\u001b[0m ->`
    );
    coloredText = coloredText.replace(
      new RegExp(`([a-zA-Z0-9_\\-\\/]+\\/)(${branchPattern})(\\b|$)`, "gm"),
      `$1\u001b[2;34m$2\u001b[0m$3`
    );
  }

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
    if (interaction.user.id !== ownerId) {
      await interaction.reply({
        content:
          "このコマンドを使用する権限がありません。\nYou are not authorized to use this command.",
        ephemeral: true,
      });
      return;
    }

    const isTestMode = interaction.options.getBoolean("test") ?? false;

    if (isTestMode) {
      await interaction.deferReply({ ephemeral: false });

      const embed = new EmbedBuilder()
        .setTitle("BOTの更新 (テストモード)")
        .setColor(Colors.yellow)
        .setDescription("テスト用のGitプルシミュレーション中...")
        .setTimestamp()
        .setFooter({
          text: "これはテスト実行です。BOTは実際の更新や再起動を行いません。",
        });

      await interaction.editReply({ embeds: [embed] });

      const day = new Date().getDate();

      if (day % 2 === 0) {
        const fakeCommitLog = `a1b2c3d - feat: Add commit messages to update command\ne4f5g6h - fix: Correctly handle API rate limits\n7h8i9j0 - docs: Update README with new commands`;
        const fakeGitStdout = `Updating abc1234..def5678\nFast-forward\n src/commands/update/index.js | 88 +++--\n package.json                 | 2 +-\n 2 files changed, 69 insertions(+), 21 deletions(-)`;
        const fakeGitStderr = `From https://github.com/chev0004/Maybe-Bot\n * branch ${PULLED_BRANCH} -> FETCH_HEAD`;

        embed
          .addFields(
            {
              name: "更新内容 / Changes (Simulated)",
              value: `\`\`\`\n${fakeCommitLog}\n\`\`\``,
            },
            {
              name: "Git Output (Simulated stdout)",
              value: `\`\`\`ansi\n${colorizeGitOutput(
                fakeGitStdout,
                PULLED_BRANCH
              )}\n\`\`\``,
            },
            {
              name: "Git Output (Simulated stderr)",
              value: `\`\`\`ansi\n${colorizeGitOutput(
                fakeGitStderr,
                PULLED_BRANCH
              )}\n\`\`\``,
            },
            {
              name: "NPM Install (Simulated)",
              value:
                "```\nDependencies in package.json changed. `npm install` would run here.\n```",
            }
          )
          .setColor(Colors.green)
          .setDescription("テスト用のGitプルシミュレーション完了。");
      } else {
        embed
          .setColor(Colors.purple)
          .setDescription(
            `BOTは既に最新の状態です (${PULLED_BRANCH} ブランチ)。(シミュレーション)`
          );
      }

      await interaction.editReply({ embeds: [embed] });
      return;
    }

    const logParts = [];
    const timestamp = new Date().toISOString();
    logParts.push(
      `\n==================== UPDATE RUN AT ${timestamp} ====================\n`
    );

    const writeLog = async (status) => {
      logParts.push(
        `\n==================== UPDATE ${status.toUpperCase()} AT ${new Date().toISOString()} ====================\n`
      );
      try {
        await appendFile(GIT_LOG_FILE, logParts.join("\n"), "utf8");
      } catch (writeError) {
        console.error("Failed to write to git_outputs.txt:", writeError);
      }
    };

    await interaction.deferReply({ ephemeral: false });

    const embed = new EmbedBuilder()
      .setTitle("BOTの更新")
      .setColor(Colors.yellow)
      .setDescription(`最新のコミット (${PULLED_BRANCH} ブランチ) を確認中...`)
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });

    try {
      logParts.push("$ git fetch origin");
      const { stdout: fetchStdout, stderr: fetchStderr } = await execPromise(
        "git fetch origin"
      );
      if (fetchStdout) logParts.push("--- STDOUT ---\n" + fetchStdout);
      if (fetchStderr) logParts.push("--- STDERR ---\n" + fetchStderr);

      logParts.push(`$ git diff HEAD..origin/${PULLED_BRANCH} -- package.json`);
      const { stdout: packageJsonDiff } = await execPromise(
        `git diff HEAD..origin/${PULLED_BRANCH} -- package.json`
      );
      if (packageJsonDiff) logParts.push("--- STDOUT ---\n" + packageJsonDiff);
      const needsNpmInstall = packageJsonDiff.length > 0;

      logParts.push(
        `$ git log HEAD..origin/${PULLED_BRANCH} --pretty=format:"%h - %s"`
      );
      const { stdout: commitLog } = await execPromise(
        `git log HEAD..origin/${PULLED_BRANCH} --pretty=format:"%h - %s"`
      );
      if (commitLog) logParts.push("--- STDOUT ---\n" + commitLog);

      if (!commitLog && !needsNpmInstall) {
        embed
          .setColor(Colors.purple)
          .setDescription(
            `BOTは既に最新の状態です (${PULLED_BRANCH} ブランチ)。`
          )
          .setFooter({ text: "変更はありません。BOTは再起動しません。" });
        await interaction.editReply({ embeds: [embed] });
        await writeLog("COMPLETE - NO CHANGES");
        return;
      }

      if (commitLog) {
        let formattedCommits = commitLog;
        const commitLines = commitLog.split("\n");
        if (commitLog.length > COMMIT_LOG_MAX_LEN) {
          let currentLength = 0;
          const visibleLines = [];
          for (const line of commitLines) {
            if (currentLength + line.length + 1 > COMMIT_LOG_MAX_LEN) break;
            visibleLines.push(line);
            currentLength += line.length + 1;
          }
          formattedCommits = visibleLines.join("\n");
          const remaining = commitLines.length - visibleLines.length;
          if (remaining > 0) {
            formattedCommits += `\n...他 ${remaining} 件のコミット (...and ${remaining} more commits)`;
          }
        }
        embed.addFields({
          name: "更新内容 / Changes",
          value: `\`\`\`\n${formattedCommits}\n\`\`\``,
        });
      } else if (needsNpmInstall) {
        embed.addFields({
          name: "更新内容 / Changes",
          value:
            "```\npackage.json の依存関係が変更されました。\nDependencies in package.json have been changed.\n```",
        });
      }

      embed.setDescription(`更新を適用中... (${PULLED_BRANCH} ブランチ)`);
      await interaction.editReply({ embeds: [embed] });

      logParts.push(`$ git pull origin ${PULLED_BRANCH}`);
      const { stdout: gitStdout, stderr: gitStderr } = await execPromise(
        `git pull origin ${PULLED_BRANCH}`
      );
      if (gitStdout) logParts.push("--- STDOUT ---\n" + gitStdout);
      if (gitStderr) logParts.push("--- STDERR ---\n" + gitStderr);

      const fields = [];
      if (gitStdout) {
        fields.push({
          name: "Git Output (stdout)",
          value: `\`\`\`ansi\n${colorizeGitOutput(
            gitStdout.substring(0, RAW_OUTPUT_MAX_LEN),
            PULLED_BRANCH
          )}\n\`\`\``,
          inline: false,
        });
      }
      if (gitStderr) {
        fields.push({
          name: "Git Output (stderr)",
          value: `\`\`\`ansi\n${colorizeGitOutput(
            gitStderr.substring(0, RAW_OUTPUT_MAX_LEN),
            PULLED_BRANCH
          )}\n\`\`\``,
          inline: false,
        });
      }
      embed.addFields(...fields);

      if (needsNpmInstall) {
        embed.setDescription("更新を適用しました。依存関係をインストール中...");
        await interaction.editReply({ embeds: [embed] });

        try {
          logParts.push("$ npm install");
          const { stdout: npmStdout, stderr: npmStderr } = await execPromise(
            "npm install"
          );
          if (npmStdout) logParts.push("--- STDOUT ---\n" + npmStdout);
          if (npmStderr) logParts.push("--- STDERR ---\n" + npmStderr);
          embed.addFields({
            name: "NPM Install Output",
            value: `\`\`\`\n${npmStdout.substring(
              0,
              RAW_OUTPUT_MAX_LEN
            )}\n\`\`\``,
            inline: false,
          });
        } catch (npmError) {
          console.error("Error during npm install:", npmError);
          logParts.push("--- NPM INSTALL FAILED ---");
          if (npmError.stdout)
            logParts.push("--- STDOUT ---\n" + npmError.stdout);
          if (npmError.stderr)
            logParts.push("--- STDERR ---\n" + npmError.stderr);

          embed
            .setColor(Colors.red)
            .setDescription("依存関係のインストール中にエラーが発生しました。")
            .setFooter({
              text: "BOTの更新に失敗しました。再起動を中止します。",
            });

          const errorFields = [];
          if (npmError.stdout) {
            errorFields.push({
              name: "NPM Error Output (stdout)",
              value: `\`\`\`\n${npmError.stdout.substring(0, 1000)}\n\`\`\``,
            });
          }
          if (npmError.stderr) {
            errorFields.push({
              name: "NPM Error Output (stderr)",
              value: `\`\`\`\n${npmError.stderr.substring(0, 1000)}\n\`\`\``,
            });
          }
          embed.spliceFields(
            embed.data.fields.length - fields.length,
            fields.length
          );
          embed.addFields(...fields, ...errorFields);

          await interaction.editReply({ embeds: [embed] });
          await writeLog("FAILED - NPM INSTALL");
          return;
        }
      }

      embed
        .setColor(Colors.green)
        .setDescription(`通常に更新されました。`)
        .setFooter({ text: "BOTが再起動中..." });
      await interaction.editReply({ embeds: [embed] });

      const restartInfo = {
        triggeringUserId: interaction.user.id,
        channelId: interaction.channel.id,
        timestamp: Date.now(),
      };
      await setRestartInfo(restartInfo);
      console.log(`Restart info saved after /update command.`);
      
      await writeLog("SUCCESS - RESTARTING");

      setTimeout(() => {
        console.log(
          `Bot restarting due to /update command (${PULLED_BRANCH} branch)...`
        );
        process.exit(0);
      }, 3000);
    } catch (error) {
      console.error("Error during update process:", error);
      logParts.push("--- UPDATE PROCESS FAILED ---");
      if (error.stdout) logParts.push("--- STDOUT ---\n" + error.stdout);
      if (error.stderr) logParts.push("--- STDERR ---\n" + error.stderr);
      logParts.push("--- ERROR OBJECT ---\n" + util.inspect(error));

      embed
        .setColor(Colors.red)
        .setDescription("更新プロセス中にエラーが発生しました。")
        .setFooter({ text: "BOTの更新に失敗しました。" });

      const errorFields = [];
      if (error.stdout) {
        errorFields.push({
          name: "Error Output (stdout)",
          value: `\`\`\`\n${error.stdout.substring(0, 1000)}\n\`\`\``,
        });
      }
      if (error.stderr) {
        errorFields.push({
          name: "Error Output (stderr)",
          value: `\`\`\`\n${error.stderr.substring(0, 1000)}\n\`\`\``,
        });
      }
      embed.setFields(errorFields);

      await interaction.editReply({ embeds: [embed] });
      await writeLog("FAILED - GIT ERROR");
    }
  },
};