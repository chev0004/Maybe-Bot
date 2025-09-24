import { setColor } from "./ansiColorHelper.js";

const summaryRegex =
  /(\d+ files? changed(?:, (\d+ insertions?\(\+\))?(?:, (\d+ deletions?\(-\))?)))/;

const renameRegex = /rename (.+)\{(.+) => (.+)\}(.+) \((\d+%)\)/;

/**
 * Parses the raw output from git commands to create formatted, colorized text for an embed.
 * @param {string} commitLog - The raw output from `git log`.
 * @param {string} gitStdout - The raw standard output from `git pull` or `git reset`.
 * @param {string} gitStderr - The raw standard error from `git pull` or `git fetch`.
 * @returns {{changes: string, files: string, repo: string}} - An object with formatted strings.
 */
export const parseGitUpdateOutput = (commitLog, gitStdout, gitStderr) => {
  const changes = commitLog
    .split("\n")
    .map((line) => {
      const parts = line.split(" - ");
      return `${setColor("dimYellow", parts[0])} - ${parts.slice(1).join(" - ")}`;
    })
    .join("\n");

  let repoUrl = "https://github.com/chev0004/Maybe-Bot";
  let branchName = "develop";

  const fromMatch = gitStderr.match(/From (.+)/);
  if (fromMatch) repoUrl = fromMatch[1];

  const branchMatch = gitStderr.match(/(?:\* branch|\s+)(\S+)\s+->/);
  if (branchMatch) branchName = branchMatch[1];

  const repo = `From: ${repoUrl}\nBranch: ${setColor("dimBlue", branchName)}`;

  const lines = gitStdout.split("\n");
  let files = "";

  const renameMatch = gitStdout.match(renameRegex);
  if (renameMatch) {
    const [, pre, oldPart, newPart, post] = renameMatch;
    const fromPath = `${pre}${oldPart}${post}`.trim();
    const toPath = `${pre}${newPart}${post}`.trim();
    const summary = gitStdout.match(/(\d+ files? changed)/);

    files = [
      `${setColor("dimYellow", "rn:")} ${fromPath}`,
      `${setColor("dimYellow", "to:")} ${toPath} (100%)`,
      summary ? summary[1] : "",
    ].join("\n");
  } else {
    const fileLines = lines
      .filter((line) => line.includes("|"))
      .map((line) => line.trim().split("|")[0].trim());
    const summaryMatch = gitStdout.match(summaryRegex);

    if (summaryMatch) {
      const insertions = summaryMatch[2]
        ? summaryMatch[2].match(/\d+/)[0]
        : "0";
      const deletions = summaryMatch[3] ? summaryMatch[3].match(/\d+/)[0] : "0";

      const coloredSummary = `${summaryMatch[0].split(",")[0]}, ${setColor("dimCyan", `+${insertions}`)}, ${setColor("dimRed", `-${deletions}`)}`;

      files = [...fileLines, coloredSummary].join("\n");
    } else {
      files = "No file changes detected.";
    }
  }

  return { changes, files, repo };
};
