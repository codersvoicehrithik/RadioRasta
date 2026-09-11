import "./env";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { requireDatabaseUrl } from "./env";

/** Neon HTTP is appropriate for single-query and short-lived server/script workloads. */
export function getDb() {
  return drizzle(neon(requireDatabaseUrl()), { schema });
}
