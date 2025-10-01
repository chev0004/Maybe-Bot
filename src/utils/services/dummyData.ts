import type { LeaderboardItem } from "./imageGenerator.js";

export const dummyUserMessages: LeaderboardItem[] = [
  { name: "UserOne", value: 1234 },
  { name: "AnotherUser", value: 987 },
  { name: "TestSubject", value: 543 },
  { name: "TheQuickBrownFox", value: 321 },
  { name: "Player_5", value: 101 },
];

export const dummyChannelMessages: LeaderboardItem[] = [
  { name: "general", value: 5678, type: "text" },
  { name: "memes-😂", value: 4321, type: "text" },
  { name: "off-topic", value: 2109, type: "text" },
  { name: "announcements", value: 1500, type: "text" },
  { name: "bot-commands", value: 800, type: "text" },
  { name: "random-chat", value: 450, type: "text" },
  { name: "gaming", value: 300, type: "text" },
  { name: "music", value: 200, type: "text" },
  { name: "support", value: 100, type: "text" },
  { name: "introductions", value: 50, type: "text" },
];

export const dummyUserVC: LeaderboardItem[] = [
  { name: "VocalCordMaster", value: 88.5 },
  { name: "ChattyCathy", value: 72.3 },
  { name: "SilentWatcher", value: 45.1 },
];

export const dummyChannelVC: LeaderboardItem[] = [
  { name: "Chill Zone 🎵", value: 250.7, type: "voice" },
  { name: "Gaming Lobby", value: 180.2, type: "voice" },
  { name: "Study Group", value: 95.5, type: "voice" },
];

export const dummyOverviewData = {
  messages: {
    users: dummyUserMessages.slice(0, 3),
    channels: dummyChannelMessages.slice(0, 3),
  },
  voice: {
    users: dummyUserVC.slice(0, 3),
    channels: dummyChannelVC.slice(0, 3),
  },
};
