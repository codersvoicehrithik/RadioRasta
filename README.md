# RadioRasta

RadioRasta, by Codersvoice, is an interactive Indian music universe: listeners choose a place, ritual, or journey rather than beginning with a conventional playlist. Worlds are data-configured, visually reactive environments with an adaptable persistent player.

## Current build

RadioRasta is anonymous-first: visitors can enter worlds, run rituals, create digital entertainment tickets, save temporary favourites, and retain ticket stubs on the current device without an account. Nine data-driven worlds are included: Bus Wala, Truck Driver, Chai Tapri, Deluxe Saloon, Train Radio, Dhaba Radio, Baarish Wali Khidki, 2AM Rooftop, and Mohalle Wala Pyaar.

Demo tracks deliberately have no audio URL. Configure permitted playlist/source URLs with the nine `NEXT_PUBLIC_RADIORASTA_*_PLAYLIST_URL` variables in `.env`; a YouTube playlist URL must include `list=...` and plays through YouTube’s official IFrame Player API. Add the server-only `YOUTUBE_API_KEY` to enable verified playlist titles, exact saved-track restoration, and song/artist search through YouTube Data API v3. RadioRasta never downloads, proxies, or extracts copyrighted audio.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion, PostgreSQL/Neon, Drizzle ORM, Better Auth, and Cloudinary. It deploys as a Node web service on Render or another Node-compatible host; anonymous tickets and favourites remain on the visitor’s device.

## Project map

`app/` contains routes and metadata; `components/world/` contains the reusable ritual, ticket, and world shell; `components/music/` owns persistent player state; `lib/worlds.ts` is the current demo world source; `db/schema.ts` is the production data model; `ASSET_CONTRACT.md` describes artwork handoff.

## Commands

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm test
npm run db:generate
npm run db:migrate
npm run db:seed
npm run build
```

Copy `.env.example` to `.env` before connecting database, auth, assets, or uploaded audio. See [SETUP.md](SETUP.md), [DEPLOY.md](DEPLOY.md), and [USER_GUIDE.md](USER_GUIDE.md).
