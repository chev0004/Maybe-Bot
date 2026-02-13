import { exec, spawn } from "child_process";
import { EmbedBuilder, MessageFlags } from "discord.js";
import util from "util";
import { Colors } from "../../../../constants/Colors.js";
import { createCommand } from "../../../../utils/builders/commandBuilder.js";
import { parseGitUpdateOutput } from "../../../../utils/helpers/gitUpdateHelper.js";
import { setRestartInfo } from "../../../../utils/managers/dataManager.js";
import { getMockUpdateData, parseMockGitUpdateOutput } from "./update.mock.js";

const execPromise = util.promisify(exec);
const PULLED_BRANCH = "develop";

class ProcessError extends Error {
  public stdout: string;
  public stderr: string;

  constructor(message: string, stdout: string, stderr: string) {
    super(message);
    this.name = "ProcessError";
    this.stdout = stdout;
    this.stderr = stderr;
  }
}

/**
 * Spawns a child process and streams its stdout/stderr to the main process
 * console in real-time. Also captures the full output for later use.
 * @param command The command to run (e.g., "bun")
 * @param args An array of arguments (e.g., ["install"])
 * @returns A promise that resolves with the captured stdout and stderr.
 */
const spawnWithLogs = (
  command: string,
  args: string[],
): Promise<{ stdout: string; stderr: string }> => {
  return new Promise((resolve, reject) => {
    console.log(`[Logger] Running command: ${command} ${args.join(" ")}`);
    const child = spawn(command, args, { shell: true });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (data) => {
      process.stdout.write(data);
      stdout += data.toString();
    });

    child.stderr.on("data", (data) => {
      process.stderr.write(data);
      stderr += data.toString();
    });

    child.on("close", (code) => {
      if (code === 0) {
        console.log(`[Logger] Command finished: ${command} ${args.join(" ")}`);
        resolve({ stdout, stderr });
      } else {
        const error = new ProcessError(
          `Process exited with code ${code}`,
          stdout,
          stderr,
        );
        console.error(`[Logger] Command failed: ${command} ${args.join(" ")}`);
        if (stdout) console.error("[Logger] Stdout:", stdout);
        if (stderr) console.error("[Logger] Stderr:", stderr);
        reject(error);
      }
    });

    child.on("error", (err) => {
      console.error(`[Logger] Failed to start command: ${command}`, err);
      reject(err);
    });
  });
};

const truncateField = (text: string, maxLength = 1000): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
};

