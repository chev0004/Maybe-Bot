CREATE TABLE "channel_stats" (
	"channel_id" text PRIMARY KEY NOT NULL,
	"messages" integer DEFAULT 0,
	"vc_hours" real DEFAULT 0,
	"stream_hours" real DEFAULT 0,
	"last_updated" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "channels" (
	"id" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "top_channels" (
	"category" text NOT NULL,
	"rank" integer NOT NULL,
	"channel_id" text,
	"value" real NOT NULL,
	CONSTRAINT "top_channels_category_rank_pk" PRIMARY KEY("category","rank")
);
--> statement-breakpoint
CREATE TABLE "top_users" (
	"category" text NOT NULL,
	"rank" integer NOT NULL,
	"user_id" text,
	"value" real NOT NULL,
	CONSTRAINT "top_users_category_rank_pk" PRIMARY KEY("category","rank")
);
--> statement-breakpoint
CREATE TABLE "user_stats" (
	"user_id" text PRIMARY KEY NOT NULL,
	"bumps" integer DEFAULT 0,
	"messages" integer DEFAULT 0,
	"vc_hours" real DEFAULT 0,
	"stream_hours" real DEFAULT 0,
	"last_updated" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_vc_channel_hours" (
	"user_id" text,
	"channel_id" text,
	"hours" real DEFAULT 0,
	CONSTRAINT "user_vc_channel_hours_user_id_channel_id_pk" PRIMARY KEY("user_id","channel_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text
);
--> statement-breakpoint
ALTER TABLE "channel_stats" ADD CONSTRAINT "channel_stats_channel_id_channels_id_fk" FOREIGN KEY ("channel_id") REFERENCES "public"."channels"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "top_channels" ADD CONSTRAINT "top_channels_channel_id_channels_id_fk" FOREIGN KEY ("channel_id") REFERENCES "public"."channels"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "top_users" ADD CONSTRAINT "top_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_stats" ADD CONSTRAINT "user_stats_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_vc_channel_hours" ADD CONSTRAINT "user_vc_channel_hours_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_vc_channel_hours" ADD CONSTRAINT "user_vc_channel_hours_channel_id_channels_id_fk" FOREIGN KEY ("channel_id") REFERENCES "public"."channels"("id") ON DELETE no action ON UPDATE no action;