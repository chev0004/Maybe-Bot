import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  real,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull(),
});

export const channelTypeEnum = pgEnum("channel_type", ["text", "voice"]);

export const channels = pgTable("channels", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  type: channelTypeEnum("type").notNull(),
});

export const dailyUserStats = pgTable(
  "daily_user_stats",
  {
    userId: text("user_id")
      .references(() => users.id)
      .notNull(),
    date: date("date").notNull(),
    messages: integer("messages").default(0).notNull(),
    vcHours: real("vc_hours").default(0).notNull(),
    streamHours: real("stream_hours").default(0).notNull(),
    bumps: integer("bumps").default(0).notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.date] }),
  }),
);

export const dailyChannelStats = pgTable(
  "daily_channel_stats",
  {
    channelId: text("channel_id")
      .references(() => channels.id)
      .notNull(),
    date: date("date").notNull(),
    messages: integer("messages").default(0).notNull(),
    vcHours: real("vc_hours").default(0).notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.channelId, table.date] }),
  }),
);

export const activeVcSessions = pgTable("active_vc_sessions", {
  userId: text("user_id")
    .primaryKey()
    .references(() => users.id),
  channelId: text("channel_id")
    .notNull()
    .references(() => channels.id),
  joinTime: timestamp("join_time", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  isStreaming: boolean("is_streaming").default(false).notNull(),
  streamStartTime: timestamp("stream_start_time", {
    mode: "date",
    withTimezone: true,
  }),
});

export const confessions = pgTable("confessions", {
  id: integer("id").primaryKey(),
  messageId: text("message_id").notNull(),
});

export const hourlyActivity = pgTable(
  "hourly_activity",
  {
    date: date("date", { mode: "string" }).notNull(),
    hour: integer("hour").notNull(),
    messages: integer("messages").default(0).notNull(),
    vcHours: real("vc_hours").default(0).notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.date, table.hour] }),
  }),
);
