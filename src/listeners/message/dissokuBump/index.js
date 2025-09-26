import { createListener } from "../../../utils/builders/listenerBuilder.js";
import { handleBump } from "../../../utils/helpers/bumpHelper.js";

export default createListener(
  "dissokuBumpHandler",
  "messageUpdate",
  async (_oldMessage, newMessage, client) => {
    await handleBump(newMessage, client, "Dissoku", "アップしたよ");
  },
  {
    ignoreBots: false,
    channels: [process.env.BUMP_CHANNEL_ID],
    users: ["761562078095867916"],
  },
);
