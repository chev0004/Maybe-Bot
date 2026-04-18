CREATE TABLE IF NOT EXISTS "member_kicks" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"username" text NOT NULL,
	"joined_at" timestamp with time zone,
	"kicked_at" timestamp with time zone NOT NULL,
	"stay_ms" bigint,
	"account_created_at" timestamp with time zone,
	"executor_id" text,
	"executor_name" text,
	"reason" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "member_bans" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"username" text NOT NULL,
	"joined_at" timestamp with time zone,
	"banned_at" timestamp with time zone NOT NULL,
	"stay_ms" bigint,
	"account_created_at" timestamp with time zone,
	"executor_id" text,
	"executor_name" text,
	"reason" text
);
--> statement-breakpoint
ALTER TABLE "public"."member_kicks" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE "public"."member_bans" ENABLE ROW LEVEL SECURITY;
