# Yuvraj Karna — Portfolio

My personal portfolio and blog, built with **React**, **TypeScript**, **Vite**, and **TailwindCSS**, deployed on **Cloudflare Pages**. Live GitHub and LeetCode stats are served by a companion **Cloudflare Worker**.

![Portfolio Preview](https://yuvrajkarna.pages.dev/preview.png)

## Live Site

👉 [yuvrajkarna.pages.dev](https://yuvrajkarna.pages.dev)

## Features

- Single-page portfolio with route-level and section-level code splitting
- Markdown-powered blog (posts live in `src/content/blogs/`), rendered with `react-markdown` + syntax highlighting
- Live GitHub and LeetCode stats via a Cloudflare Worker (with edge caching and graceful fallbacks)
- Light/dark theme with system-preference default and no flash on load
- Per-route SEO meta tags, `BlogPosting` JSON-LD, and a build-time generated sitemap
- Accessible modals (command palette, terminal mode) with focus trapping and `prefers-reduced-motion` support
- Fun extras: command palette (`Cmd/Ctrl + K`), terminal mode (`` ` ``), and a Konami-code easter egg

## Tech Stack

- React 18 + TypeScript
- Vite 5
- TailwindCSS 3 (+ typography plugin)
- react-router-dom 7
- Cloudflare Pages (hosting) + Cloudflare Workers (stats API)

## Project Structure

```
.
├── src/
│   ├── Home/            # Home page sections (Hero, About, Projects, ...)
│   ├── components/      # Shared UI (CommandPalette, TerminalMode, ThemeToggle, ...)
│   ├── content/blogs/   # Markdown blog posts
│   ├── context/         # Theme context
│   ├── hooks/           # Reusable hooks (media query, focus trap, konami)
│   ├── lib/             # Blog utilities, page meta hook
│   └── pages/           # Routed pages (BlogList, BlogPost, Uses, NotFound)
├── scripts/             # Build-time sitemap generator
├── leetcode-stats-worker/  # Cloudflare Worker for GitHub/LeetCode stats
└── public/              # Static assets, sitemap, robots.txt
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yuvrajkarna2717/yuvrajkarna.git
cd yuvrajkarna
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the dev server

```bash
npm run dev
```

The site runs at `http://localhost:5173` by default.

## Available Scripts

| Script                 | Description                                       |
| ---------------------- | ------------------------------------------------- |
| `npm run dev`          | Start the Vite dev server                         |
| `npm run build`        | Generate the sitemap, type-check, and build       |
| `npm run preview`      | Preview the production build locally              |
| `npm run lint`         | Run ESLint                                        |
| `npm run lint:fix`     | Run ESLint with autofix                           |
| `npm run format`       | Format the codebase with Prettier                 |
| `npm run format:check` | Check formatting without writing                  |
| `npm run sitemap`      | Regenerate `public/sitemap.xml`                   |
| `npm run deploy`       | Build and deploy to Cloudflare Pages              |

## Blog Posts

Blog posts are Markdown files in `src/content/blogs/`. Each file starts with frontmatter:

```markdown
---
title: My Post Title
date: Jan 2025
readTime: 5 min
tags: ["React", "TypeScript"]
summary: A one-line summary shown on the blog list.
external: false
---

Post content in Markdown...
```

Set `external: true` and add `externalUrl` to link a card to an external article instead of rendering a local page.

## Stats Worker

The `leetcode-stats-worker/` directory contains a Cloudflare Worker that proxies GitHub and LeetCode stats with edge caching. To develop or deploy it:

```bash
cd leetcode-stats-worker
npm install
npm run dev      # local dev
npm run deploy   # deploy to Cloudflare
```

For higher GitHub API rate limits, set a `GITHUB_TOKEN` secret on the worker:

```bash
npx wrangler secret put GITHUB_TOKEN
```

## Deployment

Pushes to `main` trigger the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds the site and deploys it to Cloudflare Pages, and deploys the stats worker.

Required repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `GH_STATS_TOKEN` — a GitHub token with public read scope, injected into the worker's `GITHUB_TOKEN` binding

## License

Personal project — all rights reserved.
