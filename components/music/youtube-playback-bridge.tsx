"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type PlayerStatus = "idle" | "buffering" | "playing" | "paused" | "ended" | "cued" | "error";
export type RepeatMode = "off" | "all" | "one";
export type YouTubeCommand = "play" | "pause" | "next" | "previous" | "playAt" | "seek" | "volume" | "shuffle" | "repeat";

export interface YouTubeSnapshot {
  title: string;
  author: string;
  videoId: string;
  currentTime: number;
  duration: number;
  playlistIndex: number;
  playlist: string[];
}

interface YouTubePlayer {
  cuePlaylist: (options: { list: string; listType: "playlist"; index?: number }) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  nextVideo: () => void;
  previousVideo: () => void;
  playVideoAt: (index: number) => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  setVolume: (volume: number) => void;
  getVolume: () => number;
  setShuffle: (shuffle: boolean) => void;
  setLoop: (loop: boolean) => void;
  getVideoData: () => { title?: string; author?: string; video_id?: string };
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlaylist: () => string[] | null;
  getPlaylistIndex: () => number;
  destroy: () => void;
}

interface YouTubeApi { Player: new (element: HTMLElement, options: Record<string, unknown>) => YouTubePlayer; PlayerState: Record<string, number>; }
declare global { interface Window { YT?: YouTubeApi; onYouTubeIframeAPIReady?: () => void; } }

let apiPromise: Promise<YouTubeApi> | undefined;
const finite = (value: number, fallback = 0) => Number.isFinite(value) ? value : fallback;
function loadYouTubeApi() {
  if (typeof window === "undefined") return Promise.reject(new Error("YouTube can only load in a browser."));
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise<YouTubeApi>((resolve, reject) => {
    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { previousReady?.(); window.YT?.Player ? resolve(window.YT) : reject(new Error("YouTube API loaded without Player.")); };
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://www.youtube.com/iframe_api"]');
    if (!existing) { const script = document.createElement("script"); script.src = "https://www.youtube.com/iframe_api"; script.async = true; script.onerror = () => reject(new Error("Unable to load YouTube IFrame API.")); document.head.appendChild(script); }
  });
  return apiPromise;
}

interface YouTubePlaybackBridgeProps {
  playlistId: string;
  command?: { id: number; action: YouTubeCommand; value?: number | boolean };
  repeatMode: RepeatMode;
  onStatus: (status: PlayerStatus) => void;
  onSnapshot: (snapshot: YouTubeSnapshot) => void;
  onVolume: (volume: number) => void;
  onShuffle: (shuffle: boolean) => void;
}

