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
    discord: process.env.TOKEN,
    exaroton: process.env.API_TOKEN,
  },
  ids: {
    server: process.env.SERVER_ID,
    client: process.env.CLIENT_ID,
    guild: process.env.GUILD_ID,
    testGuild: process.env.TEST_GUILD_ID,
    owner: process.env.OWNER_ID,
  },
  channels: {
    bump: process.env.BUMP_CHANNEL_ID,
    confessions: process.env.CONFESSIONS_CHANNEL_ID,
    voiceLog: process.env.VOICE_LOG_CHANNEL_ID,
    voiceCategory: process.env.VOICE_CATEGORY_ID,
    introduction: process.env.WELCOME_CHANNEL_ID,
  },
  roles: {
    bump: process.env.BUMP_ROLE_ID,
    verified: process.env.VERIFIED_ROLE_ID,
    enLearner: process.env.EN_LEARNER_ROLE_ID,
    jpLearner: process.env.JP_LEARNER_ROLE_ID,
    enjaLearner: process.env.ENJA_LEARNER_ROLE_ID,
  },
  urls: {
    database: process.env.DATABASE_URL,
  },
};
