# AGENTS.md

Shared by Codex and Claude Code. Every line here should change what you do.

## Project Overview
Personal website/blog for João Victor (mjoaovictor.dev), a Telecommunications Engineer. Built with Next.js App Router, React 19, TypeScript, and Tailwind v4. Content is a mix of MDX blog posts and interactive telecom tools (5G NR-ARFCN calculator, link budget calculator).

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
- **UI components** (`components/ui/`): shadcn/ui primitives built on `@base-ui/react` ("base-nova" style, neutral base color, no class prefix — see `components.json`). Add new primitives via the shadcn CLI/MCP rather than hand-writing them, to keep them consistent with the existing set.
- **Theming**: `next-themes` with `attribute="class"`, system-detected default; dark mode colors are also declared in the `viewport.themeColor` media query in `app/layout.tsx` — update both places together if changing the theme palette.

## Conventions
- Path alias `@/*` maps to the repo root (`tsconfig.json`), matching the shadcn aliases (`@/components`, `@/lib`, `@/components/ui`, etc.).
- Page width is set per page, not in the layout: wrap each `page.tsx`'s root element in `mx-auto w-full max-w-2xl` (wider only for tools that need it).
- `next.config.ts` is currently minimal/default — don't assume custom webpack/build behavior beyond what's written there.

## 1. Plan Before You Touch Code
- Long task: first tell me in 2–3 sentences what you think I'm after
- Start only after I say yes
- Write the steps to `PLAN.md`, each with how you’ll prove it works
- Two failed tries on one step: stop, note what failed, re-plan
- Pausing mid-task: leave `PLAN.md` so a new session can pick it up

## 2. Smallest Change That Works
- Stay inside this task. Don't break anything that already works
- Tradeoff? Weigh UX (users), DX (the next dev) and AX (the next agent)
- No new dependencies, renames or refactors nobody asked for
- Back up before deleting or overwriting anything

## 3. Split Work Across Subagents
- Explorer reads, worker edits, reviewer only reports and never edits
- Each gets one job, a done condition and a 5-line report
- Parallel is fine. Two agents on the same file is not
- Check the key claim in a report before you build on it

## 4. Own The Bug
- Reproduce it with my steps first. Can't reproduce it? Tell me what you need
- Fix the cause, then run the same steps again
- Never silence an error to make it go away

## 5. Verify Before You Say Done
- Run the tests and read the output yourself
- UI: open it and try to break it: empty input, double submit, refresh
- Didn't run a check? Say so. An unrun check is not a pass
- Report in 2–3 lines: what you picked, what you gave up, and why

## 6. Write Down Every Correction
- When I correct you, add a line under Lessons: "When X, do Y"
- Same mistake twice: the lesson is unclear. Rewrite it
- Ask me before changing anything above Lessons

## Lessons
<!-- Newest on top. Delete what no longer applies. -->
