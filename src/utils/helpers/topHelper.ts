import {
  ActionRowBuilder,
  AttachmentBuilder,
  ButtonBuilder,
  ButtonStyle,
  type Client,
  type Guild,
  type InteractionReplyOptions,
  StringSelectMenuBuilder,
} from "discord.js";
import { and, desc, eq, sql } from "drizzle-orm";
import { config } from "../../config/env.js";
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

const categoryOptions = [
  { label: "Overview", value: "overview" },
  { label: "Top Message Users", value: "msg_users" },
  { label: "Top Voice Users", value: "vc_users" },
  { label: "Top Bumpers", value: "bump_users" },
  { label: "Top Streamers", value: "stream_users" },
  { label: "Top Message Channels", value: "msg_channels" },
  { label: "Top Voice Channels", value: "vc_channels" },
];

const getDateCondition = (timeframe: TopTimeframe) => {
  if (timeframe === "all") return undefined;
  const days = parseInt(timeframe, 10);

  if (Number.isNaN(days)) {
    console.error(
      `[getDateCondition] Invalid timeframe value received: "${timeframe}". Defaulting to 7 days to prevent crash.`,
    );
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return sql`"date" >= ${date.toISOString().slice(0, 10)}`;
  }

  const date = new Date();
  date.setDate(date.getDate() - days);
  return sql`"date" >= ${date.toISOString().slice(0, 10)}`;
};

const getTopData = async (
  category: "messages" | "vcHours" | "streamHours" | "bumps",
  type: "users" | "channels",
  timeframe: TopTimeframe,
  limit: number,
): Promise<(LeaderboardItem & { id?: string })[]> => {
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
        id: users.id,
        name: users.username,
        totalValue:
          sql<number>`coalesce(${statsSubquery.totalValue}, 0)`.mapWith(Number),
      })
      .from(users)
      .leftJoin(statsSubquery, eq(users.id, statsSubquery.userId))
      .orderBy(desc(sql`coalesce(${statsSubquery.totalValue}, 0)`))
      .limit(limit);
    return results.map((r) => ({
      id: r.id,
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
};

export const generateComponentsForTop = ({
  category,
  timeframe,
  showTimeframeButtons,
}: {
  category: TopCategory;
  timeframe: TopTimeframe;
  showTimeframeButtons: boolean;
}) => {
  const showTimeframeFlag = showTimeframeButtons ? "1" : "0";
  const currentCategoryLabel =
    categoryOptions.find((opt) => opt.value === category)?.label ||
    "Select a category...";
  const dropdown = new StringSelectMenuBuilder()
    .setCustomId(`top-category-${timeframe}-${showTimeframeFlag}`)
    .setPlaceholder(currentCategoryLabel)
    .addOptions(
      categoryOptions.map((opt) => ({
        ...opt,
        default: opt.value === category,
      })),
    );

  const components: ActionRowBuilder<
    StringSelectMenuBuilder | ButtonBuilder
  >[] = [
    new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(dropdown),
  ];

  if (showTimeframeButtons) {
    const timeButtons = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(`top-timeframe-back-${category}-${timeframe}`)
        .setEmoji({ id: "1423520590261780541" })
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId(`top-select-${category}-1`)
        .setLabel("1日")
        .setStyle(
          timeframe === "1" ? ButtonStyle.Primary : ButtonStyle.Secondary,
        ),
      new ButtonBuilder()
        .setCustomId(`top-select-${category}-7`)
        .setLabel("7日")
        .setStyle(
          timeframe === "7" ? ButtonStyle.Primary : ButtonStyle.Secondary,
        ),
      new ButtonBuilder()
        .setCustomId(`top-select-${category}-30`)
        .setLabel("30日")
        .setStyle(
          timeframe === "30" ? ButtonStyle.Primary : ButtonStyle.Secondary,
        ),
      new ButtonBuilder()
        .setCustomId(`top-select-${category}-all`)
        .setLabel("全期間")
        .setStyle(
          timeframe === "all" ? ButtonStyle.Primary : ButtonStyle.Secondary,
        ),
    );
    components.push(timeButtons);
  } else {
    const actionButtons = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(`top-timeframe-show-${category}-${timeframe}`)
        .setEmoji({ id: "1423521666159611914" })
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId(`top-refresh-${category}-${timeframe}`)
        .setEmoji({ id: "1423520588638453850" })
        .setStyle(ButtonStyle.Secondary),
    );
    components.push(actionButtons);
  }
  return components;
};

