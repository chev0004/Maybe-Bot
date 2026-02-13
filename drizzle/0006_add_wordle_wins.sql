ALTER TABLE "daily_user_stats" ADD COLUMN IF NOT EXISTS "wordle_wins" integer DEFAULT 0 NOT NULL;
