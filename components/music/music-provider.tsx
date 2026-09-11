"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { YouTubePlaybackBridge, type YouTubeCommand } from "./youtube-playback-bridge";
import type { Track, World } from "@/lib/types";

interface MusicContextValue {
  world?: World;
  track?: Track;
  trackIndex: number;
  displayTitle?: string;
  playing: boolean;
  progress: number;
  duration: number;
  volume: number;
  isPlayable: boolean;
  setWorld: (world: World) => void;
  toggle: () => void;
  next: () => void;
  previous: () => void;
  selectTrack: (index: number) => void;
  setVolume: (value: number) => void;
  seek: (value: number) => void;
}

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [world, setWorldState] = useState<World>();
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [displayTitle, setDisplayTitle] = useState<string>();
  const [youtubeCommand, setYoutubeCommand] = useState<{ id: number; action: YouTubeCommand; value?: number }>();
  const audio = useRef<HTMLAudioElement | null>(null);
  const track = world?.playlist[trackIndex];
  const isYouTube = world?.music.sourceType === "youtube" && Boolean(world.music.sourceUrl);
  const isPlayable = isYouTube || Boolean(track?.audioUrl);

  useEffect(() => {
    if (isYouTube || !track?.audioUrl) return;
    const element = new Audio(track.audioUrl);
    audio.current = element;
    const tick = () => setProgress(element.currentTime);
    const ended = () => setTrackIndex((index) => world ? (index + 1) % world.playlist.length : 0);
    const loaded = () => setDuration(element.duration);
    element.addEventListener("timeupdate", tick);
    element.addEventListener("loadedmetadata", loaded);
    element.addEventListener("ended", ended);
    return () => { element.pause(); element.removeEventListener("timeupdate", tick); element.removeEventListener("loadedmetadata", loaded); element.removeEventListener("ended", ended); audio.current = null; };
  }, [isYouTube, track?.audioUrl, track?.id, world]);

  useEffect(() => { if (audio.current) audio.current.volume = volume; }, [volume]);
  useEffect(() => {
    const reset = window.setTimeout(() => { setProgress(0); setDuration(track?.duration ?? 0); setDisplayTitle(undefined); });
    return () => window.clearTimeout(reset);
  }, [world?.slug, track?.id, track?.duration]);

  const queueYouTubeCommand = useCallback((action: YouTubeCommand, value?: number) => setYoutubeCommand((current) => ({ id: (current?.id ?? 0) + 1, action, value })), []);
  const resetTrack = useCallback((index: number) => { setTrackIndex(index); setProgress(0); setPlaying(false); }, []);
  const setWorld = useCallback((nextWorld: World) => { setWorldState(nextWorld); resetTrack(0); }, [resetTrack]);
  const toggle = useCallback(() => {
    if (isYouTube) { queueYouTubeCommand(playing ? "pauseVideo" : "playVideo"); setPlaying(!playing); return; }
    if (!track?.audioUrl || !audio.current) return;
    if (audio.current.paused) void audio.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    else { audio.current.pause(); setPlaying(false); }
  }, [isYouTube, playing, queueYouTubeCommand, track?.audioUrl]);
  const next = useCallback(() => { if (!world) return; if (isYouTube) queueYouTubeCommand("nextVideo"); resetTrack((trackIndex + 1) % world.playlist.length); }, [isYouTube, queueYouTubeCommand, resetTrack, trackIndex, world]);
  const previous = useCallback(() => { if (!world) return; if (isYouTube) queueYouTubeCommand("previousVideo"); resetTrack((trackIndex - 1 + world.playlist.length) % world.playlist.length); }, [isYouTube, queueYouTubeCommand, resetTrack, trackIndex, world]);
  const selectTrack = useCallback((index: number) => { if (!world || index < 0 || index >= world.playlist.length) return; if (isYouTube) queueYouTubeCommand("playVideoAt", index); resetTrack(index); }, [isYouTube, queueYouTubeCommand, resetTrack, world]);
  const setVolume = useCallback((nextVolume: number) => { const safeVolume = Math.max(0, Math.min(1, nextVolume)); setVolumeState(safeVolume); if (isYouTube) queueYouTubeCommand("setVolume", Math.round(safeVolume * 100)); if (audio.current) audio.current.volume = safeVolume; }, [isYouTube, queueYouTubeCommand]);
  const seek = useCallback((value: number) => { if (isYouTube) queueYouTubeCommand("seekTo", value); else if (audio.current) audio.current.currentTime = value; setProgress(value); }, [isYouTube, queueYouTubeCommand]);

  const value = useMemo(() => ({ world, track, trackIndex, displayTitle, playing, progress, duration: duration || track?.duration || 0, volume, isPlayable, setWorld, toggle, next, previous, selectTrack, setVolume, seek }), [world, track, trackIndex, displayTitle, playing, progress, duration, volume, isPlayable, setWorld, toggle, next, previous, selectTrack, setVolume, seek]);
  return <MusicContext.Provider value={value}>{children}{isYouTube && world?.music.sourceUrl ? <YouTubePlaybackBridge key={world.music.sourceUrl} sourceUrl={world.music.sourceUrl} command={youtubeCommand} volume={volume} onPlayingChange={setPlaying} onProgress={(nextProgress, nextDuration) => { setProgress(nextProgress); if (nextDuration) setDuration(nextDuration); }} onTitleChange={setDisplayTitle} /> : null}</MusicContext.Provider>;
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) throw new Error("useMusic must be used inside MusicProvider");
  return context;
}
