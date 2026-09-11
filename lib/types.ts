export type WorldCategory = "journey" | "place" | "mood" | "activity" | "nostalgia";
export type RitualKind = "ticket" | "chai" | "saloon" | "dhaba" | "mohalla" | "welcome";
export type TrackMood = "romantic" | "melancholic" | "upbeat" | "dreamy";
export type TimeOfDay = "morning" | "afternoon" | "evening" | "night";
export type MusicSourceType = "demo" | "owned-audio" | "youtube";
export type InteractionEffect = "dust" | "headlights" | "steam" | "snip" | "whistle" | "bell" | "raindrop" | "stars" | "streetlight";
export interface ThemeConfig { primary: string; secondary: string; accent: string; sky: string; overlay: string; atmosphere: "road" | "steam" | "rain" | "lights" | "stars" | "mohalla" | "train"; }
export interface RitualConfig { kind: RitualKind; title: string; prompt: string; options?: string[]; arrivalLine?: string; }
export interface Track { id: string; title: string; artist: string; album: string; duration: number; genre: string; mood: TrackMood; energy: "low" | "medium" | "high"; era: string; language: string; tempo: number; audioUrl?: string; }
export interface WorldMusicConfig { sourceType: MusicSourceType; sourceUrl?: string; enabled: boolean; playlistLabel: string; allowedMoods: TrackMood[]; }
export interface WorldVisualConfig { scene: string; assetFolder: string; heroFilename: string; mobileFocus: string; detail: string; }
export interface World { id: string; slug: string; name: string; hindiName: string; category: WorldCategory; description: string; shortDescription: string; theme: ThemeConfig; ritual: RitualConfig; interaction: { label: string; icon: string; cooldown: number; effect: InteractionEffect }; playlist: Track[]; music: WorldMusicConfig; visual: WorldVisualConfig; journey?: { enabled: boolean; stages: string[] }; }
export interface JourneyDetails { from: string; to: string; passenger: string; seat?: string; journeyType?: string; ticketNumber?: string; }
export interface JourneyRecord extends JourneyDetails { id: string; worldSlug: string; worldName: string; createdAt: string; completed: boolean; }
