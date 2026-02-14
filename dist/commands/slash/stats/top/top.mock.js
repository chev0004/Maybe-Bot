// All Time
const allTimeUserMessages = [
    { name: "MockUser Alpha (alpha)", value: 1500 },
    { name: "MockUser Beta (beta)", value: 1200 },
    { name: "MockUser Gamma (gamma)", value: 950 },
    { name: "MockUser Delta (delta)", value: 700 },
    { name: "MockUser Epsilon (epsilon)", value: 500 },
    { name: "MockUser Zeta (zeta)", value: 300 },
    { name: "MockUser Eta (eta)", value: 150 },
    { name: "MockUser Theta (theta)", value: 100 },
    { name: "MockUser Iota (iota)", value: 50 },
    { name: "MockUser Kappa (kappa)", value: 25 },
];
const allTimeChannelMessages = [
    { name: "💬総合｜general", value: 6000, type: "text" },
    { name: "😂ミーム｜memes", value: 4500, type: "text" },
    { name: "🗨️雑談｜off-topic", value: 3000, type: "text" },
    { name: "🎨アート｜art", value: 2500, type: "text" },
    { name: "🎮ゲーム｜gaming", value: 2200, type: "text" },
    { name: "📚勉強｜study", value: 1800, type: "text" },
    { name: "🎵音楽｜music", value: 1500, type: "text" },
    { name: "📢告知｜announcements", value: 1200, type: "text" },
    { name: "📷写真｜photos", value: 800, type: "text" },
    { name: "👊バンプ｜bump", value: 600, type: "text" },
];
const allTimeUserVC = [
    { name: "MockVoice Alpha (alpha)", value: 90.5 },
    { name: "MockVoice Beta (beta)", value: 75.2 },
    { name: "MockVoice Gamma (gamma)", value: 50.1 },
    { name: "MockVoice Delta (delta)", value: 45.0 },
    { name: "MockVoice Epsilon (epsilon)", value: 38.8 },
    { name: "MockVoice Zeta (zeta)", value: 30.0 },
    { name: "MockVoice Eta (eta)", value: 25.5 },
    { name: "MockVoice Theta (theta)", value: 20.0 },
    { name: "MockVoice Iota (iota)", value: 12.5 },
    { name: "MockVoice Kappa (kappa)", value: 10.0 },
];
const allTimeChannelVC = [
    { name: "🎧チル｜chill", value: 260.0, type: "voice" },
    { name: "🎮ゲーム｜gaming", value: 190.5, type: "voice" },
    { name: "📚勉強｜study", value: 100.0, type: "voice" },
    { name: "🎵音楽｜music", value: 85.0, type: "voice" },
    { name: "💬雑談｜chat", value: 70.0, type: "voice" },
    { name: "🖌️アート｜art", value: 65.0, type: "voice" },
    { name: "👊バンプ｜bump", value: 60.0, type: "voice" },
    { name: "📢告知｜announcements", value: 50.0, type: "voice" },
    { name: "📷写真｜photos", value: 40.0, type: "voice" },
    { name: "🎲遊び｜fun", value: 30.0, type: "voice" },
];
const allTimeUserBumps = [
    { name: "MockBumper Alpha (alpha)", value: 60 },
    { name: "MockBumper Beta (beta)", value: 50 },
    { name: "MockBumper Gamma (gamma)", value: 35 },
    { name: "MockBumper Delta (delta)", value: 30 },
    { name: "MockBumper Epsilon (epsilon)", value: 25 },
    { name: "MockBumper Zeta (zeta)", value: 20 },
    { name: "MockBumper Eta (eta)", value: 18 },
    { name: "MockBumper Theta (theta)", value: 15 },
    { name: "MockBumper Iota (iota)", value: 10 },
    { name: "MockBumper Kappa (kappa)", value: 5 },
];
const allTimeUserWordle = [
    { name: "MockWordle Alpha (alpha)", value: 42 },
    { name: "MockWordle Beta (beta)", value: 38 },
    { name: "MockWordle Gamma (gamma)", value: 25 },
    { name: "MockWordle Delta (delta)", value: 20 },
    { name: "MockWordle Epsilon (epsilon)", value: 15 },
    { name: "MockWordle Zeta (zeta)", value: 12 },
    { name: "MockWordle Eta (eta)", value: 10 },
    { name: "MockWordle Theta (theta)", value: 8 },
    { name: "MockWordle Iota (iota)", value: 5 },
    { name: "MockWordle Kappa (kappa)", value: 3 },
];
const allTimeUserStreamHours = [
    { name: "MockStreamer Alpha (alpha)", value: 45.0 },
    { name: "MockStreamer Beta (beta)", value: 38.5 },
    { name: "MockStreamer Gamma (gamma)", value: 25.0 },
    { name: "MockStreamer Delta (delta)", value: 22.0 },
    { name: "MockStreamer Epsilon (epsilon)", value: 20.0 },
    { name: "MockStreamer Zeta (zeta)", value: 18.5 },
    { name: "MockStreamer Eta (eta)", value: 15.0 },
    { name: "MockStreamer Theta (theta)", value: 12.0 },
    { name: "MockStreamer Iota (iota)", value: 10.0 },
    { name: "MockStreamer Kappa (kappa)", value: 8.0 },
];
/**
 * Scales and slightly randomizes leaderboard data to simulate different timeframes.
 * @param data The base leaderboard data array.
 * @param factor The scaling factor (e.g., 0.5 for 50%).
 * @returns A new array with scaled values.
 */
