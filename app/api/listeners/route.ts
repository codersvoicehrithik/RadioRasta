import { and, countDistinct, eq, gt, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/db";
import { listeningSessions, worlds } from "@/db/schema";

export const runtime = "nodejs";

const bodySchema = z.object({
  worldSlug: z.string().min(1).max(100),
  anonymousId: z.string().uuid(),
});

const activeSince = () => new Date(Date.now() - 75_000);

async function countListeners(worldId: string) {
  const db = getDb();
  const [result] = await db.select({ listeners: countDistinct(listeningSessions.anonymousId) })
    .from(listeningSessions)
    .where(and(eq(listeningSessions.worldId, worldId), isNull(listeningSessions.endedAt), gt(listeningSessions.lastHeartbeatAt, activeSince())));
  return result?.listeners ?? 0;
}

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid listener heartbeat." }, { status: 400 });

  try {
    const db = getDb();
    const [world] = await db.select({ id: worlds.id }).from(worlds).where(eq(worlds.slug, parsed.data.worldSlug)).limit(1);
    if (!world) return NextResponse.json({ listeners: 0 });

    const [existing] = await db.select({ id: listeningSessions.id }).from(listeningSessions)
      .where(and(eq(listeningSessions.worldId, world.id), eq(listeningSessions.anonymousId, parsed.data.anonymousId), isNull(listeningSessions.endedAt)))
      .limit(1);

    if (existing) {
      await db.update(listeningSessions).set({ lastHeartbeatAt: new Date() }).where(eq(listeningSessions.id, existing.id));
    } else {
      await db.insert(listeningSessions).values({ worldId: world.id, anonymousId: parsed.data.anonymousId });
    }

    return NextResponse.json({ listeners: await countListeners(world.id) }, { headers: { "cache-control": "no-store" } });
  } catch {
    return NextResponse.json({ listeners: 0, available: false }, { headers: { "cache-control": "no-store" } });
  }
}
