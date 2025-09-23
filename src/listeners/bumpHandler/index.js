import { createListener } from "../../utils/builders/listenerBuilder.js";
import { scheduleReminder } from "../../utils/managers/reminderManager.js";

export default createListener(
  "bumpHandler",
  "messageCreate",
  async (message, client) => {
    const isDisboardBump =
      message.author.id === "302050872383242240" &&
      (message.embeds[0]?.description.includes("表示順をアップしたよ") ||
        message.embeds[0]?.description.includes("👍"));

    const isDissokuBump =
      message.author.id === "761562078095867916" &&
      (message.embeds[0]?.description.includes("をアップしたよ") ||
        message.embeds[0]?.description.toLowerCase().includes("up!"));

    if (!isDisboardBump && !isDissokuBump) return;

    const twoHoursInMillis = 2 * 60 * 60 * 1000;
    const triggerAt = Date.now() + twoHoursInMillis;

    const reminderDetails = {
      channelId: process.env.BUMP_CHANNEL_ID,
      roleId: process.env.BUMP_ROLE_ID,
      triggerAt: triggerAt,
    };

    await scheduleReminder(reminderDetails, client);
  },
  {
    requiredEnvVars: ["BUMP_CHANNEL_ID", "BUMP_ROLE_ID"],
    channels: [process.env.BUMP_CHANNEL_ID],
    users: ["302050872383242240", "761562078095867916"],
  },
);
