import { z } from "zod";
import { worlds } from "@/lib/worlds";
import { hasYouTubeMetadataKey, searchRadioTracks } from "@/lib/youtube-metadata";

export const runtime = "nodejs";
export const revalidate = 600;

const querySchema = z.object({ q: z.string().trim().min(1).max(100) });

export async function GET(request: Request) {
  const query = querySchema.safeParse({ q: new URL(request.url).searchParams.get("q") });
  if (!query.success) return Response.json({ worlds: [], tracks: [], available: hasYouTubeMetadataKey() });
  const needle = query.data.q.toLocaleLowerCase();
  const matchingWorlds = worlds.filter((world) => `${world.name} ${world.hindiName} ${world.description} ${world.category}`.toLocaleLowerCase().includes(needle));
  const tracks = await searchRadioTracks(query.data.q);
  return Response.json({ worlds: matchingWorlds, tracks, available: hasYouTubeMetadataKey() }, { headers: { "Cache-Control": "public, max-age=300, s-maxage=600" } });
}
