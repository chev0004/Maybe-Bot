import {
  integer,
  pgTable,
  primaryKey,
  real,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  username: text("username"),
});

export const channels = pgTable("channels", {
  id: text("id").primaryKey(),
});

export const userStats = pgTable("user_stats", {
  userId: text("user_id")
    .references(() => users.id)
    .primaryKey(),
  bumps: integer("bumps").default(0),
  messages: integer("messages").default(0),
  vcHours: real("vc_hours").default(0),
  streamHours: real("stream_hours").default(0),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const userVcChannelHours = pgTable(
  "user_vc_channel_hours",
  {
    userId: text("user_id").references(() => users.id),
    channelId: text("channel_id").references(() => channels.id),
    hours: real("hours").default(0),
  },
  (table) => [primaryKey({ columns: [table.userId, table.channelId] })],
);

export const channelStats = pgTable("channel_stats", {
  channelId: text("channel_id")
    .references(() => channels.id)
    .primaryKey(),
  messages: integer("messages").default(0),
  vcHours: real("vc_hours").default(0),
  streamHours: real("stream_hours").default(0),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const topUsers = pgTable(
  "top_users",
  {
    category: text("category").notNull(),
    rank: integer("rank").notNull(),
    userId: text("user_id").references(() => users.id),
    value: real("value").notNull(),
  },
  (table) => [primaryKey({ columns: [table.category, table.rank] })],
);

export const topChannels = pgTable(
  "top_channels",
  {
    category: text("category").notNull(),
    rank: integer("rank").notNull(),
    channelId: text("channel_id").references(() => channels.id),
    value: real("value").notNull(),
  },
  (table) => [primaryKey({ columns: [table.category, table.rank] })],
);
