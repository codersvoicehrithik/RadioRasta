import { getDb } from "./index";
import { worlds as worldsTable } from "./schema";
import { worlds as demoWorlds } from "../lib/worlds";

async function seed() {
  const db = getDb();
  await db.insert(worldsTable).values(demoWorlds.map((world) => ({
    slug: world.slug, name: world.name, hindiName: world.hindiName, description: world.description,
    category: world.category, status: "published" as const, themeConfig: world.theme,
    onboardingConfig: world.ritual, interactionConfig: world.interaction,
    musicConfig: { playlistKey: world.slug, trackIds: world.playlist.map((track) => track.id) },
    ambientConfig: { atmosphere: world.theme.atmosphere },
  }))).onConflictDoNothing();
  console.log(`Seeded ${demoWorlds.length} worlds.`);
}
seed().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
