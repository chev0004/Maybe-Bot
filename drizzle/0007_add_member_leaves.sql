CREATE TABLE IF NOT EXISTS "member_leaves" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"username" text NOT NULL,
	"joined_at" timestamp with time zone,
	"left_at" timestamp with time zone NOT NULL,
	"stay_ms" bigint,
	"account_created_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "public"."member_leaves" ENABLE ROW LEVEL SECURITY;
