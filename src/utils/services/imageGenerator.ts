import {
  type CanvasRenderingContext2D,
  createCanvas,
  loadImage,
  registerFont,
} from "canvas";
import path from "path";
import { parse } from "twemoji-parser";
import { Colors } from "../../constants/Colors.js";

export interface LeaderboardItem {
  name: string;
  value: number;
  type?: "text" | "voice";
}

export interface OverviewData {
  messages: { users: LeaderboardItem[] };
  bumps: { users: LeaderboardItem[] };
  voice: { users: LeaderboardItem[] };
  stream: { users: LeaderboardItem[] };
}

/**
 * Draws a rounded rectangle on the canvas.
 * @param {CanvasRenderingContext2D} ctx The canvas rendering context.
 * @param {number} x The x-coordinate of the rectangle's top-left corner.
 * @param {number} y The y-coordinate of the rectangle's top-left corner.
 * @param {number} width The width of the rectangle.
 * @param {number} height The height of the rectangle.
 * @param {number} radius The corner radius of the rectangle.
 */
const roundRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.arcTo(x + width, y, x + width, y + radius, radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
  ctx.lineTo(x + radius, y + height);
  ctx.arcTo(x, y + height, x, y + height - radius, radius);
  ctx.lineTo(x, y + radius);
  ctx.arcTo(x, y, x + radius, y, radius);
  ctx.closePath();
};
const drawMixedText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
) => {
  const japaneseRegex =
    /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
  let currentX = x;
  let currentSegment = "";
  let isLastCharJapanese = japaneseRegex.test(text[0] ?? "");
  ctx.textBaseline = "middle";
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const isCurrentCharJapanese = japaneseRegex.test(char);

    if (isCurrentCharJapanese !== isLastCharJapanese) {
      const yOffset = isLastCharJapanese ? 0 : 0;
      ctx.font = `${fontSize}px 'Noto Sans JP', 'Sans'`;
      ctx.fillText(currentSegment, currentX, y + yOffset);
      currentX += ctx.measureText(currentSegment).width;

      currentSegment = char;
      isLastCharJapanese = isCurrentCharJapanese;
    } else {
      currentSegment += char;
    }
  }

  if (currentSegment) {
    const yOffset = isLastCharJapanese ? 0 : 2;
    ctx.font = `${fontSize}px 'Noto Sans JP', 'Sans'`;
    ctx.fillText(currentSegment, currentX, y + yOffset);
  }

  ctx.textBaseline = "alphabetic";
};

/**
 * Draws text with Twemoji support, replacing emojis with images.
 * @param {CanvasRenderingContext2D} ctx The canvas rendering context.
 * @param {string} text The text to draw, which may include emojis.
 * @param {number} x The x-coordinate to start drawing the text.
 * @param {number} y The y-coordinate to draw the text.
 * @param {number} maxWidth The maximum width for the text. Text exceeding this width will be truncated.
 */
const drawTextWithTwemoji = async (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
) => {
  const emojiSize = 20;
  const fontSize = 16;
  const entities = parse(text, { assetType: "png" });
  let lastIndex = 0;
  let currentX = x;
  if (entities.length === 0) {
    ctx.fillText(text, x, y, maxWidth);
    return;
  }

  for (const entity of entities) {
    if (currentX >= x + maxWidth) break;
    const textBefore = text.substring(lastIndex, entity.indices[0]);
    if (textBefore) {
      const remainingWidth = maxWidth - (currentX - x);
      ctx.fillText(textBefore, currentX, y, remainingWidth);
      currentX += ctx.measureText(textBefore).width;
    }

    if (currentX < x + maxWidth) {
      try {
        const newUrl = entity.url.replace(
          "https://twemoji.maxcdn.com/v/latest/",
          "https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/",
        );
        const emojiImage = await loadImage(newUrl);
        const emojiY = y - fontSize + (fontSize - emojiSize) / 2 + 2;
        ctx.drawImage(emojiImage, currentX, emojiY, emojiSize, emojiSize);
        currentX += emojiSize + 2;
      } catch (e) {
        console.error(`Failed to load emoji image: ${entity.url}`, e);
        const fallback = "■";
        ctx.fillText(fallback, currentX, y);
        currentX += ctx.measureText(fallback).width;
      }
    }

    lastIndex = entity.indices[1];
  }

  if (lastIndex < text.length && currentX < x + maxWidth) {
    const textAfter = text.substring(lastIndex);
    const remainingWidth = maxWidth - (currentX - x);
    ctx.fillText(textAfter, currentX, y, remainingWidth);
  }
};

