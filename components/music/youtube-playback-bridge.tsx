"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type PlayerStatus = "idle" | "buffering" | "playing" | "paused" | "ended" | "cued" | "error";
export type RepeatMode = "off" | "all" | "one";
export type YouTubeCommand = "play" | "pause" | "next" | "previous" | "playAt" | "seek" | "volume" | "shuffle" | "repeat";
export interface YouTubeSnapshot { title: string; author: string; videoId: string; currentTime: number; duration: number; playlistIndex: number; playlist: string[]; }

interface YouTubePlayer {
  cuePlaylist: (options: { list: string; listType: "playlist"; index?: number }) => void;
  playVideo: () => void; pauseVideo: () => void; nextVideo: () => void; previousVideo: () => void; playVideoAt: (index: number) => void; seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  setVolume: (volume: number) => void; getVolume: () => number; setShuffle: (shuffle: boolean) => void; setLoop: (loop: boolean) => void;
  getVideoData: () => { title?: string; author?: string; video_id?: string }; getCurrentTime: () => number; getDuration: () => number; getPlaylist: () => string[] | null; getPlaylistIndex: () => number; destroy: () => void;
}
interface YouTubeApi { Player: new (element: HTMLElement, options: Record<string, unknown>) => unknown; }
declare global { interface Window { YT?: YouTubeApi; onYouTubeIframeAPIReady?: () => void; } }

type PlayerCommand = { id: number; action: YouTubeCommand; value?: number | boolean };
const requiredMethods = ["cuePlaylist", "playVideo", "pauseVideo", "nextVideo", "previousVideo", "playVideoAt", "seekTo", "setVolume", "getVolume", "setShuffle", "setLoop", "getVideoData", "getCurrentTime", "getDuration", "getPlaylist", "getPlaylistIndex", "destroy"];
const finite = (value: number, fallback = 0) => Number.isFinite(value) ? value : fallback;
const canUsePlayer = (value: unknown): value is YouTubePlayer => Boolean(value) && typeof value === "object" && requiredMethods.every((method) => typeof (value as Record<string, unknown>)[method] === "function");
const callPlayer = (player: YouTubePlayer, method: keyof YouTubePlayer, ...args: unknown[]) => { const action = (player as unknown as Record<string, unknown>)[method]; if (typeof action !== "function") return false; try { (action as (...values: unknown[]) => unknown).apply(player, args); return true; } catch { return false; } };
const destroyUnknownPlayer = (value: unknown) => { if (!value || typeof value !== "object") return; const destroy = (value as Record<string, unknown>).destroy; if (typeof destroy === "function") { try { (destroy as () => void).call(value); } catch { /* Third-party teardown must never break React cleanup. */ } } };

let apiPromise: Promise<YouTubeApi> | undefined;
function loadYouTubeApi() {
  if (typeof window === "undefined") return Promise.reject(new Error("YouTube can only load in a browser."));
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise<YouTubeApi>((resolve, reject) => {
    const prior = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { prior?.(); window.YT?.Player ? resolve(window.YT) : reject(new Error("YouTube API loaded without Player.")); };
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://www.youtube.com/iframe_api"]');
    if (!existing) { const script = document.createElement("script"); script.src = "https://www.youtube.com/iframe_api"; script.async = true; script.onerror = () => reject(new Error("Unable to load YouTube IFrame API.")); document.head.appendChild(script); }
  });
  return apiPromise;
}

interface YouTubePlaybackBridgeProps { playlistId: string; command?: PlayerCommand; repeatMode: RepeatMode; onStatus: (status: PlayerStatus) => void; onSnapshot: (snapshot: YouTubeSnapshot) => void; onVolume: (volume: number) => void; onShuffle: (shuffle: boolean) => void; }

