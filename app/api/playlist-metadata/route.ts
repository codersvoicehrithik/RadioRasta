import { z } from "zod";
import { getWorldPlaylistTracks, hasYouTubeMetadataKey } from "@/lib/youtube-metadata";

export const runtime = "nodejs";
export const revalidate = 600;

const querySchema = z.object({ world: z.string().trim().min(1).max(80) });

export async function GET(request: Request) {
  const query = querySchema.safeParse({ world: new URL(request.url).searchParams.get("world") });
  if (!query.success) return Response.json({ error: "A valid world is required." }, { status: 400 });
  try {
    const tracks = await getWorldPlaylistTracks(query.data.world);
    return Response.json({ tracks, available: hasYouTubeMetadataKey(), reason: hasYouTubeMetadataKey() ? undefined : "missing_api_key" }, { headers: { "Cache-Control": "public, max-age=600, s-maxage=600" } });
  } catch {
    return Response.json({ tracks: [], available: hasYouTubeMetadataKey(), error: "Playlist metadata is temporarily unavailable." }, { status: 503 });
  }
}
