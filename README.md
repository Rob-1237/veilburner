# Veilburner — Unofficial Fan Site

An unofficial fan site for the **avant-garde black metal** duo **Veilburner**. Built as a
fast, static, atmosphere-first showcase of the band's discography, press, and media,
refreshed ahead of the October 2026 album *All That Glimmers Is Gloam*.

> Unofficial fan site. Not affiliated with Veilburner or Transcending Obscurity Records.

## Tech stack

- **[Astro](https://astro.build)** — static site generation, view transitions
- **SCSS** — design tokens exposed as CSS custom properties
- **Self-hosted fonts** — Oswald, Inter, Cormorant Garamond, IBM Plex Mono (WOFF2, latin-subset)
- **SVGO** — icon optimization pipeline

## Getting started

```sh
npm install          # install dependencies
npm run dev          # local dev server at http://localhost:4321
npm run build        # production build to ./dist/ (also emits sitemap)
npm run preview      # preview the production build locally
npm run optimize:icons  # run SVGO over public/images/nav-glyphs (icon source)
```

## Project structure

```text
public/            Static assets
├── favicons/      Favicon set + site.webmanifest (PWA)
├── fonts/         Self-hosted WOFF2 faces
├── images/        Organized by area: home-page/ about-page/ album-art/
│                  occult-bgs/ mobile-images/ + unused-images/ (archive staging)
└── videos/        Reel/media video files
src/
├── components/    Icon, BrandMark, Hero, ReleaseFeature, ReleaseCta,
│                  Discography, Footer
├── data/          albums.js (discography), band.js (structured data),
│                  reviews / interviews / interviews-written / media
├── icons/         Monochrome currentColor SVGs, inlined via <Icon> (nav glyphs,
│                  brand icons, Lucide labels, sigils)
├── layouts/       Layout.astro — head/meta, JSON-LD, Sigil Spine nav, atmosphere
├── pages/         index · about · listen · listen/[slug] · archive
└── styles/        _tokens.scss (vars) · global.scss (:root tokens, reset,
                   type scale, reduced-motion) · fonts.css
```

## Key systems

- **Design tokens** — colors, type scale, and spacing are defined once as CSS custom
  properties in `global.scss` (`:root`) and aliased for SCSS in `_tokens.scss`. Change a
  value in `:root` and it propagates site-wide; components reference `var(--color-rust)` /
  `$color-rust`, never raw hex.
- **Icons** — `src/icons/*.svg` are monochrome `currentColor` files inlined by
  `<Icon name="…" />`, so one file serves every color/hover/active state via CSS.
- **Atmosphere** — a static SVG-noise grain (Home / About / Discography grid) plus a
  site-wide vignette; all motion respects `prefers-reduced-motion`.
- **SEO** — per-page OG/description, `MusicGroup` + `MusicAlbum` JSON-LD (`data/band.js`),
  and an auto-generated sitemap (`@astrojs/sitemap`).

## Content model

The discography (grid + `/listen/[slug]` pages) is driven entirely by `src/data/albums.js`.
An album with `status: "upcoming"` and no `bandcampId` renders a **pre-order** block; once a
numeric `bandcampId` is present, that page renders the live Bandcamp player instead.

## ✅ Release-day checklist — *All That Glimmers Is Gloam* (October 16, 2026)

When the album goes live, do the following (then `npm run build` and deploy):

1. **`src/data/albums.js`** → the `all-that-glimmers-is-gloam` entry:
   - Set **`bandcampId`** to the album's numeric embed id (Bandcamp → *Share/Embed* → the
     `album=XXXXXXXX` number). This automatically swaps the pre-order block for the live player.
   - Remove **`status: "upcoming"`**.
   - Fill **`lyrics.tracks: [ … ]`** with the final tracklist (also enriches the album's
     `MusicAlbum` structured data).
2. **`src/components/ReleaseFeature.astro`** (Home feature) → update copy:
   - "The upcoming release" → "The latest release" (or similar)
   - "Out 10/16/26 on …" → "Out now on …"
3. **`src/pages/about.astro`** → the "The Repertoire" row: "arrives October 16, 2026" →
   past tense ("released October 16, 2026").
4. *(Optional)* apply the vinyl-record slide-out treatment to the now-previous 2025 release
   using `public/images/about-page/vinyl-record-2025.png`.
5. Verify: the Gloam page shows the live Bandcamp player, and the Home CTA + album cover
   link resolve correctly.

*(OG image and sitemap update automatically — no meta changes needed.)*

## Deployment

Production site: **https://veilburner.band**