const scaleData = (data, factor) => {
    return data
        .map((item) => ({
        ...item,
        // Scale value and add +/- 10% randomness so it's not negative
        value: Math.max(0, item.value * factor * (0.9 + Math.random() * 0.2)),
    }))
        .sort((a, b) => b.value - a.value); // Re-sort after scaling
};
// Generate data for different timeframes by scaling "all time" data
const dataFor30Days = {
    msg_users: scaleData(allTimeUserMessages, 0.4),
    vc_users: scaleData(allTimeUserVC, 0.5),
    stream_users: scaleData(allTimeUserStreamHours, 0.6),
    bump_users: scaleData(allTimeUserBumps, 0.3),
    wordle_users: scaleData(allTimeUserWordle, 0.4),
    msg_channels: scaleData(allTimeChannelMessages, 0.4),
    vc_channels: scaleData(allTimeChannelVC, 0.5),
};
const dataFor7Days = {
    msg_users: scaleData(dataFor30Days.msg_users, 0.35),
    vc_users: scaleData(dataFor30Days.vc_users, 0.4),
    stream_users: scaleData(dataFor30Days.stream_users, 0.5),
    bump_users: scaleData(dataFor30Days.bump_users, 0.3),
    wordle_users: scaleData(dataFor30Days.wordle_users, 0.35),
    msg_channels: scaleData(dataFor30Days.msg_channels, 0.35),
    vc_channels: scaleData(dataFor30Days.vc_channels, 0.4),
};
const dataFor1Day = {
    msg_users: scaleData(dataFor7Days.msg_users, 0.2),
    vc_users: scaleData(dataFor7Days.vc_users, 0.25),
    stream_users: scaleData(dataFor7Days.stream_users, 0.3),
    bump_users: scaleData(dataFor7Days.bump_users, 0.15),
    wordle_users: scaleData(dataFor7Days.wordle_users, 0.2),
    msg_channels: scaleData(dataFor7Days.msg_channels, 0.2),
    vc_channels: scaleData(dataFor7Days.vc_channels, 0.25),
};
// The main mock data object structured by timeframe
export const mockTopData = {
    "1": {
        ...dataFor1Day,
        overview: {
            messages: { users: dataFor1Day.msg_users.slice(0, 3) },
            bumps: { users: dataFor1Day.bump_users.slice(0, 3) },
            voice: { users: dataFor1Day.vc_users.slice(0, 3) },
            stream: { users: dataFor1Day.stream_users.slice(0, 3) },
        },
    },
    "7": {
        ...dataFor7Days,
        overview: {
            messages: { users: dataFor7Days.msg_users.slice(0, 3) },
            bumps: { users: dataFor7Days.bump_users.slice(0, 3) },
            voice: { users: dataFor7Days.vc_users.slice(0, 3) },
            stream: { users: dataFor7Days.stream_users.slice(0, 3) },
        },
    },
    "30": {
        ...dataFor30Days,
        overview: {
            messages: { users: dataFor30Days.msg_users.slice(0, 3) },
            bumps: { users: dataFor30Days.bump_users.slice(0, 3) },
            voice: { users: dataFor30Days.vc_users.slice(0, 3) },
            stream: { users: dataFor30Days.stream_users.slice(0, 3) },
        },
    },
    all: {
        msg_users: allTimeUserMessages,
        vc_users: allTimeUserVC,
        stream_users: allTimeUserStreamHours,
        bump_users: allTimeUserBumps,
        wordle_users: allTimeUserWordle,
        msg_channels: allTimeChannelMessages,
        vc_channels: allTimeChannelVC,
        overview: {
            messages: { users: allTimeUserMessages.slice(0, 3) },
            bumps: { users: allTimeUserBumps.slice(0, 3) },
            voice: { users: allTimeUserVC.slice(0, 3) },
            stream: { users: allTimeUserStreamHours.slice(0, 3) },
        },
    },
};
/**
 * Function to retrieve mock data based on category and timeframe.
 * @param category The category requested.
 * @param timeframe The timeframe requested ('1', '7', '30', 'all').
 * @returns Array of LeaderboardItem or an overview structure.
 */
export const getMockTopData = (category, timeframe) => {
    const timeframeData = mockTopData[timeframe] ?? mockTopData["7"]; // Default to 7 days if invalid
    return timeframeData[category] ?? [];
};
