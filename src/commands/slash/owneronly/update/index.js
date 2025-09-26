import { exec } from "child_process";
import { EmbedBuilder, MessageFlags } from "discord.js";
import util from "util";
import { Colors } from "../../../../constants/Colors.js";
import { createCommand } from "../../../../utils/builders/commandBuilder.js";
import { parseGitUpdateOutput } from "../../../../utils/helpers/gitUpdateHelper.js";
import { setRestartInfo } from "../../../../utils/managers/dataManager.js";

const execPromise = util.promisify(exec);
const PULLED_BRANCH = "develop";

export default createCommand(
  "update",
  "GitHubから最新のコミットを取得し、BOTを再起動する。Pulls the latest changes from GitHub and restarts the bot.",
  async (interaction) => {
    const isTestMode = interaction.options.getBoolean("test") ?? false;
    const isForceMode = interaction.options.getBoolean("force") ?? false;
    const testScenario = interaction.options.getString("test_scenario");

    if (isTestMode) {
      await interaction.deferReply({ Flags: MessageFlags.Ephemeral });

      let fakeCommitLog, fakePullStdout, fakeFetchStderr, fakeNpmOutput;
      let needsNpmInstall = false;
      let npmFieldName = "NPM Install (Simulated)";

      switch (testScenario) {
        case "rename":
          fakeCommitLog = "1ecc43f - refactor: rename folder";
          fakePullStdout = `Updating 442cd19..1ecc43f\nFast-forward\n src/commands/{confessions => social}/confess/index.js | 0\n 2 files changed, 0 insertions(+), 0 deletions(-)\n rename src/commands/{confessions => social}/confess/index.js (100%)`;
          fakeFetchStderr = `From https://github.com/chev0004/Maybe-Bot\n   442cd19..1ecc43f  develop    -> origin/develop`;
          break;
        case "npm":
          fakeCommitLog = "a1b2c3d - feat: add new dependency";
          fakePullStdout = `Updating 1ecc43f..a1b2c3d\nFast-forward\n package.json | 2 +-\n 1 file changed, 1 insertion(+), 1 deletion(-)`;
          fakeFetchStderr = `From https://github.com/chev0004/Maybe-Bot\n   1ecc43f..a1b2c3d  develop    -> origin/develop`;
          needsNpmInstall = true;
          npmFieldName = "依存関係 / Dependencies (Simulated)";
          fakeNpmOutput = [
            "+ some-new-package@1.2.3",
            "+ another-dependency@4.5.6",
            "",
            "Added 2 packages, audited 153 packages in 4.2s",
            "Found 3 low severity vulnerabilities",
          ].join("\n");
          break;
        default:
          fakeCommitLog = "442cd19 - test: see git output";
          fakePullStdout = `Updating 2c3c50f..442cd19\nFast-forward\n src/commands/owneronly/update/index.js | 1 +\n 1 file changed, 1 insertion(+)`;
          fakeFetchStderr = `From https://github.com/chev0004/Maybe-Bot\n   2c3c50f..442cd19  develop    -> origin/develop`;
          break;
      }

      const { changes, files, repo } = parseGitUpdateOutput(
        fakeCommitLog,
        fakePullStdout,
        fakeFetchStderr,
      );

      const embed = new EmbedBuilder()
        .setTitle(`BOTの更新 (TEST${isForceMode ? " / FORCE" : ""})`)
        .setColor(Colors.yellow)
        .setDescription(
          "これはテスト実行です。BOTは実際の更新や再起動を行いません。",
        )
        .setFields(
          {
            name: "更新内容 / Changes",
            value: `\`\`\`ansi\n${changes}\n\`\`\``,
          },
          {
            name: "更新ファイル / Files Changed",
            value: `\`\`\`ansi\n${files}\n\`\`\``,
          },
          {
            name: "リポジトリ / Repository",
            value: `\`\`\`ansi\n${repo}\n\`\`\``,
          },
        )
        .setFooter({
          text: `BOTは再起動しません • ${new Date().toLocaleDateString("ja-JP")}`,
        });

      if (needsNpmInstall) {
        embed.addFields({
          name: npmFieldName,
          value: `\`\`\`\n${fakeNpmOutput}\n\`\`\``,
        });
      }

      return await interaction.editReply({ embeds: [embed] });
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

      if (!commitLog && !needsNpmInstall) {
        embed
          .setColor(Colors.purple)
          .setDescription(
            `BOTは既に最新の状態です (${PULLED_BRANCH} ブランチ)。`,
          );
        return await interaction.editReply({ embeds: [embed] });
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
            value: `\`\`\`ansi\n${changes}\n\`\`\``,
          },
          {
            name: "更新ファイル / Files Changed",
            value: `\`\`\`ansi\n${files}\n\`\`\``,
          },
          {
            name: "リポジトリ / Repository",
            value: `\`\`\`ansi\n${repo}\n\`\`\``,
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
            value: `\`\`\`\n${summaryLines.join("\n")}\n\`\`\``,
          });
        } catch (npmError) {
          console.error("Error during npm install:", npmError);
          embed
            .setColor(Colors.red)
            .setDescription(
              "依存関係のインストール中にエラーが発生しました。BOTの更新は行われましたが、再起動は中止します。",
            )
            .spliceFields(-1, 1, {
              name: "NPM Install Error",
              value: `\`\`\`\n${npmError.stderr || npmError.stdout || npmError.message}\n\`\`\``,
            });
          return await interaction.editReply({ embeds: [embed] });
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
        console.log(`Bot restarting due to /update command...`);
        process.exit(0);
      }, 3000);
    } catch (error) {
      console.error("Error during update process:", error);
      embed
        .setColor(Colors.red)
        .setDescription("更新プロセス中にエラーが発生しました。")
        .setFields({
          name: "Error",
          value: `\`\`\`\n${error.stderr || error.message}\n\`\`\``,
        });

      await interaction.editReply({ embeds: [embed] }).catch(console.error);
    }
  },
  {
    ownerOnly: true,
    setup: (builder) =>
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
        ),
  },
);
