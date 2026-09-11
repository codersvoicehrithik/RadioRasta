import { describe, expect, it } from "vitest";
import { calculateTheme } from "@/lib/theme";
import { worlds } from "@/lib/worlds";
describe("theme engine", () => { it("softens a melancholic track", () => { const theme = calculateTheme(worlds[0].theme, { ...worlds[0].playlist[0], mood: "melancholic" }); expect(theme.saturation).toBeLessThan(1); expect(theme.motion).toBeGreaterThan(0); }); });
