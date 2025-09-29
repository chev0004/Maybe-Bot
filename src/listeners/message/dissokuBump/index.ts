import type { Message, PartialMessage } from "discord.js";
import { createListener } from "../../../utils/builders/listenerBuilder.js";
import { handleBump } from "../../../utils/helpers/bumpHelper.js";

export default createListener(
  "dissokuBumpHandler",
  "messageUpdate",
  async (
    _oldMessage: Message | PartialMessage,
    newMessage: Message | PartialMessage,
  ) => {
    if (newMessage.partial) return;
    await handleBump(newMessage, newMessage.client, "Dissoku", "アップしたよ");
  },
  {
    ignoreBots: false,
    channels: process.env.BUMP_CHANNEL_ID
      ? [process.env.BUMP_CHANNEL_ID]
      : undefined,
    users: ["761562078095867916"],
  },
);