/**
 * Draws the leaderboard list on the canvas.
 * @param {CanvasRenderingContext2D} ctx The canvas rendering context.
 * @param {LeaderboardItem[]} data The leaderboard data to display.
 * @param {object} options Configuration options for drawing the list.
 * @param {number} options.startX The starting x-coordinate for the list.
 * @param {number} options.startY The starting y-coordinate for the list.
 * @param {number} [options.col2X] Optional x-coordinate for a second column (for two-column layouts).
 */
const drawLeaderboardList = async (
  ctx: CanvasRenderingContext2D,
  data: LeaderboardItem[],
  options: { startX: number; startY: number; col2X?: number },
) => {
  const { startX, startY, col2X } = options;
  const itemHeight = 50;
  const itemGap = 8;
  const itemWidth = 380;
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const value =
      item.value % 1 === 0 ? item.value.toString() : item.value.toFixed(2);
    const x = col2X && i >= data.length / 2 ? col2X : startX;
    const y =
      startY + (i % (data.length / (col2X ? 2 : 1))) * (itemHeight + itemGap);
    ctx.fillStyle = "#2B2D31"; // Background for each item
    roundRect(ctx, x, y, itemWidth, itemHeight, 8);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"; // Border for each item
    ctx.lineWidth = 1;
    roundRect(ctx, x, y, itemWidth, itemHeight, 8);
    ctx.stroke();

    const rankX = x + 24;
    const rankY = y + 18;
    const rankRadius = 14;
    const textY = y + 26;

    ctx.fillStyle = "#1d1e20ff"; // Circle rank number background
    ctx.beginPath();
    ctx.arc(rankX, rankY, rankRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#FFFFFF"; // Rank number color

    ctx.font = "bold 14px 'Noto Sans JP', 'Sans'";
    ctx.textAlign = "center";
    ctx.fillText((i + 1).toString(), rankX, y + 23);

    const nameTextGap = 16;
    const nameStartX = rankX + rankRadius + nameTextGap;

    ctx.textAlign = "left";
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "18px 'Noto Sans JP', 'Sans'";
    const displayName = item.type === "text" ? `#${item.name}` : item.name;
    await drawTextWithTwemoji(
      ctx,
      displayName,
      nameStartX,
      textY,
      itemWidth - 140,
    );
    ctx.fillStyle = "#A0A8B4";
    ctx.font = "bold 18px 'Noto Sans JP', 'Sans'";
    ctx.textAlign = "right";
    ctx.fillText(value, x + itemWidth - 15, textY + 2);

    const barHeight = 4;
    const barY = y + itemHeight - barHeight - 6;
    const barStartX = x + 10;
    const barMaxWidth = itemWidth - 20;

    ctx.fillStyle = "#40444B";
    roundRect(ctx, barStartX, barY, barMaxWidth, barHeight, 2);
    ctx.fill();
    const barWidth =
      totalValue > 0 ? (item.value / totalValue) * barMaxWidth : 0;
    if (barWidth > 0) {
      const barGradient = ctx.createLinearGradient(
        barStartX,
        0,
        barStartX + barWidth,
        0,
      );
      barGradient.addColorStop(0, Colors.blue);
      barGradient.addColorStop(1, Colors.sky);
      ctx.fillStyle = barGradient;
      roundRect(ctx, barStartX, barY, barWidth, barHeight, 2);
      ctx.fill();
    }
  }
};

/**
 * Draws the header and footer on the canvas.
 * @param {CanvasRenderingContext2D} ctx The canvas rendering context.
 * @param {number} width The width of the canvas.
 * @param {number} height The height of the canvas.
 * @param {string | null} serverIconUrl The URL of the server icon (can be null).
 * @param {string} serverName The name of the server.
 * @param {string} subtitle The subtitle to display (e.g., "サーバーランキング" or "アクティビティ").
 * @param {string} timeframe The timeframe for the leaderboard.
 */
