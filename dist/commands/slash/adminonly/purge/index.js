import { Collection, MessageFlags, PermissionsBitField, } from "discord.js";
import { Strings } from "../../../../constants/Strings.js";
import { createCommand } from "../../../../utils/builders/commandBuilder.js";
const FOURTEEN_DAYS_IN_MS = 1000 * 60 * 60 * 24 * 14;
export default createCommand("purge", "チャンネルからメッセージを削除します。Deletes messages from a channel.", async (interaction) => {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    if (!interaction.guild?.members.me?.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
        await interaction.editReply({
            content: Strings.Permissions.BotMissing("メッセージの管理", "Manage Messages"),
        });
        return;
    }
    const amount = interaction.options.getInteger("amount");
    const user = interaction.options.getUser("user");
    const link = interaction.options.getString("link");
    if ((amount && link) || (!amount && !link)) {
        await interaction.editReply({
            content: "「amount」または「link」のどちらか一方を指定してください。\nPlease specify either the 'amount' or the 'link' option, but not both.",
        });
        return;
    }
    let messagesToDelete = [];
    let tooOldCount = 0;
    if (link) {
        const match = link.match(/channels\/\d+\/\d+\/(\d+)/);
        if (!match || !match[1]) {
            await interaction.editReply({
                content: "無効なメッセージリンクです。\nInvalid message link provided.",
            });
            return;
        }
        const messageId = match[1];
        try {
            const fetchedMessages = await interaction.channel.messages.fetch({
                limit: 100,
            });
            const messageArray = Array.from(fetchedMessages.values());
            const targetIndex = messageArray.findIndex((msg) => msg.id === messageId);
            if (targetIndex === -1) {
                await interaction.editReply({
                    content: "指定されたメッセージは直近100件のメッセージ内に見つかりませんでした。\nCould not find the linked message within the last 100 messages.",
                });
                return;
            }
            const rawMessagesToDelete = messageArray.slice(0, targetIndex + 1);
            let messagesToDelete;
            messagesToDelete = rawMessagesToDelete.filter((msg) => Date.now() - msg.createdTimestamp < FOURTEEN_DAYS_IN_MS);
            tooOldCount = rawMessagesToDelete.length - messagesToDelete.length;
        }
        catch (error) {
            console.error("Error fetching messages for purge by link:", error);
            await interaction.editReply({
                content: Strings.Errors.FetchMessages,
            });
            return;
        }
    }
    else if (amount) {
        try {
            const fetchedMessages = await interaction.channel.messages.fetch({
                limit: amount,
            });
            const messagesToFilter = user
                ? fetchedMessages.filter((msg) => msg.author.id === user.id)
                : fetchedMessages;
            messagesToDelete = messagesToFilter.filter((msg) => Date.now() - msg.createdTimestamp < FOURTEEN_DAYS_IN_MS);
            tooOldCount = messagesToFilter.size - messagesToDelete.size;
        }
        catch (error) {
            console.error("Error fetching messages for purge by amount:", error);
            await interaction.editReply({
                content: Strings.Errors.FetchMessages,
            });
            return;
        }
    }
    const deleteCount = messagesToDelete instanceof Collection
        ? messagesToDelete.size
        : messagesToDelete.length;
    if (!messagesToDelete || deleteCount === 0) {
        let reply = "削除対象のメッセージが見つかりませんでした。\nNo messages were found to delete.";
        if (tooOldCount > 0) {
            reply += `\n(${tooOldCount}件のメッセージは14日以上経過しているため削除できませんでした。)\n(${tooOldCount} messages were too old to delete.)`;
        }
        await interaction.editReply({ content: reply });
        return;
    }
    try {
        await interaction.channel.bulkDelete(messagesToDelete, true);
        let reply = `✅ ${deleteCount}件のメッセージを削除しました。\nSuccessfully deleted ${deleteCount} messages.`;
        if (user) {
            reply += `\n\n👤 **対象ユーザー:** ${user.tag}\n**Filtered by user:** ${user.tag}`;
        }
        if (tooOldCount > 0) {
            reply += `\n\n⚠️ ${tooOldCount}件のメッセージは14日以上経過しているため削除できませんでした。\n${tooOldCount} messages were older than 14 days and could not be deleted.`;
        }
        await interaction.editReply({ content: reply });
    }
    catch (error) {
        console.error("Error during bulk delete:", error);
        await interaction.editReply({
            content: Strings.Errors.DeleteMessages,
        });
    }
}, {
    adminOnly: true,
    setup: (builder) => {
        builder
            .addIntegerOption((option) => option
            .setName("amount")
            .setDescription("削除するメッセージの数 (1-100)。The number of messages to delete (1-100).")
            .setMinValue(1)
            .setMaxValue(100)
            .setRequired(false))
            .addUserOption((option) => option
            .setName("user")
            .setDescription("このユーザーのメッセージのみを削除します。Only delete messages from this user.")
            .setRequired(false))
            .addStringOption((option) => option
            .setName("link")
            .setDescription("このメッセージまでのすべてのメッセージを削除します。Delete all messages up to this message link.")
            .setRequired(false));
        return builder;
    },
});
