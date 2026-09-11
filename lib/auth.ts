import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDb } from "@/db";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(getDb(), { provider: "pg", schema }),
  emailAndPassword: { enabled: true },
  user: { additionalFields: { role: { type: "string", required: false, defaultValue: "user", input: false }, city: { type: "string", required: false, input: true } } },
});
