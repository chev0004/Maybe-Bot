import { createListener } from "../../utils/builders/listenerBuilder.js";
import { scheduleReminder } from "../../utils/managers/reminderManager.js";

export default createListener(
  "bumpHandler",
  "messageUpdate",
  async (_oldMessage, newMessage, client) => {
    const isDisboardBump =
      newMessage.embeds[0]?.description.includes("表示順をアップしたよ") ||
      newMessage.embeds[0]?.description.includes("👍");

    const isDissokuBump =
      newMessage.embeds[0]?.description.includes("をアップしたよ") ||
      newMessage.embeds[0]?.description.toLowerCase().includes("up!");

    if (!isDisboardBump && !isDissokuBump) return;

    const interval = 1000;
    const triggerAt = Date.now() + interval;
    const bumpSource = isDisboardBump ? "Disboard" : "Dissoku";

    const reminderDetails = {
      channelId: process.env.BUMP_CHANNEL_ID,
      roleId: process.env.BUMP_ROLE_ID,
      triggerAt: triggerAt,
      source: bumpSource,
    };

    await scheduleReminder(reminderDetails, client);
  },
  {
    ignoreBots: false,
    requiredEnvVars: ["BUMP_CHANNEL_ID", "BUMP_ROLE_ID"],
    channels: [process.env.BUMP_CHANNEL_ID],
    users: ["302050872383242240", "761562078095867916"],
  },
);
