import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const client = postgres(url, { max: 1 });
const db = drizzle(client);

await client.unsafe("SET client_min_messages = 'warning'");

const baselineHash =
  "51934252b8a04d0d6d7ddffd4cc7f38a32d31a0a432c9beafd34093763162aaf";
const baselineCreatedAt = 1759543937666;

await client.unsafe("CREATE SCHEMA IF NOT EXISTS drizzle");
await client.unsafe(`
  CREATE TABLE IF NOT EXISTS drizzle.__drizzle_migrations (
    id SERIAL PRIMARY KEY,
    hash text NOT NULL,
    created_at bigint
  )
`);
await client.unsafe(`
  INSERT INTO drizzle.__drizzle_migrations (hash, created_at)
  SELECT '${baselineHash}', ${baselineCreatedAt}
  WHERE NOT EXISTS (
    SELECT 1 FROM drizzle.__drizzle_migrations
    WHERE created_at = ${baselineCreatedAt}
  )
`);

await migrate(db, {
  migrationsFolder: "./drizzle",
});

await client.end();
