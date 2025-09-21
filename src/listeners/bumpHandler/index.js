import { scheduleReminder } from "../../utils/reminderManager.js";

export default {
	name: "bumpHandler",
	event: "messageCreate",

	async execute(message, client) {
		const bumpChannelId = process.env.BUMP_CHANNEL_ID;
		const pingRoleId = process.env.BUMP_ROLE_ID;

		if (message.channel.id !== bumpChannelId) return;

		const disboardBotId = "302050872383242240";
		const dissokuBotId = "761562078095867916";

		if (![disboardBotId, dissokuBotId].includes(message.author.id)) return;

		const embed = message.embeds[0];
		if (!embed) return;

		const desc = embed.description || "";

		const isDisboardBump =
			message.author.id === disboardBotId &&
			(desc.includes("表示順をアップしたよ") || desc.includes("👍"));

		const isDissokuBump =
			message.author.id === dissokuBotId &&
			(desc.includes("をアップしたよ") || desc.toLowerCase().includes("up!"));

		if (!isDisboardBump && !isDissokuBump) return;

		const twoHoursInMillis = 2 * 60 * 60 * 1000;
		const triggerAt = Date.now() + twoHoursInMillis;

		const reminderDetails = {
			channelId: bumpChannelId,
			roleId: pingRoleId,
			triggerAt: triggerAt,
		};

		await scheduleReminder(reminderDetails, client);
	},
};
