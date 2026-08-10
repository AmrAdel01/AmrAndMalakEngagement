# Our Engagement — Website

A premium, one-page engagement website built with React, Vite, Tailwind CSS, and Framer Motion.

---

## Project Structure

```text
src/
├── components/
│   ├── Navbar/            Sticky nav with scroll-spy + mobile menu
│   ├── Hero/               Full-screen opening section
│   ├── QuranVerse/         Arabic verse + translation
│   ├── OurStory/           Timeline of milestones
│   ├── ChildhoodMemories/ "Him" / "Her" childhood photo section
│   ├── Gallery/            Masonry-style grid + lightbox
│   ├── Countdown/          Live countdown to the event
│   ├── EventDetails/       Minimal event summary card
│   ├── Location/           Venue card, directions, "Save the Date"
│   ├── MusicPlayer/        Floating play/pause/mute control
│   ├── Welcome/            One-time intro overlay
│   ├── Loader/             Short initial loading state
│   ├── BackToTop/          Floating scroll-to-top button
│   ├── ShareButton/        Web Share API / copy-link fallback
│   ├── Decorative/         Signature thread motif + corner ornament
│   └── common/             Reveal, SectionHeading, ImageWithFallback
├── data/
│   └── eventData.js        <- EDIT THIS FILE to customize the whole site
├── hooks/
│   ├── useCountdown.js
│   ├── useAudio.js
│   └── useScrollSpy.js
├── utils/
│   └── calendar.js          .ics "Save the Date" generator
├── App.jsx
├── main.jsx
└── index.css
```

Design language: ivory / champagne / soft gold / dusty rose, with `Cormorant Garamond` for display type, `Jost` for body text, and `Aref Ruqaa` for the Arabic verse. The recurring signature element is a thin gold "thread" motif (two lines meeting into one) used as a divider — echoing the site's theme of two stories becoming one.

---

## Getting Started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build locally
```

Deploy the contents of `dist/` to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages, S3, etc.).

---

## How to Customize Your Website

Almost everything lives in **`src/data/eventData.js`**. Open that file and edit the values — no need to touch any component.

| What you want to change | Where in `eventData.js` |
|---|---|
| Your name / her name | `couple.groom`, `couple.bride`, `couple.combinedNames` |
| Event date & time | `event.isoDateTime` (drives the countdown), `event.displayDate`, `event.dateMark` |
| Venue & location | `event.venue`, `event.location`, `event.address` |
| Google Maps link | `event.mapsUrl` — open Google Maps, find G Island, tap **Share -> Copy link**, paste it here |
| Quranic verse | `quote.arabic`, `quote.reference`, `quote.translation` |
| Your story / timeline | `story.milestones` — add, remove, or reorder items freely; each needs `year`, `title`, `text` |
| Childhood section text | `childhood.*` |
| Gallery photos | `images.gallery` — add/remove entries; each needs `src` and `alt` |
| Childhood photos | `images.groomChildhood`, `images.brideChildhood` |
| Background music | `music.src`, `music.enabled`, `music.title` |
| Intro/welcome message | `intro.message`, `intro.enabled` (set `false` to skip the intro entirely) |
| WhatsApp share text | `social.whatsappShareText` |
| Nav links | `navigation` array |

### Adding your real photos

1. Drop your image files into `public/images/` using the filenames already referenced in `eventData.js` (e.g. `photo-1.jpg`, `childhood-him.jpg`), **or** point `eventData.js` at whatever filenames you prefer.
2. That's it — no component code needs to change. Until a photo is added, that spot shows an elegant placeholder card instead of a broken image, so the site is safe to preview or deploy before every photo is ready.
3. For best results, use photos with similar aspect ratios within the gallery, and roughly 3:4 portrait crops for the childhood photos.

### Adding your music

1. Get a royalty-free instrumental track (piano/ambient, no vocals) — Pixabay Music and the YouTube Audio Library are good sources. Always check the license.
2. Save it as `public/music/background.mp3` (or update `music.src` in `eventData.js` to match your filename).
3. Browsers block unmuted autoplay until the visitor interacts with the page — tapping "Begin" on the welcome screen counts as that interaction, so music will typically start right after. If it's still blocked, the visible play button in the bottom-left always works.

### Changing colors

Colors are defined once in **`tailwind.config.js`** under `theme.extend.colors` (`ivory`, `champagne`, `gold`, `rose`, `ink`). Change the hex values there and every component updates automatically — no need to hunt through individual files.

### Changing fonts

Fonts are loaded in `index.html` (Google Fonts `<link>`) and mapped in `tailwind.config.js` under `theme.extend.fontFamily`. Swap the Google Fonts URL and the `display` / `body` / `arabic` values together.

### Changing the Google Maps behavior

By default the Location section shows a card with a "Get Directions" button that opens Google Maps in a new tab — this requires no API key. If you'd rather embed a live map, set `location.useEmbeddedMap: true` and `location.embedApiKey` in `eventData.js`, then extend `Location.jsx` with an `<iframe>` using your key (left as an easy hook, not wired by default, so nobody accidentally ships a website that leaks an API key).

---

## SEO & Social Preview

- Page title, meta description, and Open Graph/Twitter tags are set in `index.html`.
- For a proper WhatsApp preview image, add a real `public/images/og-cover.jpg` (1200x630px works best) and update `og:url` to your live domain once deployed.

---

## Accessibility & Performance Notes

- Respects `prefers-reduced-motion` (animations shorten automatically).
- All interactive controls have visible focus states and `aria-label`s.
- Images use `loading="lazy"`.
- No layout-shifting animations; motion is confined to opacity/transform.