export function YouTubePlaybackBridge({ playlistId, command, repeatMode, onStatus, onSnapshot, onVolume, onShuffle }: YouTubePlaybackBridgeProps) {
  const host = useRef<HTMLDivElement>(null);
  const player = useRef<YouTubePlayer | undefined>(undefined);
  const playlist = useRef<string | undefined>(undefined);
  const pendingCommand = useRef<{ id: number; action: YouTubeCommand; value?: number | boolean } | undefined>(undefined);
  const callbacks = useRef({ onStatus, onSnapshot, onVolume, onShuffle, repeatMode });
  const [playerState, setPlayerState] = useState<PlayerStatus>("idle");
  useEffect(() => { callbacks.current = { onStatus, onSnapshot, onVolume, onShuffle, repeatMode }; }, [onStatus, onSnapshot, onVolume, onShuffle, repeatMode]);

  const syncCurrentTrack = useCallback(() => {
    const instance = player.current;
    if (!instance) return;
    const data = instance.getVideoData() ?? {};
    callbacks.current.onSnapshot({
      title: data.title ?? "",
      author: data.author ?? "",
      videoId: data.video_id ?? "",
      currentTime: Math.max(0, finite(instance.getCurrentTime())),
      duration: Math.max(0, finite(instance.getDuration())),
      playlistIndex: Math.max(0, Math.floor(finite(instance.getPlaylistIndex()))),
      playlist: instance.getPlaylist() ?? [],
    });
  }, []);

  const updateStatus = useCallback((nextStatus: PlayerStatus) => { setPlayerState(nextStatus); callbacks.current.onStatus(nextStatus); }, []);
  const runCommand = useCallback((instance: YouTubePlayer, nextCommand: { id: number; action: YouTubeCommand; value?: number | boolean }) => {
    if (nextCommand.action === "play") instance.playVideo();
    if (nextCommand.action === "pause") instance.pauseVideo();
    if (nextCommand.action === "next") instance.nextVideo();
    if (nextCommand.action === "previous") instance.previousVideo();
    if (nextCommand.action === "playAt" && typeof nextCommand.value === "number") instance.playVideoAt(nextCommand.value);
    if (nextCommand.action === "seek" && typeof nextCommand.value === "number") instance.seekTo(nextCommand.value, true);
    if (nextCommand.action === "volume" && typeof nextCommand.value === "number") { instance.setVolume(nextCommand.value); callbacks.current.onVolume(Math.max(0, Math.min(1, finite(instance.getVolume()) / 100))); }
    if (nextCommand.action === "shuffle" && typeof nextCommand.value === "boolean") { instance.setShuffle(nextCommand.value); callbacks.current.onShuffle(nextCommand.value); }
    if (nextCommand.action === "repeat" && typeof nextCommand.value === "boolean") instance.setLoop(nextCommand.value);
  }, []);

  useEffect(() => {
    let mounted = true;
    void loadYouTubeApi().then((api) => {
      if (!mounted || !host.current || player.current) return;
      player.current = new api.Player(host.current, {
        width: 200,
        height: 200,
        playerVars: { playsinline: 1, controls: 0, rel: 0, origin: window.location.origin },
        events: {
          onReady: (event: { target: YouTubePlayer }) => { playlist.current = playlistId; event.target.cuePlaylist({ list: playlistId, listType: "playlist", index: 0 }); event.target.setVolume(80); event.target.setLoop(callbacks.current.repeatMode === "all"); callbacks.current.onVolume(Math.max(0, Math.min(1, finite(event.target.getVolume()) / 100))); const queued = pendingCommand.current; if (queued) { runCommand(event.target, queued); pendingCommand.current = undefined; } syncCurrentTrack(); },
          onStateChange: (event: { data: number }) => {
            const stateMap: Record<number, PlayerStatus> = { [-1]: "idle", 0: "ended", 1: "playing", 2: "paused", 3: "buffering", 5: "cued" };
            const status = stateMap[event.data] ?? "idle";
            updateStatus(status);
            if (status === "ended" && callbacks.current.repeatMode === "one") { player.current?.seekTo(0, true); player.current?.playVideo(); }
            syncCurrentTrack();
          },
          onError: () => updateStatus("error"),
          onPlaybackQualityChange: () => syncCurrentTrack(),
        },
      });
    }).catch(() => updateStatus("error"));
    return () => { mounted = false; };
  }, [playlistId, runCommand, syncCurrentTrack, updateStatus]);

  useEffect(() => {
    const instance = player.current;
    if (!instance || playlist.current === playlistId) return;
    playlist.current = playlistId;
    instance.cuePlaylist({ list: playlistId, listType: "playlist", index: 0 });
    instance.setLoop(repeatMode === "all");
    syncCurrentTrack();
  }, [playlistId, repeatMode, syncCurrentTrack]);

  useEffect(() => () => { player.current?.destroy(); player.current = undefined; }, []);

  useEffect(() => {
    if (playerState !== "playing" && playerState !== "buffering") return;
    const timer = window.setInterval(syncCurrentTrack, 500);
    return () => window.clearInterval(timer);
  }, [playerState, syncCurrentTrack]);

  useEffect(() => {
    if (!command) return;
    const instance = player.current;
    if (!instance) { pendingCommand.current = command; return; }
    runCommand(instance, command);
    syncCurrentTrack();
  }, [command, runCommand, syncCurrentTrack]);

  return <div ref={host} className="youtube-frame" aria-hidden="true" />;
}