export const drawHeaderAndFooter = async (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  serverIconUrl: string | null,
  serverName: string,
  subtitle: string,
  timeframe: string,
) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#313338");
  gradient.addColorStop(1, "#313338");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#2B2D31";
  ctx.fillRect(0, 0, width, 95);
  const headerX = 35;
  const headerY = 20;

  const roundRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    ctx.lineTo(x + radius, y + height);
    ctx.arcTo(x, y + height, x, y + height - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
  };
  if (serverIconUrl) {
    try {
      const avatar = await loadImage(serverIconUrl);
      ctx.save();
      ctx.beginPath();
      const iconX = headerX;
      const iconY = headerY;
      const iconSize = 60;
      const cornerRadius = 12;

      roundRect(ctx, iconX, iconY, iconSize, iconSize, cornerRadius);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(avatar, iconX, iconY, iconSize, iconSize);
      ctx.restore();
    } catch (e) {
      console.error("Failed to load server icon:", e);
    }
  }

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 26px 'Noto Sans JP', 'Sans'";
  ctx.textAlign = "left";
  ctx.fillText(serverName, headerX + 75, headerY + 30);

  ctx.fillStyle = "#A0A8B4";
  ctx.font = "18px 'Noto Sans JP', 'Sans'";
  ctx.fillText(subtitle, headerX + 77, headerY + 55);

  // --- FOOTER TEXT --- //
  ctx.fillStyle = "#ffffffff";
  ctx.font = "14px 'Noto Sans JP', 'Sans";
  ctx.textAlign = "left";
  drawMixedText(ctx, timeframe, 35, height - 20, 14);
};

/**
 * Generates a leaderboard image.
 * @param {string} title The title of the leaderboard.
 * @param {string | null} iconPath The local path to the icon for the title.
 * @param {LeaderboardItem[]} data The leaderboard data to display.
 * @param {string | null} serverIconUrl The URL of the server icon (can be null).
 * @param {string} serverName The name of the server.
 * @param {string} timeframe The timeframe for the leaderboard.
 */
export const generateLeaderboardImage = async (
  title: string,
  iconPath: string | null,
  data: LeaderboardItem[],
  serverIconUrl: string | null,
  serverName: string,
  timeframe: string,
): Promise<Buffer> => {
  const fontPath = path.resolve(
    process.cwd(),
    "src/assets/fonts/NotoSansJP-Regular.ttf",
  );
  registerFont(fontPath, { family: "Noto Sans JP" });

  const itemHeight = 50; // Height of each item
  const itemGap = 8; // Space between items
  const headerHeight = 110;
  const footerHeight = 40;
  const titleTopMargin = 28; // Adjusted for vertical centering
  const listTopMargin = 24; // Space above list

  const rows = data.length > 0 ? Math.ceil(data.length / 2) : 0;
  const listHeight = rows > 0 ? rows * itemHeight + (rows - 1) * itemGap : 0;
  const calculatedHeight =
    headerHeight + titleTopMargin + listTopMargin + listHeight + footerHeight;

  const width = 850;
  const height = Math.max(450, calculatedHeight);
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  await drawHeaderAndFooter(
    ctx,
    width,
    height,
    serverIconUrl,
    serverName,
    "サーバーランキング",
    timeframe,
  );

  const titleY = headerHeight + titleTopMargin;
  const iconSize = 24;
  let currentX = 35;

  if (iconPath) {
    try {
      const icon = await loadImage(path.resolve(process.cwd(), iconPath));
      ctx.drawImage(
        icon,
        currentX,
        titleY - iconSize / 2 - 2,
        iconSize,
        iconSize,
      );
      currentX += iconSize + 6;
    } catch (e) {
      console.error("Failed to load leaderboard icon:", e);
    }
  }

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 22px 'Noto Sans JP', 'Sans'";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(title, currentX, titleY - 2);
  ctx.textBaseline = "alphabetic";

  await drawLeaderboardList(ctx, data, {
    startX: 30,
    startY: titleY + listTopMargin,
    col2X: 440,
  });
  return canvas.toBuffer("image/png");
};

