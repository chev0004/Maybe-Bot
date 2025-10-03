import {
  ActionRowBuilder,
  AttachmentBuilder,
  ButtonBuilder,
  ButtonStyle,
  type Guild,
  type InteractionReplyOptions,
  StringSelectMenuBuilder,
} from "discord.js";
import { and, desc, eq, sql } from "drizzle-orm";
import { db } from "../../db/index.js";
import {
  channels,
  dailyChannelStats,
  dailyUserStats,
  users,
} from "../../db/schema.js";
import {
  generateLeaderboardImage,
  generateOverviewImage,
  type LeaderboardItem,
} from "../services/imageGenerator.js";

export type TopCategory =
  | "overview"
  | "msg_users"
  | "vc_users"
  | "stream_users"
  | "bump_users"
  | "msg_channels"
  | "vc_channels";
export type TopTimeframe = "1" | "7" | "30" | "all";

const timeframeLabels: Record<TopTimeframe, string> = {
  "1": "過去24時間",
  "7": "過去7日間",
  "30": "過去30日間",
  all: "全期間",
};
const getDateCondition = (timeframe: TopTimeframe) => {
  if (timeframe === "all") return undefined;
  const days = parseInt(timeframe, 10);
  const date = new Date();
  date.setDate(date.getDate() - days);
  return sql`"date" >= ${date.toISOString().slice(0, 10)}`;
};
async function getTopData(
  category: "messages" | "vcHours" | "streamHours" | "bumps",
  type: "users" | "channels",
  timeframe: TopTimeframe,
  limit: number,
): Promise<LeaderboardItem[]> {
  const dateCondition = getDateCondition(timeframe);
  if (type === "users") {
    const statsSubquery = db
      .select({
        userId: dailyUserStats.userId,
        totalValue: sql<number>`sum(${dailyUserStats[category]})`
          .mapWith(Number)
          .as("totalValue"),
      })
      .from(dailyUserStats)
      .where(dateCondition)
      .groupBy(dailyUserStats.userId)
      .as("statsSubquery");
    const results = await db
      .select({
        name: users.username,
        totalValue:
          sql<number>`coalesce(${statsSubquery.totalValue}, 0)`.mapWith(Number),
      })
      .from(users)
      .leftJoin(statsSubquery, eq(users.id, statsSubquery.userId))
      .orderBy(desc(sql`coalesce(${statsSubquery.totalValue}, 0)`))
      .limit(limit);
    return results.map((r) => ({
      name: r.name || "Unknown",
      value: r.totalValue,
    }));
  } else {
    if (category !== "messages" && category !== "vcHours") return [];
    const statsSubquery = db
      .select({
        channelId: dailyChannelStats.channelId,
        totalValue: sql<number>`sum(${dailyChannelStats[category]})`
          .mapWith(Number)
          .as("totalValue"),
      })
      .from(dailyChannelStats)
      .where(dateCondition)
      .groupBy(dailyChannelStats.channelId)
      .as("statsSubquery");

    const conditions = [];
    if (category === "vcHours") {
      conditions.push(eq(channels.type, "voice"));
    }

    const results = await db
      .select({
        name: channels.name,
        type: channels.type,
        totalValue:
          sql<number>`coalesce(${statsSubquery.totalValue}, 0)`.mapWith(Number),
      })
      .from(channels)
      .leftJoin(statsSubquery, eq(channels.id, statsSubquery.channelId))
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(sql`coalesce(${statsSubquery.totalValue}, 0)`))
      .limit(limit);

    return results.map((r) => ({
      name: r.name || "Unknown",
      value: r.totalValue,
      type: r.type,
    }));
  }
}

export const generateInitialTopReply = async (guild: Guild) => {
  return generateTopReply({
    guild,
    category: "overview",
    timeframe: "7",
    showTimeframeButtons: false,
  });
};

