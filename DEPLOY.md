# Deployment

Deploy the Next.js app to Vercel and use Neon for PostgreSQL.

1. Push the repository to your Git provider and import it into Vercel.
2. Add all values from `.env.example` in Vercel project settings. Set `BETTER_AUTH_URL` to the production canonical URL.
3. Generate and review Drizzle migrations locally, then run `npm run db:migrate` against the production Neon database as a controlled deployment step.
4. Add Cloudinary credentials only as encrypted server-side variables. Do not prefix them with `NEXT_PUBLIC_`.
5. Use `npm run build` as the Vercel build command. Vercel detects Next.js automatically.

Render compatibility: deploy as a Node web service with the same environment variables, `npm run build` build command, and `npm run start` start command. No local media or database persistence is required.

Before release, verify authentication callback URL, migrations, Cloudinary upload validation, licensed audio source behaviour, error routes, and mobile player layout.
