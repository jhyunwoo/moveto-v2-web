# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Summary

Moveto V2 is a web-based file-sharing service for quick file transfers without requiring login (though auth is available). Users upload files, get a human-friendly access code (e.g., "fast-blue-cat"), and share it with recipients.

## Commands

- **Dev server:** `pnpm dev` (uses Turbopack)
- **Build:** `pnpm build` (runs drizzle-kit generate + migrate, then next build)
- **Lint:** `pnpm lint` (ESLint with `--max-warnings=0`)
- **Typecheck:** `pnpm typecheck`
- **Format:** `pnpm format` (Prettier)
- **DB generate migrations:** `pnpm db:generate`
- **DB apply migrations:** `pnpm db:migrate`
- **DB push schema (dev):** `pnpm db:push`
- **DB studio:** `pnpm db:studio`

No automated test runner is configured yet. The minimum gate is `pnpm lint` plus manual smoke testing.

## Architecture

**Stack:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4 + PostgreSQL (Drizzle ORM) + Cloudflare R2 storage + Better Auth

### Key directories

- `app/` — Pages, layouts, and API route handlers (`app/api/`)
- `app/components/` — Shared UI components; upload flow in `app/components/file-upload/`
- `lib/hooks/` — Custom React hooks (`useFileUpload`, `useDragAndDropFile`, etc.)
- `lib/stores/` — Zustand stores (files, code, share-time, upload-progress, etc.)
- `lib/server/` — Server-only utilities (S3 client, storage calculations)
- `lib/worker/` — Web Worker for file uploads (Uppy + S3/R2)
- `db/` — Drizzle connection (`index.ts`) and schema (`schema.ts`)
- `drizzle/` — Generated migrations and snapshots

### Core flow

1. User selects files → `POST /api/share` creates a share record
2. Web Worker (`lib/worker/file-upload-worker.ts`) uploads files to R2 via presigned URLs / multipart upload (`/api/s3/*`)
3. After upload → `PUT /api/share/[shareId]/code` generates a human-friendly code from `adjectives` + `nouns` DB tables
4. Recipient enters code → `GET /api/share/code/[code]` retrieves the share

### Authentication

Better Auth with Passkeys and GitHub OAuth. Server-side: `getSession()` from `@/auth`. Client-side: `useSession()` from `lib/auth-client.ts`. Users have a `plan` field (default: Free).

### State management

Zustand for client state (`lib/stores/`), SWR for server data fetching/caching.

## Code Style

- Strict TypeScript, path alias `@/*` maps to project root
- Prettier: 2-space indent, single quotes, no semicolons, trailing commas (es5), 120-char width
- Tailwind class order auto-sorted by `prettier-plugin-tailwindcss`
- PascalCase component names, `useX` hook names, kebab-case filenames
- File upload logic must go through the Web Worker to keep UI responsive
- Use `'use client'` only when necessary
- All styling via Tailwind CSS — no CSS-in-JS
- Animations use `motion` package (Framer Motion)

## Database

- Schema in `db/schema.ts`, Drizzle ORM for all queries
- `AUTH_DRIZZLE_URL` env var for connection — verify it points to the right DB before running `pnpm build`
- Share codes combine words from `nouns` and `adjectives` tables (must be populated)
- When changing schema, commit matching Drizzle artifacts in `drizzle/` together with the code change

## Environment Variables

Required in `.env`: `AUTH_DRIZZLE_URL`, `R2_ENDPOINT`, `R2_ACCESS_KEY`, `R2_SECRET_KEY`, `R2_BUCKET`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`, `NEXT_PUBLIC_SITE_URL`
