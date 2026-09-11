"use client";

import { ChevronDown, ChevronUp, ExternalLink, Heart, ListMusic, Pause, Play, Repeat2, Shuffle, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import { isAnonymousFavorite, readAnonymousFavorites, toggleAnonymousFavorite } from "@/lib/anonymous-state";
import { sourceLabel } from "@/lib/music-sources";
import type { Track } from "@/lib/types";
import { useMusic } from "./music-provider";

const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
const trackKey = (worldSlug: string, trackId: string) => `track:${worldSlug}:${trackId}`;

export function PersistentPlayer() {
  const { world, track, trackIndex, displayTitle, playing, progress, duration, volume, isPlayable, toggle, next, previous, selectTrack, setVolume, seek } = useMusic();
  const [muted, setMuted] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"queue" | "saved">("queue");
  useEffect(() => { const hydrate = window.setTimeout(() => setFavorites(readAnonymousFavorites())); return () => window.clearTimeout(hydrate); }, []);
  useEffect(() => { const update = window.setTimeout(() => setFavorite(Boolean(world && track && isAnonymousFavorite(trackKey(world.slug, track.id))))); return () => window.clearTimeout(update); }, [track?.id, world?.slug]);
  if (!world || !track) return null;
  const sourceUrl = world.music.sourceUrl;
  const trackDuration = duration || track.duration;
  const savedTracks = world.playlist.filter((item) => favorites.has(trackKey(world.slug, item.id)));
  const previousTracks = Array.from({ length: Math.min(5, Math.max(0, world.playlist.length - 1)) }, (_, index) => ({ track: world.playlist[(trackIndex - (index + 1) + world.playlist.length) % world.playlist.length], index: (trackIndex - (index + 1) + world.playlist.length) % world.playlist.length })).reverse();
  const nextTracks = Array.from({ length: Math.min(5, Math.max(0, world.playlist.length - 1)) }, (_, index) => ({ track: world.playlist[(trackIndex + index + 1) % world.playlist.length], index: (trackIndex + index + 1) % world.playlist.length }));
  const setMutedVolume = () => { const nextMuted = !muted; setMuted(nextMuted); setVolume(nextMuted ? 0 : 0.8); };
  const toggleFavorite = () => { const next = toggleAnonymousFavorite(trackKey(world.slug, track.id)); setFavorite(next); setFavorites(readAnonymousFavorites()); };
  const nowTitle = displayTitle ?? track.title;

  return <aside className={`persistent-player ${drawerOpen ? "is-expanded" : ""}`} style={{ "--player-accent": world.theme.accent, "--player-primary": world.theme.primary } as React.CSSProperties} aria-label="Music player">
    {drawerOpen ? <section className="player-drawer" aria-label="Playback details"><div className="drawer-tabs"><button className={drawerMode === "queue" ? "is-active" : ""} onClick={() => setDrawerMode("queue")}><ListMusic size={15} /> Queue</button><button className={drawerMode === "saved" ? "is-active" : ""} onClick={() => setDrawerMode("saved")}><Heart size={15} /> Saved {savedTracks.length ? `(${savedTracks.length})` : ""}</button></div>{drawerMode === "queue" ? <div className="queue-columns"><QueueGroup title="Previously played" items={previousTracks} onSelect={selectTrack} /><div className="queue-now"><span>NOW PLAYING</span><strong>{nowTitle}</strong><p>{track.artist} · {track.album} · {track.genre}</p></div><QueueGroup title="Up next" items={nextTracks} onSelect={selectTrack} /></div> : <div className="saved-tracks">{savedTracks.length ? savedTracks.map((item) => <button key={item.id} onClick={() => selectTrack(world.playlist.indexOf(item))}><span>{item.title}</span><small>{item.artist} · {item.album}</small></button>) : <p>Tap the heart beside a song to keep it in this world’s saved shelf.</p>}</div>}</section> : null}
    <div className="track-stamp"><span>{world.hindiName}</span><div><strong>{nowTitle}</strong><small>{displayTitle ? `YouTube playlist · ${world.name}` : `${track.artist} · ${track.album}`}</small></div></div><div className="player-controls"><button className={shuffle ? "is-active" : ""} onClick={() => setShuffle(!shuffle)} aria-label="Toggle shuffle"><Shuffle size={15} /></button><button onClick={previous} disabled={!isPlayable} aria-label="Previous track"><SkipBack /></button><button className="play-button" onClick={toggle} disabled={!isPlayable} aria-label={isPlayable ? (playing ? "Pause" : "Play") : "Audio source unavailable"}>{playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}</button><button onClick={next} disabled={!isPlayable} aria-label="Next track"><SkipForward /></button><button className={repeat ? "is-active" : ""} onClick={() => setRepeat(!repeat)} aria-label="Toggle repeat"><Repeat2 size={15} /></button></div><div className="player-progress"><input aria-label="Track progress" type="range" min="0" max={trackDuration} value={Math.min(progress, trackDuration)} disabled={!isPlayable} onChange={(event) => seek(Number(event.target.value))} /><span>{formatTime(progress)} / {formatTime(trackDuration)}</span></div><div className="volume-control"><button onClick={setMutedVolume} aria-label={muted ? "Unmute" : "Mute"}>{muted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}</button><input aria-label="Volume" type="range" min="0" max="1" step="0.05" value={volume} onChange={(event) => { setMuted(false); setVolume(Number(event.target.value)); }} /><button className={favorite ? "is-active" : ""} onClick={toggleFavorite} aria-label="Save track to favorites"><Heart size={16} fill={favorite ? "currentColor" : "none"} /></button><button className="queue-toggle" onClick={() => setDrawerOpen(!drawerOpen)} aria-label={drawerOpen ? "Hide queue" : "Show queue"}><ListMusic size={16} />{drawerOpen ? <ChevronDown size={13} /> : <ChevronUp size={13} />}</button></div>{sourceUrl && !isPlayable ? <a className="demo-audio-note" href={sourceUrl} target="_blank" rel="noreferrer">{sourceLabel(world.music)} <ExternalLink size={11} /></a> : !isPlayable && <p className="demo-audio-note">{sourceLabel(world.music)}</p>}</aside>;
}

function QueueGroup({ title, items, onSelect }: { title: string; items: { track: Track; index: number }[]; onSelect: (index: number) => void }) {
  return <div className="queue-group"><span>{title}</span>{items.map(({ track, index }) => <button key={`${track.id}-${index}`} onClick={() => onSelect(index)}><b>{track.title}</b><small>{track.artist} · {formatTime(track.duration)}</small></button>)}</div>;
}
