# Nimbup

AI-powered microlearning and onboarding. Drop in a document, get short lessons.

Domain: **nimbup.com**

## Develop

```bash
npm install
cp .env.example .env.local   # add ANTHROPIC_API_KEY
npm run dev
```

## Deploy to Cloudflare Workers

Built with Next.js 15 and [OpenNext for Cloudflare](https://opennext.js.org/cloudflare).
Config lives in `wrangler.jsonc` and `open-next.config.ts`.

```bash
npm run preview                          # build and run locally in the Workers runtime
npx wrangler secret put ANTHROPIC_API_KEY  # once per Worker
npm run deploy                           # build and deploy
```

`npm run build` runs the OpenNext build, which in turn runs the plain Next.js
build (`npm run build:next`) and writes the Worker to `.open-next/`. That means
Cloudflare's default Workers Builds settings work as they are:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`

Local development still uses `npm run dev` with `.env.local`. Set
`ANTHROPIC_API_KEY` in the Worker's settings (or with the secret command
above) so the upload can reach Claude.

## Brand

Logo files live in `public/brand/`. The mark is an "n" arch (a soft cloud lobe)
beside a rising arrow: lightness plus growth.

| File | Use |
| --- | --- |
| `nimbup-logo.svg` | Primary logo on white or light backgrounds (decks, docs, email) |
| `nimbup-logo-on-dark.svg` | Primary logo on dark backgrounds |
| `nimbup-icon.svg` | Icon only on light backgrounds (avatars, small UI) |
| `nimbup-icon-on-dark.svg` | Icon only on dark backgrounds |
| `app/icon.svg` | Favicon: icon on a navy tile, served automatically by Next.js |
| `components/logo.tsx` | In-app header logo (dark theme), renders with the Geist font |

Colors: navy `#0B2545`, teal `#14B8A6`, sky `#38BDF8`, teal on dark `#2DD4BF`,
ice `#F1F5FF`.

The wordmark in the SVG files is live text (Geist, falling back to Inter or
Arial). Before print or partner use, outline the text in a design tool so it
renders identically everywhere. Give the logo clear space of at least half the
icon's height, and keep it above 20 px tall.
