# Tricky Tactics Website

This repository contains the source code for the Tricky Tactics website.

The website is built with [Astro](https://astro.build/) and hosted on GitHub Pages and Netlify. The home page introduces the game with real beta gameplay, a squad showcase, screenshots, development milestones, community links, and an FAQ. It promotes community participation rather than public downloads while the game is in closed beta.

## Installation

Use Node.js 24 (also used by deployment).

```sh
npm ci
npm run dev
```

Open `http://localhost:4321`. Other commands:

| Command | Purpose |
| --- | --- |
| `npm run check` | Check Astro templates and TypeScript |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run checks and a production build |

## Editing the site

- `src/pages/index.astro`: landing-page sections, beta roadmap, FAQ, and links. Keep release plans and beta-access language accurate; community membership is not a promise of test access.
- `src/layouts/Layout.astro`: shared navigation, footer, and SEO metadata.
- `src/styles/`: responsive styles and editorial-page typography.
- `src/assets/game/`: optimized screenshots and stills from the owner-provided November 2026 beta capture. Astro generates responsive image variants.
- `src/assets/characters/`: transparent Hexcaster, Frog Witch and Skeleton renders plus four original Nugget emotes. Only optimized art derivatives are copied from the source projects, not game scenes, models, textures or scripts.
- `src/components/PhoneMockup.astro` and `src/assets/devices/`: the supplied iPhone bezel over a separately fitted gameplay screenshot. Desktop pointer tilt uses CSS perspective, not Three.js; it is disabled for touch input and reduced-motion preferences.
- `static/`: original game artwork, self-hosted fonts with their licenses, social card, icons, and the on-demand gameplay clip; served as Astro’s public directory.
- `src/pages/sitemap.xml.ts` and `static/robots.txt`: crawlable page inventory and production sitemap location.
- `content/`: legal pages and team story. Astro renders these through `src/lib/content.ts` and `src/pages/[...slug].astro`, preserving lowercase URLs and excluding drafts. Existing TOML frontmatter and image shortcodes are supported; page-bundle images are emitted by Vite. The old `content/posts/` files are retained as source reference but are excluded from the site.

The former `/learn-more/` page redirects to the home page’s gameplay section, and `/posts/` and the removed `/positions/` page redirect to the home page. The site has no blog or Trickster explorer. Public store badges are not displayed during closed beta. The open-beta target is **planned for 2027**, not a guaranteed release date. Typography uses self-hosted Lilita One (display) and DM Sans (body) under the SIL Open Font License. The palette is night navy and white, with the in-game card blue for the hero and community sections and a single yellow accent; shared design tokens in `src/styles/global.css` keep the landing page and supporting pages consistent. Screenshot enlargement uses a native dialog with Escape dismissal and focus return; the silent gameplay excerpt loads only on demand and retains native playback controls.

### Refreshing media

The original recording is approximately 410 MB and intentionally stays outside the repository. To regenerate the current derivatives, with the six `IMG_0840.png`–`IMG_0845.png` screenshots in one directory:

```sh
node scripts/prepare-game-media.mjs /path/to/screenshots '/path/to/ScreenRecording_11-02-2026 10-42-25_1.MP4'
node scripts/prepare-character-media.mjs /path/to/renders /path/to/TrickyTactics/src/Client/content
node scripts/prepare-phone-frame.mjs '/path/to/iphone-frame.jpg.avif'
node scripts/create-social-card.mjs
```

The preparation script requires `ffmpeg` and uses the installed Sharp image pipeline. It extracts stills at 16, 204, and 184 seconds and a silent 31-second excerpt starting at 184 seconds (preparation followed by combat), encoded as a small H.264 MP4. The editorial crop coordinates are specific to these 1170 × 2532 captures; adjust them when replacing source media. Do not overwrite derivatives with unrelated captures without checking those coordinates and updating captions/alt text.

The character script reads `ren_Hexcaster_1.png`, `ren_Hexcaster_2.png`, `ren_Hexcaster_3.png`, `ren_FrogWitch_3.png`, and `flatren_Skeleton_2.png` from the render directory, and `nugget_{teary,panic,grin,sparkle}.png` from the game's `cosmetics/emotes/` directory. It trims transparent margins and produces WebP masters up to 1200 pixels. Source assets are read-only. Character copy names Hexcaster and Frog Witch without making unverified ability or balance claims; Skeleton is decorative, not advertised as a selectable unit.

The phone-frame script is fitted to the supplied 740 × 740 AVIF. Its checkerboard is baked into the image, so the script masks the exterior and screen opening while retaining the bezel and camera island. The matching screen geometry is in `PhoneMockup.astro`; adjust the script and component together if replacing the source. Confirm the source frame's commercial-use license before public deployment. No external model, WebGL dependency or additional autoplay video is used.

The current media/fan-kit and social links are inherited from the previous site. Before launch, confirm their availability and permissions, approve copy and milestone dates, and provide a public partnership email if Discord should not be the contact route. Research and reference limitations are recorded in `research/game-website-research.md`.

Legacy Hugo templates and configuration remain as migration reference; Astro does not use them.

## Deployment

GitHub Pages uses `.github/workflows/astro.yaml` to check, build, and deploy `dist/` on pushes to `dev` or manual workflow runs. Netlify uses `netlify.toml` with the same build command and output directory. The canonical production URL is configured in `astro.config.mjs`.

## Contributing
The project contains two branches - `main` and `dev`.

The `main` branch is the production branch, and the `dev` branch is the development branch.

You can contribute directly to the `dev` branch for small changes. For larger changes, please create a new branch from `dev`.

The `dev` branch is automatically deployed on GitHub Pages: [https://tricky-tactics.github.io/](https://tricky-tactics.github.io/).

The `main` branch is automatically deployed on Netlify: [https://trickytactics.com](https://trickytactics.com/).
