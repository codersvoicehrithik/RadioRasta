import type { MusicSourceType, WorldMusicConfig } from "./types";

const sourceVariables: Record<string, string | undefined> = {
  "bus-wala": process.env.NEXT_PUBLIC_RADIORASTA_BUS_WALA_PLAYLIST_URL,
  "truck-driver": process.env.NEXT_PUBLIC_RADIORASTA_TRUCK_DRIVER_PLAYLIST_URL,
  "chai-tapri": process.env.NEXT_PUBLIC_RADIORASTA_CHAI_TAPRI_PLAYLIST_URL,
  "deluxe-saloon": process.env.NEXT_PUBLIC_RADIORASTA_DELUXE_SALOON_PLAYLIST_URL,
  "train-radio": process.env.NEXT_PUBLIC_RADIORASTA_TRAIN_RADIO_PLAYLIST_URL,
  "dhaba-radio": process.env.NEXT_PUBLIC_RADIORASTA_DHABA_RADIO_PLAYLIST_URL,
  "baarish-wali-khidki": process.env.NEXT_PUBLIC_RADIORASTA_BAARISH_WALI_KHIDKI_PLAYLIST_URL,
  "2am-rooftop": process.env.NEXT_PUBLIC_RADIORASTA_2AM_ROOFTOP_PLAYLIST_URL,
  "mohalle-wala-pyaar": process.env.NEXT_PUBLIC_RADIORASTA_MOHALLE_WALA_PYAAR_PLAYLIST_URL,
};
export function getMusicSource(slug: string): Pick<WorldMusicConfig, "sourceType" | "sourceUrl" | "enabled"> { const sourceUrl = sourceVariables[slug]; const sourceType: MusicSourceType = sourceUrl?.includes("youtube.com") || sourceUrl?.includes("youtu.be") ? "youtube" : sourceUrl ? "owned-audio" : "demo"; return { sourceType, sourceUrl, enabled: Boolean(sourceUrl) }; }
export function sourceLabel(source: WorldMusicConfig) { if (source.sourceType === "youtube") return "Open permitted source"; if (source.sourceType === "owned-audio") return "Play configured source"; return "Demo metadata — add a permitted source"; }

export function getYouTubeEmbedUrl(sourceUrl: string) {
  try {
    const source = new URL(sourceUrl);
    const playlistId = source.searchParams.get("list");
    const videoId = source.hostname === "youtu.be" ? source.pathname.slice(1) : source.searchParams.get("v");
    if (!playlistId && !videoId) return undefined;
    const embed = new URL(`https://www.youtube-nocookie.com/embed/${videoId ?? "videoseries"}`);
    if (playlistId) embed.searchParams.set("list", playlistId);
    embed.searchParams.set("enablejsapi", "1");
    embed.searchParams.set("playsinline", "1");
    embed.searchParams.set("rel", "0");
    if (typeof window !== "undefined") embed.searchParams.set("origin", window.location.origin);
    return embed.toString();
  } catch {
    return undefined;
  }
}
