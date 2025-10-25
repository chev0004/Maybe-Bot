import { exec } from "child_process";
import { EmbedBuilder, MessageFlags } from "discord.js";
import util from "util";
import { Colors } from "../../../../constants/Colors.js";
import { createCommand } from "../../../../utils/builders/commandBuilder.js";
import { parseGitUpdateOutput } from "../../../../utils/helpers/gitUpdateHelper.js";
import { setRestartInfo } from "../../../../utils/managers/dataManager.js";
import { getMockUpdateData, parseMockGitUpdateOutput } from "./update.mock.js";

const execPromise = util.promisify(exec);
const PULLED_BRANCH = "develop";

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
          name: mockData.npmFieldName || "NPM Install (Simulated)",
          value: `\`\`\`\n${truncateField(mockData.npmOutput || "Simulated NPM install output.")}\n\`\`\``,
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
      const { stderr: fetchStderr } = await execPromise("git fetch origin");
      const { stdout: commitLog } = await execPromise(
        `git log HEAD..origin/${PULLED_BRANCH} --pretty=format:"%h - %s"`,
      );
      const { stdout: packageJsonDiff } = await execPromise(
        `git diff HEAD..origin/${PULLED_BRANCH} -- package.json`,
      );
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

      const pullCommand = isForceMode
        ? `git reset --hard origin/${PULLED_BRANCH}`
        : `git pull origin ${PULLED_BRANCH}`;
      const { stdout: pullStdout } = await execPromise(pullCommand);

      const { changes, files, repo } = parseGitUpdateOutput(
        commitLog,
        pullStdout,
        fetchStderr,
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
          value: "```依存関係を処理中...```",
        });
        await interaction.editReply({ embeds: [embed] });

        try {
          const { stdout: npmStdout } = await execPromise("npm install");
          const addedMatch = npmStdout.match(/added (\d+ packages?)/);
          const auditMatch = npmStdout.match(/audited (\d+ packages?)/);
          const timeMatch = npmStdout.match(/in (\d+s|\d+\.\d+s)/);
          const vulnerabilityMatch = npmStdout.match(
            /(\d+)\s+(low|moderate|high|critical)\s+severity vulnerabilities/,
          );
          const summaryLines = [];
          if (addedMatch) summaryLines.push(`- Added: ${addedMatch[1]}`);
          if (auditMatch) summaryLines.push(`- Audited: ${auditMatch[1]}`);
          if (timeMatch) summaryLines.push(`- Time: ${timeMatch[1]}`);
          if (vulnerabilityMatch)
            summaryLines.push(`- Vulnerabilities: ${vulnerabilityMatch[0]}`);
          embed.spliceFields(-1, 1, {
            name: "依存関係 / Dependencies",
            value: `\`\`\`\n${truncateField(summaryLines.join("\n") || "NPM install completed.")}\n\`\`\``,
          });
        } catch (npmError) {
          console.error("Error during npm install:", npmError);
          const err = npmError as Error & { stderr?: string; stdout?: string };
          embed
            .setColor(Colors.red)
            .setDescription(
              "依存関係のインストール中にエラーが発生しました。BOTの更新は行われましたが、再起動は中止します。",
            )
            .spliceFields(-1, 1, {
              name: "NPM Install Error",
              value: `\`\`\`\n${truncateField(err.stderr || err.stdout || err.message)}\n\`\`\``,
            });
          await interaction.editReply({ embeds: [embed] });
          return;
        }
      }

      embed.addFields({
        name: "ビルド / Build",
        value: "```ビルディング... / Building...```",
      });
      await interaction.editReply({ embeds: [embed] });

      try {
        await execPromise("npm run build");

        embed.spliceFields(-1, 1, {
          name: "ビルド / Build",
          value: "```ビルド完了 / Build complete.```",
        });
      } catch (buildError) {
        console.error("Error during build:", buildError);
        const err = buildError as Error & { stderr?: string; stdout?: string };
        embed
          .setColor(Colors.red)
          .setDescription(
            "ビルド中にエラーが発生しました。BOTは更新されましたが、再起動は中止します。",
          )
          .spliceFields(-1, 1, {
            name: "NPM Build Error",
            value: `\`\`\`\n${truncateField(err.stderr || err.stdout || err.message)}\n\`\`\``,
          });
        await interaction.editReply({ embeds: [embed] });
        return;
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
      const err = error as Error & { stderr?: string };
      embed
        .setColor(Colors.red)
        .setDescription("更新プロセス中にエラーが発生しました。")
        .setFields({
          name: "Error",
          value: `\`\`\`\n${truncateField(err.stderr || err.message)}\n\`\`\``,
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
              { name: "NPM Install Update", value: "npm" },
            ),
        );
      return builder;
    },
  },
);
