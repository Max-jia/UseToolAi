---
target: homepage (src/app/page.tsx)
total_score: 19
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 3
timestamp: 2026-08-21T12-50-26Z
slug: src-app-page-tsx
---
# Design Critique: usetoolai.com homepage (src/app/page.tsx) — 2026-08-21

Method: dual-agent (Assessment A: design review; Assessment B: detector + evidence)

## Design Health Score: 19/32 (59%, Acceptable band)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Hero search submit no-ops (scrolls to missing #all-tools); count/newsletter states good |
| 2 | Match System / Real World | 3 | Plain task language works; ISO dates and "No fluff" copy slightly off-voice |
| 3 | User Control and Freedom | 3 | Static browse surface, no traps; Clear All filter exists |
| 4 | Consistency and Standards | 2 | Two card designs; two search entry points behave differently; ISO vs "Month D, YYYY" dates; "Data & Analysis" vs "Data & Analytics" |
| 5 | Error Prevention | 2 | Dead task-card link (data-and-analysis -> 404); search lacks feedback |
| 6 | Recognition Rather Than Recall | 3 | Visible nav, labeled elements, breadcrumbs; no recall demands |
| 7 | Flexibility and Efficiency | n/a | Static read/browse surface, no expert workflow to accelerate |
| 8 | Aesthetic and Minimalist Design | 1 | Same tools shown three times (featured, category wall, all-tools); newsletter interrupts mid-scan; gradient text + emoji compete |
| 9 | Error Recovery | 2 | Silent search failure; "Not yet verified" unexplained; generic newsletter error |
| 10 | Help and Documentation | n/a | Marketing/browse surface; the one help that matters (how to trust a price) is unlinked |
| **Total** | | **19/32** | |

## Design Specificity Verdict

Competent template work: the hero/gradient/task-cards/featured/newsletter/category-wall/table structure is the stock directory-SaaS pattern. Emoji-as-icon-system, indigo-emerald gradient pair, and "hand-picked / no fluff" copy are interchangeable directoryisms. The one genuinely authored element is the verification date, which the design under-serves: ISO format, no link to /how-we-verify, small muted text, and homepage cards omit price + rating, the two facts this product exists to deliver.

## Priority Issues

- [P0] Hero search submit does nothing (HeroSearch scrolls to #all-tools which does not exist; query never reaches SearchFilter). First interaction fails silently for a search-driven audience.
- [P1] Homepage cards omit pricing and rating (Featured cards: name/description/verified date only; category wall: icon + truncated name only).
- [P1] Trust system contradicts itself: ISO badge date vs human body date; badge links nowhere (the /how-we-verify proof is footer-only); "Not yet verified" cards on the homepage Featured grid without explanation.
- [P1] Homepage is a 45-link category wall repeating the same content three times; All Tools index buried 3 screens down; mobile category-wall targets ~8px.
- [P2] Dead link: task card "Research & analyze" -> /categories/data-and-analysis (real slug: data-and-analytics) -> 404.
- Minor: gradient text on H1 (detector-confirmed, indigo-emerald), star glyphs unlabeled for screen readers, pricing column hidden on mobile comparison table, hero search has no label, count drift ("107+"/"100+"/"100+ hand-picked"), Visit CTA and Verified badge share the accent color, newsletter Buttondown hardcodes "questlog", footer omits Blog link, Browse dropdown no active state.

## Persona Red Flags

- Jordan (first-timer): hero search does nothing -> assumes site broken, leaves. "Not yet verified" unexplained. ISO date meaningless without the checked-by-hand context.
- Riley (stress tester): search failure documented as bug; "Research & analyze" 404; three naming inconsistencies; in-page filters reset on navigation.
- Casey (mobile): homepage ~4+ screens; 8px tap targets in category wall; All Tools index requires marathon scroll; Pricing column hidden on phones.

## Strengths

1. Verification system (dated badge, honest "Not yet verified" fallback, "Pricing checked" body line) is a genuinely authored trust mechanism.
2. Tool detail page is a well-built decision surface (breadcrumb, sticky Quick Facts, pros/cons, best-for, alternatives, single CTA).
3. Category page is the best-executed index (curated guide, top-rated strip, comparison table with pricing column).

## Provocative Questions

1. What if the verification date WERE the visual identity (a consistent "Checked [Month D, YYYY]" stamp as the logo-level motif, linking to /how-we-verify)?
2. Why does the homepage exist as a scroll novel when the best index (search + filters) is buried three screens down?
3. Is the newsletter earning its mid-scan homepage position on a pre-revenue AdSense site?

## Detector Evidence (Assessment B)

- CLI: 3 findings, exit code 2. gradient-text @ globals.css:41 (GENUINE: used on homepage H1 "AI Tools in 2026", #6366F1 -> #059669). ai-color-palette @ NewsletterSignup.tsx:36,46 (FALSE POSITIVES: ultra-light indigo-50/blue-50 surface tints, not the saturated gradient signature).
- Rendered-HTML checks skipped: no usetoolai dev server running (port 3000 serves another project); npm run dev not permitted.
