import type { JourneyRecord } from "./types";
const JOURNEYS_KEY = "radiorasta:journeys";
const FAVORITES_KEY = "radiorasta:favorites";
export function saveAnonymousJourney(journey: JourneyRecord) { const current = readAnonymousJourneys(); localStorage.setItem(JOURNEYS_KEY, JSON.stringify([journey, ...current].slice(0, 24))); }
export function readAnonymousJourneys(): JourneyRecord[] { try { return JSON.parse(localStorage.getItem(JOURNEYS_KEY) ?? "[]") as JourneyRecord[]; } catch { return []; } }
export function toggleAnonymousFavorite(id: string) { if (typeof window === "undefined") return false; const current = readAnonymousFavorites(); current.has(id) ? current.delete(id) : current.add(id); localStorage.setItem(FAVORITES_KEY, JSON.stringify([...current])); return current.has(id); }
export function readAnonymousFavorites() { if (typeof window === "undefined") return new Set<string>(); try { return new Set<string>(JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? "[]") as string[]); } catch { return new Set<string>(); } }
export function isAnonymousFavorite(id: string) { return readAnonymousFavorites().has(id); }
