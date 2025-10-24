import { validateEnvVars } from "../utils/validators/envValidator.js";

const requiredEnvVars = [
  "TOKEN",
  "API_TOKEN",
  "SERVER_ID",
  "CLIENT_ID",
  "GUILD_ID",
  "OWNER_ID",
  "BUMP_CHANNEL_ID",
  "BUMP_ROLE_ID",
  "CONFESSIONS_CHANNEL_ID",
  "VOICE_LOG_CHANNEL_ID",
  "VOICE_CATEGORY_ID",
  "WELCOME_CHANNEL_ID",
  "VERIFIED_ROLE_ID",
  "DATABASE_URL",
  "EN_LEARNER_ROLE_ID",
  "JP_LEARNER_ROLE_ID",
  "ENJA_LEARNER_ROLE_ID",
];

validateEnvVars(requiredEnvVars);

export const config = {
  tokens: {
    discord: process.env.TOKEN as string,
    exaroton: process.env.API_TOKEN as string,
  },
  ids: {
    server: process.env.SERVER_ID as string,
    client: process.env.CLIENT_ID as string,
    guild: process.env.GUILD_ID as string,
    testGuild: process.env.TEST_GUILD_ID as string,
    owner: process.env.OWNER_ID as string,
  },
  channels: {
    bump: process.env.BUMP_CHANNEL_ID as string,
    confessions: process.env.CONFESSIONS_CHANNEL_ID as string,
    voiceLog: process.env.VOICE_LOG_CHANNEL_ID as string,
    voiceCategory: process.env.VOICE_CATEGORY_ID as string,
    welcome: process.env.WELCOME_CHANNEL_ID as string,
  },
  roles: {
    bump: process.env.BUMP_ROLE_ID as string,
    verified: process.env.VERIFIED_ROLE_ID as string,
    enLearner: process.env.EN_LEARNER_ROLE_ID as string,
    jpLearner: process.env.JP_LEARNER_ROLE_ID as string,
    enjaLearner: process.env.ENJA_LEARNER_ROLE_ID as string,
  },
  urls: {
    database: process.env.DATABASE_URL as string,
  },
} as const;
