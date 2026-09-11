"use client";

import { ChevronDown, ChevronUp, Heart, ListMusic, LoaderCircle, Pause, Play, Repeat1, Repeat2, Shuffle, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import { isAnonymousFavorite, readAnonymousFavorites, readSavedYouTubeTracks, removeSavedYouTubeTrack, saveYouTubeTrack, toggleAnonymousFavorite } from "@/lib/anonymous-state";
import { sourceLabel } from "@/lib/music-sources";
import type { RadioTrack, Track } from "@/lib/types";
import { useMusic } from "./music-provider";

const formatTime = (seconds: number) => `${Math.floor(Math.max(0, seconds) / 60)}:${Math.floor(Math.max(0, seconds) % 60).toString().padStart(2, "0")}`;
const trackKey = (worldSlug: string, trackId: string) => `track:${worldSlug}:${trackId}`;
const finite = (value: number, fallback = 0) => Number.isFinite(value) ? value : fallback;

export function PersistentPlayer() {
  const { world, track, trackIndex, liveTrack, playlistTracks, playlistMetadataAvailable, currentRadioTrack, playlistIds, playlistIndex, playing, status, progress, duration, volume, isPlayable, isYouTube, shuffle, repeatMode, toggle, next, previous, selectTrack, playRadioTrack, toggleShuffle, cycleRepeat, setVolume, seek } = useMusic();
  const [muted, setMuted] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"queue" | "saved">("queue");
  useEffect(() => { const hydrate = window.setTimeout(() => setFavorites(readAnonymousFavorites())); return () => window.clearTimeout(hydrate); }, []);
  useEffect(() => { const videoId = liveTrack?.videoId || playlistIds[playlistIndex]; const savedId = isYouTube ? `youtube:${videoId || "pending"}` : track?.id; const update = window.setTimeout(() => setFavorite(Boolean(world && savedId && isAnonymousFavorite(trackKey(world.slug, savedId))))); return () => window.clearTimeout(update); }, [isYouTube, liveTrack?.videoId, playlistIds, playlistIndex, track?.id, world, world?.slug]);
  if (!world || !track) return null;

  const sourceUrl = world.music.sourceUrl;
  const nowTitle = isYouTube ? currentRadioTrack?.title ?? liveTrack?.title ?? "Tuning the playlist…" : track.title;
  const nowAuthor = isYouTube ? (currentRadioTrack?.author ?? liveTrack?.author ?? "YouTube playlist") : `${track.artist} · ${track.album}`;
  const safeVolume = Math.max(0, Math.min(1, finite(volume, 0.8)));
  const playableDuration = Math.max(0, finite(duration || (!isYouTube ? track.duration : 0)));
  const currentPosition = isYouTube ? playlistIndex : trackIndex;
  const itemCount = isYouTube ? playlistTracks.length || playlistIds.length : world.playlist.length;
  const favoriteId = isYouTube ? `youtube:${liveTrack?.videoId || playlistIds[playlistIndex] || "pending"}` : track.id;
  const savedTracks = world.playlist.filter((item) => favorites.has(trackKey(world.slug, item.id)));
  const savedYouTubeTracks = isYouTube ? readSavedYouTubeTracks().filter((item) => item.worldSlug === world.slug && favorites.has(trackKey(world.slug, `youtube:${item.videoId}`))) : [];
  const previousItems = isYouTube ? getPlaylistWindow(playlistTracks, playlistIndex, "previous") : getTrackWindow(world.playlist, trackIndex, "previous");
  const nextItems = isYouTube ? getPlaylistWindow(playlistTracks, playlistIndex, "next") : getTrackWindow(world.playlist, trackIndex, "next");
  const setMutedVolume = () => { const nextMuted = !muted; setMuted(nextMuted); setVolume(nextMuted ? 0 : 0.8); };
  const toggleFavorite = () => { const next = toggleAnonymousFavorite(trackKey(world.slug, favoriteId)); if (isYouTube && liveTrack?.videoId) { if (next) saveYouTubeTrack({ version: 1, worldSlug: world.slug, videoId: liveTrack.videoId, title: currentRadioTrack?.title ?? liveTrack.title ?? "Saved YouTube track", author: currentRadioTrack?.author ?? liveTrack.author ?? "YouTube", thumbnail: currentRadioTrack?.thumbnail, playlistIndex: currentRadioTrack?.playlistIndex ?? playlistIndex, savedAt: new Date().toISOString() }); else removeSavedYouTubeTrack(world.slug, liveTrack.videoId); } setFavorite(next); setFavorites(readAnonymousFavorites()); };
  const controlUnavailable = !isPlayable || status === "error";
  const playLabel = status === "buffering" ? "Buffering" : playing ? "Pause" : "Play";

  return <aside className={`persistent-player ${drawerOpen ? "is-expanded" : ""}`} style={{ "--player-accent": world.theme.accent, "--player-primary": world.theme.primary } as React.CSSProperties} aria-label="Music player">
    {drawerOpen ? <section className="player-drawer" aria-label="Playback details"><div className="drawer-tabs"><button className={drawerMode === "queue" ? "is-active" : ""} onClick={() => setDrawerMode("queue")}><ListMusic size={15} /> Queue</button><button className={drawerMode === "saved" ? "is-active" : ""} onClick={() => setDrawerMode("saved")}><Heart size={15} /> Saved {savedTracks.length + savedYouTubeTracks.length ? `(${savedTracks.length + savedYouTubeTracks.length})` : ""}</button></div>{drawerMode === "queue" ? <div className="queue-columns"><QueueGroup title="Previously played" items={previousItems} onSelect={selectTrack} emptyMessage={isYouTube && !playlistMetadataAvailable ? "Song list needs the server YouTube API key." : undefined} /><div className="queue-now"><span>NOW PLAYING</span><strong>{nowTitle}</strong><p>{nowAuthor}</p></div><QueueGroup title="Up next" items={nextItems} onSelect={selectTrack} emptyMessage={playlistMetadataAvailable ? "This playlist has no more tracks." : "Song list needs the server YouTube API key."} /></div> : <div className="saved-tracks">{isYouTube ? savedYouTubeTracks.length ? savedYouTubeTracks.map((item) => <button key={item.videoId} onClick={() => void playRadioTrack(item)}><span>{item.title}</span><small>{item.author}</small></button>) : <p>Tap the heart beside a song to keep it in this world’s saved shelf.</p> : savedTracks.length ? savedTracks.map((item) => <button key={item.id} onClick={() => selectTrack(world.playlist.indexOf(item))}><span>{item.title}</span><small>{item.artist} · {item.album}</small></button>) : <p>Tap the heart beside a song to keep it in this world’s saved shelf.</p>}</div>}</section> : null}
    <div className="track-stamp"><span className={`player-disc ${playing ? "is-spinning" : ""}`} aria-hidden="true"><i /><b /></span><div className="track-copy"><strong className={`track-title ${playing ? "is-scrolling" : ""}`} title={nowTitle}>{nowTitle}</strong><small>{nowAuthor}{isYouTube ? ` · ${currentPosition + 1}/${itemCount || "…"}` : ""}</small></div></div>
    <div className="player-controls"><button className={shuffle ? "is-active" : ""} onClick={toggleShuffle} disabled={controlUnavailable} aria-label="Toggle shuffle" aria-pressed={shuffle}><Shuffle size={15} /></button><button onClick={previous} disabled={controlUnavailable} aria-label="Previous track"><SkipBack /></button><button className="play-button" onClick={toggle} disabled={controlUnavailable} aria-label={controlUnavailable ? "Audio source unavailable" : playLabel}>{status === "buffering" ? <LoaderCircle className="player-spinner" /> : playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}</button><button onClick={next} disabled={controlUnavailable} aria-label="Next track"><SkipForward /></button><button className={repeatMode !== "off" ? "is-active" : ""} onClick={cycleRepeat} disabled={controlUnavailable} aria-label={`Repeat ${repeatMode}`} aria-pressed={repeatMode !== "off"}>{repeatMode === "one" ? <Repeat1 size={16} /> : <Repeat2 size={15} />}</button></div>
    <div className="player-progress"><input aria-label="Track progress" type="range" min="0" max={playableDuration || 1} value={Math.min(progress, playableDuration || 1)} disabled={controlUnavailable || !playableDuration} onChange={(event) => seek(Number(event.target.value))} /><span>{formatTime(progress)} / {playableDuration ? formatTime(playableDuration) : "--:--"}</span></div>
    <div className="volume-control"><button onClick={setMutedVolume} aria-label={muted ? "Unmute" : "Mute"}>{muted || safeVolume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}</button><input aria-label="Volume" type="range" min="0" max="1" step="0.05" value={safeVolume} onChange={(event) => { setMuted(false); setVolume(Number(event.target.value)); }} /><button className={favorite ? "is-active" : ""} onClick={toggleFavorite} disabled={isYouTube && !liveTrack?.videoId} aria-label="Save track to favorites"><Heart size={16} fill={favorite ? "currentColor" : "none"} /></button><button className="queue-toggle" onClick={() => setDrawerOpen(!drawerOpen)} aria-label={drawerOpen ? "Hide queue" : "Show queue"} aria-expanded={drawerOpen}><ListMusic size={16} />{drawerOpen ? <ChevronDown size={13} /> : <ChevronUp size={13} />}</button></div>{sourceUrl && !isPlayable ? <p className="demo-audio-note">{sourceLabel(world.music)}</p> : null}</aside>;
}

type QueueItem = { index: number; title: string; detail: string };
function getTrackWindow(items: Track[], currentIndex: number, direction: "previous" | "next"): QueueItem[] { return Array.from({ length: Math.min(5, Math.max(0, items.length - 1)) }, (_, offset) => { const delta = direction === "previous" ? -(Math.min(5, items.length - 1) - offset) : offset + 1; const index = (currentIndex + delta + items.length) % items.length; const item = items[index]; return { index, title: item.title, detail: `${item.artist} · ${formatTime(item.duration)}` }; }); }
function getPlaylistWindow(items: RadioTrack[], currentIndex: number, direction: "previous" | "next"): QueueItem[] { const count = Math.min(5, Math.max(0, items.length - 1)); return Array.from({ length: count }, (_, offset) => { const delta = direction === "previous" ? -(count - offset) : offset + 1; const index = (currentIndex + delta + items.length) % items.length; const item = items[index]; return { index, title: item.title, detail: item.author }; }); }
function QueueGroup({ title, items, onSelect, emptyMessage = "Waiting for verified playlist details…" }: { title: string; items: QueueItem[]; onSelect: (index: number) => void; emptyMessage?: string }) { return <div className="queue-group"><span>{title}</span>{items.length ? items.map((item) => <button key={`${item.index}-${item.title}`} onClick={() => onSelect(item.index)}><b>{item.title}</b><small>{item.detail}</small></button>) : <p className="queue-empty">{emptyMessage}</p>}</div>; }
