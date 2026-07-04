# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Personal website/blog for João Victor (mjoaovictor.dev), a Telecommunications Engineer. Built with Next.js App Router, React 19, TypeScript, and Tailwind v4. Content is a mix of MDX blog posts and interactive telecom tools (currently a 5G NR-ARFCN calculator).

## Commands

```bash
npm run dev      # start dev server (Next.js, Turbopack)
npm run build    # production build
npm run start    # run production build
npm run lint     # eslint
npx tsc --noEmit # type-check (no dedicated script; project uses strict TS)
```

There is no test suite in this repo — do not invent test commands.

## Architecture

- **App Router structure** (`app/`): each route is a `page.tsx` with its own `metadata` export and often an inline JSON-LD `<script>` block for SEO. Follow this pattern for new pages — see `app/tools/5g-nr-arfcn-calculator/page.tsx` and `app/career/page.tsx` for examples of the metadata + JSON-LD convention.
- **Blog system** (`lib/blog.ts`, `posts/*.mdx`, `app/blog/`): MDX files in `posts/` are read directly off the filesystem at build time (custom hand-rolled frontmatter parser, not gray-matter). `components/mdx.tsx` defines the MDX component overrides (headings with anchor links, custom `Table`, syntax-highlighted `code` via `sugar-high`, KaTeX math via `remark-math`/`rehype-katex`). New MDX components must be registered in the `components` object there.
- **NR-ARFCN domain logic** (`lib/nrarfcn/`, `lib/3gpp.ts`): band and frequency-raster tables live in `lib/nrarfcn/tables/` split by frequency range (FR1/FR2), keyed by 3GPP TS 38.104. `lib/nrarfcn/provider.ts` merges FR1+FR2 tables into unified `ALL_BAND_DEFINITIONS`/`ALL_BAND_RASTERS` exports. `lib/3gpp.ts` contains the actual conversion/validation math (ARFCN↔frequency, raster-grid validation). When updating band data, cite the 3GPP spec version in a comment/commit and keep the "raster not available" (`rasterAvailable: false`) fallback for bands lacking grid data rather than hiding them — see `app/tools/5g-nr-arfcn-calculator/page.tsx`'s `UPDATES` list for how spec-version bumps are tracked in the UI.
- **UI components** (`components/ui/`): shadcn/ui primitives ("new-york" style, neutral base color, no class prefix — see `components.json`). Add new primitives via the shadcn CLI/MCP rather than hand-writing them, to keep them consistent with the existing set.
- **Theming**: `next-themes` with `attribute="class"`, system-detected default; dark mode colors are also declared in the `viewport.themeColor` media query in `app/layout.tsx` — update both places together if changing the theme palette.

## Conventions

- Path alias `@/*` maps to the repo root (`tsconfig.json`), matching the shadcn aliases (`@/components`, `@/lib`, `@/components/ui`, etc.).
- `next.config.ts` is currently minimal/default — don't assume custom webpack/build behavior beyond what's written there.