export function YouTubePlaybackBridge({ playlistId, command, repeatMode, onStatus, onSnapshot, onVolume, onShuffle }: YouTubePlaybackBridgeProps) {
  const host = useRef<HTMLDivElement>(null);
  const mountNode = useRef<HTMLDivElement | undefined>(undefined);
  const player = useRef<YouTubePlayer | undefined>(undefined);
  const constructedPlayer = useRef<unknown>(undefined);
  const isReady = useRef(false);
  const playlist = useRef<string | undefined>(undefined);
  const pendingCommand = useRef<PlayerCommand | undefined>(undefined);
  const callbacks = useRef({ onStatus, onSnapshot, onVolume, onShuffle, repeatMode });
  const [playerState, setPlayerState] = useState<PlayerStatus>("idle");
  useEffect(() => { callbacks.current = { onStatus, onSnapshot, onVolume, onShuffle, repeatMode }; }, [onStatus, onSnapshot, onVolume, onShuffle, repeatMode]);
  const updateStatus = useCallback((status: PlayerStatus) => { setPlayerState(status); callbacks.current.onStatus(status); }, []);

  const syncCurrentTrack = useCallback(() => {
    const instance = player.current;
    if (!isReady.current || !instance || !canUsePlayer(instance)) return;
    try {
      const data = instance.getVideoData() ?? {};
      callbacks.current.onSnapshot({ title: data.title ?? "", author: data.author ?? "", videoId: data.video_id ?? "", currentTime: Math.max(0, finite(instance.getCurrentTime())), duration: Math.max(0, finite(instance.getDuration())), playlistIndex: Math.max(0, Math.floor(finite(instance.getPlaylistIndex()))), playlist: instance.getPlaylist() ?? [] });
    } catch { updateStatus("error"); }
  }, [updateStatus]);

  const runCommand = useCallback((nextCommand: PlayerCommand) => {
    const instance = player.current;
    if (!isReady.current || !instance || !canUsePlayer(instance)) { pendingCommand.current = nextCommand; return false; }
    const value = nextCommand.value;
    const succeeded = nextCommand.action === "play" ? callPlayer(instance, "playVideo")
      : nextCommand.action === "pause" ? callPlayer(instance, "pauseVideo")
        : nextCommand.action === "next" ? callPlayer(instance, "nextVideo")
          : nextCommand.action === "previous" ? callPlayer(instance, "previousVideo")
            : nextCommand.action === "playAt" && typeof value === "number" ? callPlayer(instance, "playVideoAt", value)
              : nextCommand.action === "seek" && typeof value === "number" ? callPlayer(instance, "seekTo", value, true)
                : nextCommand.action === "volume" && typeof value === "number" ? callPlayer(instance, "setVolume", value)
                  : nextCommand.action === "shuffle" && typeof value === "boolean" ? callPlayer(instance, "setShuffle", value)
                    : nextCommand.action === "repeat" && typeof value === "boolean" ? callPlayer(instance, "setLoop", value) : false;
    if (!succeeded) { updateStatus("error"); return false; }
    if (nextCommand.action === "volume") callbacks.current.onVolume(Math.max(0, Math.min(1, finite(instance.getVolume()) / 100)));
    if (nextCommand.action === "shuffle" && typeof value === "boolean") callbacks.current.onShuffle(value);
    return true;
  }, [updateStatus]);

  useEffect(() => {
    let mounted = true;
    void loadYouTubeApi().then((api) => {
      if (!mounted || !host.current || constructedPlayer.current) return;
      const mount = document.createElement("div");
      mount.id = `radiorasta-youtube-${crypto.randomUUID()}`;
      host.current.appendChild(mount);
      mountNode.current = mount;
      constructedPlayer.current = new api.Player(mount, {
        width: 200, height: 200, playerVars: { playsinline: 1, controls: 0, rel: 0, origin: window.location.origin },
        events: {
          onReady: (event: { target: unknown }) => {
            if (!mounted) { destroyUnknownPlayer(event.target); return; }
            if (!canUsePlayer(event.target)) { updateStatus("error"); return; }
            player.current = event.target; isReady.current = true; playlist.current = playlistId;
            callPlayer(event.target, "cuePlaylist", { list: playlistId, listType: "playlist", index: 0 });
            callPlayer(event.target, "setVolume", 80); callPlayer(event.target, "setLoop", callbacks.current.repeatMode === "all");
            callbacks.current.onVolume(Math.max(0, Math.min(1, finite(event.target.getVolume()) / 100)));
            const queued = pendingCommand.current; if (queued && runCommand(queued)) pendingCommand.current = undefined;
            syncCurrentTrack();
          },
          onStateChange: (event: { data: number }) => {
            const status: Record<number, PlayerStatus> = { [-1]: "idle", 0: "ended", 1: "playing", 2: "paused", 3: "buffering", 5: "cued" };
            const nextStatus = status[event.data] ?? "idle"; updateStatus(nextStatus);
            const activePlayer = player.current;
            if (nextStatus === "ended" && callbacks.current.repeatMode === "one" && activePlayer) { callPlayer(activePlayer, "seekTo", 0, true); callPlayer(activePlayer, "playVideo"); }
            syncCurrentTrack();
          },
          onError: () => updateStatus("error"), onPlaybackQualityChange: syncCurrentTrack,
        },
      });
    }).catch(() => updateStatus("error"));
    return () => { mounted = false; };
  }, [playlistId, runCommand, syncCurrentTrack, updateStatus]);

  useEffect(() => { const instance = player.current; if (!isReady.current || !instance || playlist.current === playlistId) return; playlist.current = playlistId; callPlayer(instance, "cuePlaylist", { list: playlistId, listType: "playlist", index: 0 }); callPlayer(instance, "setLoop", repeatMode === "all"); syncCurrentTrack(); }, [playlistId, repeatMode, syncCurrentTrack]);
  useEffect(() => () => { destroyUnknownPlayer(player.current ?? constructedPlayer.current); const mount = mountNode.current; const root = host.current; if (mount && root && mount.parentNode === root) root.removeChild(mount); player.current = undefined; constructedPlayer.current = undefined; mountNode.current = undefined; isReady.current = false; }, []);
  useEffect(() => { if (playerState !== "playing" && playerState !== "buffering") return; const timer = window.setInterval(syncCurrentTrack, 500); return () => window.clearInterval(timer); }, [playerState, syncCurrentTrack]);
  useEffect(() => { if (command) runCommand(command); }, [command, runCommand]);
  return <div ref={host} className="youtube-frame" aria-hidden="true" />;
}
