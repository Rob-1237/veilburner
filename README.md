# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).


## Metal Band Research

Final Data Table: Social Reach vs. Superfan Conversion
Let's use a consistent estimate for the "several hundred" figures, and we'll use a conservative estimate of 500 supporters for both Carcass and Veilburner to calculate their fan conversion ratios.

Band	FB Likes (K)	IG Followers (K)	Spotify Listeners (K)	Bandcamp Supporters	Total Digital Reach (K)	Conversion Ratio (Supporters / Total Digital Reach)
Carcass	691.0	208.0	369.1	~500	1,268.1K	0.04% (Extremely Low)
Pig Destroyer	199.0	106.0	57.7	Too Many	362.7K	N/A (But clearly high)
Veilburner	2.6	2.4	2.4	~500	7.4K	6.76% (Very High)
Demiurgon	4.9	3.4	0.7	103	9.0K	1.14% (Low/Niche)

Export to Sheets
Note: Total Digital Reach is a simple sum of the three social metrics (in thousands) to represent the size of their total known online audience.

Key Recommendations Based on Conversion
The data reveals three distinct profiles and three clear service offerings:

1. Veilburner: The Super-Engaged Niche (The MVP Case Study)
Conversion Ratio: 6.76% (Very High)

The Story: Veilburner has a tiny total audience (7.4K), but a remarkable percentage of them are Superfans willing to pay on Bandcamp (~500 supporters). This indicates a community that is already being cultivated extremely well.

The Service: They don't need help building a community; they need help monetizing and scaling it.

