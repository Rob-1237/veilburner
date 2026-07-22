# Veilburner — Unofficial Fan Site

An unofficial fan site for the avant-garde metal duo **Veilburner**. Built as a
fast, static, atmosphere-first showcase of the band's discography, press, and
media, refreshed ahead of the October 2026 album *All That Glimmers Is Gloam*.

> Unofficial fan site. Not affiliated with Veilburner or Transcending Obscurity Records.

## Tech stack

- **[Astro](https://astro.build)** — static site generation, view transitions
- **SCSS** — styling, with design tokens exposed as CSS custom properties
- **Self-hosted fonts** — Oswald, Inter, Cormorant Garamond, IBM Plex Mono (WOFF2, latin-subset)

## Getting started

```sh
npm install      # install dependencies
npm run dev      # local dev server at http://localhost:4321
npm run build    # production build to ./dist/
npm run preview  # preview the production build locally
```

## Project structure

```text
public/            Static assets (images, fonts, favicons, videos, SVGs)
src/
├── components/    Reusable UI (Hero, Discography, Footer, …)
├── data/          Content as data (albums, reviews, interviews, media)
├── layouts/       Base Layout (head/meta, nav, view transitions)
├── pages/         Routes — index, listen, listen/[slug], archive
└── styles/
    ├── _tokens.scss   Variables-only partial (imported by components)
    ├── global.scss    Global CSS: :root tokens, reset, type scale, utilities
    └── fonts.css      @font-face declarations
```

## Design tokens

Colors, the type scale, and spacing are defined once as CSS custom properties in
`src/styles/global.scss` (`:root`) and aliased for SCSS in `src/styles/_tokens.scss`.
Change a value in `:root` and it propagates site-wide — components should reference
tokens (`var(--color-rust)`, `$color-rust`) rather than raw hex.

## Deployment

Production site: **https://veilburner.band**
