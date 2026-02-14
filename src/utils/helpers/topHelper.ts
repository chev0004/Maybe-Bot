import {
  AttachmentBuilder,
  type Client,
  type Guild,
  type InteractionReplyOptions,
} from "discord.js";
import { and, desc, eq, sql } from "drizzle-orm";
import { getMockTopData } from "../../commands/slash/stats/top/top.mock.js";
import { config } from "../../config/env.js";
import { db } from "../../db/index.js";
import {
  channels,
  dailyChannelStats,
  dailyUserStats,
  users,
} from "../../db/schema.js";
import {
  buildComponents,
  type InteractionConfig,
} from "../builders/interactionBuilder.js";
import {
  generateLeaderboardImage,
  generateOverviewImage,
  type LeaderboardItem,
  type OverviewData,
} from "../services/imageGenerator.js";

export type TopCategory =
  | "overview"
  | "msg_users"
  | "vc_users"
  | "stream_users"
  | "bump_users"
  | "wordle_users"
  | "msg_channels"
  | "vc_channels";

export type TopTimeframe = "1" | "7" | "14" | "30" | "all";

export const timeframeLabels: Record<TopTimeframe, string> = {
  "1": "過去24時間",
  "7": "過去7日間",
  "14": "過去14日間",
  "30": "過去30日間",
  all: "全期間",
};

const timeframeOptions = [
  { value: "1", label: "1日" },
  { value: "7", label: "7日" },
  { value: "14", label: "14日" },
  { value: "30", label: "30日" },
  { value: "all", label: "全期間" },
];

export const topInteractionConfig: InteractionConfig = {
  prefix: "top",
  categoryOptions: [
    { label: "Overview", value: "overview" },
    { label: "Top Message Users", value: "msg_users" },
    { label: "Top Voice Users", value: "vc_users" },
    { label: "Top Bumpers", value: "bump_users" },
    { label: "Top Wordle", value: "wordle_users" },
    { label: "Top Streamers", value: "stream_users" },
    { label: "Top Message Channels", value: "msg_channels" },
    { label: "Top Voice Channels", value: "vc_channels" },
  ],
  interactions: ["dropdown", "timeframe", "refresh"],
  timeframeOptions,
};
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
  category: "messages" | "vcHours" | "streamHours" | "bumps" | "wordleWins",
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
    // Correctly handle channel types for category
    if (category !== "messages" && category !== "vcHours") return [];
    const statsSubquery = db
      .select({
        channelId: dailyChannelStats.channelId,
        // Ensure category is correctly indexed here
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
    } else if (category === "messages") {
      conditions.push(eq(channels.type, "text"));
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
  isTestMode = false,
}: {
  category: TopCategory;
  timeframe: TopTimeframe;
  showTimeframeButtons: boolean;
  isTestMode?: boolean;
}) =>
  buildComponents(topInteractionConfig, {
    category,
    timeframe,
    showTimeframeButtons,
    isTestMode,
  });

export const generateInitialTopReply = async (guild: Guild, client: Client) => {
  return generateTopReply({
    guild,
    client,
    category: "overview",
    timeframe: "7",
    showTimeframeButtons: false,
    isTestMode: false,
  });
};

export const generateMockTopReply = async ({
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

  const data = getMockTopData(category, timeframe);
  if (category === "overview") {
    // Explicitly cast to OverviewData
    imageBuffer = await generateOverviewImage(
      data as OverviewData,
      serverIconUrl,
      guild.name,
      timeframeLabel,
    );
  } else {
    let title: string, iconPath: string;
    if (category === "msg_users") {
      title = "メッセージ・Top Messages";
      iconPath = "src/assets/icons/chat.png";
    } else if (category === "vc_users") {
      title = "ボイス時間・Top VC Hours";
      iconPath = "src/assets/icons/mic.png";
    } else if (category === "stream_users") {
      title = "配信時間・Top Stream Hours";
      iconPath = "src/assets/icons/stream.png";
    } else if (category === "bump_users") {
      title = "バンプ数・Top Bumpers";
      iconPath = "src/assets/icons/bump.png";
    } else if (category === "wordle_users") {
      title = "Wordle・Top Wordle";
      iconPath = "src/assets/icons/wordle.png";
    } else if (category === "msg_channels") {
      title = "送信メッセージ・Top Message Channels";
      iconPath = "src/assets/icons/chat.png";
    } else {
      title = "ボイス時間・Top Voice Channels";
      iconPath = "src/assets/icons/mic.png";
    }

    imageBuffer = await generateLeaderboardImage(
      title,
      iconPath,
      data as LeaderboardItem[],
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
    isTestMode: true,
  });
  return { files: [attachment], components };
};

export const generateTopReply = async ({
  guild,
  client,
  category,
  timeframe,
  showTimeframeButtons,
  isTestMode,
}: {
  guild: Guild;
  client: Client;
  category: TopCategory;
  timeframe: TopTimeframe;
  showTimeframeButtons: boolean;
  isTestMode: boolean;
}): Promise<InteractionReplyOptions> => {
  if (isTestMode) {
    return generateMockTopReply({
      guild,
      category,
      timeframe,
      showTimeframeButtons,
    });
  }

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
          // Keep original name if member not found
          return { ...item, name: item.name || `User (${item.id})` };
        }

        const serverNickname = member.nickname;
        const username = member.user.username;
        const displayName = member.displayName;

        let finalName: string;

        // Logic prioritizing nickname, then display name, ensuring username is included if different
        if (serverNickname) {
          if (
            serverNickname.toLowerCase() !== username.toLowerCase() &&
            serverNickname.toLowerCase() !== displayName.toLowerCase()
          ) {
            finalName = `${serverNickname} (${username})`;
          } else {
            finalName = serverNickname;
          }
        } else if (displayName.toLowerCase() !== username.toLowerCase()) {
          finalName = `${displayName} (${username})`;
        } else {
          finalName = username; // Use username if display name is the same
        }

        return { ...item, name: finalName };
      }),
    );
    return formattedData;
  };

  if (category === "overview") {
    const overviewData: OverviewData = {
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
      overviewData, // Pass the correctly typed object
      serverIconUrl,
      guild.name,
      timeframeLabel,
    );
  } else {
    let title: string,
      dbCategory:
        | "messages"
        | "vcHours"
        | "streamHours"
        | "bumps"
        | "wordleWins",
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
    } else if (category === "wordle_users") {
      title = "Wordle・Top Wordle";
      dbCategory = "wordleWins";
      type = "users";
      iconPath = "src/assets/icons/wordle.png";
    } else if (category === "msg_channels") {
      title = "送信メッセージ・Top Message Channels";
      dbCategory = "messages";
      type = "channels";
      iconPath = "src/assets/icons/chat.png";
    } else {
      // vc_channels
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
    isTestMode,
  });
  return { files: [attachment], components };
};
