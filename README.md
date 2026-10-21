# DuxPace.no

Marketing site for DuxPace. Next.js app with Sanity as CMS, deployed on Vercel. Supports EN and NO.

## Prerequisites

- Node.js 20+
- Access to the Sanity project (ask a teammate for the project ID and dataset)

## Install

```bash
npm install
```

## Dev

```bash
npm run dev
```

## Config

Create `.env.local` with:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=
```

## Studio

The Sanity Studio runs at `/studio` in dev. Editors use that to manage content.

## Scripts

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
npm run test        # vitest
npm run test:e2e    # playwright
npm run build       # production build
```
