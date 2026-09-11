import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { readSavedYouTubeTracks, saveYouTubeTrack } from "@/lib/anonymous-state";

class MemoryStorage {
  private values = new Map<string, string>();
  getItem(key: string) { return this.values.get(key) ?? null; }
  setItem(key: string, value: string) { this.values.set(key, value); }
  clear() { this.values.clear(); }
}

const storage = new MemoryStorage();

beforeEach(() => {
  storage.clear();
  Object.defineProperty(globalThis, "window", { configurable: true, value: { localStorage: storage } });
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: storage });
});

afterEach(() => {
  Object.defineProperty(globalThis, "window", { configurable: true, value: undefined });
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: undefined });
});

describe("saved YouTube track migration", () => {
  it("keeps a legacy saved item playable while giving it a versioned shape", () => {
    storage.setItem("radiorasta:youtube-favorite-details", JSON.stringify([{ worldSlug: "bus-wala", videoId: "abc123", title: "A real song", author: "An artist" }]));
    expect(readSavedYouTubeTracks()).toMatchObject([{ version: 1, worldSlug: "bus-wala", videoId: "abc123", title: "A real song", author: "An artist" }]);
  });

  it("stores the playlist position required to restore the exact song", () => {
    saveYouTubeTrack({ version: 1, worldSlug: "bus-wala", videoId: "abc123", title: "A real song", author: "An artist", playlistIndex: 7, savedAt: "2026-01-01T00:00:00.000Z" });
    expect(readSavedYouTubeTracks()[0]).toMatchObject({ videoId: "abc123", playlistIndex: 7 });
  });
});
