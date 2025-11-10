// Base data for a 7-day period
const baseVoiceActivity = {
  hourlyActivity: [
    10, 5, 2, 1, 0, 0, 2, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 100, 120,
    150, 130, 90, 40,
  ],
  totalDurationHours: 120.5,
  averageParticipants: 5.2,
  peakHour: 20,
};
const baseMessageActivity = {
  hourlyActivity: [
    80, 90, 70, 50, 30, 20, 10, 20, 30, 40, 50, 60, 80, 100, 120, 130, 110, 100,
    140, 160, 180, 200, 150, 100,
  ],
  totalMessages: 50210,
  averageParticipants: 42,
  mostActiveHour: 21,
};
/**
 * Scales activity data for different timeframes.
 * @param data The base activity data.
 * @param factor The scaling factor.
 * @returns Scaled activity data.
 */
const scaleActivityData = (data, factor) => {
  const scaledHourly = data.hourlyActivity.map((v) =>
    Math.round(v * factor * (0.9 + Math.random() * 0.2)),
  );
  if ("totalMessages" in data) {
    return {
      ...data,
      hourlyActivity: scaledHourly,
      totalMessages: Math.round(data.totalMessages * factor),
      averageParticipants: Math.round(
        data.averageParticipants * (0.8 + Math.random() * 0.4),
      ),
    };
  }
  return {
    ...data,
    hourlyActivity: scaledHourly,
    totalDurationHours: data.totalDurationHours * factor,
    averageParticipants: data.averageParticipants * (0.8 + Math.random() * 0.4),
  };
};
// Generate data for different timeframes
const dataFor30Days = {
  message: scaleActivityData(baseMessageActivity, 4.3),
  voice: scaleActivityData(baseVoiceActivity, 4.3),
};
const dataFor7Days = {
  message: baseMessageActivity,
  voice: baseVoiceActivity,
};
const dataFor1Day = {
  message: scaleActivityData(baseMessageActivity, 1 / 7),
  voice: scaleActivityData(baseVoiceActivity, 1 / 7),
};
const dataForAllTime = {
  message: scaleActivityData(baseMessageActivity, 10),
  voice: scaleActivityData(baseVoiceActivity, 10),
};
export const mockActivityData = {
  1: dataFor1Day,
  7: dataFor7Days,
  30: dataFor30Days,
  all: dataForAllTime,
};
/**
 * Retrieves mock data based on category and timeframe.
 * @param category The category ('message' or 'voice').
 * @param timeframe The timeframe ('1', '7', '30', 'all').
 */
export const getMockActivityData = (category, timeframe) => {
  const timeframeData = mockActivityData[timeframe] ?? mockActivityData["7"];
  return timeframeData[category];
};
