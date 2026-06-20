import { EmbedBuilder, } from "discord.js";
import { config } from "../../../../config/env.js";
import { Colors } from "../../../../constants/Colors.js";
import { createCommand } from "../../../../utils/builders/commandBuilder.js";
const FETCH_LIMIT = 100;
const MAX_RANKING_LINES = 20;
const bumpSources = [
    {
        name: "Disboard",
        botId: "302050872383242240",
        identifierText: "\u30a2\u30c3\u30d7\u3057\u305f\u3088",
    },
    {
        name: "Dissoku",
        botId: "761562078095867916",
        identifierText: "\u30a2\u30c3\u30d7\u3057\u305f\u3088",
    },
];
const isTextInEmbed = (embed, text) => {
    const searchText = text.toLowerCase();
    if (embed.title?.toLowerCase().includes(searchText))
        return true;
    if (embed.description?.toLowerCase().includes(searchText))
        return true;
    if (embed.footer?.text?.toLowerCase().includes(searchText))
        return true;
    return embed.fields.some((field) => field.name.toLowerCase().includes(searchText) ||
        field.value.toLowerCase().includes(searchText));
};
const getBumpSource = (message) => {
    return (bumpSources.find((source) => message.author.id === source.botId &&
        message.embeds.some((embed) => isTextInEmbed(embed, source.identifierText))) ?? null);
};
const getBumper = (message) => {
    return (message.interaction?.user ??
        message.interactionMetadata?.user ??
        null);
};
const formatRankings = (rankings) => {
    return rankings
        .slice(0, MAX_RANKING_LINES)
        .map((entry, index) => {
        const noun = entry.count === 1 ? "bump" : "bumps";
        return `${index + 1}. <@${entry.userId}> - ${entry.count} ${noun}`;
    })
        .join("\n");
};
export default createCommand("rankbumps", "Scans the bump channel and ranks users by successful bump count.", async (interaction, client) => {
    await interaction.deferReply();
    const channelId = config.channels.bump;
    const channel = await client.channels.fetch(channelId);
    if (!channel || !channel.isTextBased() || !("messages" in channel)) {
        await interaction.editReply({
            content: "That channel was not found or does not support messages.",
        });
        return;
    }
    const bumpCounts = new Map();
    const sourceCounts = new Map();
    let scannedMessages = 0;
    let matchedBumps = 0;
    let unattributedBumps = 0;
    let before;
    try {
        while (true) {
            const messages = await channel.messages.fetch({
                limit: FETCH_LIMIT,
                before,
            });
            if (messages.size === 0)
                break;
            scannedMessages += messages.size;
            for (const message of messages.values()) {
                const source = getBumpSource(message);
                if (!source)
                    continue;
                matchedBumps += 1;
                sourceCounts.set(source.name, (sourceCounts.get(source.name) ?? 0) + 1);
                const bumper = getBumper(message);
                if (!bumper) {
                    unattributedBumps += 1;
                    continue;
                }
                bumpCounts.set(bumper.id, (bumpCounts.get(bumper.id) ?? 0) + 1);
            }
            before = [...messages.values()].reduce((oldestMessage, message) => !oldestMessage ||
                message.createdTimestamp < oldestMessage.createdTimestamp
                ? message
                : oldestMessage, null)?.id;
            if (!before || messages.size < FETCH_LIMIT)
                break;
        }
    }
    catch (error) {
        console.error(`Error scanning bump rankings for channel ${channelId}:`, error);
        await interaction.editReply({
            content: "I could not scan that channel. Please check that I can view it and read message history.",
        });
        return;
    }
    const rankings = [...bumpCounts.entries()]
        .map(([userId, count]) => ({ userId, count }))
        .sort((a, b) => b.count - a.count || a.userId.localeCompare(b.userId));
    const embed = new EmbedBuilder()
        .setTitle("Bump Rankings")
        .setColor(rankings.length > 0 ? Colors.green : Colors.purple)
        .setDescription(`Scanned <#${channelId}> and found ${matchedBumps} successful bump${matchedBumps === 1 ? "" : "s"}.`)
        .addFields({
        name: "Messages Scanned",
        value: scannedMessages.toLocaleString(),
        inline: true,
    })
        .setTimestamp();
    if (rankings.length > 0) {
        embed.addFields({
            name: "Rankings",
            value: formatRankings(rankings),
        });
    }
    else {
        embed.addFields({
            name: "Rankings",
            value: "No attributable bump messages were found.",
        });
    }
    if (sourceCounts.size > 0) {
        embed.addFields({
            name: "Sources",
            value: [...sourceCounts.entries()]
                .map(([source, count]) => `${source}: ${count}`)
                .join("\n"),
            inline: true,
        });
    }
    if (unattributedBumps > 0) {
        embed.addFields({
            name: "Unattributed",
            value: `${unattributedBumps} bump${unattributedBumps === 1 ? "" : "s"} had no interaction user attached.`,
            inline: true,
        });
    }
    await interaction.editReply({ embeds: [embed] });
}, {
    ownerOnly: true,
});
