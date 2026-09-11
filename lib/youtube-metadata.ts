import { getYouTubePlaylistId } from "@/lib/music-sources";
import type { RadioTrack, World } from "@/lib/types";
import { getWorld, worlds } from "@/lib/worlds";

const CACHE_TTL_MS = 10 * 60 * 1000;
const playlistCache = new Map<string, { expiresAt: number; tracks: RadioTrack[] }>();

type PlaylistItemResponse = {
  nextPageToken?: string;
  items?: Array<{
    contentDetails?: { videoId?: string };
    snippet?: {
      title?: string;
      channelTitle?: string;
      videoOwnerChannelTitle?: string;
      thumbnails?: Record<string, { url?: string }>;
    };
  }>;
};

export function hasYouTubeMetadataKey() {
  return Boolean(process.env.YOUTUBE_API_KEY?.trim());
}

function playlistIdFor(world: World) {
  return world.music.sourceUrl ? getYouTubePlaylistId(world.music.sourceUrl) : undefined;
}

function thumbnailFor(thumbnails: Record<string, { url?: string }> | undefined) {
  return thumbnails?.maxres?.url ?? thumbnails?.high?.url ?? thumbnails?.medium?.url ?? thumbnails?.default?.url;
}

/** Fetches public playlist metadata using the official YouTube Data API only. */
export async function getWorldPlaylistTracks(worldSlug: string): Promise<RadioTrack[]> {
  const cached = playlistCache.get(worldSlug);
  if (cached && cached.expiresAt > Date.now()) return cached.tracks;

  const world = getWorld(worldSlug);
  const key = process.env.YOUTUBE_API_KEY?.trim();
  const playlistId = world ? playlistIdFor(world) : undefined;
  if (!world || !key || !playlistId) return [];

  const tracks: RadioTrack[] = [];
  let pageToken: string | undefined;
  do {
    const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
    url.searchParams.set("part", "snippet,contentDetails");
    url.searchParams.set("maxResults", "50");
    url.searchParams.set("playlistId", playlistId);
    url.searchParams.set("key", key);
    if (pageToken) url.searchParams.set("pageToken", pageToken);

    const response = await fetch(url, { next: { revalidate: 600 } });
    if (!response.ok) throw new Error(`YouTube playlist metadata request failed (${response.status}).`);
    const payload = await response.json() as PlaylistItemResponse;
    for (const item of payload.items ?? []) {
      const videoId = item.contentDetails?.videoId;
      const title = item.snippet?.title?.trim();
      if (!videoId || !title || title === "Private video" || title === "Deleted video") continue;
      tracks.push({
        videoId,
        title,
        author: item.snippet?.videoOwnerChannelTitle?.trim() || item.snippet?.channelTitle?.trim() || "YouTube",
        thumbnail: thumbnailFor(item.snippet?.thumbnails),
        worldSlug,
        playlistIndex: tracks.length,
      });
    }
    pageToken = payload.nextPageToken;
  } while (pageToken);

  playlistCache.set(worldSlug, { tracks, expiresAt: Date.now() + CACHE_TTL_MS });
  return tracks;
}

export async function searchRadioTracks(query: string) {
  const needle = query.trim().toLocaleLowerCase();
  if (!needle || !hasYouTubeMetadataKey()) return [];
  const sourceWorlds = worlds.filter((world) => world.music.sourceType === "youtube");
  const lists = await Promise.all(sourceWorlds.map(async (world) => {
    try { return await getWorldPlaylistTracks(world.slug); } catch { return []; }
  }));
  return lists.flat().filter((track) => `${track.title} ${track.author}`.toLocaleLowerCase().includes(needle)).slice(0, 30);
}