export const generateInitialTopReply = async (guild: Guild, client: Client) => {
  return generateTopReply({
    guild,
    client,
    category: "overview",
    timeframe: "7",
    showTimeframeButtons: false,
  });
};

export const generateTopReply = async ({
  guild,
  client,
  category,
  timeframe,
  showTimeframeButtons,
}: {
  guild: Guild;
  client: Client;
  category: TopCategory;
  timeframe: TopTimeframe;
  showTimeframeButtons: boolean;
}): Promise<InteractionReplyOptions> => {
  const serverIconUrl = guild.iconURL({ extension: "png", size: 128 });
  const timeframeLabel = timeframeLabels[timeframe];
  let imageBuffer: Buffer;

  const mainGuild = await client.guilds.fetch(config.ids.guild);
  const formatDataWithNicknames = async (
    data: (LeaderboardItem & { id?: string })[],
  ) => {
    if (!data.length || !data[0]?.id) return data;

    const formattedData = await Promise.all(
      data.map(async (item) => {
        if (!item.id) return item;
        const member = await mainGuild.members.fetch(item.id).catch(() => null);
        if (!member) {
          return item;
        }

        const serverNickname = member.nickname;
        const username = member.user.username;
        const displayName = member.displayName;

        let finalName: string;

        if (serverNickname) {
          if (serverNickname.toLowerCase() !== username.toLowerCase()) {
            finalName = `${serverNickname} (${username})`;
          } else {
            finalName = serverNickname;
          }
        } else {
          finalName = `${displayName} (${username})`;
        }

        return { ...item, name: finalName };
      }),
    );
    return formattedData;
  };

  if (category === "overview") {
    const data = {
      messages: {
        users: await formatDataWithNicknames(
          await getTopData("messages", "users", timeframe, 3),
        ),
      },
      bumps: {
        users: await formatDataWithNicknames(
          await getTopData("bumps", "users", timeframe, 3),
        ),
      },
      voice: {
        users: await formatDataWithNicknames(
          await getTopData("vcHours", "users", timeframe, 3),
        ),
      },
      stream: {
        users: await formatDataWithNicknames(
          await getTopData("streamHours", "users", timeframe, 3),
        ),
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
      type: "users" | "channels",
      iconPath: string;
    if (category === "msg_users") {
      title = "メッセージ・Top Messages";
      dbCategory = "messages";
      type = "users";
      iconPath = "src/assets/icons/chat.png";
    } else if (category === "vc_users") {
      title = "ボイス時間・Top VC Hours";
      dbCategory = "vcHours";
      type = "users";
      iconPath = "src/assets/icons/mic.png";
    } else if (category === "stream_users") {
      title = "配信時間・Top Stream Hours";
      dbCategory = "streamHours";
      type = "users";
      iconPath = "src/assets/icons/stream.png";
    } else if (category === "bump_users") {
      title = "バンプ数・Top Bumpers";
      dbCategory = "bumps";
      type = "users";
      iconPath = "src/assets/icons/bump.png";
    } else if (category === "msg_channels") {
      title = "送信メッセージ・Top Message Channels";
      dbCategory = "messages";
      type = "channels";
      iconPath = "src/assets/icons/chat.png";
    } else {
      title = "ボイス時間・Top Voice Channels";
      dbCategory = "vcHours";
      type = "channels";
      iconPath = "src/assets/icons/mic.png";
    }
    const rawData = await getTopData(dbCategory, type, timeframe, 10);
    const data =
      type === "users" ? await formatDataWithNicknames(rawData) : rawData;
    imageBuffer = await generateLeaderboardImage(
      title,
      iconPath,
      data,
      serverIconUrl,
      guild.name,
      timeframeLabel,
    );
  }

  const attachment = new AttachmentBuilder(imageBuffer, {
    name: "leaderboard.png",
  });
  const components = generateComponentsForTop({
    category,
    timeframe,
    showTimeframeButtons,
  });
  return { files: [attachment], components };
};
