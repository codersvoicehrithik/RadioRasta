import "./db/env";
import { defineConfig } from "drizzle-kit";
import { requireDatabaseUrl } from "./db/env";

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: { url: requireDatabaseUrl() },
});
