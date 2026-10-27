<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Stack
TypeScript · Next.js · TailwindCSS · shadcn/ui · Vercel

## 1. Plan Before You Touch Code
- Long task = touches 3+ files, adds a dependency, or changes design tokens
- Long task: first tell me in 2–3 sentences what you think I'm after. Start only after I say yes
- Write the steps to `PLAN.md`, each with how you'll prove it works
- Two failed tries on one step: stop, write what failed in `PLAN.md`, and tell me before re-planning
- Pausing mid-task: leave `PLAN.md` current so a new session can pick it up

## 2. Smallest Change That Works
- Stay inside this task. Don't break anything that already works
- Write the least code that works and that I can read. No speculative props, variants, wrappers, or abstractions used once
- Tradeoff? Weigh UX (users), DX (the next dev) and AX (the next agent)
- No new dependencies or refactors nobody asked for
- Spelling or grammar errors in comments and docs: fix them. In identifiers: propose the rename, don't do it
- Never delete or overwrite files git doesn't track without asking

## 3. Code Standard
- Match the patterns already in this repo before introducing new ones. Consistency beats preference
- Use framework and platform primitives before custom code (see the Next.js docs note above)
- TypeScript strict: no `any`, no `!` non-null assertions, no `@ts-ignore` without a one-line reason
- Names say what something is, not how it works. No abbreviations except domain terms
- Early returns over nesting. Split a function only when it reads better, not to hit a size rule
- Handle errors at boundaries (user input, network, I/O). Don't wrap internal code in try/catch
- Comments explain why, never what
- Before saying done, remove dead code, unused imports and debug logs you added

### Performance
- Defaults that cost no extra code:
  - Render on the server unless the component needs state, effects or browser APIs. Keep client boundaries as low in the tree as possible
  - Independent requests run in parallel, never one after another
  - No queries or fetches inside loops. Batch or join
  - Images and fonts through the framework's primitives, with explicit dimensions so layout doesn't shift
  - Import only what you use. No whole-library imports for one function
- Everything else needs evidence:
  - Don't add `useMemo`, `useCallback`, caching layers or custom optimizations without a measured problem
  - Claiming a performance gain? Show before/after numbers (bundle size, Lighthouse, profiler)
  - A new dependency must justify its bundle cost in one line

## 4. Subagents
- Explorer reads, worker edits, reviewer only reports and never edits
- Each gets one job, a done condition and a 5-line report
- Parallel is fine. Two agents on the same file is not
- Check the key claim in a report before you build on it

## 5. Own The Bug
- Reproduce it with my steps first. Can't reproduce it? Tell me what you need
- Fix the cause, then run the same steps again
- Never silence an error to make it go away

## 6. Verify Before You Say Done
- Run lint, typecheck and tests and read the output yourself
- UI: open it in the browser at mobile and desktop width and try to break it: empty state, long text, double submit, refresh
- Didn't run a check? Say so. An unrun check is not a pass
- Report in 2–3 lines: what you picked, what you gave up, and why

## 7. Write Down Every Correction
- When I correct you, add a line under Lessons: "When X, do Y"
- Same mistake twice: the lesson is unclear. Rewrite it
- A lesson that applies everywhere: propose moving it into a section above
- Ask me before changing anything above Lessons

## Lessons
<!-- Newest on top. Delete what no longer applies. -->
- When using `font-mono`, don't add `tabular-nums`: monospace digits are already fixed-width
- When adding a site accent color, set shadcn's `--accent` instead of creating a new token
- When styling a non-`Button` element with `buttonVariants`, wrap it in `cn()` so conflicting classes (e.g. `border-transparent` vs `border-border`) merge like they do in `Button`
- When writing a description for a section index (e.g. `/tools`), describe the section's intended scope, not only what it holds today
- When an input becomes invalid, clear the fields and results derived from it instead of keeping the last valid values on screen
- When a heading or short text has a one-letter word (e.g. "I"), bind it to the next word with `&nbsp;` so it never ends a line alone
- When asked what causes a behavior, explain the cause without assuming the behavior is unwanted or proposing to remove it
