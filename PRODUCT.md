# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are English-speaking non-technical professionals (普通职场人): people looking for a writing, design, office, or video AI tool who want to know what a tool does, what it costs, and whether it is actually good before they commit. They arrive from Google search (SEO-driven), often with a specific task in mind ("AI video generator", "best AI writing assistant"), skim the card for price and verdict, and leave. The site is in English; the operator is a Chinese product owner with no coding background.

## Product Purpose

An AI tool directory with a companion blog. Users can browse 107 curated tool cards (features, pricing, pros/cons, verdict) and read explainer posts on recent AI launches. Success is measured by traffic and AdSense advertising revenue: more organic visits, better search rankings, and ad impressions. The directory exists to rank well in Google and convert visits into ad revenue.

## Positioning

Content quality is the differentiator. Unlike directory sites that auto-generate hundreds of marketing-flavored entries, every card here is fact-checked: prices are verified against official sources on a dated "Pricing checked [date]" line, every card body is humanized (no template language, no em dashes, no AI tells), and unverifiable claims are removed rather than invented. The cards tell the reader exactly when the numbers were last checked.

## Operating Context

- Content is written in English, maintained by a single non-technical operator working through Claude Code.
- Each tool card is a markdown file (`content/tools/*.md`) with gray-matter frontmatter (name, description, category, pricing, url, rating, updated, tags, features, pros, cons, coreStrength, bestFor, optional pricingDetails, alternatives).
- Blog posts live in `content/blog/*.md` with title, description, date, author "Max Jia", category, tags, featured.
- Every card body ends with a verification sentence ("Pricing checked [Month D, YYYY]") whose date must match the frontmatter `updated` field; when prices change, both must be updated together.
- Fact-checking workflow: every number is verified against a fetchable source before publishing; unverifiable numbers are dropped.
- Verification scripts (Python) scan all cards for body word count, verification sentence, em dashes, and section headings.
- Deployment: git push to GitHub + `vercel --prod --yes` to usetoolai.com; automatic deploys occasionally do not trigger, so manual deploy is the norm.
- AdSense is under review; Search Console domain verification via HTML tag (PPBLd3i0M55H-WZuQ9gAEN50weCPfILuJ-k6_I4hSpA) and a Request review are pending operator action.

## Capabilities and Constraints

- Static Next.js site (16.x, Turbopack), content-driven; pages are SSG prerendered.
- Categories: Audio & Voice, Automation & Productivity, Code & Development, Data & Analytics, Image & Design, Marketing & SEO, Productivity, Video & Animation, Writing & Text.
- ~107 tool cards; 4 blog posts (August 2026: launch roundup, DeepSeek price-hike explainer).
- Hard constraint: never fabricate data. Fabricated claims (invented ARR, GitHub stars, benchmark results, competitor prices) have been removed in past passes and must not return.
- Card body constraints: >=150 words, verification sentence with matching date, no em dashes, no `##` headings, no bold, no emoji, no template language. Frontmatter em dashes are tolerated.
- Blog posts allow `##` headings; em dash rule still applies.
- Verified pricing facts (as of Aug 17, 2026): DeepSeek moved to peak/off-peak API pricing (peak = Beijing 9-12, 14-18, double the off-peak rate); V4-Pro ¥0.30/¥9.0/¥27.0 peak (cache-hit input / cache-miss input / output), ¥0.15/¥4.5/¥13.5 off-peak; V4-Flash ¥0.10/¥3.0/¥9.0 peak, ¥0.05/¥1.5/¥4.5 off-peak. Kimi K3 (2.8T params, Frontend Code Arena #1 Elo 1,679), Grok Bot (beta Aug 11, no standalone plan, SuperGrok Heavy ~$300/mo), DeepSeek Harness (open-source agent framework, Aug 14).

## Brand Commitments

- Site name: usetoolai.com; tone is calm, factual, direct (established through the humanizer workflow and existing copy).
- All blog authors signed "Max Jia".
- The dated "Pricing checked" line is a brand promise: it is the trust mechanism that distinguishes the site from AI-slop directories. It must never be faked.
- No specific visual identity, palette, or typography commitments have been made by the operator.

## Evidence on Hand

- `docs/decisions.md`: complete log of product decisions with dates (humanize pass, fact-removal pass, August 2026 launches, DeepSeek price confirmation).
- `content/tools/*.md`: 107 cards, all passing the verification script (as of Aug 17, 2026).
- `content/blog/`: 4 posts, all em-dash-free.
- AdSense review is pending; no traffic or revenue numbers are available yet. Future work must not fabricate traffic, revenue, or testimonial claims.

## Product Principles

1. Trust before decoration: every claim on the site must be verifiable, and the verification date must be visible and honest.
2. Content is the product: design exists to make cards and posts readable, findable, and credible, not to outshine them.
3. The reader is a busy professional, not a developer: price, verdict, and "what it does" must be answerable in seconds.
4. Quality over quantity: curation (107 tools, not 10,000) is deliberate; the site grows by adding well-checked entries, not by bulk.
5. Search is the front door: SEO needs (readability, structure, fast static pages) outrank visual experiments.

## Accessibility & Inclusion

No product-specific accessibility standard has been established by the operator. Content is English-only.
