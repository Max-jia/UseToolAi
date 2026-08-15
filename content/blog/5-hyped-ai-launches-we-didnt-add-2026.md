---
title: "Announced ≠ Released: 5 Hyped AI Launches We Didn't Add (2026)"
description: "We checked 5 hyped AI launches from July-August 2026 against official sources. FLUX 3's image tier, API, and open weights don't exist yet. Muse Video is preview-only. Here's what's real, what we added anyway, and why."
date: "2026-08-10"
author: "Max Jia"
category: "AI Assistants"
tags: ["fact-checking", "research", "verification", "flux-3", "muse-video"]
featured: false
---

Five AI "launches" made headlines in July and August. We checked each one against official sources before deciding what goes on this directory. None of them is a fully released product yet. Here's what's real, what's hype, and what we did about each.

To get on our directory, a tool has to pass three checks: the product is actually usable, pricing is published by the vendor (not a blog aggregator), and we can point to an official source for both. These five failed at least one check.

| "Launch" | Announced | Status as of Aug 10, 2026 | In our directory? |
|----------|-----------|---------------------------|-------------------|
| FLUX 3 Image | Jul 23 | Not shipped. No endpoint, no pricing, no benchmarks | No |
| FLUX 3 API | Jul 23 | Not public. No stable model ID | No |
| FLUX 3 Dev (open weights) | Jul 23 | No date. Not on Hugging Face | No |
| Muse Video | Jul 7 | Preview only. No API, no pricing | No |
| Grok Imagine 2.0 API | Aug 7 | Docs list it, launch says "coming soon" | App yes, API no |

---

## FLUX 3 Image: announced, not shipped

**The pitch:** Black Forest Labs announced FLUX 3 on July 23 as a multimodal model covering image, video, audio, and robot action prediction. Headlines called it the next big thing in image generation.

**What's real:** Only FLUX 3 Video exists in usable form, through an application-gated early access program run directly by BFL. Everything else is a roadmap.

**What's missing:** The image tier. BFL says it's coming "in the following weeks" with no date, no endpoint, no pricing, no resolution specs, and no benchmarks. FLUX 3 isn't on fal.ai or Replicate either, the platforms where the FLUX family normally lives.

**What we did:** Did not add it. If a site is selling "FLUX 3 Image" access right now, you're buying a product that doesn't exist yet.

## FLUX 3 API: not public

**The pitch:** The FLUX family was famously API-first. Developers assumed FLUX 3 would be the same.

**What's real:** Nothing public. As of August 10 there is no production endpoint, no stable model ID, no published rate limits. Access is by application only.

**What's missing:** Everything a developer needs to integrate.

**What we did:** Did not add it. Our directory lists tools, not applications you can apply to.

## FLUX 3 Dev: open weights without a date

**The pitch:** BFL promised an open-weights FLUX 3 Dev release, continuing the FLUX.1 Dev tradition that the open-source community built on.

**What's real:** The promise. No release date, no license terms, no parameter count, no hardware requirements. It's not on Hugging Face.

**What we did:** Did not add it. "Later this year" is a hope, not a schedule.

## Muse Video: preview only

**The pitch:** Meta showed Muse Video alongside Muse Image on July 7, its first in-house video model, with native audio.

**What's real:** A preview. Meta says it will be "available soon" to creators and in Meta AI, with no firm date. Meta itself acknowledges two problems to fix: audio-video synchronization and physical accuracy in high-speed motion.

**What's missing:** API, pricing, production availability, and a fixed release date.

**What we did:** Did not add it. Muse Image is in our directory (free access with usage caps, verified July launch). Muse Video is not.

## Grok Imagine 2.0 API: the half-verified launch

**The pitch:** xAI shipped Grok Imagine 2.0 on August 7 as the default quality mode in Grok apps. It's real, and we added it: it ranks #2 on the public Text-to-Image Arena at Elo 1,320 (preliminary), behind only GPT Image 2.

**The conflict:** xAI's API docs list the model with pricing ($0.02 standard, $0.05 quality per image). But launch materials say developer API access is "coming soon," and the 2.0 model ID is unconfirmed.

**What we did:** Added the app with verified consumer pricing. We don't list API access that's still in conflict, and we flagged the API status on the listing.

---

## What This Means for You

- You saw a "FLUX 3" review or tutorial this month. The writer is covering an unreleased product or quoting a reseller. Either way, that content can't be verified.
- You're a developer planning to build on FLUX 3. Plan on FLUX.2 today. Nothing stable exists to integrate.
- You want Meta's video generator. It's preview-only. Muse Image is the free, real option to try now.
- You want Grok Imagine for image editing. The consumer app is real. Don't sign an API contract until the model ID is confirmed.

## FAQ

### Is FLUX 3 fake?
No. It's a real project from a real company, and FLUX 3 Video exists in gated early access. But the image tier, the public API, and the open weights have not shipped. "Real but not released" is why we held off.

### Why do you add some tools immediately and wait on others?
Our rule is simple: the product must be usable and the pricing must come from the vendor. Grok Imagine 2.0 passed because the consumer app shipped with published pricing. FLUX 3 failed because none of its advertised tiers exist in a usable form.

### When will you add FLUX 3?
When the image tier ships with published pricing and a public endpoint. Then we verify it against the official source and add it with a date. That's the whole process.

### How do we know these details are right?
Every claim in this post traces to official sources (Meta's research blog, xAI's docs, Black Forest Labs' announcements) or launch coverage that cites them. Verified August 10, 2026.

## Read Next

- [We Fact-Checked 100 AI Tool Listings — 46 Were Wrong](/blog/we-fact-checked-100-ai-tools-46-were-wrong)
- [10 Best AI Tools That Survived Our Fact-Check (2026)](/blog/10-best-ai-tools-survived-fact-check-2026)
- [AI Image Generators 2026: Most Benchmark Claims Are Fake](/blog/best-ai-image-generators-2026)

---

*We re-verify tools continuously and update pages when things change. Found something stale? Tell us and we'll re-check it.*
