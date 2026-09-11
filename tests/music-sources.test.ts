import { describe, expect, it } from "vitest";
import { getYouTubeEmbedUrl } from "@/lib/music-sources";

describe("YouTube source adapter", () => {
  it("turns a configured playlist URL into an API-enabled embedded playlist", () => {
    const url = getYouTubeEmbedUrl("https://www.youtube.com/playlist?list=PL12345");
    expect(url).toContain("https://www.youtube-nocookie.com/embed/videoseries");
    expect(url).toContain("list=PL12345");
    expect(url).toContain("enablejsapi=1");
  });

  it("rejects a URL without a playable video or playlist", () => {
    expect(getYouTubeEmbedUrl("https://www.youtube.com/")).toBeUndefined();
  });
});
