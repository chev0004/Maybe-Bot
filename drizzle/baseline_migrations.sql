-- Run this once in Supabase SQL Editor (or psql) if your DB already has
-- all tables from migrations 0000-0004 and you only want to run 0005 (RLS).
-- Then run: npx drizzle-kit migrate

CREATE SCHEMA IF NOT EXISTS drizzle;

CREATE TABLE IF NOT EXISTS drizzle.__drizzle_migrations (
  id SERIAL PRIMARY KEY,
  hash text NOT NULL,
  created_at bigint
);

INSERT INTO drizzle.__drizzle_migrations (hash, created_at)
SELECT
  '51934252b8a04d0d6d7ddffd4cc7f38a32d31a0a432c9beafd34093763162aaf',
  1759543937666
WHERE NOT EXISTS (
  SELECT 1 FROM drizzle.__drizzle_migrations
  WHERE created_at = 1759543937666
);
