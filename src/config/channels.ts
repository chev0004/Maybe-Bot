import { validateEnvVars } from "../utils/validators/envValidator.js";

const requiredChannelEnvs = [
  "BUMP_CHANNEL_ID",
  "CONFESSIONS_CHANNEL_ID",
  "VOICE_LOG_CHANNEL_ID",
  "WELCOME_CHANNEL_ID",
];

validateEnvVars(requiredChannelEnvs);

export const channels = {
  bump: process.env.BUMP_CHANNEL_ID as string,
  confessions: process.env.CONFESSIONS_CHANNEL_ID as string,
  voiceLog: process.env.VOICE_LOG_CHANNEL_ID as string,
  welcome: process.env.WELCOME_CHANNEL_ID as string,
} as const;

export type ChannelKey = keyof typeof channels;
