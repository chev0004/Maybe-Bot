import { createListener } from "../../utils/builders/listenerBuilder.js";
import { handleBump } from "../../utils/helpers/bumpHelper.js";

export default createListener(
  "disboardBumpHandler",
  "messageCreate",
  async (message, client) => {
    await handleBump(message, client, "Disboard", "アップしたよ");
  },
  {
    ignoreBots: false,
    channels: [process.env.BUMP_CHANNEL_ID],
    users: ["302050872383242240"],
  },
);
