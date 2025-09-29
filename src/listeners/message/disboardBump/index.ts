import type { Message } from "discord.js";
import { createListener } from "../../../utils/builders/listenerBuilder.js";
import { handleBump } from "../../../utils/helpers/bumpHelper.js";

export default createListener(
  "disboardBumpHandler",
  "messageCreate",
  async (message: Message) => {
    await handleBump(message, message.client, "Disboard", "アップしたよ");
  },
  {
    ignoreBots: false,
    channels: process.env.BUMP_CHANNEL_ID
      ? [process.env.BUMP_CHANNEL_ID]
      : undefined,
    users: ["302050872383242240"],
  },
);