/**
 * Generates an overview image with multiple leaderboard sections.
 * @param {OverviewData} data The overview data containing multiple leaderboard sections.
 * @param {string | null} serverIconUrl The URL of the server icon (can be null).
 * @param {string} serverName The name of the server.
 * @param {string} timeframe The timeframe for the overview.
 */
export const generateOverviewImage = async (
  data: OverviewData,
  serverIconUrl: string | null,
  serverName: string,
  timeframe: string,
): Promise<Buffer> => {
  const fontPath = path.resolve(
    process.cwd(),
    "src/assets/fonts/NotoSansJP-Regular.ttf",
  );
  registerFont(fontPath, { family: "Noto Sans JP" });

  const itemHeight = 50;
  const itemGap = 8;
  const sectionGap = 24;
  const listTopMargin = 24;
  const titleHeight = 22;
  const titleMargin = 28;
  const headerHeight = 110;
  const footerHeight = 2;
  const messageRows = Math.max(
    data.messages.users.length,
    data.bumps.users.length,
  );
  const voiceRows = Math.max(data.voice.users.length, data.stream.users.length);
  const messagesHeight =
    messageRows > 0
      ? messageRows * itemHeight + (messageRows - 1) * itemGap
      : 0;
  const voiceHeight =
    voiceRows > 0 ? voiceRows * itemHeight + (voiceRows - 1) * itemGap : 0;

  let calculatedHeight = headerHeight;
  if (messagesHeight > 0) {
    calculatedHeight +=
      titleMargin + titleHeight + listTopMargin + messagesHeight;
    if (voiceHeight > 0) {
      calculatedHeight += sectionGap;
    }
  }
  if (voiceHeight > 0) {
    calculatedHeight += titleMargin + titleHeight + listTopMargin + voiceHeight;
  }
  calculatedHeight += footerHeight;

  const width = 850;
  const height = Math.max(480, calculatedHeight);
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  await drawHeaderAndFooter(
    ctx,
    width,
    height,
    serverIconUrl,
    serverName,
    "サーバーランキング",
    timeframe,
  );
  let currentY = headerHeight + titleMargin;

  const iconSize = 24;
  const iconPadding = 10;
  const iconBasePath = "src/assets/icons";

  const drawSectionTitle = async (
    title: string,
    iconName: string,
    x: number,
    y: number,
  ) => {
    let currentX = x;
    try {
      const icon = await loadImage(
        path.resolve(process.cwd(), `${iconBasePath}/${iconName}.png`),
      );
      ctx.drawImage(icon, currentX, y - iconSize / 2 - 2, iconSize, iconSize);
      currentX += iconSize + iconPadding;
    } catch (e) {
      console.error(`Failed to load icon ${iconName}:`, e);
    }
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 22px 'Noto Sans JP', 'Sans'";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(title, currentX - 4, y - 2);
    ctx.textBaseline = "alphabetic";
  };

  if (messagesHeight > 0) {
    await drawSectionTitle("メッセージ・Top Messages", "chat", 35, currentY);
    await drawSectionTitle("バンプ数・Top Bumpers", "bump", 445, currentY);

    await drawLeaderboardList(ctx, data.messages.users, {
      startX: 30,
      startY: currentY + listTopMargin,
    });
    await drawLeaderboardList(ctx, data.bumps.users, {
      startX: 440,
      startY: currentY + listTopMargin,
    });
    currentY += titleHeight + listTopMargin + messagesHeight + sectionGap;
  }

  if (voiceHeight > 0) {
    await drawSectionTitle("ボイス時間・Top VC Hours", "mic", 35, currentY);
    await drawSectionTitle(
      "配信時間・Top Stream Hours",
      "stream",
      445,
      currentY,
    );

    await drawLeaderboardList(ctx, data.voice.users, {
      startX: 30,
      startY: currentY + listTopMargin,
    });
    await drawLeaderboardList(ctx, data.stream.users, {
      startX: 440,
      startY: currentY + listTopMargin,
    });
  }

  return canvas.toBuffer("image/png");
};
