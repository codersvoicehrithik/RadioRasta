# Local setup

1. Install Node.js 20+ and PostgreSQL access through a Neon project.
2. Copy `.env.example` to `.env`, then set `DATABASE_URL`, a long random `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL=http://localhost:3000`. Native Node environment loading makes this same file available to Drizzle and seed scripts; Next.js also loads it during development.
3. Add the configured Cloudinary cloud name, API key, and API secret. Secrets stay server-side. `next.config.ts` passes only the safe cloud name to client image delivery as `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`; do not expose the key or secret.
4. Run `npm install`, then `npm run db:generate` to create Drizzle SQL migrations from `db/schema.ts`. Review and commit that output.
5. Run `npm run db:migrate` and `npm run db:seed`.
6. Run `npm run dev` and visit `http://localhost:3000`.

The seed writes nine published world configurations. Add permitted playlist URLs in `.env` using the documented `NEXT_PUBLIC_RADIORASTA_*_PLAYLIST_URL` variables; they are intentionally public client configuration, never secrets. Tracks remain safe demo metadata until an owned/licensed source is configured.

Cloudinary hero delivery IDs and the exact uploaded filenames are documented in `ASSET_CONTRACT.md`. The provided development console diagnostic prints each resolved public delivery URL. Bus Wala's optional memento uses only this browser's local storage (`radiorasta:bus-wala-ticket` and `radiorasta:bus-wala-ticket-skipped`); it does not need a database or account.

## Better Auth

The catch-all handler lives at `app/api/auth/[...all]/route.ts`. Better Auth uses the Drizzle `user`, `session`, `account`, and `verification` tables. Make a user an admin through a controlled database update only; client UI must never assign roles.
