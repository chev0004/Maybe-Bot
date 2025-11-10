import { ActionRowBuilder, AttachmentBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, } from "discord.js";
import { and, count, countDistinct, gte, isNotNull, sql, sum, } from "drizzle-orm";
import { getMockActivityData, } from "../../commands/slash/stats/activity/activity.mock.js";
import { db } from "../../db/index.js";
import { hourlyActivity, hourlyUserActivity, voiceSessions, } from "../../db/schema.js";
import { generateMessageActivityImage, generateVoiceActivityImage, } from "../services/activityImageGenerator.js";
import { timeframeLabels } from "./topHelper.js";
const categoryOptions = [
    { label: "Message Activity", value: "message" },
    { label: "Voice Activity", value: "voice" },
];
const fetchActivityData = async (category, timeframe) => {
    const days = timeframe === "all" ? 9999 : parseInt(timeframe, 10);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const startDateString = startDate.toISOString().slice(0, 10);
    const dateCondition = timeframe === "all" ? undefined : gte(hourlyActivity.date, startDateString);
    const hourlyResults = await db
        .select({
        hour: hourlyActivity.hour,
        total: category === "message"
            ? sql `sum(${hourlyActivity.messages})`.mapWith(Number)
            : sql `sum(${hourlyActivity.vcHours})`.mapWith(Number),
    })
        .from(hourlyActivity)
        .where(dateCondition)
        .groupBy(hourlyActivity.hour);
    const jstHourlyData = Array(24).fill(0);
    for (const result of hourlyResults) {
        const utcHour = result.hour;
        const jstHour = (utcHour + 9) % 24;
        jstHourlyData[jstHour] = result.total;
    }
    let averageParticipants = 0;
    if (category === "voice") {
        const avgResult = await db
            .select({
            average: sql `avg(${voiceSessions.totalUniqueParticipants})`.mapWith(Number),
        })
            .from(voiceSessions)
            .where(and(timeframe === "all"
            ? undefined
            : gte(voiceSessions.startTime, startDate), isNotNull(voiceSessions.endTime), isNotNull(voiceSessions.totalUniqueParticipants)));
        averageParticipants = avgResult[0]?.average ?? 0;
    }
    else {
        const participantHoursResult = await db
            .select({
            count: count(hourlyUserActivity.userId),
        })
            .from(hourlyUserActivity)
            .where(timeframe === "all"
            ? undefined
            : gte(hourlyUserActivity.date, startDateString));
        const totalParticipantHours = participantHoursResult[0]?.count ?? 0;
        const activeHoursResult = await db
            .select({
            count: countDistinct(sql `(${hourlyUserActivity.date}, ${hourlyUserActivity.hour})`),
        })
            .from(hourlyUserActivity)
            .where(timeframe === "all"
            ? undefined
            : gte(hourlyUserActivity.date, startDateString));
        const totalActiveHours = activeHoursResult[0]?.count ?? 0;
        averageParticipants =
            totalActiveHours > 0 ? totalParticipantHours / totalActiveHours : 0;
    }
    const totalSumResult = await db
        .select({
        total: category === "message"
            ? sum(hourlyActivity.messages)
            : sum(hourlyActivity.vcHours),
    })
        .from(hourlyActivity)
        .where(dateCondition);
    const totalValue = Number(totalSumResult[0]?.total ?? 0);
    const peakIndex = jstHourlyData.indexOf(Math.max(...jstHourlyData, 0));
    if (category === "message") {
        return {
            hourlyActivity: jstHourlyData,
            totalMessages: totalValue,
            averageParticipants,
            mostActiveHour: peakIndex,
        };
    }
    return {
        hourlyActivity: jstHourlyData,
        totalDurationHours: totalValue,
        averageParticipants,
        peakHour: peakIndex,
    };
};
export const generateComponentsForActivity = ({ category, timeframe, showTimeframeButtons, isTestMode = false, }) => {
    const showTimeframeFlag = showTimeframeButtons ? "1" : "0";
    const testModeFlag = isTestMode ? "1" : "0";
    const currentCategoryLabel = categoryOptions.find((opt) => opt.value === category)?.label ||
        "Select an activity type";
    const dropdown = new StringSelectMenuBuilder()
        .setCustomId(`activity-category-${timeframe}-${showTimeframeFlag}-${testModeFlag}`)
        .setPlaceholder(currentCategoryLabel)
        .addOptions(categoryOptions.map((opt) => ({
        ...opt,
        default: opt.value === category,
    })));
    const components = [
        new ActionRowBuilder().addComponents(dropdown),
    ];
    if (showTimeframeButtons) {
        const timeButtons = new ActionRowBuilder().addComponents(new ButtonBuilder()
            .setCustomId(`activity-timeframe-back-${category}-${timeframe}-${testModeFlag}`)
            .setEmoji({ id: "1423520590261780541" })
            .setStyle(ButtonStyle.Secondary), new ButtonBuilder()
            .setCustomId(`activity-select-${category}-1-${testModeFlag}`)
            .setLabel("1日")
            .setStyle(timeframe === "1" ? ButtonStyle.Primary : ButtonStyle.Secondary), new ButtonBuilder()
            .setCustomId(`activity-select-${category}-7-${testModeFlag}`)
            .setLabel("7日")
            .setStyle(timeframe === "7" ? ButtonStyle.Primary : ButtonStyle.Secondary), new ButtonBuilder()
            .setCustomId(`activity-select-${category}-30-${testModeFlag}`)
            .setLabel("30日")
            .setStyle(timeframe === "30" ? ButtonStyle.Primary : ButtonStyle.Secondary), new ButtonBuilder()
            .setCustomId(`activity-select-${category}-all-${testModeFlag}`)
            .setLabel("全期間")
            .setStyle(timeframe === "all" ? ButtonStyle.Primary : ButtonStyle.Secondary));
        components.push(timeButtons);
    }
    else {
        const actionButtons = new ActionRowBuilder().addComponents(new ButtonBuilder()
            .setCustomId(`activity-timeframe-show-${category}-${timeframe}-${testModeFlag}`)
            .setEmoji({ id: "1423521666159611914" })
            .setStyle(ButtonStyle.Secondary), new ButtonBuilder()
            .setCustomId(`activity-refresh-${category}-${timeframe}-${testModeFlag}`)
            .setEmoji({ id: "1423520588638453850" })
            .setStyle(ButtonStyle.Secondary));
        components.push(actionButtons);
    }
    return components;
};
export const generateActivityReply = async ({ guild, category, timeframe, showTimeframeButtons, isTestMode, }) => {
    const serverIconUrl = guild.iconURL({ extension: "png", size: 128 });
    const timeframeLabel = timeframeLabels[timeframe];
    let imageBuffer;
    const data = isTestMode
        ? getMockActivityData(category, timeframe)
        : await fetchActivityData(category, timeframe);
    if (category === "message") {
        imageBuffer = await generateMessageActivityImage(data, serverIconUrl, guild.name, timeframeLabel);
    }
    else {
        imageBuffer = await generateVoiceActivityImage(data, serverIconUrl, guild.name, timeframeLabel);
    }
    const attachment = new AttachmentBuilder(imageBuffer, {
        name: "activity-stats.png",
    });
    const components = generateComponentsForActivity({
        category,
        timeframe,
        showTimeframeButtons,
        isTestMode,
    });
    return { files: [attachment], components };
};
