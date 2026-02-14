import path from "node:path";
import type { CanvasRenderingContext2D } from "canvas";
import { createCanvas, registerFont } from "canvas";

const CORRECT_TEMPLATE_HEADERS = [
  "【名前/Name】",
  "【出身/Country】",
  "【言語/Language】",
  "【勉強/Studying】",
  "【趣味/Hobby】",
  "【一言/Intro】",
];

const CORRECT_TEMPLATE_STRING = CORRECT_TEMPLATE_HEADERS.join("\n");

const MIN_PREFIX_MATCH_LEN = 3;

const FONT_SIZE = 16;
const LINE_HEIGHT = 24;
const PADDING = 24;
const MAX_CANVAS_WIDTH = 800;
const HIGHLIGHT_BG = "#c92a2a";
const HIGHLIGHT_TEXT = "#ffffff";
const NORMAL_TEXT = "#ffffff";
const NORMAL_BG = "#2c2d32";
const EXPECTED_LINE_COLOR = "#868e96";

try {
  const fontsPath = path.resolve(process.cwd(), "src", "assets", "fonts");
  registerFont(path.join(fontsPath, "NotoSans-Regular.ttf"), {
    family: "NotoSans",
  });
  registerFont(path.join(fontsPath, "NotoSansJP-Regular.ttf"), {
    family: "NotoSansJP",
  });
} catch {}

const FONT_STRING_JP = `${FONT_SIZE}px NotoSansJP, sans-serif`;
const FONT_STRING_LATIN = `${FONT_SIZE}px NotoSans, sans-serif`;

const CJK_REGEX =
  /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;

function setFont(ctx: CanvasRenderingContext2D, forLatin = false): void {
  ctx.font = forLatin ? FONT_STRING_LATIN : FONT_STRING_JP;
}

function drawRawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  _maxWidth: number,
): number {
  if (text.length === 0) return x;
  let currentX = x;
  let segment = "";
  let lastLatin = !CJK_REGEX.test(text[0] ?? "");
  for (let i = 0; i < text.length; i++) {
    const c = text[i] ?? "";
    const isLatin = !CJK_REGEX.test(c);
    if (isLatin !== lastLatin && segment.length > 0) {
      setFont(ctx, lastLatin);
      ctx.fillText(segment, currentX, y);
      currentX += ctx.measureText(segment).width;
      segment = "";
    }
    segment += c;
    lastLatin = isLatin;
  }
  if (segment.length > 0) {
    setFont(ctx, lastLatin);
    ctx.fillText(segment, currentX, y);
    currentX += ctx.measureText(segment).width;
  }
  return currentX;
}

function measureRawText(ctx: CanvasRenderingContext2D, text: string): number {
  if (text.length === 0) return 0;
  let width = 0;
  let segment = "";
  let lastLatin = !CJK_REGEX.test(text[0] ?? "");
  for (let i = 0; i < text.length; i++) {
    const c = text[i] ?? "";
    const isLatin = !CJK_REGEX.test(c);
    if (isLatin !== lastLatin && segment.length > 0) {
      setFont(ctx, lastLatin);
      width += ctx.measureText(segment).width;
      segment = "";
    }
    segment += c;
    lastLatin = isLatin;
  }
  if (segment.length > 0) {
    setFont(ctx, lastLatin);
    width += ctx.measureText(segment).width;
  }
  return width;
}

type MatchResult = {
  headerToUserLine: (string | null)[];
  leadingLines: string[];
  trailingLines: string[];
};

function commonPrefixLength(a: string, b: string): number {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return i;
}

