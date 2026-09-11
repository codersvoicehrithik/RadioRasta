"use client";

import { Heart, Music2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { readAnonymousFavorites, readSavedYouTubeTracks, type SavedYouTubeTrack } from "@/lib/anonymous-state";
import { worlds } from "@/lib/worlds";

export function FavoritesShelf() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [savedYouTubeTracks, setSavedYouTubeTracks] = useState<SavedYouTubeTrack[]>([]);
  useEffect(() => { const hydrate = window.setTimeout(() => { setFavorites(readAnonymousFavorites()); setSavedYouTubeTracks(readSavedYouTubeTracks()); }); return () => window.clearTimeout(hydrate); }, []);
  const savedWorlds = worlds.filter((world) => favorites.has(`world:${world.slug}`));
  const savedTracks = worlds.flatMap((world) => world.playlist.map((track) => ({ world, track }))).filter(({ world, track }) => favorites.has(`track:${world.slug}:${track.id}`));

  return <section className="favorites-shelf">{savedWorlds.length || savedTracks.length || savedYouTubeTracks.length ? <><div><p className="section-eyebrow">Saved worlds</p><div className="favorites-grid">{savedWorlds.map((world) => <Link key={world.slug} href={`/world/${world.slug}`}><span style={{ background: world.theme.primary }}>{world.hindiName}</span><strong>{world.name}</strong><small>{world.shortDescription}</small></Link>)}</div></div><div><p className="section-eyebrow">Saved songs</p><div className="saved-song-list">{savedTracks.map(({ world, track }) => <Link key={`${world.slug}-${track.id}`} href={`/world/${world.slug}`}><Music2 size={17} /><span><strong>{track.title}</strong><small>{track.artist} · {world.name}</small></span></Link>)}{savedYouTubeTracks.map((track) => <Link key={`${track.worldSlug}-${track.videoId}`} href={`/world/${track.worldSlug}`}><Music2 size={17} /><span><strong>{track.title}</strong><small>{track.author} · YouTube</small></span></Link>)}</div></div></> : <div className="favorites-empty"><Heart size={26} /><p className="section-eyebrow">Your saved shelf is empty</p><h2>Keep the worlds and songs that stay with you.</h2><Link className="button button-primary" href="/discover">Discover a world</Link></div>}</section>;
}
