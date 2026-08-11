# Our Engagement - Website

A premium one-page engagement website built with React, Vite, Tailwind CSS, and Framer Motion.

## Current Sections

- Welcome intro
- Hero invitation
- Quran verse
- Countdown
- Event details
- Location and directions
- Guest messages backed by a Vercel API and Postgres database
- Footer and sharing

The story timeline, childhood memories section, and background music have been removed from the live site.

## Getting Started

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Customize

Most content lives in `src/data/eventData.js`.

| What you want to change | Where |
|---|---|
| Names | `couple.groom`, `couple.bride`, `couple.combinedNames` |
| Event date and time | `event.isoDateTime`, `event.displayDate`, `event.dateMark` |
| Venue and location | `event.venue`, `event.location`, `event.address` |
| Google Maps link | `event.mapsUrl` |
| Quran verse | `quote.arabic`, `quote.reference` |
| Welcome message | `intro.message`, `intro.enabled` |
| Guest messages copy | `messages.*` |
| WhatsApp share text | `social.whatsappShareText` |
| Navigation links | `navigation` |

## Guest Messages Database

The `Words for Us` section uses `/api/messages` to read and save messages in Postgres. The Vercel project is connected to the Neon resource `neon-violet-village`, which provides:

```text
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
```

The API creates the `guest_messages` table automatically the first time it runs.

If `DATABASE_URL` is missing, the site falls back to browser-only storage so the form still works while the database is being connected.

## Deploy

The project is connected to Vercel. Pushing to `main` triggers a production deployment.

Live URL:

```text
https://amr-and-malak-engagement.vercel.app
```