function matchUserLinesToHeaders(content: string): MatchResult {
  const lines = content.split("\n");
  const headerToUserLine: (string | null)[] = [
    null,
    null,
    null,
    null,
    null,
    null,
  ];
  const assignedLineIndices: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trimRight();
    let bestH: number | null = null;
    let bestPrefix = 0;
    for (let h = 0; h < CORRECT_TEMPLATE_HEADERS.length; h++) {
      if (headerToUserLine[h] !== null) continue;
      const header = CORRECT_TEMPLATE_HEADERS[h];
      const startsWithHeader = trimmed.startsWith(header);
      const lineIsPrefixOfHeader =
        header.startsWith(trimmed) && trimmed.length >= 2;
      const prefixLen = commonPrefixLength(trimmed, header);
      const typoMatch =
        prefixLen >= MIN_PREFIX_MATCH_LEN && prefixLen > bestPrefix;
      if (startsWithHeader) {
        bestH = h;
        bestPrefix = header.length;
        break;
      }
      if (lineIsPrefixOfHeader && prefixLen > bestPrefix) {
        bestPrefix = prefixLen;
        bestH = h;
      }
      if (typoMatch) {
        bestPrefix = prefixLen;
        bestH = h;
      }
    }
    if (bestH !== null) {
      headerToUserLine[bestH] = line;
      assignedLineIndices.push(i);
    }
  }
  const leadingLines =
    assignedLineIndices.length > 0
      ? lines.slice(0, Math.min(...assignedLineIndices))
      : lines;
  const trailingLines =
    assignedLineIndices.length > 0
      ? lines.slice(Math.max(...assignedLineIndices) + 1)
      : [];
  return { headerToUserLine, leadingLines, trailingLines };
}

function getWrongRangesForHeader(
  headerIndex: number,
  userLine: string,
): Array<[number, number]> {
  const expected = CORRECT_TEMPLATE_HEADERS[headerIndex];
  let firstWrong = 0;
  while (
    firstWrong < userLine.length &&
    firstWrong < expected.length &&
    userLine[firstWrong] === expected[firstWrong]
  ) {
    firstWrong++;
  }
  if (firstWrong === expected.length) return [];

  const errorAtEnd =
    firstWrong === userLine.length && userLine.length < expected.length;
  if (errorAtEnd) {
    return [[0, userLine.length]];
  }
  const highlightEnd = Math.min(userLine.length, expected.length);
  return [[firstWrong, highlightEnd]];
}

