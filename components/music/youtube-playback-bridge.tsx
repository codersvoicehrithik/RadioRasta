"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { getYouTubeEmbedUrl } from "@/lib/music-sources";

export type YouTubeCommand = "playVideo" | "pauseVideo" | "nextVideo" | "previousVideo" | "playVideoAt" | "seekTo" | "setVolume";

interface YouTubePlaybackBridgeProps {
  sourceUrl: string;
  command?: { id: number; action: YouTubeCommand; value?: number };
  volume: number;
  onPlayingChange: (playing: boolean) => void;
  onProgress: (progress: number, duration?: number) => void;
  onTitleChange: (title?: string) => void;
}

export function YouTubePlaybackBridge({ sourceUrl, command, volume, onPlayingChange, onProgress, onTitleChange }: YouTubePlaybackBridgeProps) {
  const frame = useRef<HTMLIFrameElement>(null);
  const embedUrl = useMemo(() => getYouTubeEmbedUrl(sourceUrl), [sourceUrl]);
  const targetOrigin = embedUrl ? new URL(embedUrl).origin : "https://www.youtube-nocookie.com";
  const send = useCallback((action: string, args: unknown[] = []) => frame.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func: action, args }), targetOrigin), [targetOrigin]);

  useEffect(() => {
    const onMessage = (event: MessageEvent<unknown>) => {
      if (event.origin !== "https://www.youtube.com" && event.origin !== "https://www.youtube-nocookie.com") return;
      let payload: Record<string, unknown> | undefined;
      try { payload = typeof event.data === "string" ? JSON.parse(event.data) as Record<string, unknown> : event.data as Record<string, unknown>; } catch { return; }
      if (!payload) return;
      if (payload.event === "onStateChange") onPlayingChange(payload.info === 1);
      const info = payload.info as Record<string, unknown> | undefined;
      if (info) {
        const current = typeof info.currentTime === "number" ? info.currentTime : undefined;
        const duration = typeof info.duration === "number" ? info.duration : undefined;
        if (current !== undefined) onProgress(current, duration);
        const videoData = info.videoData as Record<string, unknown> | undefined;
        if (typeof videoData?.title === "string") onTitleChange(videoData.title);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onPlayingChange, onProgress, onTitleChange]);

  useEffect(() => {
    if (!command) return;
    const args = command.action === "seekTo" ? [command.value ?? 0, true] : command.action === "setVolume" || command.action === "playVideoAt" ? [command.value ?? 0] : [];
    send(command.action, args);
  }, [command, send]); // Command ids intentionally cause same command to be reissued.

  useEffect(() => {
    const timer = window.setInterval(() => { send("getCurrentTime"); send("getDuration"); send("getVideoData"); }, 1000);
    return () => window.clearInterval(timer);
  }, [embedUrl, send]);

  if (!embedUrl) return null;
  return <iframe ref={frame} className="youtube-frame" title="RadioRasta YouTube playlist player" src={embedUrl} allow="autoplay; encrypted-media; picture-in-picture" onLoad={() => { send("addEventListener", ["onStateChange"]); send("setVolume", [Math.round(volume * 100)]); send("getVideoData"); }} />;
}
