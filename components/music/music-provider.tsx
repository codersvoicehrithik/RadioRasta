"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { getYouTubePlaylistId } from "@/lib/music-sources";
import type { Track, World } from "@/lib/types";
import { type PlayerStatus, type RepeatMode, YouTubePlaybackBridge, type YouTubeCommand, type YouTubeSnapshot } from "./youtube-playback-bridge";

export interface LiveTrackMetadata { title: string; author: string; videoId: string; }
interface MusicContextValue {
  world?: World;
  track?: Track;
  trackIndex: number;
  liveTrack?: LiveTrackMetadata;
  playlistIds: string[];
  playlistIndex: number;
  playing: boolean;
  status: PlayerStatus;
  progress: number;
  duration: number;
  volume: number;
  isPlayable: boolean;
  isYouTube: boolean;
  shuffle: boolean;
  repeatMode: RepeatMode;
  setWorld: (world: World) => void;
  toggle: () => void;
  next: () => void;
  previous: () => void;
  selectTrack: (index: number) => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
  setVolume: (value: number) => void;
  seek: (value: number) => void;
}

const MusicContext = createContext<MusicContextValue | null>(null);
const finite = (value: number, fallback = 0) => Number.isFinite(value) ? value : fallback;
const unitVolume = (value: number) => Math.max(0, Math.min(1, finite(value, 0.8)));

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [world, setWorldState] = useState<World>();
  const [trackIndex, setTrackIndex] = useState(0);
  const [liveTrack, setLiveTrack] = useState<LiveTrackMetadata>();
  const [playlistIds, setPlaylistIds] = useState<string[]>([]);
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [status, setStatus] = useState<PlayerStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [shuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("off");
  const [youtubeCommand, setYoutubeCommand] = useState<{ id: number; action: YouTubeCommand; value?: number | boolean }>();
  const audio = useRef<HTMLAudioElement | null>(null);
  const track = world?.playlist[trackIndex];
  const playlistId = world?.music.sourceUrl ? getYouTubePlaylistId(world.music.sourceUrl) : undefined;
  const isYouTube = world?.music.sourceType === "youtube" && Boolean(playlistId);
  const isPlayable = isYouTube || Boolean(track?.audioUrl);
  const playing = status === "playing";

  useEffect(() => {
    if (isYouTube || !track?.audioUrl) return;
    const element = new Audio(track.audioUrl);
    audio.current = element;
    const tick = () => setProgress(element.currentTime);
    const loaded = () => setDuration(element.duration);
    const played = () => setStatus("playing");
    const paused = () => setStatus("paused");
    const ended = () => { setStatus("ended"); setTrackIndex((index) => world ? (index + 1) % world.playlist.length : 0); };
    element.addEventListener("timeupdate", tick); element.addEventListener("loadedmetadata", loaded); element.addEventListener("play", played); element.addEventListener("pause", paused); element.addEventListener("ended", ended);
    return () => { element.pause(); element.removeEventListener("timeupdate", tick); element.removeEventListener("loadedmetadata", loaded); element.removeEventListener("play", played); element.removeEventListener("pause", paused); element.removeEventListener("ended", ended); audio.current = null; };
  }, [isYouTube, track?.audioUrl, track?.id, world]);

  useEffect(() => { if (audio.current) audio.current.volume = volume; }, [volume]);
  useEffect(() => { const reset = window.setTimeout(() => { setProgress(0); setDuration(isYouTube ? 0 : track?.duration ?? 0); if (!isYouTube) setLiveTrack(undefined); }); return () => window.clearTimeout(reset); }, [isYouTube, track?.duration, track?.id, world?.slug]);

  const queueYouTubeCommand = useCallback((action: YouTubeCommand, value?: number | boolean) => setYoutubeCommand((current) => ({ id: (current?.id ?? 0) + 1, action, value })), []);
  const setWorld = useCallback((nextWorld: World) => { setWorldState(nextWorld); setTrackIndex(0); setLiveTrack(undefined); setPlaylistIds([]); setPlaylistIndex(0); setProgress(0); setDuration(0); setStatus("idle"); setShuffle(false); }, []);
  const toggle = useCallback(() => {
    if (isYouTube) { queueYouTubeCommand(playing ? "pause" : "play"); return; }
    if (!track?.audioUrl || !audio.current) return;
    if (audio.current.paused) void audio.current.play().catch(() => setStatus("error")); else audio.current.pause();
  }, [isYouTube, playing, queueYouTubeCommand, track?.audioUrl]);
  const next = useCallback(() => { if (isYouTube) { queueYouTubeCommand("next"); return; } if (world) setTrackIndex((trackIndex + 1) % world.playlist.length); }, [isYouTube, queueYouTubeCommand, trackIndex, world]);
  const previous = useCallback(() => { if (isYouTube) { queueYouTubeCommand("previous"); return; } if (world) setTrackIndex((trackIndex - 1 + world.playlist.length) % world.playlist.length); }, [isYouTube, queueYouTubeCommand, trackIndex, world]);
  const selectTrack = useCallback((index: number) => { if (isYouTube) { queueYouTubeCommand("playAt", index); return; } if (world && index >= 0 && index < world.playlist.length) setTrackIndex(index); }, [isYouTube, queueYouTubeCommand, world]);
  const toggleShuffle = useCallback(() => { if (isYouTube) queueYouTubeCommand("shuffle", !shuffle); else setShuffle((active) => !active); }, [isYouTube, queueYouTubeCommand, shuffle]);
  const cycleRepeat = useCallback(() => { const nextMode: RepeatMode = repeatMode === "off" ? "all" : repeatMode === "all" ? "one" : "off"; setRepeatMode(nextMode); if (isYouTube) queueYouTubeCommand("repeat", nextMode === "all"); }, [isYouTube, queueYouTubeCommand, repeatMode]);
  const setVolume = useCallback((nextVolume: number) => { const safe = unitVolume(nextVolume); if (isYouTube) queueYouTubeCommand("volume", Math.round(safe * 100)); else { setVolumeState(safe); if (audio.current) audio.current.volume = safe; } }, [isYouTube, queueYouTubeCommand]);
  const seek = useCallback((value: number) => { const safe = Math.max(0, finite(value)); if (isYouTube) queueYouTubeCommand("seek", safe); else if (audio.current) audio.current.currentTime = safe; setProgress(safe); }, [isYouTube, queueYouTubeCommand]);
  const onSnapshot = useCallback((snapshot: YouTubeSnapshot) => { setLiveTrack(snapshot.title ? { title: snapshot.title, author: snapshot.author, videoId: snapshot.videoId } : undefined); setProgress(Math.max(0, finite(snapshot.currentTime))); setDuration(Math.max(0, finite(snapshot.duration))); setPlaylistIds(Array.isArray(snapshot.playlist) ? snapshot.playlist : []); setPlaylistIndex(Math.max(0, Math.floor(finite(snapshot.playlistIndex)))); }, []);

  const value = useMemo(() => ({ world, track, trackIndex, liveTrack, playlistIds, playlistIndex, playing, status, progress, duration: duration || (!isYouTube ? track?.duration ?? 0 : 0), volume, isPlayable, isYouTube, shuffle, repeatMode, setWorld, toggle, next, previous, selectTrack, toggleShuffle, cycleRepeat, setVolume, seek }), [world, track, trackIndex, liveTrack, playlistIds, playlistIndex, playing, status, progress, duration, volume, isPlayable, isYouTube, shuffle, repeatMode, setWorld, toggle, next, previous, selectTrack, toggleShuffle, cycleRepeat, setVolume, seek]);
  return <MusicContext.Provider value={value}>{children}{isYouTube && playlistId ? <YouTubePlaybackBridge playlistId={playlistId} command={youtubeCommand} repeatMode={repeatMode} onStatus={setStatus} onSnapshot={onSnapshot} onVolume={(value) => setVolumeState(unitVolume(value))} onShuffle={setShuffle} /> : null}</MusicContext.Provider>;
}

export function useMusic() { const context = useContext(MusicContext); if (!context) throw new Error("useMusic must be used inside MusicProvider"); return context; }
