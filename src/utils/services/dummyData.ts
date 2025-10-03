import type { LeaderboardItem } from "./imageGenerator.js";

export const dummyUserMessages: LeaderboardItem[] = [
  { name: "UserOne", value: 1234 },
  { name: "AnotherUser", value: 987 },
  { name: "TestSubject", value: 543 },
  { name: "TheQuickBrownFox", value: 321 },
  { name: "Player_5", value: 101 },
  { name: "GamerGal", value: 76 },
  { name: "Coder123", value: 54 },
  { name: "MusicFan", value: 32 },
  { name: "MovieBuff", value: 21 },
  { name: "RandomUser", value: 10 },
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
  { name: "GamerGuy", value: 30.0 },
  { name: "MusicLover", value: 15.8 },
  { name: "StudyBuddy", value: 10.5 },
  { name: "AFKUser", value: 5.0 },
  { name: "LateNighter", value: 3.2 },
  { name: "EarlyBird", value: 2.1 },
  { name: "RandomUser", value: 1.0 },
];

export const dummyChannelVC: LeaderboardItem[] = [
  { name: "Chill Zone 🎵", value: 250.7, type: "voice" },
  { name: "Gaming Lobby", value: 180.2, type: "voice" },
  { name: "Study Group", value: 95.5, type: "voice" },
  { name: "AFK Room", value: 40.0, type: "voice" },
  { name: "Music Room", value: 25.3, type: "voice" },
  { name: "General VC", value: 15.0, type: "voice" },
  { name: "Late Night Chat", value: 10.1, type: "voice" },
  { name: "Early Birds", value: 5.5, type: "voice" },
  { name: "Random Talks", value: 3.3, type: "voice" },
  { name: "Quiet Room", value: 1.2, type: "voice" },
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
