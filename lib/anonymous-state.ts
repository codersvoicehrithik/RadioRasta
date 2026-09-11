import type { JourneyRecord } from "./types";
const JOURNEYS_KEY = "radiorasta:journeys";
const FAVORITES_KEY = "radiorasta:favorites";
const YOUTUBE_FAVORITES_KEY = "radiorasta:youtube-favorite-details";
export interface SavedYouTubeTrack { worldSlug: string; videoId: string; title: string; author: string; }
export function saveAnonymousJourney(journey: JourneyRecord) { const current = readAnonymousJourneys(); localStorage.setItem(JOURNEYS_KEY, JSON.stringify([journey, ...current].slice(0, 24))); }
export function readAnonymousJourneys(): JourneyRecord[] { try { return JSON.parse(localStorage.getItem(JOURNEYS_KEY) ?? "[]") as JourneyRecord[]; } catch { return []; } }
export function toggleAnonymousFavorite(id: string) { if (typeof window === "undefined") return false; const current = readAnonymousFavorites(); current.has(id) ? current.delete(id) : current.add(id); localStorage.setItem(FAVORITES_KEY, JSON.stringify([...current])); return current.has(id); }
export function readAnonymousFavorites() { if (typeof window === "undefined") return new Set<string>(); try { return new Set<string>(JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? "[]") as string[]); } catch { return new Set<string>(); } }
export function isAnonymousFavorite(id: string) { return readAnonymousFavorites().has(id); }
export function readSavedYouTubeTracks(): SavedYouTubeTrack[] { if (typeof window === "undefined") return []; try { const saved = JSON.parse(localStorage.getItem(YOUTUBE_FAVORITES_KEY) ?? "[]") as SavedYouTubeTrack[]; return Array.isArray(saved) ? saved.filter((item) => item && typeof item.worldSlug === "string" && typeof item.videoId === "string") : []; } catch { return []; } }
export function saveYouTubeTrack(track: SavedYouTubeTrack) { const saved = readSavedYouTubeTracks().filter((item) => !(item.worldSlug === track.worldSlug && item.videoId === track.videoId)); localStorage.setItem(YOUTUBE_FAVORITES_KEY, JSON.stringify([track, ...saved].slice(0, 100))); }
export function removeSavedYouTubeTrack(worldSlug: string, videoId: string) { localStorage.setItem(YOUTUBE_FAVORITES_KEY, JSON.stringify(readSavedYouTubeTracks().filter((item) => item.worldSlug !== worldSlug || item.videoId !== videoId))); }
