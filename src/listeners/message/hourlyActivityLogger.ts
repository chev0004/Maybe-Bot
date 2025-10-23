import { promises as fs } from "fs";
import path from "path";
import { config } from "../../config/env.js";
import { createListener } from "../../utils/builders/listenerBuilder.js";

interface HourlyLog {
  [date: string]: {
    [hour: string]: string[];
  };
}

const logFilePath = path.resolve(process.cwd(), "hourly_messages.json");

const readLogFile = async (): Promise<HourlyLog> => {
  try {
    const data = await fs.readFile(logFilePath, "utf-8");
    return JSON.parse(data) as HourlyLog;
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      ("code" in error || "name" in error)
    ) {
      const err = error as { code?: string; name?: string };
      if (err.code === "ENOENT" || err.name === "SyntaxError") {
        return {};
      }
    }
    console.error("Error reading hourly log file:", error);
    throw error;
  }
};

const writeLogFile = async (data: HourlyLog) => {
  try {
    await fs.writeFile(logFilePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing hourly log file:", error);
  }
};

export default createListener(
  "hourlyActivityLogger",
  "messageCreate",
  async (message) => {
    if (
      !message.inGuild() ||
      message.author.bot ||
      message.guild.id === config.ids.testGuild
    ) {
      return;
    }

    const userId = message.author.id;
    const today = new Date().toISOString().slice(0, 10);
    const hour = message.createdAt.getUTCHours().toString();

    try {
      const logData = await readLogFile();

      if (!logData[today]) {
        logData[today] = {};
      }

      if (!logData[today][hour]) {
        logData[today][hour] = [];
      }

      if (!logData[today][hour].includes(userId)) {
        logData[today][hour].push(userId);
      }

      await writeLogFile(logData);
    } catch (error) {
      console.error("Failed to log hourly message activity:", error);
    }
  },
);