export default createCommand(
  "update",
  "GitHubから最新のコミットを取得し、BOTを再起動する。Pulls the latest changes from GitHub and restarts the bot.",
  async (interaction): Promise<void> => {
    const isTestMode = interaction.options.getBoolean("test") ?? false;
    const isForceMode = interaction.options.getBoolean("force") ?? false;
    const testScenario = interaction.options.getString("test_scenario");

    if (isTestMode) {
      await interaction.deferReply({ flags: MessageFlags.Ephemeral });

      const mockData = getMockUpdateData(testScenario);
      const { changes, files, repo } = parseMockGitUpdateOutput(testScenario);

      const embed = new EmbedBuilder()
        .setTitle(`BOTの更新 (TEST${isForceMode ? " / FORCE" : ""})`)
        .setColor(Colors.yellow)
        .setDescription(
          "これはテスト実行です。BOTは実際の更新や再起動を行いません。",
        )
        .setFields(
          {
            name: "更新内容 / Changes",
            value: `\`\`\`ansi\n${truncateField(changes)}\n\`\`\``,
          },
          {
            name: "更新ファイル / Files Changed",
            value: `\`\`\`ansi\n${truncateField(files)}\n\`\`\``,
          },
          {
            name: "リポジトリ / Repository",
            value: `\`\`\`ansi\n${truncateField(repo)}\n\`\`\``,
          },
        )
        .setFooter({
          text: `BOTは再起動しません • ${new Date().toLocaleDateString("ja-JP")}`,
        });
      if (mockData.needsNpmInstall) {
        embed.addFields({
          name: mockData.npmFieldName || "Dependencies (Simulated)",
          value: `\`\`\`\n${truncateField(mockData.npmOutput || "Simulated bun install output.")}\n\`\`\``,
        });
      }

      await interaction.editReply({ embeds: [embed] });
      return;
    }

    await interaction.deferReply();
    const embed = new EmbedBuilder()
      .setTitle(`BOTの更新${isForceMode ? " (FORCE)" : ""}`)
      .setColor(Colors.yellow)
      .setDescription(`最新のコミット (${PULLED_BRANCH} ブランチ) を確認中...`);
    await interaction.editReply({ embeds: [embed] });

    try {
      console.log("[Logger] Running: git fetch origin");
      const { stderr: fetchStderr } = await execPromise("git fetch origin");
      if (fetchStderr) console.warn("[Logger] git fetch stderr:", fetchStderr);

      console.log("[Logger] Running: git log");
      const { stdout: commitLog, stderr: logStderr } = await execPromise(
        `git log HEAD..origin/${PULLED_BRANCH} --pretty=format:"%h - %s"`,
      );
      if (commitLog) console.log("[Logger] git log stdout:", commitLog);
      if (logStderr) console.warn("[Logger] git log stderr:", logStderr);

      console.log("[Logger] Running: git diff package.json");
      const { stdout: packageJsonDiff, stderr: diffStderr } = await execPromise(
        `git diff HEAD..origin/${PULLED_BRANCH} -- package.json`,
      );
      if (packageJsonDiff)
        console.log("[Logger] git diff stdout:", packageJsonDiff);
      if (diffStderr) console.warn("[Logger] git diff stderr:", diffStderr);

      const needsNpmInstall = packageJsonDiff.length > 0;

      if (!isForceMode && !commitLog && !needsNpmInstall) {
        embed
          .setColor(Colors.purple)
          .setDescription(
            `BOTは既に最新の状態です (${PULLED_BRANCH} ブランチ)。`,
          );
        await interaction.editReply({ embeds: [embed] });
        return;
      }

      if (!isForceMode) {
        console.log("[Logger] Running: git restore dist/");
        await execPromise("git restore dist/").catch(() => {});
      }

      const pullCommand = isForceMode
        ? `git reset --hard origin/${PULLED_BRANCH}`
        : `git pull origin ${PULLED_BRANCH}`;

      console.log(`[Logger] Running: ${pullCommand}`);
      const { stdout: pullStdout, stderr: pullStderr } =
        await execPromise(pullCommand);
      if (pullStdout) console.log("[Logger] git pull stdout:", pullStdout);
      if (pullStderr) console.warn("[Logger] git pull stderr:", pullStderr);

      const { changes, files, repo } = parseGitUpdateOutput(
        commitLog,
        pullStdout,
        fetchStderr || pullStderr,
      );
      embed
        .setColor(Colors.green)
        .setDescription("正常に更新されました。")
        .setFields(
          {
            name: "更新内容 / Changes",
            value: `\`\`\`ansi\n${truncateField(changes)}\n\`\`\``,
          },
          {
            name: "更新ファイル / Files Changed",
            value: `\`\`\`ansi\n${truncateField(files)}\n\`\`\``,
          },
          {
            name: "リポジトリ / Repository",
            value: `\`\`\`ansi\n${truncateField(repo)}\n\`\`\``,
          },
        );

      if (needsNpmInstall) {
        embed.addFields({
          name: "依存関係 / Dependencies",
          value: "```依存関係を処理中... (コンソールでログを確認)```",
        });
        await interaction.editReply({ embeds: [embed] });

        try {
          console.log("[Logger] Starting: bun install --production");
          const { stdout: installStdout } = await spawnWithLogs("bun", [
            "install",
            "--production",
          ]);
          console.log("[Logger] Finished: bun install");

          const addedMatch = installStdout.match(/(\d+)\s+packages? installed/);
          const timeMatch = installStdout.match(/in ([\d.]+s)/);
          const summaryLines = [];
          if (addedMatch)
            summaryLines.push(`- Installed: ${addedMatch[1]} packages`);
          if (timeMatch) summaryLines.push(`- Time: ${timeMatch[1]}`);
          embed.spliceFields(-1, 1, {
            name: "依存関係 / Dependencies",
            value: `\`\`\`\n${truncateField(summaryLines.join("\n") || "bun install completed.")}\n\`\`\``,
          });
        } catch (installError) {
          console.error("Error during bun install:", installError);
          const err = installError as Error & {
            stderr?: string;
            stdout?: string;
          };
          const isOom = err.message.includes("137");
          const description = isOom
            ? "依存関係のインストール中にプロセスが強制終了しました (exit 137)。サーバーのメモリ不足の可能性があります。メモリを増やすか、手動で bun install --production を実行してください。"
            : "依存関係のインストール中にエラーが発生しました。BOTの更新は行われましたが、再起動は中止します。";
          embed
            .setColor(Colors.red)
            .setDescription(description)
            .spliceFields(-1, 1, {
              name: "Dependencies Error",
              value: `\`\`\`\n${truncateField(err.stderr || err.stdout || err.message)}\n\`\`\``,
            });
          await interaction.editReply({ embeds: [embed] });
          return;
        }
      }

      embed.setFooter({
        text: `BOTが再起動中... • ${new Date().toLocaleDateString("ja-JP")}`,
      });
      await interaction.editReply({ embeds: [embed] });

      const restartInfo = {
        triggeringUserId: interaction.user.id,
        channelId: interaction.channel.id,
        timestamp: Date.now(),
      };
      await setRestartInfo(restartInfo);

      setTimeout(() => {
        process.exit(0);
      }, 3000);
    } catch (error) {
      console.error("Error during update process:", error);
      const err = error as Error & { stderr?: string; stdout?: string };
      embed
        .setColor(Colors.red)
        .setDescription("更新プロセス中にエラーが発生しました。")
        .setFields({
          name: "Error",
          value: `\`\`\`\n${truncateField(err.stderr || err.stdout || err.message)}\n\`\`\``,
        });
      await interaction.editReply({ embeds: [embed] }).catch(console.error);
    }
  },
  {
    ownerOnly: true,
    setup: (builder) => {
      builder
        .addBooleanOption((option) =>
          option
            .setName("test")
            .setDescription(
              "TESTモードで実行し、実際の更新や再起動は行いません。",
            )
            .setRequired(false),
        )
        .addBooleanOption((option) =>
          option
            .setName("force")
            .setDescription("ローカルの変更を強制的に上書きします。")
            .setRequired(false),
        )
        .addStringOption((option) =>
          option
            .setName("test_scenario")
            .setDescription(
              "testモードでシミュレーションするシナリオを選択します。",
            )
            .setRequired(false)
            .addChoices(
              { name: "Normal Update", value: "normal" },
              { name: "Rename Update", value: "rename" },
              { name: "Dependencies Update", value: "npm" },
            ),
        );
      return builder;
    },
  },
);
