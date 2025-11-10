export const dummyUserMessages = [
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
export const dummyChannelMessages = [
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
export const dummyUserVC = [
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
export const dummyChannelVC = [
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
export const dummyUserBumps = [
  { name: "ServerBooster", value: 55 },
  { name: "BumpKing", value: 48 },
  { name: "ActiveBumper", value: 31 },
  { name: "JustHelping", value: 22 },
  { name: "AnotherUser", value: 15 },
  { name: "UserOne", value: 12 },
  { name: "TestSubject", value: 9 },
  { name: "GamerGal", value: 5 },
  { name: "Coder123", value: 3 },
  { name: "RandomUser", value: 1 },
];
export const dummyUserStreamHours = [
  { name: "StreamerSupreme", value: 40.2 },
  { name: "GamerGuy", value: 35.5 },
  { name: "VarietyCaster", value: 22.1 },
  { name: "ArtStreamer", value: 18.9 },
  { name: "JustChatting", value: 12.0 },
  { name: "VocalCordMaster", value: 8.5 },
  { name: "SilentWatcher", value: 4.1 },
  { name: "MusicLover", value: 2.2 },
  { name: "StudyBuddy", value: 1.5 },
  { name: "RandomUser", value: 0.5 },
];
export const dummyOverviewData = {
  messages: {
    users: dummyUserMessages.slice(0, 3),
  },
  bumps: {
    users: dummyUserBumps.slice(0, 3),
  },
  voice: {
    users: dummyUserVC.slice(0, 3),
  },
  stream: {
    users: dummyUserStreamHours.slice(0, 3),
  },
};
