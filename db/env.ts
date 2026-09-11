import { existsSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Makes database entry points runnable outside Next.js (for example `tsx db/seed.ts`).
 * Next.js continues to load its own `.env*` files during app startup.
 */
const envFile = resolve(process.cwd(), ".env");
if (existsSync(envFile)) process.loadEnvFile(envFile);

export function requireDatabaseUrl(): string {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured. Add it to the project-root .env file before running database commands.");
  }

  return databaseUrl;
}
