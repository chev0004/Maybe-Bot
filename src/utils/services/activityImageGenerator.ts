import path from "node:path";
import {
  type CanvasRenderingContext2D,
  createCanvas,
  registerFont,
} from "canvas";
import type {
  MessageActivityData,
  VoiceActivityData,
} from "../../commands/slash/stats/activity/activity.mock.js";
import { Colors } from "../../constants/Colors.js";
import { drawHeaderAndFooter } from "./imageGenerator.js";

const fontsPath = path.resolve(process.cwd(), "src", "assets", "fonts");

registerFont(path.join(fontsPath, "NotoSans-Regular.ttf"), {
  family: "NotoSans",
});
registerFont(path.join(fontsPath, "NotoSans-Bold.ttf"), {
  family: "NotoSans",
  weight: "bold",
});
registerFont(path.join(fontsPath, "NotoSansJP-Regular.ttf"), {
  family: "NotoSansJP",
});

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 650;
const PADDING = 40;
const CHART_START_X = PADDING + 50;
const HEADER_HEIGHT = 95;
const CHART_START_Y = HEADER_HEIGHT + PADDING;
const CHART_END_X = CANVAS_WIDTH - PADDING;
const CHART_END_Y = CANVAS_HEIGHT - PADDING - 160;
const CHART_WIDTH = CHART_END_X - CHART_START_X;
const CHART_HEIGHT = CHART_END_Y - CHART_START_Y;

// Helper to draw rounded rectangles (for bars and legend box)
function drawRoundedRect(
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
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
}

/**
 * Draws the base of the activity chart including axes, guidelines, and header/footer.
 * @param {CanvasRenderingContext2D} ctx The canvas context.
 * @param {number[]} hourlyData The data for max value calculation.
 * @param {string} serverName The server name for the header.
 * @param {string | null} serverIconUrl The server icon URL for the header.
 * @param {string} timeframeLabel The label for the timeframe (e.g., "過去7日間").
 */
const drawChartBase = async (
  ctx: CanvasRenderingContext2D,
  hourlyData: number[],
  serverName: string,
  serverIconUrl: string | null,
  timeframeLabel: string,
) => {
  await drawHeaderAndFooter(
    ctx,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    serverIconUrl,
    serverName,
    "サーバーアクティビティ",
    timeframeLabel,
  );

  // --- Draw Chart Area ---
  ctx.strokeStyle = "#40444B"; // Gray line
  ctx.lineWidth = 1;

  // --- Draw Y-axis (Value) ---
  const maxValue = Math.max(...hourlyData, 1); // Avoid division by zero if data is all 0
  const yAxisTicks = 5;
  ctx.font = "14px 'Noto Sans JP', 'Sans'";
  ctx.fillStyle = "#949BA4";
  ctx.textAlign = "right";

  for (let i = 0; i <= yAxisTicks; i++) {
    const value = (maxValue / yAxisTicks) * i;
    const y = CHART_END_Y - (CHART_HEIGHT / yAxisTicks) * i;

    // Y-axis label
    ctx.fillText(Math.round(value).toLocaleString(), CHART_START_X - 10, y + 4);

    // Guideline
    if (i > 0) {
      ctx.beginPath();
      ctx.moveTo(CHART_START_X, y);
      ctx.lineTo(CHART_END_X, y);
      ctx.stroke();
    }
  }

  // --- Draw X-axis (Time) ---
  const barWidth = CHART_WIDTH / 24;
  ctx.textAlign = "center";
  ctx.fillStyle = "#949BA4";
  ctx.font = "12px 'NotoSans', 'Sans'";
  const xAxisLabelY = CHART_END_Y + 15;
  for (let i = 0; i < 24; i++) {
    const x = CHART_START_X + barWidth * i + barWidth / 2;
    const label = i.toString().padStart(2, "0");

    ctx.fillText(label, x, xAxisLabelY);
  }
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 14px 'Noto Sans JP', 'Sans'";
  ctx.fillText("Timezone: JST", CANVAS_WIDTH / 2, xAxisLabelY + 24);
};

