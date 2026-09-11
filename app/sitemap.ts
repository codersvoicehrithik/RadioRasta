import type { MetadataRoute } from "next";
import { worlds } from "@/lib/worlds";
export default function sitemap(): MetadataRoute.Sitemap { const base = process.env.BETTER_AUTH_URL ?? "http://localhost:3000"; return ["", "/discover", "/journeys", ...worlds.map((world) => `/world/${world.slug}`)].map((path) => ({ url: `${base}${path}`, lastModified: new Date() })); }
