This is the unofficial fansite for the band Veilburner. They are coming out with a new album this October (titled "All That Glimmers Is Gloam"). Here are the updates I am considering making to the site in advance of that release:

- They have released a single on Bandcamp, so we can actually update the Discography page with the new embed and album cover. 

- I think it would be best for the updated design if we created a separate about page, since its currently built into the Home page (index.astro). I feel like the band has grown. 

- This would be a good opportunity to revisit all of the icon, sigil, and seal SVGs in /public to see if they can be updated to be more "occultish" as well as more consistent & performant. I am skilled in Figma, in case that is the direction we lean.

- The footer could possibly use a design update, and I am eager to hear any suggestions you have regarding a new footer layout (or navigation, for that matter).

- For your first task, read the project files and report your intitial thoughts or concerns before we lay out the build roadmap for the updates. My intention is to use Opus for the entire process, and I am excited to hear any ideas you have for making this site more modern, more creepy, or better in design structurally or aesthetically. Please write your results to this file (UPDATE_PLAN.md) for my convenience, starting on line 15.

=====

# Initial Assessment — Claude (Opus 4.8)

Read through the full site: `Layout.astro`, all four page types, every component, `global.scss`, the data files, and every SVG in `/public/images`. Below are my honest first impressions, concerns, and ideas — organized by your four bullets first, then cross-cutting observations. **This is assessment, not the roadmap yet** — I've flagged open decisions I'd want your call on before we scope the build.

## Overall impression

This is a genuinely well-built little site with a strong, committed aesthetic. The notched-corner clip-path motif, the muted blood/rust/bone palette, the self-hosted fonts, the view-transition slide, the deck-shuffle hero on mobile, and the hover-reveal sigils in the footer all show real craft and a coherent point of view. It doesn't read as a template. The bones are good, so most of what follows is refinement and consolidation rather than rescue.

The main structural tension: a lot of visual cleverness is implemented as one-off CSS/JS per component, and the design tokens (colors especially) are defined once in SCSS but then hardcoded as raw hex all over the place. Before we add an About page and a 4th nav item, it's worth tightening the system so the new pieces inherit consistency for free.

---

## 1. Discography / new single — *easy, with one design decision*

Adding the record is trivial mechanically: `albums.js` is clean and prepending one object (slug, title, year, cover, `bandcampId`, link, description, credits, tracks) is all the grid + `[slug]` page need. Drop the cover into `/public/images` and it renders.

The real question is **how a not-yet-released album should behave**, because `[slug].astro` currently assumes a finished record — it renders "About This Album," full credits, a complete tracklist, and a standard Bandcamp album embed. For *All That Glimmers Is Gloam* (out October, single only for now) I'd suggest:

- A **"pre-release / upcoming" state** on the data model (e.g. `status: 'upcoming'` + `releaseDate`) that the template reads, so the page can show a single/pre-order treatment instead of a full album layout, and the card can carry a subtle "OCT 2026" or "NEW" marker.
- **`Contact.astro` hardcodes the "latest release"** as the 2025 album (art + title + label link, lines 14–19). That block needs to point at the new record — or better, derive "latest" from `albums[0]` so it never goes stale again.
- Confirm the **Bandcamp embed type** for a single (track embed vs. album embed use different URLs/IDs).

Low effort, but let's decide the upcoming-vs-released presentation up front.

## 2. Separate About page — *the biggest structural item*

The About content is currently baked into `index.astro` (the `.about` section, lines 10–47: bio + Formed/Location/Genre/Label detail grid). Extracting it to `/about` is clean Astro work. Two decisions drive everything else:

- **What does Home become?** Pure landing (hero → latest-release teaser → footer), or does it keep a short "about" teaser that links onward? I lean toward Home = hero + latest release + a one-line hook into About, letting About breathe as its own page (expanded bio, member breakdown, timeline, discography-at-a-glance, press pull-quotes).
- **Navigation model.** The nav is currently **three** icon-dots (Home / Listen / Archive). A 4th destination means either a 4th dot — which requires new icon SVGs in 3 states each — or rethinking nav entirely (see §4). This is why the About page, the SVG work, and the nav redesign are really one coupled decision, not three independent ones.

## 3. Icon / sigil / seal SVG audit — *the meatiest technical win*

I inspected every SVG. There's real cleanup value here, and since you're comfortable in Figma this is squarely in your wheelhouse:

