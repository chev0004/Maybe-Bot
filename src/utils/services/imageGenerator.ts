// src/utils/services/imageGenerator.ts

import { type CanvasRenderingContext2D, createCanvas, loadImage } from "canvas";
import type { topChannels, topUsers } from "../../db/schema.js";

export type LeaderboardData = (
  | typeof topUsers.$inferSelect
  | typeof topChannels.$inferSelect
)[];

/**
 * A helper function to draw rectangles with rounded corners.
 * @param ctx The canvas 2D context.
 * @param x The x-coordinate of the top-left corner.
 * @param y The y-coordinate of the top-left corner.
 * @param width The width of the rectangle.
 * @param height The height of the rectangle.
 * @param radius The corner radius.
 */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
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
}

/**
 * Generates an image for the leaderboard.
 * @param title The title of the leaderboard (e.g., "🏆 Top 10 Users by Messages Sent").
 * @param data The array of user or channel data.
 * @param serverIconUrl URL of the server's icon.
 * @param serverName Name of the server.
 * @returns {Promise<Buffer>} A buffer containing the generated PNG image.
 */
export const generateLeaderboardImage = async (
  title: string,
  data: LeaderboardData,
  serverIconUrl: string | null,
  serverName: string,
): Promise<Buffer> => {
  const width = 850;
  const height = 450;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#2B2D31";
  ctx.fillRect(0, 0, width, height);

  if (serverIconUrl) {
    try {
      const avatar = await loadImage(serverIconUrl);
      ctx.save();
      ctx.beginPath();
      ctx.arc(60, 60, 30, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(avatar, 30, 30, 60, 60);
      ctx.restore();
    } catch (e) {
      console.error("Failed to load server icon:", e);
    }
  }
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 24px 'Arial', 'Sans'";
  ctx.fillText(serverName, 100, 55);
  ctx.fillStyle = "#B8B9BF";
  ctx.font = "16px 'Arial', 'Sans'";
  ctx.fillText("Top Statistics", 102, 80);

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 20px 'Arial', 'Sans'";
  ctx.fillText(title, 35, 130);

  const itemHeight = 40;
  const itemGap = 8;
  const col1X = 30;
  const col2X = 440;
  const listStartY = 160;

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (!item.value) continue;

    const isUser = "userId" in item;
    const name = isUser ? `<@${item.userId}>` : `<#${item.channelId}>`;
    const value =
      item.value % 1 === 0 ? item.value.toString() : item.value.toFixed(2);

    const x = i < 5 ? col1X : col2X;
    const y = listStartY + (i % 5) * (itemHeight + itemGap);
    const itemWidth = 380;

    ctx.fillStyle = "#383A40";
    roundRect(ctx, x, y, itemWidth, itemHeight, 5);
    ctx.fill();

    ctx.fillStyle = "#B8B9BF";
    ctx.font = "bold 16px 'Arial', 'Sans'";
    ctx.textAlign = "left";
    ctx.fillText((i + 1).toString(), x + 15, y + 26);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "16px 'Arial', 'Sans'";
    ctx.fillText(name, x + 45, y + 26);

    const valueBoxWidth = 80;
    ctx.fillStyle = "#2B2D31";
    roundRect(
      ctx,
      x + itemWidth - valueBoxWidth - 5,
      y + 5,
      valueBoxWidth,
      30,
      5,
    );
    ctx.fill();

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 16px 'Arial', 'Sans'";
    ctx.textAlign = "center";
    ctx.fillText(value, x + itemWidth - valueBoxWidth / 2 - 5, y + 26);
  }

  ctx.fillStyle = "#949BA4";
  ctx.font = "12px 'Arial', 'Sans'";
  ctx.textAlign = "left";
  ctx.fillText(
    "Server Lookback: Last 14 days — Timezone: UTC",
    35,
    height - 20,
  );

  ctx.textAlign = "right";
  ctx.fillText("Powered by Maybe-Bot", width - 35, height - 20);

  return canvas.toBuffer("image/png");
};
