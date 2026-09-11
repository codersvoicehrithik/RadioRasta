"use client";

import { ArrowUpRight, Music2, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { RadioTrack, World } from "@/lib/types";

type SearchPayload = { worlds: World[]; tracks: RadioTrack[]; available: boolean };

export function SearchExperience() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchPayload>({ worlds: [], tracks: [], available: false });
  const [loading, setLoading] = useState(false);
  const updateQuery = (nextQuery: string) => { setQuery(nextQuery); if (!nextQuery.trim()) { setResults({ worlds: [], tracks: [], available: false }); setLoading(false); } };

  useEffect(() => {
    const needle = query.trim();
    if (!needle) return;
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      setLoading(true);
      void fetch(`/api/search?q=${encodeURIComponent(needle)}`, { signal: controller.signal })
        .then(async (response) => response.ok ? response.json() as Promise<SearchPayload> : { worlds: [], tracks: [], available: false })
        .then((payload) => { if (!controller.signal.aborted) setResults(payload); })
        .catch(() => { if (!controller.signal.aborted) setResults({ worlds: [], tracks: [], available: false }); })
        .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    }, 280);
    return () => { controller.abort(); window.clearTimeout(timer); };
  }, [query]);

  const hasResults = results.worlds.length || results.tracks.length;
  return <main className="search-page"><div className="search-shell"><p className="section-eyebrow">Find a frequency</p><div className="search-input"><Search size={24}/><input autoFocus value={query} onChange={(event) => updateQuery(event.target.value)} placeholder="World, artist, song, feeling…" aria-label="Search RadioRasta"/>{query && <button onClick={() => updateQuery("")} aria-label="Clear search"><X size={18}/></button>}</div><p className="search-hint">Try “rain”, “night”, “chai”, or an artist.</p>{query && <section className="search-results" aria-live="polite">{loading ? <p className="search-none">Finding the right frequency…</p> : hasResults ? <>{results.worlds.map((world) => <Link key={world.slug} href={`/world/${world.slug}`}><span style={{ background: world.theme.primary }}>{world.hindiName}</span><div><small>{world.category} world</small><strong>{world.name}</strong><p>{world.shortDescription}</p></div><ArrowUpRight size={18}/></Link>)}{results.tracks.map((track) => <Link key={`${track.worldSlug}-${track.videoId}`} href={{ pathname: `/world/${track.worldSlug}`, query: { track: track.videoId, index: track.playlistIndex } }}><Music2 size={19}/><div><small>Song · {track.author}</small><strong>{track.title}</strong><p>{track.worldSlug.replaceAll("-", " ")}</p></div><ArrowUpRight size={18}/></Link>)}</> : <p className="search-none">No matching lane yet. Try a mood, place, or artist.{results.available ? "" : " Add YOUTUBE_API_KEY to enable song and artist results."}</p>}</section>}</div></main>;
}
