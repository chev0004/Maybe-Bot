import { parseGitUpdateOutput } from "../../../../utils/helpers/gitUpdateHelper.js";

const mockScenarios = {
  normal: {
    commitLog: "442cd19 - test: see git output",
    pullStdout: `Updating 2c3c50f..442cd19\nFast-forward\n src/commands/owneronly/update/index.js | 1 +\n 1 file changed, 1 insertion(+)`,
    fetchStderr: `From https://github.com/chev0004/Maybe-Bot\n   2c3c50f..442cd19  develop    -> origin/develop`,
    needsNpmInstall: false,
  },
  rename: {
    commitLog: "1ecc43f - refactor: rename folder",
    pullStdout: `Updating 442cd19..1ecc43f\nFast-forward\n src/commands/{confessions => social}/confess/index.js | 0\n 2 files changed, 0 insertions(+), 0 deletions(-)\n rename src/commands/{confessions => social}/confess/index.js (100%)`,
    fetchStderr: `From https://github.com/chev0004/Maybe-Bot\n   442cd19..1ecc43f  develop    -> origin/develop`,
    needsNpmInstall: false,
  },
  npm: {
    commitLog: "a1b2c3d - feat: add new dependency",
    pullStdout: `Updating 1ecc43f..a1b2c3d\nFast-forward\n package.json | 2 +-\n 1 file changed, 1 insertion(+), 1 deletion(-)`,
    fetchStderr: `From https://github.com/chev0004/Maybe-Bot\n   1ecc43f..a1b2c3d  develop    -> origin/develop`,
    needsNpmInstall: true,
    npmFieldName: "依存関係 / Dependencies (Simulated)",
    npmOutput: [
      "+ some-new-package@1.2.3",
      "+ another-dependency@4.5.6",
      "",
      "Added 2 packages, audited 153 packages in 4.2s",
      "Found 3 low severity vulnerabilities",
    ].join("\n"),
  },
  no_changes: {
    commitLog: "",
    pullStdout: "Already up to date.",
    fetchStderr: `From https://github.com/chev0004/Maybe-Bot\n = [up to date]      develop    -> origin/develop`, // Example
    needsNpmInstall: false,
  },
};
/**
 * Gets the mock data for a specific update scenario.
 * Defaults to the 'normal' scenario if the requested one doesn't exist.
 * @param scenarioName The name of the scenario (e.g., 'normal', 'rename', 'npm').
 * @returns The mock data object for the scenario.
 */
export const getMockUpdateData = (scenarioName) => {
  const scenarioKey =
    scenarioName && mockScenarios[scenarioName] ? scenarioName : "normal";
  return mockScenarios[scenarioKey];
};
/**
 * Parses the mock git output for a given scenario.
 * @param scenarioName The name of the scenario.
 * @returns Parsed output suitable for the embed.
 */
export const parseMockGitUpdateOutput = (scenarioName) => {
  const mockData = getMockUpdateData(scenarioName);
  return parseGitUpdateOutput(
    mockData.commitLog,
    mockData.pullStdout,
    mockData.fetchStderr,
  );
};
