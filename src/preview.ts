import express from "express";
import {
  getMockActivityData,
  type MessageActivityData,
  type VoiceActivityData,
} from "./commands/slash/stats/activity/activity.mock.js";
import {
  generateMessageActivityImage,
  generateVoiceActivityImage,
} from "./utils/services/activityImageGenerator.js";
import {
  dummyChannelMessages,
  dummyChannelVC,
  dummyOverviewData,
  dummyUserBumps,
  dummyUserMessages,
  dummyUserStreamHours,
  dummyUserVC,
} from "./utils/services/dummyData.js";
import {
  generateLeaderboardImage,
  generateOverviewImage,
} from "./utils/services/imageGenerator.js";

const app = express();
const PORT = 3000;

const serverName = "Maybe Server";
const serverIconUrl = "src/assets/images/Maybe-Icon.png";
const timeframe = "過去7日間";

const htmlShell = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maybe-Bot UI Preview</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #2B2D31;
            color: #FFFFFF;
            text-align: center;
            margin: 0;
            padding: 2rem;
        }
        h1 {
            color: #FFFFFF;
        }
        .button-group {
            margin: 1.5rem 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
        }
        button {
            background-color: #383A40;
            color: #B8B9BF;
            border: 1px solid #4A4D54;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.2s, color 0.2s;
        }
        button:hover {
            background-color: #4A4D54;
        }
        button.active {
            background-color: #5865F2;
            color: #FFFFFF;
            border-color: #5865F2;
        }
        #image-frame {
            margin-top: 1rem;
            border: 2px solid #383A40;
            border-radius: 8px;
            max-width: 100%;
            height: auto;
        }
    </style>
</head>
<body>
    <h1>Maybe-Bot UI Preview</h1>
    <div class="button-group">
        <button id="btn-overview" class="active">Overview</button>
        <button id="btn-msg-users">Top Message Users</button>
        <button id="btn-vc-users">Top Voice Users</button>
        <button id="btn-stream-users">Top Streamers</button>
        <button id="btn-bump-users">Top Bumpers</button>
        <button id="btn-msg-channels">Top Message Channels</button>
        <button id="btn-vc-channels">Top Voice Channels</button>
    </div>

    <h2>Activity Stats</h2>
    <div class="button-group">
        <button id="btn-activity-message">Message Activity</button>
        <button id="btn-activity-voice">Voice Activity</button>
    </div>
    
    <img id="image-frame" src="/overview" alt="UI Preview">

    <script>
        const frame = document.getElementById('image-frame');
        const buttons = document.querySelectorAll('.button-group button');

        const routes = {
            'btn-overview': '/overview',
            'btn-msg-users': '/leaderboard/msg-users',
            'btn-vc-users': '/leaderboard/vc-users',
            'btn-stream-users': '/leaderboard/stream-users',
            'btn-bump-users': '/leaderboard/bump-users',
            'btn-msg-channels': '/leaderboard/msg-channels',
            'btn-vc-channels': '/leaderboard/vc-channels',
            // --- New Routes ---
            'btn-activity-message': '/activity/message',
            'btn-activity-voice': '/activity/voice'
        };

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const route = routes[button.id];
                if (route) {
                    frame.src = route;
                }
                buttons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    </script>
</body>
</html>
`;

app.get("/", (_req, res) => {
  res.send(htmlShell);
});

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

app.get(
  "/leaderboard/msg-users",
  async (_req: express.Request, res: express.Response) => {
    console.log("Generating /leaderboard/msg-users image...");
    try {
      const imageBuffer = await generateLeaderboardImage(
        "メッセージ・Top Messages",
        "src/assets/icons/chat.png",
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
        "ボイス時間・Top VC Hours",
        "src/assets/icons/mic.png",
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
  "/leaderboard/stream-users",
  async (_req: express.Request, res: express.Response) => {
    console.log("Generating /leaderboard/stream-users image...");
    try {
      const imageBuffer = await generateLeaderboardImage(
        "配信時間・Top Stream Hours",
        "src/assets/icons/stream.png",
        dummyUserStreamHours,
        serverIconUrl,
        serverName,
        timeframe,
      );
      res.setHeader("Content-Type", "image/png");
      res.send(imageBuffer);
    } catch (error) {
      console.error("Error generating stream users leaderboard:", error);
      res.status(500).send("Error generating image");
    }
  },
);

app.get(
  "/leaderboard/bump-users",
  async (_req: express.Request, res: express.Response) => {
    console.log("Generating /leaderboard/bump-users image...");
    try {
      const imageBuffer = await generateLeaderboardImage(
        "バンプ数・Top Bumpers",
        "src/assets/icons/bump.png",
        dummyUserBumps,
        serverIconUrl,
        serverName,
        timeframe,
      );
      res.setHeader("Content-Type", "image/png");
      res.send(imageBuffer);
    } catch (error) {
      console.error("Error generating bump users leaderboard:", error);
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
        "送信メッセージ・Top Message Channels",
        "src/assets/icons/chat.png",
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
        "ボイス時間・Top Voice Channels",
        "src/assets/icons/mic.png",
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

app.get(
  "/activity/message",
  async (_req: express.Request, res: express.Response) => {
    console.log("Generating /activity/message image...");
    try {
      const mockData = getMockActivityData("message", "7");
      const imageBuffer = await generateMessageActivityImage(
        mockData as MessageActivityData,
        serverIconUrl,
        serverName,
        timeframe,
      );
      res.setHeader("Content-Type", "image/png");
      res.send(imageBuffer);
    } catch (error) {
      console.error("Error generating message activity image:", error);
      res.status(500).send("Error generating image");
    }
  },
);

app.get(
  "/activity/voice",
  async (_req: express.Request, res: express.Response) => {
    console.log("Generating /activity/voice image...");
    try {
      const mockData = getMockActivityData("voice", "7");
      const imageBuffer = await generateVoiceActivityImage(
        mockData as VoiceActivityData,
        serverIconUrl,
        serverName,
        timeframe,
      );
      res.setHeader("Content-Type", "image/png");
      res.send(imageBuffer);
    } catch (error) {
      console.error("Error generating voice activity image:", error);
      res.status(500).send("Error generating image");
    }
  },
);

app.listen(PORT, () => {
  console.log(`🎨 UI Preview Server is running!`);
  console.log(`- Open this link in your browser: http://localhost:${PORT}/`);
});
