import { EmbedBuilder, } from "discord.js";
import { asc, isNotNull } from "drizzle-orm";
import { config, isTestInstance } from "../../../config/env.js";
import { Colors } from "../../../constants/Colors.js";
import { db } from "../../../db/index.js";
import { memberLeaves } from "../../../db/schema.js";
import { createListener } from "../../../utils/builders/listenerBuilder.js";
const formatDuration = (milliseconds) => {
    if (milliseconds < 0)
        milliseconds = 0;
    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (days > 0)
        return `${days}日${hours}時間${minutes}分`;
    if (hours > 0)
        return `${hours}時間${minutes}分`;
    if (minutes > 0)
        return `${minutes}分${seconds}秒`;
    return `${seconds}秒`;
};
export default createListener("memberLeave", "guildMemberRemove", async (member) => {
    if (member.user.bot)
        return;
    if (!isTestInstance &&
        config.ids.testGuild &&
        member.guild.id === config.ids.testGuild) {
        return;
    }
    const leaveChannelId = config.channels.leave;
    if (!leaveChannelId)
        return;
    const now = new Date();
    const joinedAt = member.joinedAt ?? null;
    const stayMs = joinedAt ? now.getTime() - joinedAt.getTime() : null;
    const accountCreatedAt = member.user.createdAt;
    const accountAgeMs = now.getTime() - accountCreatedAt.getTime();
    const username = member.user.username;
    try {
        await db.insert(memberLeaves).values({
            userId: member.id,
            username,
            joinedAt,
            leftAt: now,
            stayMs,
            accountCreatedAt,
        });
    }
    catch (error) {
        console.error("[memberLeave] Failed to insert leave record:", error);
    }
    const fastest = await db
        .select()
        .from(memberLeaves)
        .where(isNotNull(memberLeaves.stayMs))
        .orderBy(asc(memberLeaves.stayMs))
        .limit(5);
    const fetched = await member.client.channels
        .fetch(leaveChannelId)
        .catch(() => null);
    if (!fetched || !fetched.isTextBased())
        return;
    const leaveChannel = fetched;
    const embed = new EmbedBuilder()
        .setAuthor({
        name: member.user.tag,
        iconURL: member.user.displayAvatarURL({ size: 128 }),
    })
        .setTitle("メンバー退出")
        .setColor(Colors.red)
        .setFooter({ text: `ID: ${member.id}` })
        .setTimestamp(now);
    const stayLabel = stayMs !== null
        ? `${formatDuration(stayMs)}で退出`
        : "参加日時不明で退出";
    embed.setDescription(`<@${member.id}> が ${stayLabel}。`);
    embed.addFields({
        name: "サーバー滞在時間",
        value: stayMs !== null ? formatDuration(stayMs) : "不明",
        inline: true,
    }, {
        name: "アカウント年齢",
        value: formatDuration(accountAgeMs),
        inline: true,
    });
    if (fastest.length > 0) {
        const medals = ["🥇", "🥈", "🥉"];
        const lines = fastest.map((row, i) => {
            const prefix = medals[i] ?? `${i + 1}.`;
            const dur = row.stayMs !== null ? formatDuration(row.stayMs) : "不明";
            return `${prefix} **${row.username}** ー ${dur}`;
        });
        embed.addFields({
            name: "最速退出ランキング",
            value: lines.join("\n"),
        });
    }
    await leaveChannel.send({ embeds: [embed] });
}, { ignoreBots: false, ignoreSelf: false });
