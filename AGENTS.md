# Repository Guidelines

## Project Structure & Module Organization
`app/` contains the Next.js App Router pages, layouts, and route handlers under `app/api/**`. Shared UI lives in `app/components/**`, with the upload flow grouped in `app/components/file-upload/**`. Reusable logic is in `lib/`, split into `lib/hooks`, `lib/stores`, `lib/server`, and `lib/worker/file-upload-worker.ts`. Database connection and schema live in `db/`, while Drizzle SQL and snapshots live in `drizzle/`. Static assets, icons, and PWA files belong in `public/`. Use the `@/*` import alias from `tsconfig.json`.

## Build, Test, and Development Commands
Use `pnpm dev` to start the local Next.js server and `pnpm start` to serve a production build. Run `pnpm lint` for the Next.js ESLint checks and `pnpm format` to apply Prettier formatting. Database workflows use `pnpm db:generate`, `pnpm db:migrate`, `pnpm db:push`, and `pnpm db:studio`. `pnpm build` runs `drizzle-kit generate && drizzle-kit migrate && next build`, so verify that `AUTH_DRIZZLE_URL` points to the intended database before using it.

## Coding Style & Naming Conventions
This project uses strict TypeScript. Formatting is defined by Prettier: 2-space indentation, single quotes, no semicolons, trailing commas (`es5`), and a 120-character line width. Tailwind class order is normalized by `prettier-plugin-tailwindcss`. Keep component names in PascalCase, hook names in `useX` form, and follow Next.js file conventions such as `page.tsx`, `layout.tsx`, and `route.ts`. Prefer kebab-case filenames for reusable component files such as `share-button.tsx`.

## Testing Guidelines
There is no dedicated automated test runner configured yet. Treat `pnpm lint` plus manual smoke testing as the minimum gate. Verify the homepage upload flow, search/share retrieval, auth/profile pages, and any modified API route before opening a PR. If a change affects database or storage behavior, include the manual verification steps in the PR description.

## Commit & Pull Request Guidelines
Recent commits use short imperative subjects such as `fix build error`, `add privacy policy page`, and `update packages`. Follow that style, keep each commit focused, and call out schema or environment changes directly in the subject or body. PRs should include a concise summary, linked issue or context, screenshots for UI work, and notes about migrations, new environment variables, or breaking API changes.

## Security & Configuration Tips
Do not commit `.env` or hard-code secrets. Review auth, S3, and share-related handlers under `app/api/**` carefully because they directly affect access control and file delivery. When changing DB schema, commit the matching Drizzle artifacts in `drizzle/` together with the code change.