Recommendation: Offer a Fan Retention and Upsell Strategy. Focus on creating exclusive physical goods, limited-edition bundles, and a "fan club" tier (perhaps via Bandcamp's subscription feature) to maximize the Average Order Value of their already committed fans.

2. Demiurgon: The Emerging Niche (The Growth Case)
Conversion Ratio: 1.14% (Low)

The Story: Their overall audience is small (9K), and their conversion to Bandcamp (103 supporters) is relatively low, despite being on a respected niche label. Their audience size is slightly larger than Veilburner's, but their super-fan count is much lower.

The Service: They need to convert passive fans into committed superfans.

Recommendation: Offer an Engagement & Conversion Funnel. Focus on strategies to drive their existing Facebook/Instagram followers directly to their Bandcamp store through targeted posts, Bandcamp Friday reminders, and exclusive digital-only offers (e.g., a high-quality live recording given only to Bandcamp followers).

3. Carcass: The Legacy Gap (The Brand Audit Case)
Conversion Ratio: 0.04% (Extremely Low)

The Story: Carcass has a massive, multi-platform audience (1.2 million+ fans), yet only ~500 of them have hit the "Follow" button on Bandcamp. This is a massive missed opportunity. They have a gigantic passive audience that they are not directing to their highest-profit channel.

The Service: They need a Direct-to-Fan Strategy Audit. They don't need more followers; they need a better Call-to-Action on their existing social media.

Recommendation: Offer a Platform-Link Strategy & CTA Optimization. This means ensuring every post links directly to Bandcamp (not Spotify), running a short social media campaign focused on a limited-edition physical product sold only on Bandcamp, and communicating the value of buying direct.

Conclusion: You have three distinct and actionable client profiles:

Veilburner: Deep Monetization (Premium Strategy)

Demiurgon: Conversion & Community Growth (Standard Strategy)

Carcass: Brand Link Audit (High-Value Consulting Project)

This is a fantastic foundation for your business plan!

============

PODCAST LINK:
https://www.youtube.com/watch?v=HZSJUQ6p4xY

MERCH LINK:
https://tometal.com/?s=veilburner


Archive Page

  URL Structure

  /archive

  Single page, organized by content type.

  ---
  Page Layout Strategy

  Visual Concept: "The Archive Chamber"

  Think: Occult library, documentation of ritual practices.

  ┌─────────────────────────────────────┐
  │   ARCHIVE                            │
  │   ━━━━━━━                            │
  │                                      │
  │   REVIEWS                            │
  │   ┌──────────────────────────────┐  │
  │   │ "Quote from review..."       │  │
  │   │ — Publication, Date      [+] │  │
  │   └──────────────────────────────┘  │
  │   ┌──────────────────────────────┐  │
  │   │ "Another quote..."           │  │
  │   │ — Publication, Date      [+] │  │
  │   └──────────────────────────────┘  │
  │                                      │
  │   INTERVIEWS                         │
  │   • Publication Name — Date → Link   │
  │   • Publication Name — Date → Link   │
  │                                      │
  │   MEDIA                              │
  │   ┌──────────────────────────────┐  │
  │   │                              │  │
  │   │   YouTube Podcast Embed      │  │
  │   │   (Dark theme)               │  │
  │   │                              │  │
  │   └──────────────────────────────┘  │
  │                                      │
  │   [Back to Main]                     │
  └─────────────────────────────────────┘

  ---
  Reviews Section: Expandable Quote Design

  Collapsed State:

  ┌────────────────────────────────────────┐
  │ "Short pull quote (1-2 sentences)..."  │
  │                                        │
  │ — Metal Archives, 2024             [+] │
  └────────────────────────────────────────┘

  Expanded State:

  ┌────────────────────────────────────────┐
  │ "Full review excerpt goes here. This   │
  │ can be multiple paragraphs. We want to │
  │ preserve the full context of what the  │
  │ reviewer said about the album."        │
  │                                        │
  │ Album: VLBRNR                          │
  │ Rating: 85/100                         │
  │ — Metal Archives, 2024             [−] │
  │ [Read Full Review →]                   │
  └────────────────────────────────────────┘

  Interaction:

  - Click anywhere on card → Expand
  - Click [−] or anywhere again → Collapse
  - Smooth height transition (0.4s ease)
  - Only one expanded at a time (accordion style)

  Visual Treatment:

  - Monospace font for quote ('Courier New' or similar)
  - Blockquote style with left border (rust)
  - Attribution in small caps
  - [+]/[−] indicator (bone color)
  - Angular clip-path on corners

  ---
  Data Structure for Reviews

  // src/data/reviews.js
  export const reviews = [
    {
      quote: "Short 1-2 sentence pull quote here",
      fullText: "Full review excerpt, multiple paragraphs if needed...",
      publication: "Metal Archives",
      date: "2024",
      album: "VLBRNR", // Optional
      rating: "85/100", // Optional
      link: "https://..." // Link to full review
    },
    // ... more reviews
  ];

  ___
  Interviews Section

  Simple list design:
  INTERVIEWS

  • The Metal Archives — 2024 → [Link]
  • Invisible Oranges — 2023 → [Link]
  • Decibel Magazine — 2022 → [Link]

  Visual treatment:
  - Simple text list
  - Rust-colored bullet points
  - Hover: Bone color
  - External link icon (optional)

  No expansion needed - just links out to interviews

  ---
  Media Section (YouTube Embed)

  YouTube Embed Options:

  YouTube provides iframe embeds with these parameters:

  | Parameter      | Options                      | Recommendation        |
  |----------------|------------------------------|-----------------------|
  | Theme          | dark / light                 | dark                  |
  | Controls       | 0 (hide) / 1 (show)          | 1 (show controls)     |
  | Modestbranding | 0 / 1 (minimal YT logo)      | 1                     |
  | Rel            | 0 (no related) / 1 (related) | 0 (no related videos) |
  | Autoplay       | 0 / 1                        | 0 (user initiates)    |

  Example Embed:

  <iframe 
    width="800" 
    height="450" 
    src="https://www.youtube.com/embed/HZSJUQ6p4xY?theme=dark&modestbranding=1&rel=0" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen
  >
  </iframe>

  Visual Treatment:

  - Large embed (800px wide, scales down on mobile)
  - Angular clip-path border (rust-colored)
  - Title above embed: "PODCAST: [Title from video]"
  - Monospace font for title
  

---
  Technical Questions for You:

  1. Review content: How many reviews do you want featured? (3-5 recommended)
  2. Interview links: How many? Do you have list ready or use placeholders?
  4. Expansion behavior: One expanded at a time (accordion) or multiple open allowed?
  5. YouTube title: Show video title above embed, or just "PODCAST"?

  My Answers:

  1. Reviews located so far are listed below.
  2. Interview links are listed below
  4. Expansion behavior: We will expand at a time (accordion)
  5. YouTube title: We want to show the video title above embed

  ---

  -Article Reviews:\
  *- The Void Journal: https://www.thevoidjournal.com/2024/11/14/veilburner-premiere-their-new-album-the-duality-of-decapitation-and-wisdom/?fbclid=IwY2xjawNLOiZleHRuA2FlbQIxMQABHgJYvuKgg380vNaF0ZIb-xA6IUqlt3DJMhrHJ-W35vON5ZEemKwBAj3Nfaeg_aem_Uqwvm8l81ERHCLbX_LmVDw\
  - Interviews:\
  *-Whatever Comes Next Episode 42 Veilburner: https://www.youtube.com/watch?v=xXlgGIjj1As\
  *- VEILBURNER - Mephisto Deleterio & Chrisum Infernium | Into The Necrosphere Podcast #253: https://www.youtube.com/watch?v=5LtBcCJZWlI\
  *- VEILBURNER - Mephisto Deleterio & Chrisum Infernium | Into The Necrosphere Podcast #156: https://www.youtube.com/watch?v=HZSJUQ6p4xY\
  *- Veilburner: Mephisto Deleterio & Chrisom Infernium : The Duality of Veilburner: https://www.youtube.com/watch?v=_DjeLiSJ7_k\
  - Video Reviews:\
  *-THIS IS TOUGH TO DESCRIBE // VEILBURNER - III Visions of Hex-Shaped Hiss, Behead The Howling Spirit // Composer Reaction: https://www.youtube.com/watch?v=kclJ_gbsCs4&t=398s\
  *-Veilburner VLBRNR Review: https://www.youtube.com/watch?v=vZZbGh4nlDY\
  *-Veilburner "The Duality of Decapitation & Wisdom" Review (MUSICAL INSANITY THAT WILL TAKE YOUR HEAD): https://www.youtube.com/watch?v=rLiCCeNS4h4\
  *-Veilburner "Lurkers in the Capsule of Skull" Review: https://www.youtube.com/watch?v=Zo9WZbfp9bA\
  - Videos:
  *-Veilburner - The Duality of Decapitation and Wisdom Part I: https://www.youtube.com/watch?v=XjwAeU1jMig
  - Reels:\
  *- Veilburner: Metal You Might Like #metal #beastmetalreview #blackmetal: https://www.youtube.com/shorts/frrVnKG1IUY
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

  