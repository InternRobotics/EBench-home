# EBench — Project Page

Project homepage for **EBench: Elemental Diagnosis of Generalist Mobile Manipulation Policies**.

Built with **React + Vite + TypeScript + Tailwind CSS**, with native charts (Recharts) ported
from the original results dashboard, the full 26-task × 3-view video showcase, and a one-click
deploy to GitHub Pages.

- Paper: https://arxiv.org/abs/2606.18239
- Docs: https://internrobotics.github.io/EBench-doc/
- Code: https://github.com/InternRobotics/GenManip

## Local development

```bash
npm install
npm run dev        # http://localhost:5173/EBench-home/
```

> The dev/preview URL includes the `/EBench-home/` base path (see "Deployment" below).

## Build

```bash
npm run build      # type-checks then builds to dist/
npm run preview    # serve the production build locally
```

## Project structure

```
index.html                     # Vite entry + fonts + meta tags
src/
  main.tsx, App.tsx            # app shell
  index.css                   # Tailwind layers + design tokens (dark "diagnostic console" theme)
  data/
    content.ts                # paper meta, authors, abstract, links, BibTeX, dimension copy
    tasks.ts                  # the 26-task manifest (names, groups, instructions)
    ebench.json               # raw leaderboard analysis data (agg_top / agg_task / agg_cluster / …)
  lib/
    results.ts                # typed, chart-ready accessors over ebench.json
    asset.ts, icons.tsx       # base-path helper + inline icon set
  components/
    Hero, Abstract, Overview, Dimensions, TaskGallery, Citation, Footer, Nav
    results/                  # Recharts: TopLineBars, CapabilityRadar, TransferScatter,
                              # ClusterExplorer, TaskHeatmap + shared chartkit
public/
  videos/*.mp4               # 78 clips (26 tasks × 3 views) — the task showcase
                             # 512×384, H.264 CRF 30 (~59 MB total; masters kept in supp/videos)
```

### Updating content

- **Authors / abstract / links / BibTeX** → `src/data/content.ts`
- **Tasks** (names, instructions, groups) → `src/data/tasks.ts`
- **Result numbers** → replace `src/data/ebench.json` (same schema)
- **Videos** → drop `<task>_<view>.mp4` files into `public/videos/`

## Deployment (GitHub Pages)

A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds the site and publishes it to
GitHub Pages on every push to `main`.

1. Create a GitHub repo named **`EBench-home`** and push this project to its `main` branch.
2. In the repo: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Push to `main` (or run the workflow manually). The site goes live at
   `https://<your-user>.github.io/EBench-home/`.

### Changing the deploy target

The asset base path is set by the `BASE_PATH` env var at build time
(`.github/workflows/deploy.yml`), defaulting to `/EBench-home/`.

| Target | `BASE_PATH` |
| --- | --- |
| Project site `…/EBench-home/` (default) | `/EBench-home/` |
| Custom domain (add `public/CNAME`) | `/` |
| User/org root site `<user>.github.io` | `/` |

The default for local dev is also `/EBench-home/` (see `vite.config.ts`); override with
`BASE_PATH=/ npm run build`.

## Notes

- The served videos in `public/videos` are compressed to 512×384 / H.264 CRF 30 (~59 MB total),
  visually indistinguishable from the source at the gallery's tile size. The uncompressed masters
  live in `supp/videos` (git-ignored). To re-compress after replacing a clip:
  ```bash
  ffmpeg -i in.mp4 -vf "scale=512:384:flags=lanczos" -c:v libx264 -crf 30 -preset slow \
    -pix_fmt yuv420p -an -movflags +faststart public/videos/out.mp4
  ```
