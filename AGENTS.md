# AGENTS.md

Shared by Codex and Claude Code. Every line here should change what you do.

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
