CREATE TABLE "daily_channel_stats" (
	"channel_id" text NOT NULL,
	"date" date NOT NULL,
	"messages" integer DEFAULT 0 NOT NULL,
	"vc_hours" real DEFAULT 0 NOT NULL,
	CONSTRAINT "daily_channel_stats_channel_id_date_pk" PRIMARY KEY("channel_id","date")
);
--> statement-breakpoint
CREATE TABLE "daily_user_stats" (
	"user_id" text NOT NULL,
	"date" date NOT NULL,
	"messages" integer DEFAULT 0 NOT NULL,
	"vc_hours" real DEFAULT 0 NOT NULL,
	"stream_hours" real DEFAULT 0 NOT NULL,
	"bumps" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "daily_user_stats_user_id_date_pk" PRIMARY KEY("user_id","date")
);
--> statement-breakpoint
ALTER TABLE "channel_stats" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "top_channels" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "top_users" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "user_stats" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "user_vc_channel_hours" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "channel_stats" CASCADE;--> statement-breakpoint
DROP TABLE "top_channels" CASCADE;--> statement-breakpoint
DROP TABLE "top_users" CASCADE;--> statement-breakpoint
DROP TABLE "user_stats" CASCADE;--> statement-breakpoint
DROP TABLE "user_vc_channel_hours" CASCADE;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "username" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "channels" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "daily_channel_stats" ADD CONSTRAINT "daily_channel_stats_channel_id_channels_id_fk" FOREIGN KEY ("channel_id") REFERENCES "public"."channels"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "daily_user_stats" ADD CONSTRAINT "daily_user_stats_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;