export const generateTopReply = async ({
  guild,
  category,
  timeframe,
  showTimeframeButtons,
}: {
  guild: Guild;
  category: TopCategory;
  timeframe: TopTimeframe;
  showTimeframeButtons: boolean;
}): Promise<InteractionReplyOptions> => {
  const serverIconUrl = guild.iconURL({ extension: "png", size: 128 });
  const timeframeLabel = timeframeLabels[timeframe];
  let imageBuffer: Buffer;

  if (category === "overview") {
    const data = {
      messages: {
        users: await getTopData("messages", "users", timeframe, 3),
      },
      bumps: {
        users: await getTopData("bumps", "users", timeframe, 3),
      },
      voice: {
        users: await getTopData("vcHours", "users", timeframe, 3),
      },
      stream: {
        users: await getTopData("streamHours", "users", timeframe, 3),
      },
    };
    imageBuffer = await generateOverviewImage(
      data,
      serverIconUrl,
      guild.name,
      timeframeLabel,
    );
  } else {
    let title: string,
      dbCategory: "messages" | "vcHours" | "streamHours" | "bumps",
      type: "users" | "channels";
    if (category === "msg_users") {
      title = "🏆 メッセージ・Top Messages";
      dbCategory = "messages";
      type = "users";
    } else if (category === "vc_users") {
      title = "🏆 ボイス時間・Top VC Hours";
      dbCategory = "vcHours";
      type = "users";
    } else if (category === "stream_users") {
      title = "🏆 配信時間・Top Stream Hours";
      dbCategory = "streamHours";
      type = "users";
    } else if (category === "bump_users") {
      title = "🏆 バンプ数・Top Bumpers";
      dbCategory = "bumps";
      type = "users";
    } else if (category === "msg_channels") {
      title = "🏆 送信メッセージ・Top Message Channels";
      dbCategory = "messages";
      type = "channels";
    } else {
      title = "🏆 ボイス時間・Top Voice Channels";
      dbCategory = "vcHours";
      type = "channels";
    }
    const data = await getTopData(dbCategory, type, timeframe, 10);
    imageBuffer = await generateLeaderboardImage(
      title,
      data,
      serverIconUrl,
      guild.name,
      timeframeLabel,
    );
  }

  const attachment = new AttachmentBuilder(imageBuffer, {
    name: "leaderboard.png",
  });
  const dropdown = new StringSelectMenuBuilder()
    .setCustomId(`top_category_${timeframe}`)
    .setPlaceholder("Select a category...")
    .addOptions([
      {
        label: "Overview",
        value: "overview",
        default: category === "overview",
      },
      {
        label: "Top Message Users",
        value: "msg_users",
        default: category === "msg_users",
      },
      {
        label: "Top Voice Users",
        value: "vc_users",
        default: category === "vc_users",
      },
      {
        label: "Top Bumpers",
        value: "bump_users",
        default: category === "bump_users",
      },
      {
        label: "Top Streamers",
        value: "stream_users",
        default: category === "stream_users",
      },
      {
        label: "Top Message Channels",
        value: "msg_channels",
        default: category === "msg_channels",
      },
      {
        label: "Top Voice Channels",
        value: "vc_channels",
        default: category === "vc_channels",
      },
    ]);
  const components: ActionRowBuilder<
    ButtonBuilder | StringSelectMenuBuilder
  >[] = [
    new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(dropdown),
  ];
  if (showTimeframeButtons) {
    const timeButtons = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(`top_timeframe_back_${category}_${timeframe}`)
        .setEmoji({ id: "1423520590261780541" })
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId(`top_select_${category}_1`)
        .setLabel("1日")
        .setStyle(
          timeframe === "1" ? ButtonStyle.Primary : ButtonStyle.Secondary,
        ),
      new ButtonBuilder()
        .setCustomId(`top_select_${category}_7`)
        .setLabel("7日")
        .setStyle(
          timeframe === "7" ? ButtonStyle.Primary : ButtonStyle.Secondary,
        ),
      new ButtonBuilder()
        .setCustomId(`top_select_${category}_30`)
        .setLabel("30日")
        .setStyle(
          timeframe === "30" ? ButtonStyle.Primary : ButtonStyle.Secondary,
        ),
      new ButtonBuilder()
        .setCustomId(`top_select_${category}_all`)
        .setLabel("全期間")
        .setStyle(
          timeframe === "all" ? ButtonStyle.Primary : ButtonStyle.Secondary,
        ),
    );
    components.push(timeButtons);
  } else {
    const actionButtons = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(`top_timeframe_show_${category}_${timeframe}`)
        .setEmoji({ id: "1423521666159611914" })
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId(`top_refresh_${category}_${timeframe}`)
        .setEmoji({ id: "1423520588638453850" })
        .setStyle(ButtonStyle.Secondary),
    );
    components.push(actionButtons);
  }

  return { files: [attachment], components };
};
