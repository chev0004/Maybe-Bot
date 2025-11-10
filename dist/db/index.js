import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import "dotenv/config";
import { config } from "../config/env.js";
import * as schema from "./schema.js";

const client = postgres(config.urls.database);
export const db = drizzle(client, { schema });
