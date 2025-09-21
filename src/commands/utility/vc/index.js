import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { Colors } from "../../../constants/Colors.js";

export default {
	data: new SlashCommandBuilder()
		.setName("vc")
		.setDescription(
			"一時的なボイスチャンネルを作成する。Create a temporary voice channel.",
		)
		.addStringOption((option) =>
			option
				.setName("emoji")
				.setDescription("チャンネル名の絵文字。Emoji for the channel name.")
				.setRequired(true),
		)
		.addStringOption((option) =>
			option
				.setName("jpname")
				.setDescription(
					"ボイスチャンネルの名前 (日本語)。Name of the voice channel (Japanese).",
				)
				.setRequired(true),
		)
		.addStringOption((option) =>
			option
				.setName("enname")
				.setDescription(
					"ボイスチャンネルの名前 (英語)。Name of the voice channel (English).",
				)
				.setRequired(true),
		)
		.addIntegerOption((option) =>
			option
				.setName("limit")
				.setDescription(
					"ユーザー制限 (0は無制限)。User limit (0 for unlimited).",
				)
				.setRequired(true)
				.setMinValue(0)
				.setMaxValue(99),
		),

	async execute(interaction, client) {
		try {
			await interaction.deferReply();

			const emoji = interaction.options.getString("emoji");
			const jpName = interaction.options.getString("jpname");
			const enName = interaction.options.getString("enname");
			const limit = interaction.options.getInteger("limit");

			const isValidEmoji = this.isEmoji(emoji);
			if (!isValidEmoji) {
				return await interaction.editReply({
					content: [
						"有効な絵文字を入力してください。カスタム絵文字や一部の新しい絵文字は対応されていません。",
						"Please provide a valid emoji. Custom and some new emojis are not supported.",
					].join("\n"),
					flags: [Discord.InteractionResponseFlags.Ephemeral],
				});
			}

			const channel = await interaction.guild.channels.create({
				name: `${emoji}${jpName} | ${enName}`,
				type: 2,
				userLimit: limit,
				parent: process.env.VOICE_CATEGORY_ID,
			});

			await this.sendVoiceChannelCreationLog(
				interaction,
				client,
				channel,
				emoji,
				jpName,
				enName,
				limit,
			);

			const checkInactivity = async () => {
				const vc = await interaction.guild.channels
					.fetch(channel.id)
					.catch(() => null);
				if (!vc) return;

				if (vc.members.size === 0) {
					setTimeout(
						async () => {
							const currentVC = await interaction.guild.channels
								.fetch(channel.id)
								.catch(() => null);
							if (currentVC && currentVC.members.size === 0) {
								await currentVC.delete().catch(console.error);
								await this.sendVoiceChannelDeletionLog(
									interaction,
									client,
									channel,
								);
							}
						},
						1000 * 60 * 4,
					);
				}
			};

			checkInactivity();

			const voiceStateListener = (oldState, newState) => {
				if (
					oldState.channelId === channel.id ||
					newState.channelId === channel.id
				) {
					checkInactivity();
				}
			};

			client.on("voiceStateUpdate", voiceStateListener);

			const jpSuccessMessage = `(${
				limit === 0 ? "無制限" : `${limit}人制限`
			}) 一時的なボイスチャンネル ${channel} を作成しました！`;

			const enSuccessMessage = `(${
				limit === 0 ? "No limit" : `Max ${limit} people`
			}) Created temporary voice channel ${channel}!`;

			await interaction.editReply({
				content: [
					jpSuccessMessage,
					"4分間の非アクティブ状態の後に削除されます。",
					enSuccessMessage,
					"It will be deleted after 4 minutes of inactivity.",
				].join("\n"),
			});
		} catch (error) {
			console.error(error);
			await interaction.editReply({
				content: [
					"ボイスチャンネルの作成中にエラーが発生しました。",
					"There was an error while creating the voice channel.",
				].join("\n"),
				flags: [Discord.InteractionResponseFlags.Ephemeral],
			});
		}
	},

	isEmoji(str) {
		if (str.length > 2) {
			return false;
		}

		const emojiRegex = /\p{Emoji}/u;
		return emojiRegex.test(str);
	},

	async sendVoiceChannelCreationLog(
		interaction,
		client,
		channel,
		emoji,
		jpName,
		enName,
		limit,
	) {
		const logChannelId = process.env.VOICE_LOG_CHANNEL_ID;
		if (!logChannelId) return;

		const logChannel = await client.channels
			.fetch(logChannelId)
			.catch(() => null);
		if (!logChannel) return;

		const member = interaction.member;
		if (!member) return;

		const embed = new EmbedBuilder()
			.setAuthor({
				name: member.user.tag,
				iconURL: member.user.displayAvatarURL({ dynamic: true }),
			})
			.setTitle("一時的なボイスチャンネル作成")
			.setDescription(
				`${member} が一時的なボイスチャンネル <#${channel.id}> を作成しました。`,
			)
			.setColor(Colors.green)
			.addFields(
				{
					name: "チャンネル名",
					value: `${emoji}${jpName} | ${enName}`,
					inline: false,
				},
				{
					name: "ユーザー制限",
					value: limit === 0 ? "無制限" : `${limit}人`,
					inline: true,
				},
				{ name: "自動削除", value: "4分間の非アクティブ状態後", inline: true },
			)
			.setFooter({
				text: `ID: ${member.user.id}`,
			})
			.setTimestamp();

		await logChannel.send({ embeds: [embed] });
	},

	async sendVoiceChannelDeletionLog(_, client, channel) {
		const logChannelId = process.env.VOICE_LOG_CHANNEL_ID;
		if (!logChannelId) return;

		const logChannel = await client.channels
			.fetch(logChannelId)
			.catch(() => null);
		if (!logChannel) return;

		const embed = new EmbedBuilder()
			.setTitle("一時的なボイスチャンネル削除")
			.setDescription(
				`一時的なボイスチャンネル **${channel.name}** が非アクティブのため削除されました。`,
			)
			.setColor(Colors.red)
			.setTimestamp();

		await logChannel.send({ embeds: [embed] });
	},
};
