ALTER TABLE "member_kicks" DROP COLUMN IF EXISTS "executor_id";
--> statement-breakpoint
ALTER TABLE "member_kicks" DROP COLUMN IF EXISTS "executor_name";
--> statement-breakpoint
ALTER TABLE "member_kicks" DROP COLUMN IF EXISTS "reason";
--> statement-breakpoint
ALTER TABLE "member_bans" DROP COLUMN IF EXISTS "executor_id";
--> statement-breakpoint
ALTER TABLE "member_bans" DROP COLUMN IF EXISTS "executor_name";
--> statement-breakpoint
ALTER TABLE "member_bans" DROP COLUMN IF EXISTS "reason";