- **`Saturn.svg` (86 KB) is not vector at all** — it's a base64-encoded PNG wrapped in an `<svg>` (`<image xlink:href="data:image/png;base64,…">`). It won't scale crisply, it's the single heaviest asset, and the footer's animated gradient-mask trick only works on it by accident (via the PNG's alpha). **This is the highest-value redraw:** rebuild as a true single-path vector.
- **`The_Seal_of_Belial.svg` (96 KB)** and **`Lilith.svg` (44 KB)** are real vector but are raw Illustrator exports — bloated with `<style>` cruft, editor metadata, XML comments, and excessive coordinate precision. Running them through SVGO alone would cut them dramatically; redrawing on a normalized grid would do more.
- **The three nav glyphs are byte-identical across states** — `icon-home-static/hover/active.svg` are the same 3277-byte file three times (same for archive; listen has its set). The color change is baked per-file. This should be **one SVG per glyph, recolored via CSS** (`currentColor` or a filter/mask), eliminating ~2/3 of these files and making restyling a one-line change instead of re-exporting art.
- **Inconsistent coordinate systems** — viewBoxes are all over the map (612×792, 512×512, 525×439, 185×264, 96×78…) from three different editors (Illustrator, Inkscape, Figma). Normalizing the whole set to one grid (I'd suggest a square `0 0 100 100` or `0 0 24 24`) makes sizing, alignment, and the mask effects predictable.

**Recommendation:** treat the four sigils (Lilith, Saturn, Belial, Shakuzu) and the nav glyphs as one icon system — redraw/normalize in Figma on a shared grid, single-color, minimal nodes, then pass everything through SVGO. Cleaner, more consistent, more "occult," and a real payload reduction (we're talking ~230 KB of SVG today, much of it strippable). If we add an About glyph, it's born into the same system.

## 4. Footer & navigation redesign — *worth doing, some gimmick to weigh*

- **Nav inconsistency:** inner pages (Listen/Archive) show a fixed VB logo top-left *and* the three dots top-right; Home shows only the dots (the logo lives in the hero). It reads as two different nav systems. I'd unify: one persistent identity mark + one nav cluster, same on every page.
- **Footer** is genuinely cool but heavy — stacked hover-reveal sigils with per-icon animated gradient masks, plus a large duplicated block of unused occult-glitch/reveal CSS living in `Contact.astro` (~500 lines of dead styles that no markup uses). The hover-reveal is also **not keyboard-accessible** and invisible on touch. I'd keep the aesthetic but (a) simplify to a maintainable pattern, (b) delete the dead CSS, (c) give the layout a clearer structure (identity + nav + social + legal), and (d) make the interactions degrade gracefully.
- Copyright still reads **© 2025 Garfish Digital** — bump when we touch it.

For a fresh layout I can mock 2–3 footer/nav directions once we've settled the About/nav-count question.

---

## Cross-cutting observations (cheap wins & things I noticed)

- **Color tokens aren't enforced.** `global.scss` defines `$color-rust` etc., but components hardcode `#5a3a2a`, `#8b7355`, `#666` directly (and `!important` in places). Promoting these to CSS custom properties and using them everywhere would make a palette tweak — or a per-page accent — a one-line change. Foundational for consistency as we add pages.
- **Dead code:** the large occult-glitch / signal-corruption / channel-tear block in `Contact.astro` isn't referenced by that component's markup. Safe to remove or extract if it's meant for reuse.
- **Small bug:** `Hero.astro` tagline sets `font-family: 'Cormorant Garamond', sans-serif` — that's a serif face with a sans fallback; likely should be `serif`.
- **SEO leftovers:** `astro.config.mjs` sets `site` but there's no sitemap — `@astrojs/sitemap` is a ~2-minute add and good for a release push. OG/meta tags in `Layout` look solid already.
- **Repo hygiene:** `README.md` is still the stock Astro starter boilerplate; committed `.DS_Store` files in `src/` and `public/` should be gitignored.
- **Accessibility:** hover-only reveals (footer sigils, album-nav titles) have no keyboard/touch equivalent; nav is icon-only (sr-only labels help, but visible affordance is thin).
- **Confirm fonts:** `Cormorant Garamond` and `IBM Plex Mono` are referenced but only Oswald/Inter are preloaded — worth verifying they're actually self-hosted in `/fonts` and declared in `fonts.css`.

## Ideas for "more modern / creepier / better"

- **Site-wide grain + vignette.** The hero already has a scanline overlay — extend a *very* subtle film-grain and vignette across all pages for cohesion and dread (cheap, high impact).
- **Reactive sigil.** A sigil (on About or Home) that subtly tracks/warps toward the cursor — leans on the occult theme without gimmickry.
- **CRT / signal texture, tastefully.** You already built glitch machinery; a restrained, occasional flicker on a single focal element beats constant motion.
- **Type hierarchy pass.** Lean harder into the Oswald/Cormorant/Plex-Mono trio with a documented scale, so headings feel intentional rather than per-component.
- **Motion-reduce respect.** Gate the heavier animations behind `prefers-reduced-motion` — good practice and it makes the deliberate creepy touches feel more premium.

---

## Suggested decisions before we build the roadmap

1. **Home vs. About split** — does Home keep an about teaser, or go pure landing? What lives on About?
2. **Nav model** — 4th icon-dot, or a rethought nav? (This gates the SVG work.)
3. **SVG scope** — full redraw of the four sigils + nav glyphs on a shared grid (you in Figma, me on integration/SVGO), or optimize-in-place only?
4. **Upcoming-album treatment** — dedicated pre-release layout for *Gloam*, or a lightweight "NEW/upcoming" flag on the existing template?
5. **Footer** — evolve the current hover-reveal concept, or want me to mock fresh directions?

Answer those five and I'll turn this into a phased build plan. Excited to work on this one.

=====

## Answers to Initial Assessment questions

1. We will want space on the new Home page. I have several great new images that can be arranged vertically for a scroll down to an advertisement for the new record at the bottom (replacing the current album cover and information in Contact.astro). We will want the separate About page to have several images of the band from throughout the years, and perhaps they should also be arranged vertically (alternating left and right), but with small blurbs that tell of the band or just make mystical statements (expanded bio, member breakdown, maybe a couple of press pull-quotes). The About page should be strictly information and images, plus maybe a CTA (more below about a possible CTA).
2. My thought on the new nav link was to have another variant of the symbol icon svg for the About page (for a 4th dot), then place it 2nd from the left in the lineup. If we decide to rework the nav, then maybe it will be designed differently. I am open to some iteration on this (and their relationship to the SVGs elsewhere) in order to achieve a great design.
3. My Figma skills are much better than they were when I first made the ones currently in the project (I can now completely rebuild the PNGs as SVGs). I also was thinking I could make a shared grid in Figma that contained *all* of the SVGs, which would improve load/performance and perhaps size consistency. I would need guidance on the approach, if this is what we decide to do.
4. The "Contact" (poor naming, we should perhaps change or integrate fully into index.astro) area of the Home page will have copy to inform the user of the  "Upcoming" album, along with a CTA to either Bandcamp so they can listen directly or Veilburner's label Transcending Obscurity so the user can get more information. I am unsure of what would be the best destination for clicking the CTA--buying merch, listening, or straying on the site.
5. I am not attached to the current hover reveals in the footer icons, although it really isn't bad on desktop or mobile. It's a little weird, but the band itself is weird, so it sort of fits. Anyway, I am definitely open to new designs in this area that will improve UI/UX or the overall vibe, and we definitely want consistency. Let's hear your fresh directions so I can sleep on it for a night. And yes, we will certainly want to update that copyright date.

## Additional

- I am in support of tightening the system before we add an About page and a 4th nav item, so the new pieces inherit consistency.
- I recall that the last time Veilburner released an album I was able to embed what was available from Bandcamp at the time (which was 2 tracks) and when the rest of the tracks were released the embed updated automatically. Even if it does require a different link when the album is released, thats fine because I will need to manually update the "Contact" copy as well. If this is how it goes, we can add notes to the TODO.md file that instruct me what to do when the full album is released on October 16, 2026.
- We will certainly want to enforce color tokens. I also want to evaluate the amount of $color-blood and $color-blood-solid used throughout, as we may want to lean more rust/bone to better capture the spirit of the new album. I am specifically thinking about the album cover border colors on the Discography page.
- All dead code should be removed, and I have no objection to simplifying things for consistency (such as perhaps integrating Hero.astro and Contact.astro into index.astro).
- All fallback issues and other bugs should be addressed as we go through the build.
- We will certainly want to revisit all meta tags and SEO-related issues to ensure modern adjustments have been made.
- We will want to update the .gitignore to industry standard, as this site will be visible to clients on our GitHub.
- We can discuss accessibility updates (such as keyboard navigation and `prefers-reduced-motion`) so that we are not hurting our SEO or alienating accessibility users.
- The `Cormorant Garamond` font is certainly used, as is `IBM Plex Mono`, `Inter`, and `Oswald`. Do you think this is too many? If any of the 4 can go, it would be `IBM Plex Mono`, but the fonts actually look alright together. I am open to suggestion as well as suggestion for preload optimization & efficiency. Also, I need guidance on where my type hierarchy fails, as it is not readily apparent to my eye on the UI.
- We won't want a reactive sigil cursor that tracks toward the cursor.
- We can extend a *very* subtle film-grain and vignette onto the About page, but I am not sure how that will translate on the 2 pages with the embeds. We should think about this and consider the pros and cons.
- I like the idea of a tasteful glitch. Would it only be on the About page, or would it be on the Home page as well? Perhaps it affects every other image on those 2 pages, or something of a random nature. I am unsure if it would look right on the Discography and Archive pages because of the embeds (we don't want to obfuscate the information). Let me know your ideas.

=====

# Reply — Resolving the Design Direction (Claude, Opus 4.8)

Great answers. These give me enough to lock most decisions and hand you concrete guidance on the pieces you flagged (Figma pipeline, CTA target, fonts/type, grain/glitch on embeds, footer/nav concepts). I'll close with a proposed phased roadmap. Read the footer/nav concepts before you sleep on it — that's the part I most want your gut reaction to.

## Home & About structure — confirmed, with specifics

**Home** becomes a single vertical narrative in `index.astro`: hero → a sequence of your new images (full-bleed or offset, with breathing room) → and at the bottom, the release feature (the artifact formerly known as `Contact.astro`) advertising *All That Glimmers Is Gloam* with the CTA. I'd fold `Hero.astro` and `Contact.astro` into `index.astro` as local sections (or keep them as components but strip them to home-only concerns). "Contact" is the wrong name — I'd call it the **Release Feature** / `<ReleaseFeature>` (or inline it). No contact info actually lives there.

**About** is its own page: alternating left/right image+blurb rows (a classic "zig-zag" editorial rhythm), where blurbs carry expanded bio, a member breakdown (Mephisto Deleterio / Chrisom Infernium), and 1–2 press pull-quotes, interleaved with short mystical one-liners for texture. Strictly images + words + one CTA at the end. This layout also reuses beautifully for the Home image scroll — same component, different content — so we build it once.

One note: alternating left/right rows need a deliberate **mobile collapse** (everything stacks to a single column, image-then-text, consistent order) or it reads randomly on phones. I'll design the row component with that baked in.

## Navigation — 4th dot now, but let's audition a real redesign

Your instinct (a 4th glyph, About placed 2nd from left → **Home · About · Listen · Archive**) is sound and matches how people expect band sites to read. I'll build to that ordering regardless of visual treatment. But since you're open to iteration and we're rebuilding the icon set anyway, I've sketched two nav directions below — I genuinely think the vertical "sigil spine" could elevate the whole site. Either way, the non-negotiables are: **real text labels for a11y/SEO** (currently the nav is icon-only with sr-only text — visible-on-focus labels fix both), a keyboard focus state, and one persistent identity mark on *every* page (right now Home hides the top-left VB mark that inner pages show — that inconsistency goes).

## SVG rebuild — the Figma shared-grid approach (your direct ask)

Yes to rebuilding everything in one master Figma file on a shared grid. Here's the pipeline I'd want:

**1. Two grid tiers, same proportions.**
- **Nav glyphs** → `24×24` artboards (simple, small, must read at ~28px).
- **Sigils/seals** (Lilith, Saturn, Belial, Shakuzu) → `100×100` artboards (detailed).
- Both use the **same padding ratio** — e.g. keep art inside ~90% of the box with a consistent keyline (a bounding square + circle + portrait/landscape rectangles, exactly like the Material/iOS icon keyline system). This is what makes a burst, a spiral, and a seal feel *optically* the same size even though their bounding shapes differ.

**2. Draw for CSS recoloring.**
- **Monochrome only** — pure `#FFFFFF` (or currentColor) fills on transparent. No baked colors, no gradients (the animated gradient masks live in CSS and will keep working — better, once the shapes are clean).
- **Prefer a single compound/filled path per icon.** If you use strokes, **outline/expand them before export** (Figma: Outline Stroke) so scaling stays uniform and stroke width can't drift.
- No text nodes; convert any text to outlines.

**3. Export settings (Figma).** SVG · "Include 'id' attribute" **off** · "Outline text" on · "Simplify strokes" on. This kills most of the Illustrator/Inkscape cruft at the source.

**4. Optimize.** Run every export through **SVGO** (I'll add a config to the repo). Target: nav glyphs ~1–2 KB, sigils well under 10 KB each. Saturn goes from an 86 KB PNG-in-SVG to a true ~5 KB vector.

**5. Delivery — inline, not `<img>`.** Instead of three files per glyph (static/hover/active), we ship **one** SVG per icon and I build a tiny Astro `<Icon>` component that inlines the SVG so it inherits `currentColor` and CSS transitions. States (static/hover/active) become CSS, not separate assets. This is the single biggest maintainability + performance win in the whole project.

I do **not** recommend a sprite sheet here — Astro inlining gives us `currentColor` + per-state CSS + zero extra requests, which beats a sprite for this size of set.

I'll give you a labeled export checklist in the repo when we start Phase 1 so your Figma output drops in clean.

## The Release Feature CTA — where should it point?

My recommendation: **primary CTA → Bandcamp** (pre-order / "Listen"), with a **secondary text link → Transcending Obscurity** for physical/merch. Reasoning:

- Bandcamp is the **one place that does both** — fans can stream the single *and* pre-order in a single click, pre-orders bank toward release-day momentum, and the band keeps the largest cut. It's the highest-intent, lowest-friction fan action.
- The label is the right home for **physical media and merch**, but that's a secondary desire — offer it, don't lead with it.
- **One primary button.** Two co-equal CTAs create decision paralysis and halve clicks. Lead with Bandcamp; let the label be a quiet "Physical editions & merch via Transcending Obscurity" line beneath.
- "Stay on the site" isn't a CTA I'd spend the button on — the whole page already invites that. The release moment should push *outward* to the action that helps the band.

So: **`[ PRE-ORDER / LISTEN ON BANDCAMP ]`** big, **"Physical & merch → Transcending Obscurity"** small.

## Fonts & type hierarchy (your direct ask)

**Four is fine — you're not overloaded, you're under-organized.** Each face has a legitimate role; the problem is the roles aren't assigned consistently, so the hierarchy reads as noise. Keep all four, but pin each to a job and never cross the lines:

| Face | Role | Used for |
|---|---|---|
| **Oswald** | Display | Page titles, section headers, nav labels, buttons (UPPERCASE, tracked) |
| **Cormorant Garamond** | Editorial serif | Album titles, pull-quotes, mystical one-liners — the "elegant dread" voice |
| **Inter** | UI / body | Body copy, captions, metadata labels |
| **IBM Plex Mono** | Technical | Credits, tracklists, "data" blocks — the occult-terminal texture |

IBM Plex Mono is the one you'd cut, but it's doing real thematic work in the credits/description blocks — I'd **keep it** now that it has a defined lane.

**Where your hierarchy currently fails (this is why it's not readable to your eye):** the *same heading level uses different fonts on different pages.* Discography's title is Oswald; Archive's section titles are Inter 300; album detail titles are Cormorant; album section titles are Oswald again — all at similar sizes and a **light 300 weight** that's too thin for a metal display face. Level isn't tied to a consistent treatment, so nothing announces itself as "the most important thing here." The fix is a **documented type scale** — display / h1 / h2 / h3 / body / mono / caption — each mapping to one font + size + weight + letter-spacing + transform, expressed as tokens. Once level = fixed treatment, hierarchy becomes visible for free. I'd also bump display/h1 weights up (Oswald 500–700) so headings actually feel heavy.

**Preload optimization:** you're currently preloading Oswald 400/700 + Inter 400 — but the home *tagline* is Cormorant, and headings want Oswald 600/700, so the preload list doesn't match what's actually above the fold. I'd (1) preload only the 2–3 faces that render in the first viewport of the landing, (2) set `font-display: swap` on all, (3) confirm everything is latin-subset `woff2`, and (4) consider the **variable** versions of Oswald and Inter to collapse multiple weight files into one each. Net: fewer, better-targeted preloads.

## Color tokens & the rust/bone rebalance

Agreed on enforcing tokens (CSS custom properties, so a palette shift is one line). On leaning **rust/bone over blood** for *Gloam*: I'm in favor and I think you're right that it better fits "glimmers / gloam" (ashen, tarnished-gold, dusk) than arterial red. Concretely:

- The **Discography album-card borders** are currently `$color-blood` (semi-transparent dark red) — I'd move these to **rust** (`#5a3a2a`) or **bone** (`#8b7355`), which will make the covers read as tarnished/gilded rather than bleeding. Quick to prototype both once tokenized.
- I'd keep a *little* blood as a rare accent (hover glow, a single focal element) rather than a structural default. Blood-solid `#8B0000` currently borders nearly every card/image site-wide — that's what makes the palette feel one-note. Demoting it to accent and promoting rust/bone to structure is the single highest-impact color change.
- Because everything will be tokenized, we can build a **per-album accent** hook later (each record tints its own detail page) essentially for free.

## Atmosphere: grain, vignette, and glitch on embed pages (your direct asks)

**Grain + vignette vs. the embeds — here's the pro/con and my call:**
- A vignette is just darkened *edges* — it never reaches centered content, so it's **safe on every page**, embeds included. Ship it site-wide.
- Animated film grain is a full-viewport overlay. The hazard isn't interaction (a `pointer-events: none` layer won't block clicks) — it's **visual**: grain crawling over *playing video* (YouTube/Bandcamp) looks like compression artifacts and cheapens the embed, plus animated grain repaints constantly (minor perf/battery cost).
- **My recommendation:** vignette everywhere; **animated grain on Home + About + Discography** (Discography is just static covers — grain looks great there); on **Archive and album-detail pages, drop grain to static-or-none** and let the embeds sit in a clean container that renders *above* the grain layer. Never stack a grain layer directly over an iframe. This keeps information legible where it matters and atmosphere rich where it doesn't.

**Glitch — where and how:**
- **Home + About only.** Not Discography (covers must stay legible/clean) and not Archive (never obscure embeds).
- **Random, not patterned.** "Every other image" is too mechanical — it'll read as a bug. Better: each eligible image has a **low probability per interval** of a brief (~400ms) glitch, so the page feels *haunted and alive* rather than on a timer. Reuse the CMYK channel-tear machinery you already built (it's good) — just throttle and randomize it.
- **Never over text the user is reading**, and a great trigger on About is "glitch once as the image scrolls into view," then rest.
- All of it gated behind `prefers-reduced-motion` — which also protects the "premium" feel for people who'd otherwise find it gimmicky.

## Fresh footer & nav directions (sleep on these)

Here are two nav concepts and two-plus footer concepts. All assume the new unified icon set, real text labels, keyboard focus states, and updated copyright.

**NAV — Concept A: "Refined Rail" (evolution of today)**
The four glyph-dots stay top-right, but as one cohesive sigil set, with a label that fades in on hover/focus. Persistent VB mark top-left on *all* pages. Low risk, unifies what's there.
```
                                          ⬡  ✦  ✷  ⟁
                                        HOME ABOUT LISTEN ARCHIVE   ← label on hover/focus
```

**NAV — Concept B: "Sigil Spine" (my favorite)**
A thin vertical rail pinned to one screen edge; the four glyphs stacked and connected by a hairline "spine," labels sliding out on hover/focus. More ritualistic, more distinctive, more *Veilburner*.
```
 ┃ ⬡ ── HOME
 ┃ ✦ ── ABOUT
 ┃ ✷ ── LISTEN
 ┃ ⟁ ── ARCHIVE
```
B is riskier but it's the one that would make the navigation itself feel like part of the artwork. I'd prototype both.

**FOOTER — Concept 1: "Colophon" (my recommendation)**
Structured three-column: identity/disclaimer/copyright · a mirror of the nav as text links · social sigils in a clean row. Social hover becomes a **subtle recolor + glow** (rust → bone) instead of the swap-reveal — calmer, keyboard/touch-friendly, still on-brand.
```
┌──────────────────────────────────────────────────────────────┐
│  ⬡ VEILBURNER            NAVIGATE          ELSEWHERE          │
│  Unofficial fan site.    Home  About       ◈  ◈  ◈  ◈         │
│  Not affiliated…         Listen  Archive   (sigil social row) │
│  © 2026 Garfish Digital                                       │
└──────────────────────────────────────────────────────────────┘
```

**FOOTER — Concept 2: "Ritual Seal"**
Centered and dramatic: one large seal watermark faint behind, a centered social row, disclaimer + copyright beneath. Less info-dense, more atmosphere. Good if we want the footer to feel like a closing sigil rather than a utility bar.

**FOOTER — Concept 3: "Tamed Reveal"**
Keep your hover-reveal concept (you're right that it fits the band's weirdness) but make it accessible: reveal on **focus** as well as hover, show the revealed state statically on touch, and soften to a crossfade+glow. Lowest-change option if you decide the current gimmick is worth preserving.

I lean **Nav B + Footer 1**, but Nav A + Footer 3 is the "honor what's there" path. Sleep on it.

## Loose ends I'm taking as settled

Dead code removed · `Hero`/`Contact` folded into `index.astro` · fallback/serif bug and friends fixed as we go · meta/SEO revisited + sitemap added · `.gitignore` brought to industry standard (and `.DS_Store` purged, `README` de-boilerplated) · accessibility (keyboard nav, `prefers-reduced-motion`) treated as SEO-and-audience protection, not an afterthought · **no** cursor-reactive sigil · Bandcamp embed auto-updates from single → full album, so I'll add **TODO.md notes for the October 16, 2026 manual steps** (swap/confirm embed, rewrite Release Feature copy from "upcoming" to "out now," flip the album's `status`).

---

## Proposed phased roadmap

Ordered so I can start immediately on foundation while you work the Figma icon set in parallel (Phase 1 is the dependency gate for nav/footer).

- **Phase 0 — Foundation (I start now, no visual redesign yet):** tokenize colors → CSS custom properties, apply the rust/bone rebalance, define + implement the type scale, strip dead code, fix known bugs, fix `.gitignore`/`.DS_Store`/README. Sets the table so every later phase inherits consistency.
- **Phase 1 — Icon system (you in Figma → me integrating):** shared-grid redraw incl. the new About glyph → SVGO → inline `<Icon>` component; retire the duplicate state files. *Gate for Phases 2.*
- **Phase 2 — Nav + Footer redesign:** build the chosen directions, unified across all pages, accessible.
- **Phase 3 — Home rebuild + new single:** integrate Hero/Contact, build the reusable image-row component, the Release Feature + Bandcamp CTA, add *Gloam* to `albums.js` with an `upcoming` state, wire "latest" to derive from `albums[0]`.
- **Phase 4 — About page:** build from the same image-row component; bio, member breakdown, pull-quotes, mystical interstitials, closing CTA.
- **Phase 5 — Atmosphere + polish:** vignette site-wide, grain/glitch per the rules above, `prefers-reduced-motion`, full a11y pass, meta/SEO/sitemap, TODO notes for Oct 16, final QA.

Tell me your **Nav + Footer** picks and give a thumbs-up on the roadmap, and I'll kick off Phase 0.

=====

## Phase 0 answers:

- Nav: Let's go with Sigil Spine
- Footer: Let's go with the Colophon concept.
- The 6-Phase Roadmap: 

## Additional:

- I confirm all of your suggestions on About page structure, Font hierarchy, CTA management for Bandcamp and merch (at tometal.com/?s=veilburner), color tokens, atmoshphere, and a brief (~400ms) glitch, so the page feels *haunted and alive* rather than on a timer.

=====

# Phase 0 — Foundation — COMPLETE ✅ (Claude, Opus 4.8)

Locked decisions from above: **Nav = Sigil Spine · Footer = Colophon · merch CTA = tometal.com/?s=veilburner**. Roadmap treated as approved. Production build green (11 pages) after every change below.

**Design-token system**
- New `src/styles/_tokens.scss` — a variables-only partial (SCSS `$vars` mapped onto CSS custom properties, zero CSS output). Components `@import 'tokens'` now instead of `global.scss`.
- `src/styles/global.scss` rewritten: all palette/semantic/type/spacing tokens defined **once** in `:root`, followed by the reset, `::selection`, utilities, and the new type-scale classes. Confirmed in the built CSS that the token block is emitted **once** now (it was previously duplicated into every component's scoped stylesheet).
- All raw palette hex across `index`, `Discography`, `Footer`, `archive`, `[slug]`, `Contact`, `Hero` migrated to `var(--…)` tokens. (Only remaining literals: the token definitions themselves, and the `#5a3a2abf` SVG `fill` attributes in the footer, which can't take a CSS var reliably.)

**Rust/bone rebalance (started)**
- **Discography album-card borders** flipped from `$color-blood` → `$edge` (rust) — your specifically-requested change.
- Introduced semantic tokens: `--edge` (rust, default structural border), `--edge-strong` (bone, hover), `--accent` (blood, reserved for rare focal use). The `.btn` now uses these.
- The blood borders on the **album-detail** and **archive** cards are tokenized to `var(--color-blood)` (no visual change yet) so they're a one-line flip to `--edge` whenever you want to lean those rust too. **Open question for you:** flip those to rust as well, or keep the interior pages redder than the grid? (My lean: flip archive to rust, keep a touch of blood on album-detail as accent.)

**Type scale**
- Documented scale added to `global.scss` (`.t-display / .t-h1 / .t-h2 / .t-h3 / .t-serif / .t-body / .t-mono / .t-caption`), each pinning font+weight+size+tracking so a heading's *level* sets its look. Display/H1 use Oswald **700** (the old headings were set to a `300` weight that wasn't even loaded, so they silently rendered at 400 — that thinness was a big part of why the hierarchy read flat). Full per-page rollout happens as each page is rebuilt in later phases.

**Bugs & hygiene**
- Fixed the Hero tagline `sans-serif`-fallback-on-a-serif bug (now `$font-sub`).
- Removed ~520 lines of dead CSS/JS from `Contact.astro` (the unused `occult-glitch/reveal/stack` block + a glitch script targeting markup that isn't there) and its unused `contact` const.
- Font **preloads** retargeted to what's actually above the fold: Oswald 700, Inter 400, Cormorant 400 (was preloading Oswald 400/700 + Inter 400, missing the home tagline serif).
- `.gitignore` modernized to industry standard (env variants, editor/OS files, logs; **un-ignored `TODO.md`** so release-day notes can be tracked — say if you'd rather keep it private). No `.DS_Store` was ever tracked, so nothing to purge from git.
- `README.md` replaced the Astro boilerplate with a real project readme (stack, commands, structure, token explanation) — this repo is client-visible.

**Deferred (noted, not done):** `<ViewTransitions>` is deprecated in favor of `<ClientRouter>` — trivial swap, left for the Nav/Layout work in Phase 2 to avoid touching transition behavior mid-foundation. TODO.md release-day instructions will be written in Phase 3/5 once the *Gloam* album entry + `upcoming` state exist.

**Your one open call:** the archive/album-detail blood→rust flip question above. Everything else in Phase 0 is settled. Ready to start **Phase 1 (icon system)** whenever your Figma set is in progress — I'll drop the labeled export/SVGO checklist into the repo when you're ready.

=====


# Phase 1 — Icon System — IN PROGRESS (Claude, Opus 4.8)

**Icon assets finalized.** All 8 icons (4 nav glyphs + 4 sigils) validated, SVGO-optimized, converted to `currentColor`, lowercased, and moved into `src/icons/` so they can be inlined as components. Sigil set went ~236 KB → ~26 KB total. Saturn: 86 KB PNG-in-SVG → 1.6 KB true vector. archive.svg de-duplicated by hand (its Figma source still has 3 stacked copies of each eyelet — clean those layers if you ever re-export it).

**`<Icon>` component built** (`src/components/Icon.astro`) — reads `src/icons/<name>.svg` at build and inlines it; one file serves every state via CSS `color`. Decorative by default, `title` prop makes it a labelled `role="img"`.

**Nav rewired + old files retired.** The three live nav links now use `<Icon>` (verified inlining `fill="currentColor"` in the built HTML) with color-based hover/active states + a real keyboard focus ring (the old img-swap nav had none). Deleted the 9 duplicate `icon-*-{static,hover,active}.svg` files. Build green (11 pages).
  - *Interim:* still the top-right dot layout — the **Sigil Spine** visual redesign is Phase 2, and the **About** (4th) glyph is staged in `src/icons/about.svg`, held until the `/about` route exists so it doesn't link to a 404.

**Still open / notes:**
- `public/images/nav-glyphs/` and `public/images/sigil-icons/` are now superseded by `src/icons/` (canonical, optimized) — safe to delete whenever.
- The old bloated sigils (`public/images/Lilith.svg`, `Saturn.svg`, `Shakuzu.svg`, `The_Seal_of_Belial.svg`) are still referenced by the current footer — they get swapped for the `src/icons/` versions during the Phase 2 footer (Colophon) redesign, then deleted.
- Sequencing flag: the Sigil Spine's 4th (About) link needs a real `/about` target — worth building a minimal `/about` route early in Phase 2, or pulling the About page (Phase 4) forward.

=====

# Phase 2 — /about + Sigil Spine Nav + Colophon Footer — COMPLETE ✅ (Claude, Opus 4.8)

**Minimal `/about` route** stood up (`src/pages/about.astro`) — the bio + Formed/Location/Genre/Label block moved off Home into its own page (the full zig-zag image-row design is still Phase 4). Home is now Hero → release feature → footer. `/about` builds and the 4th nav link now has a real target.

**Sigil Spine nav** (replaces the top-right dots) — a fixed vertical rail on the right edge, four glyphs (Home · About · Listen · Archive, About 2nd) threaded by a faint hairline "spine," labels sliding out to the left on hover/focus. Uses the inline `<Icon>`; color-based static/hover/active states (gray → bone → rust), real keyboard focus rings, and `prefers-reduced-motion` on the label motion.

**Colophon footer** (full rewrite of `Footer.astro`) — 3 columns: Identity (disclaimer + © 2026) · Navigate (text links mirroring the nav) · Elsewhere (the four sigils as social links via `<Icon>`, same Bandcamp/Facebook/Instagram/Transcending-Obscurity mapping). Hover is now an accessible recolor + glow + lift (rust → bone) instead of the swap-reveal; keyboard-focusable, reduced-motion aware.

**Consistency + cleanup:**
- Factored the duplicated top-left logo into `<BrandMark>` (persistent identity mark) — used on About/Listen/Archive; removed the two duplicated `.vb-logo-gradient` blocks. Home keeps the hero logo.
- Deleted the 4 old bloated public sigils (Lilith 44 KB, Saturn 86 KB, Shakuzu 9.7 KB, Belial 96 KB = ~236 KB) — footer now uses the ~18 KB optimized `src/icons` set. `tometal-logo-web-tint.jpg` is now unreferenced too (left in place, harmless).
- Build green, 12 pages (added /about).

**Design calls I made (please eyeball in `npm run dev`):**
- Spine pinned to the **right edge, vertically centered**. Watch for overlap with right-column content at mid-width viewports (~1000–1280px) — notably the Bandcamp player on album-detail pages.
- Hairline spine opacity (0.5 rust) threading behind the glyphs — tune to taste.
- `<BrandMark>` still 175px (unchanged from before). On `/about` it now coexists with the page — check it doesn't crowd the "ABOUT" title.
- `/about` currently uses the Home background image (interim) — Phase 4 will give it its own treatment.

=====

# Phase 3 (Home + new single) & Phase 4 (About build) — IN PROGRESS (Claude, Opus 4.8)

**Asset reorg:** moved `bg-1..5.png` + `sigil-bg-1.png` into `/images/occult-bgs/` (updated the 3 Layout body-background refs). Album covers repointed to `/images/album-art/`.

**New single / Gloam:** added *All That Glimmers Is Gloam* (2026) to `albums.js` as the newest entry with `status: 'upcoming'`, `releaseDate: 2026-10-16`, and the Bandcamp album link. No numeric `bandcampId` yet, so the album-detail page renders a **pre-order block** (label + "Out October 16, 2026" + "Pre-order on Bandcamp" button) instead of a broken embed; empty artwork credit is hidden. Discography grid now shows 9 albums, newest first.

**Home:** hero background → `home-page/home-bg-top.jpg`; release feature → `home-page/home-bg-bottom.jpg` with the 2026 cover (links to Bandcamp as the primary CTA) and the exact copy: "Their upcoming release / All That Glimmers is Gloam / Out 10/16/26 on Transcending Obscurity Records" (label links to tometal).

**About (Phase 4 structure):** rebuilt `/about` as full-width top banner (`about-bg-top.jpg`) → 4 alternating L-R-L-R image+text rows (`about-body-bg-1..4`, lorem-ipsum placeholders to replace with real copy) → full-width bottom banner (`about-bg-bottom.webp`). Responsive stack on mobile.

Build green, 12 pages. **Open:** the two `vinyl-record-*.png` images are unplaced (asked user). Root-level duplicates (old `album-art-*.jpg`, `both-members-9.jpg`, `band-and-logo-2.webp`, etc.) are now unreferenced — can be cleaned up on request.

=====

The changes have been committed and pushed to the repo. Below are the standouts I am noticing on the UI at this time that need to be addressed. Please ask any necessary clarifying questions: "General:"
  - The label of the active page that appears on hover would look better if it was present on active too. It should be --color-bone (along with the changed glyph color) when active, and --color-rust when hovered. The non-active glyphs will still show their labels on hover while the active label is showing, but they will be hover colored.
  - The sigils in the footer are not operating correctly because they have no social icons (they only appear as sigils, whether static, hovered, or active). Lilith (the tometal link) should be the tometal-logo-web-tint-jpg when static. Saturn should be Instagram, Belial sould be FB, and Shakuzu should be Bandcamp. Let's field these icons from the most sensible source.
  - The spacing in the colophon footer leaves too much emptiness on the far right and far left. It looks like colophon__inner has considerable margin left and right.

  "Home page:"
  - The home-bg-top image runs past the top of the viewport. We will want it positioned so that its top edge meets the top edge of the load viewport.
  - We are going to want to remove the img on line 16 of Hero.astro, but we want to keep the hero__tagline. The logo in the img on line 16 is now built into the BG image itself, which is why the above-mentioned top alignment is crucial.
  - The content on lines 10-25 of Contact.astro (that name should probably be changed also) needs repositioned dur to the content of the new BG image. It is currently located in the lower left corner, and we will now need it repositioned to the right center. Also, we will want to swap the <a> with the album-overlay__text div so that the text sits to the link's left.

  "About page:"
  - The about-bg-top does not meet the top of the viewport because of the "ABOUT" h1. I commented it out for now and it looks better. I will sleep on it before deleting completely.
