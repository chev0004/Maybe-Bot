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
    channels: ["bump"],
    users: ["302050872383242240"],
  },
);
