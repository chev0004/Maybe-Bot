// src/preview.ts
import express from "express";
import {
  dummyChannelMessages,
  dummyChannelVC,
  dummyOverviewData,
  dummyUserMessages,
  dummyUserVC,
} from "./utils/services/dummyData.js";
import {
  generateLeaderboardImage,
  generateOverviewImage,
} from "./utils/services/imageGenerator.js";

const app = express();
const PORT = 3000;

// --- Mock server details for the image header ---
const serverName = "Kessoku Bando";
const serverIconUrl = "https://i.imgur.com/E15A75G.png"; // You can use a direct URL to an image
const timeframe = "Past 7 Days";

// --- Endpoint for the Overview Image ---
app.get("/overview", async (_req: express.Request, res: express.Response) => {
  console.log("Generating /overview image...");
  try {
    const imageBuffer = await generateOverviewImage(
      dummyOverviewData,
      serverIconUrl,
      serverName,
      timeframe,
    );
    res.setHeader("Content-Type", "image/png");
    res.send(imageBuffer);
  } catch (error) {
    console.error("Error generating overview image:", error);
    res.status(500).send("Error generating image");
  }
});

// --- Endpoints for the Leaderboard Images ---
app.get(
  "/leaderboard/msg-users",
  async (_req: express.Request, res: express.Response) => {
    console.log("Generating /leaderboard/msg-users image...");
    try {
      const imageBuffer = await generateLeaderboardImage(
        "🏆 Top Users by Messages Sent",
        dummyUserMessages,
        serverIconUrl,
        serverName,
        timeframe,
      );
      res.setHeader("Content-Type", "image/png");
      res.send(imageBuffer);
    } catch (error) {
      console.error("Error generating message users leaderboard:", error);
      res.status(500).send("Error generating image");
    }
  },
);

app.get(
  "/leaderboard/vc-users",
  async (_req: express.Request, res: express.Response) => {
    console.log("Generating /leaderboard/vc-users image...");
    try {
      const imageBuffer = await generateLeaderboardImage(
        "🏆 Top Users by Voice Chat Hours",
        dummyUserVC,
        serverIconUrl,
        serverName,
        timeframe,
      );
      res.setHeader("Content-Type", "image/png");
      res.send(imageBuffer);
    } catch (error) {
      console.error("Error generating voice users leaderboard:", error);
      res.status(500).send("Error generating image");
    }
  },
);

app.get(
  "/leaderboard/msg-channels",
  async (_req: express.Request, res: express.Response) => {
    console.log("Generating /leaderboard/msg-channels image...");
    try {
      const imageBuffer = await generateLeaderboardImage(
        "🏆 Top Channels by Messages Sent",
        dummyChannelMessages,
        serverIconUrl,
        serverName,
        timeframe,
      );
      res.setHeader("Content-Type", "image/png");
      res.send(imageBuffer);
    } catch (error) {
      console.error("Error generating message channels leaderboard:", error);
      res.status(500).send("Error generating image");
    }
  },
);

app.get(
  "/leaderboard/vc-channels",
  async (_req: express.Request, res: express.Response) => {
    console.log("Generating /leaderboard/vc-channels image...");
    try {
      const imageBuffer = await generateLeaderboardImage(
        "🏆 Top Channels by Voice Chat Hours",
        dummyChannelVC,
        serverIconUrl,
        serverName,
        timeframe,
      );
      res.setHeader("Content-Type", "image/png");
      res.send(imageBuffer);
    } catch (error) {
      console.error("Error generating voice channels leaderboard:", error);
      res.status(500).send("Error generating image");
    }
  },
);

// --- Start the server ---
app.listen(PORT, () => {
  console.log(`🎨 UI Preview Server is running!`);
  console.log(`- Overview: http://localhost:${PORT}/overview`);
  console.log(
    `- Top Message Users: http://localhost:${PORT}/leaderboard/msg-users`,
  );
  console.log(
    `- Top Voice Users: http://localhost:${PORT}/leaderboard/vc-users`,
  );
  console.log(
    `- Top Message Channels: http://localhost:${PORT}/leaderboard/msg-channels`,
  );
  console.log(
    `- Top Voice Channels: http://localhost:${PORT}/leaderboard/vc-channels`,
  );
});
