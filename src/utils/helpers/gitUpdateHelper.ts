import { setColor } from "./ansiColorHelper.js";

const summaryLineRegex = /(\d+ files? changed.*)/;
const fileChangeRegex = /(.+?)\s+\|\s+\d+\s*[+-]*/;
const renameDetectionRegex = /(.+)\{(.+) => (.+)\}(.*)/;
const mergeCommitRegex =
  /^Merge (pull request|PR) #(\d+) from (\S+)|Merge branch '(\S+)'/;

interface GitUpdateOutput {
  changes: string;
  files: string;
  repo: string;
}

/**
 * Parses the raw output from git commands to create formatted, colorized text for an embed.
 * @param commitLog - The raw output from `git log`.
 * @param gitStdout - The raw standard output from `git pull` or `git reset`.
 * @param gitStderr - The raw standard error from `git pull` or `git fetch`.
 * @returns An object with formatted strings.
 */
export const parseGitUpdateOutput = (
  commitLog: string,
  gitStdout: string,
  gitStderr: string,
): GitUpdateOutput => {
  const changes = commitLog
    .split("\n")
    .map((line) => {
      if (!line.trim()) return "";
      const parts = line.split(" - ");
      const hash = parts[0];
      const message = parts.slice(1).join(" - ");

      const mergeMatch = message.match(mergeCommitRegex);
      if (mergeMatch) {
        let shortMessage: string;
        if (mergeMatch[2] && mergeMatch[3]) {
          shortMessage = `Merged PR #${mergeMatch[2]} from ${mergeMatch[3]}`;
        } else if (mergeMatch[4]) {
          shortMessage = `Merged branch '${mergeMatch[4]}'`;
        } else {
          shortMessage =
            message.length > 50 ? `${message.slice(0, 47)}...` : message;
        }
        return `${setColor("dimYellow", hash)} - ${setColor("dimCyan", shortMessage)}`;
      }

      return `${setColor("dimYellow", hash)} - ${message}`;
    })
    .filter((line) => line)
    .join("\n");
  let repoUrl = "https://github.com/chev0004/Maybe-Bot";
  let branchName = "develop";

  const fromMatch = gitStderr.match(/From (.+)/);
  if (fromMatch) repoUrl = fromMatch[1];
  const branchMatch = gitStderr.match(/(?:\* branch|\s+)(\S+)\s+->/);
  if (branchMatch) branchName = branchMatch[1];

  const repo = `From: ${repoUrl}\nBranch: ${setColor("dimBlue", branchName)}`;
  const outputLines = gitStdout.split("\n");
  const formattedFileLines: string[] = [];

  for (const line of outputLines) {
    const fileChangeMatch = line.match(fileChangeRegex);
    if (fileChangeMatch) {
      const filePath = fileChangeMatch[1].trim();
      const renameMatch = filePath.match(renameDetectionRegex);
      if (renameMatch) {
        const [, pre, oldPart, newPart, post] = renameMatch;
        const fromPath = `${pre}${oldPart}${post}`.trim();
        const toPath = `${pre}${newPart}${post}`.trim();
        formattedFileLines.push(
          `${setColor("dimYellow", "rn:")} ${fromPath}`,
          `${setColor("dimYellow", "to:")} ${toPath}`,
        );
      } else {
        formattedFileLines.push(filePath);
      }
    }
  }

  const summaryMatch = gitStdout.match(summaryLineRegex);
  if (summaryMatch) {
    const summaryLine = summaryMatch[1];
    const insertionsMatch = summaryLine.match(/(\d+) insertions?\(\+\)/);
    const deletionsMatch = summaryLine.match(/(\d+) deletions?\(-\)/);
    const insertions = insertionsMatch ? insertionsMatch[1] : "0";
    const deletions = deletionsMatch ? deletionsMatch[1] : "0";

    const summaryText = summaryLine.split(",")[0];
    const coloredSummary = `${summaryText}, ${setColor(
      "dimCyan",
      `+${insertions}`,
    )}, ${setColor("dimRed", `-${deletions}`)}`;

    formattedFileLines.push(coloredSummary);
  }

  let files = "No file changes detected.";
  if (formattedFileLines.length > 0) {
    files = formattedFileLines.join("\n");
  }

  const finalChanges =
    changes.trim() ||
    setColor("dimRed", "No new commits found or error parsing log.");
  return { changes: finalChanges, files, repo };
};
