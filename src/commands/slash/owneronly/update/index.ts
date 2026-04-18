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
 * @param command The command to run (e.g., "npm")
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

const inlineCode = (text: string): string => `\`${text.replace(/`/g, "'")}\``;

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
          value: `\`\`\`\n${truncateField(mockData.npmOutput || "Simulated npm install output.")}\n\`\`\``,
        });
      }

      await interaction.editReply({ embeds: [embed] });
      return;
    }

    await interaction.deferReply();
    const embed = new EmbedBuilder()
      .setTitle(`BOTの更新${isForceMode ? " (FORCE)" : ""}`)
      .setColor(Colors.yellow)
      .setDescription(
        isForceMode
          ? `最新のコミットを確認中... ローカルの変更はすべて破棄されます（${inlineCode(`git reset --hard origin/${PULLED_BRANCH}`)}）。`
          : `最新のコミット（${inlineCode(PULLED_BRANCH)}）を確認中...`,
      );
    await interaction.editReply({ embeds: [embed] });

    try {
      try {
        await execPromise("git rev-parse --is-inside-work-tree");
      } catch {
        embed
          .setColor(Colors.red)
          .setDescription(
            "Gitリポジトリ内で実行されていません。BOTをリポジトリのルートから起動してください。",
          );
        await interaction.editReply({ embeds: [embed] });
        return;
      }

      console.log("[Logger] Running: git fetch origin");
      const { stderr: fetchStderr } = await execPromise("git fetch origin");
      if (fetchStderr) console.warn("[Logger] git fetch stderr:", fetchStderr);

      try {
        await execPromise(`git rev-parse origin/${PULLED_BRANCH}`);
      } catch {
        embed
          .setColor(Colors.red)
          .setDescription(
            `リモートブランチ ${inlineCode(`origin/${PULLED_BRANCH}`)} が見つかりません。${inlineCode("git fetch origin")} を確認してください。`,
          );
        await interaction.editReply({ embeds: [embed] });
        return;
      }

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
            `BOTは既に最新の状態です（${inlineCode(PULLED_BRANCH)}）。`,
          );
        await interaction.editReply({ embeds: [embed] });
        return;
      }

      if (!isForceMode) {
        console.log("[Logger] Running: git restore dist/");
        await execPromise("git restore dist/").catch(() => {});
      }

      const { stdout: headBeforeStdout } =
        await execPromise("git rev-parse HEAD");
      const headBefore = headBeforeStdout.trim();

      const pullCommand = isForceMode
        ? `git reset --hard origin/${PULLED_BRANCH}`
        : `git pull origin ${PULLED_BRANCH}`;

      let pullStdout: string;
      let pullStderr: string;
      try {
        console.log(`[Logger] Running: ${pullCommand}`);
        const result = await execPromise(pullCommand);
        pullStdout = result.stdout;
        pullStderr = result.stderr;
        if (pullStdout) console.log("[Logger] git pull stdout:", pullStdout);
        if (pullStderr) console.warn("[Logger] git pull stderr:", pullStderr);
      } catch (pullError) {
        const err = pullError as ProcessError;
        const stderr = err.stderr ?? "";
        const hasConflict =
          /conflict|CONFLICT|merge conflict/i.test(stderr) ||
          /conflict|CONFLICT/i.test(err.message);
        embed
          .setColor(Colors.red)
          .setDescription(
            hasConflict
              ? `${inlineCode(pullCommand)} でコンフリクトが発生しました。force オプションで上書きするか、サーバーで手動で解決してください。`
              : `${inlineCode(pullCommand)} に失敗しました。`,
          )
          .setFields({
            name: "Error",
            value: `\`\`\`\n${truncateField(stderr || err.stdout || err.message)}\n\`\`\``,
          });
        await interaction.editReply({ embeds: [embed] }).catch(console.error);
        return;
      }

      let statStdout = "";
      try {
        const { stdout: diffStatOut } = await execPromise(
          `git diff --stat=300 --no-color ${headBefore} HEAD -- . ':(exclude)dist' ':(exclude)dist/**'`,
        );
        statStdout = diffStatOut;
      } catch (statErr) {
        console.warn("[Logger] git diff --stat failed:", statErr);
      }

      const { changes, files, repo } = parseGitUpdateOutput(
        commitLog,
        statStdout || pullStdout,
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

      try {
        const { stdout: diffNames } = await execPromise(
          `git diff --name-only ${headBefore} HEAD`,
        );
        const changedPaths = diffNames.split("\n").map((s) => s.trim());
        const distTouched = changedPaths.some(
          (p) => p === "dist" || p.startsWith("dist/"),
        );
        if (changedPaths.length > 0 && !distTouched) {
          embed.addFields({
            name: "⚠ dist/ の更新がありません",
            value: `今回のコミットに ${inlineCode("dist/")} が含まれていません。ローカルで ${inlineCode("npm run build")} して ${inlineCode("dist/")} をコミットしてから ${inlineCode("git push")} してください。`,
          });
        }
      } catch {
        // best-effort; ignore if diff fails
      }

      if (needsNpmInstall) {
        embed.addFields({
          name: "依存関係 / Dependencies",
          value: `${inlineCode("npm install --production")} を処理中... (コンソールでログを確認)`,
        });
        await interaction.editReply({ embeds: [embed] });

        const progressInterval = setInterval(() => {
          const fields = embed.data.fields ?? [];
          if (fields.length === 0) return;
          const prev = fields.slice(0, -1);
          const updated = [
            ...prev,
            {
              name: "依存関係 / Dependencies",
              value: `${inlineCode("npm install --production")} をインストール中... (まだ処理中です)`,
            },
          ];
          interaction
            .editReply({ embeds: [embed.setFields(...updated)] })
            .catch(() => {});
        }, 60_000);

        try {
          console.log("[Logger] Starting: npm install --production");
          const { stdout: installStdout } = await spawnWithLogs("npm", [
            "install",
            "--production",
          ]);
          console.log("[Logger] Finished: npm install");
          clearInterval(progressInterval);

          const addedMatch =
            installStdout.match(/(\d+)\s+packages? added/) ??
            installStdout.match(/(\d+)\s+packages? installed/);
          const timeMatch = installStdout.match(/in ([\d.]+s)/);
          const summaryLines = [];
          if (addedMatch)
            summaryLines.push(`- Installed: ${addedMatch[1]} packages`);
          if (timeMatch) summaryLines.push(`- Time: ${timeMatch[1]}`);
          embed.spliceFields(-1, 1, {
            name: "依存関係 / Dependencies",
            value: `\`\`\`\n${truncateField(summaryLines.join("\n") || "Install completed.")}\n\`\`\``,
          });
        } catch (installError) {
          clearInterval(progressInterval);
          console.error("Error during dependency install:", installError);
          const err = installError as Error & {
            stderr?: string;
            stdout?: string;
          };
          const isOom = err.message.includes("137");
          try {
            await execPromise(`git reset --hard ${headBefore}`);
          } catch (revertErr) {
            console.error("Failed to revert after install error:", revertErr);
          }
          const description = isOom
            ? `依存関係のインストール中にプロセスが強制終了しました（${inlineCode("exit 137")}）。サーバーのメモリ不足の可能性があります。リポジトリは更新前の状態に戻しました。メモリを増やすか、手動で ${inlineCode("npm install --production")} を実行してから再度 ${inlineCode("/update")} してください。`
            : `依存関係のインストール中にエラーが発生しました。リポジトリは更新前の状態に戻しました。修正後に再度 ${inlineCode("/update")} してください。`;
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
