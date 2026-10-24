# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
João Victor's personal site (mjoaovictor.dev). The primary audience for `/tools` is mobile network and modem engineers in the middle of troubleshooting. They paste a value from a log (QXDM, QCAT, ELT and similar) and need the answer quickly and precisely. The second audience is people learning 5G NR, often coming from blog posts such as "Frequency Raster", who use the tools to understand the spec.

## Product Purpose
A playground for tools, automation and notes on what the author is learning. Each tool turns a 3GPP lookup that normally means digging through tables into one instant answer. A tool succeeds when an engineer gets a correct, traceable result without opening the spec.

## Positioning
The tools are built by an engineer who does this work every day, and each result is traceable to the exact 3GPP clause, table and release it comes from.

## Operating Context
- Used next to log-analysis tools during debugging, often on a second monitor.
- Results are pasted into bug reports and chats.
- Learners move between the blog's MDX posts (with KaTeX math) and the tools.

## Capabilities and Constraints
- Next.js App Router site with blog, career, privacy and tools sections.
- Domain logic lives in standalone npm packages in their own repos (e.g. [`nr-arfcn`](https://github.com/mjoaovictor/nr-arfcn)).
- Calculations are pure functions with no backend.

## Brand Commitments
- Site name "mjoaovictor", rendered in mono in the header. Personal and first-person voice.

## Evidence on Hand
- Spec source: 3GPP TS 38.104 V20.1.0 (`38104-k10.docx`, untracked).
- Career history in `app/career/page.tsx`.
- No testimonials, users or usage numbers exist. Don't invent any.

## Product Principles
1. **Cite the spec.** Every result names its TS clause or table and the release.
2. **Shareable state.** Tool inputs live in the URL, so a result can be linked in a bug report or chat.
3. **Engineers first, learners welcome.** Speed and precision come first. Explanation (parameters, formulas) sits alongside and doesn't block.