export function drawUserMessageWithHighlights(content: string): Buffer {
  const { headerToUserLine, leadingLines, trailingLines } =
    matchUserLinesToHeaders(content);
  const canvas = createCanvas(MAX_CANVAS_WIDTH, 100);
  const ctx = canvas.getContext("2d");

  const linesToMeasure: string[] = [...leadingLines, ...trailingLines];
  for (let i = 0; i < CORRECT_TEMPLATE_HEADERS.length; i++) {
    const expected = CORRECT_TEMPLATE_HEADERS[i];
    const userLine = headerToUserLine[i];
    if (userLine === null) {
      linesToMeasure.push(expected);
    } else {
      linesToMeasure.push(userLine);
    }
  }
  const textWidth = Math.min(
    MAX_CANVAS_WIDTH - PADDING * 2,
    Math.ceil(
      Math.max(
        ...linesToMeasure.map((line) => measureRawText(ctx, line)),
        measureRawText(ctx, " "),
      ),
    ) + 1,
  );
  const width = textWidth + PADDING * 2;
  let totalRows = leadingLines.length + trailingLines.length;
  for (let i = 0; i < CORRECT_TEMPLATE_HEADERS.length; i++) {
    const userLine = headerToUserLine[i];
    if (userLine === null) {
      totalRows += 1;
    } else {
      const ranges = getWrongRangesForHeader(i, userLine);
      totalRows += ranges.length > 0 ? 2 : 1;
    }
  }
  const firstSlotHasTypoNoLeading =
    leadingLines.length === 0 &&
    headerToUserLine[0] !== null &&
    getWrongRangesForHeader(0, headerToUserLine[0]).length > 0;
  const topPaddingExtra = firstSlotHasTypoNoLeading ? LINE_HEIGHT : 0;
  const height = totalRows * LINE_HEIGHT + PADDING * 2 + topPaddingExtra;
  const resized = createCanvas(width, height);
  const rctx = resized.getContext("2d");

  rctx.fillStyle = NORMAL_BG;
  rctx.fillRect(0, 0, width, height);
  rctx.textBaseline = "middle";

  let rowY = PADDING + topPaddingExtra;

  for (const line of leadingLines) {
    const lineY = rowY;
    const y = rowY + LINE_HEIGHT / 2;
    const lineW = measureRawText(rctx, line);
    rctx.fillStyle = HIGHLIGHT_BG;
    rctx.fillRect(PADDING, lineY, lineW, LINE_HEIGHT);
    rctx.fillStyle = HIGHLIGHT_TEXT;
    drawRawText(rctx, line, PADDING, y, textWidth);
    rowY += LINE_HEIGHT;
  }

  for (let i = 0; i < CORRECT_TEMPLATE_HEADERS.length; i++) {
    const expected = CORRECT_TEMPLATE_HEADERS[i];
    const userLine = headerToUserLine[i];

    if (userLine === null) {
      rctx.fillStyle = EXPECTED_LINE_COLOR;
      drawRawText(rctx, expected, PADDING, rowY + LINE_HEIGHT / 2, textWidth);
      rowY += LINE_HEIGHT;
      continue;
    }

    const ranges = getWrongRangesForHeader(i, userLine);
    const hasTypo = ranges.length > 0;

    if (hasTypo) {
      rctx.fillStyle = EXPECTED_LINE_COLOR;
      drawRawText(rctx, expected, PADDING, rowY + LINE_HEIGHT / 2, textWidth);
      rowY += LINE_HEIGHT;
    }

    const lineY = rowY;
    const y = rowY + LINE_HEIGHT / 2;

    for (const [start, end] of ranges) {
      const xStart =
        PADDING + measureRawText(rctx, userLine.substring(0, start));
      const segment = userLine.substring(start, end);
      const segmentWidth = segment
        ? measureRawText(rctx, segment)
        : (end - start) * 10;
      rctx.fillStyle = HIGHLIGHT_BG;
      rctx.fillRect(xStart, lineY, segmentWidth, LINE_HEIGHT);
    }

    let x = PADDING;
    if (ranges.length === 0) {
      rctx.fillStyle = NORMAL_TEXT;
      drawRawText(rctx, userLine, PADDING, y, textWidth);
    } else {
      const sorted = [...ranges].sort((a, b) => a[0] - b[0]);
      let pos = 0;
      for (const [start, end] of sorted) {
        if (pos < start) {
          const segment = userLine.substring(pos, start);
          rctx.fillStyle = NORMAL_TEXT;
          drawRawText(rctx, segment, x, y, textWidth);
          x += measureRawText(rctx, segment);
        }
        const segment = userLine.substring(start, end);
        rctx.fillStyle = HIGHLIGHT_TEXT;
        drawRawText(rctx, segment, x, y, textWidth);
        x += measureRawText(rctx, segment);
        pos = end;
      }
      if (pos < userLine.length) {
        rctx.fillStyle = NORMAL_TEXT;
        drawRawText(rctx, userLine.substring(pos), x, y, textWidth);
      }
    }
    rowY += LINE_HEIGHT;
  }

  for (const line of trailingLines) {
    const lineY = rowY;
    const y = rowY + LINE_HEIGHT / 2;
    const lineW = measureRawText(rctx, line);
    rctx.fillStyle = HIGHLIGHT_BG;
    rctx.fillRect(PADDING, lineY, lineW, LINE_HEIGHT);
    rctx.fillStyle = HIGHLIGHT_TEXT;
    drawRawText(rctx, line, PADDING, y, textWidth);
    rowY += LINE_HEIGHT;
  }

  rctx.textBaseline = "alphabetic";
  return resized.toBuffer("image/png");
}

export function drawCorrectTemplate(): Buffer {
  const lines = CORRECT_TEMPLATE_STRING.split("\n");
  const canvas = createCanvas(MAX_CANVAS_WIDTH, 100);
  const ctx = canvas.getContext("2d");

  let textWidth = 0;
  for (const line of lines) {
    const w = measureRawText(ctx, line);
    if (w > textWidth) textWidth = w;
  }
  textWidth = Math.min(
    MAX_CANVAS_WIDTH - PADDING * 2,
    Math.ceil(textWidth) + 1,
  );
  const width = textWidth + PADDING * 2;
  const height = lines.length * LINE_HEIGHT + PADDING * 2;
  const resized = createCanvas(width, height);
  const rctx = resized.getContext("2d");

  rctx.fillStyle = NORMAL_BG;
  rctx.fillRect(0, 0, width, height);
  rctx.fillStyle = NORMAL_TEXT;
  rctx.textBaseline = "middle";
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const y = PADDING + (i + 1) * LINE_HEIGHT - LINE_HEIGHT / 2;
    drawRawText(rctx, line, PADDING, y, textWidth);
  }
  rctx.textBaseline = "alphabetic";
  return resized.toBuffer("image/png");
}