function drawBars(ctx: CanvasRenderingContext2D, hourlyData: number[]) {
  const maxValue = Math.max(...hourlyData, 1);
  const barWidth = CHART_WIDTH / 24;
  const barMargin = 2; // Space between bars

  for (let i = 0; i < 24; i++) {
    const value = hourlyData[i] || 0;
    const barHeight = (value / maxValue) * CHART_HEIGHT;
    const x = CHART_START_X + i * barWidth;
    const y = CHART_END_Y - barHeight;

    ctx.fillStyle = Colors.blue;
    drawRoundedRect(
      ctx,
      x + barMargin,
      y,
      barWidth - barMargin * 2,
      barHeight,
      3,
    );
  }
}

/**
 * Draws the legend/stats box at the bottom of the canvas.
 * @param {CanvasRenderingContext2D} ctx The canvas context.
 * @param {{ label: string; value: string }[]} stats The stats to display.
 */
function drawLegendBox(
  ctx: CanvasRenderingContext2D,
  stats: { label: string; value: string }[],
) {
  const numBoxes = stats.length;
  if (numBoxes === 0) return;

  const totalChartWidth = CANVAS_WIDTH - PADDING * 2;
  const boxGap = 20;
  const totalGapWidth = boxGap * (numBoxes - 1);
  const boxWidth = (totalChartWidth - totalGapWidth) / numBoxes;
  const boxHeight = 70;
  const verticalOffset = 60;
  const boxY = CHART_END_Y + verticalOffset;

  let orderedStats = stats;
  if (numBoxes === 3 && stats[0].label.includes("Peak Hour")) {
    orderedStats = [stats[2], stats[0], stats[1]];
  }

  orderedStats.forEach((stat, index) => {
    const boxX = PADDING + index * (boxWidth + boxGap);

    // 1. Draw the individual background box
    ctx.fillStyle = "#2B2D31"; // Darker background
    drawRoundedRect(ctx, boxX, boxY, boxWidth, boxHeight, 8);

    // 2. Draw Value (White, Bold)
    ctx.fillStyle = Colors.blue;
    ctx.font = "bold 24px 'Noto Sans JP', 'Sans'";
    ctx.textAlign = "center";
    const valueX = boxX + boxWidth / 2;
    const valueY = boxY + 33;
    ctx.fillText(stat.value, valueX, valueY);

    ctx.fillStyle = "#949BA4";
    ctx.font = "14px 'Noto Sans JP', 'Sans'";
    ctx.fillText(stat.label, valueX, valueY + 22);
  });
}

/**
 * Generates an image buffer for Voice Activity stats
 */
export const generateVoiceActivityImage = async (
  data: VoiceActivityData,
  serverIconUrl: string | null,
  serverName: string,
  timeframeLabel: string,
): Promise<Buffer> => {
  const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  const ctx = canvas.getContext("2d");

  await drawChartBase(
    ctx,
    data.hourlyActivity,
    serverName,
    serverIconUrl,
    timeframeLabel,
  );
  drawBars(ctx, data.hourlyActivity);

  const stats = [
    {
      label: "ピーク時間 / Peak Hour",
      value: `${data.peakHour.toString().padStart(2, "0")}:00`,
    },
    {
      label: "合計時間 / Total Hours",
      value: `${data.totalDurationHours.toFixed(1)}h`,
    },
    {
      label: "平均参加者 / Avg. Participants",
      value: data.averageParticipants.toFixed(1),
    },
  ];
  drawLegendBox(ctx, stats);

  return canvas.toBuffer("image/png");
};

/**
 * Generates an image buffer for Message Activity stats
 */
export const generateMessageActivityImage = async (
  data: MessageActivityData,
  serverIconUrl: string | null,
  serverName: string,
  timeframeLabel: string,
): Promise<Buffer> => {
  const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  const ctx = canvas.getContext("2d");

  await drawChartBase(
    ctx,
    data.hourlyActivity,
    serverName,
    serverIconUrl,
    timeframeLabel,
  );

  drawBars(ctx, data.hourlyActivity);

  const stats = [
    {
      label: "ピーク時間 / Peak Hour",
      value: `${data.mostActiveHour.toString().padStart(2, "0")}:00`,
    },
    {
      label: "平均参加者 / Avg. Participants",
      value: data.averageParticipants.toFixed(0),
    },
    {
      label: "合計メッセージ / Total Messages",
      value: data.totalMessages.toLocaleString(),
    },
  ];
  drawLegendBox(ctx, stats);

  return canvas.toBuffer("image/png");
};
