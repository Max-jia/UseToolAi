---
title: "August 2026 Launch Roundup, Part 2: The Week Digital Avatars Won"
description: "Wizstar took Product of the Day with 319 votes, Vercel shipped a 7.8MB coding agent in Zig, DeepSeek Harness shipped three versions in three days, and AI kept climbing out of its own apps."
date: "2026-08-22"
author: "Max Jia"
category: "AI Assistants"
tags: ["roundup", "august-2026", "launches", "fact-checking", "wizstar", "fx", "deepseek-harness"]
featured: false
---

Our [first August roundup](/blog/august-2026-ai-launch-roundup) covered August 14 and earlier. This one covers the week that followed: August 15 through 21. Product Hunt ran unusually hot: the month's highest single-day total landed in this window (August 19, 498 votes), and the pattern of the week was clear by Friday. Digital avatars got good enough to win a day. Coding agents got small enough to embed anywhere. And AI kept moving out of standalone apps and into the tools you already use.

## Wizstar won the week with actors that never sleep

Wizstar topped Product Hunt on August 21 with 319 votes. The pitch is short: digital avatars that move and act like professional actors, generated from a description. What is worth noticing is not the demo, it is where the models come from. Wizstar was among the first platforms to integrate ByteDance's Seedance 2.5 (announced August 5) and then MiniMax's H3, meaning it is a broker of other companies' video models rather than a model owner itself. That is becoming the normal shape for video tools: own the pipeline, rent the models.

We did not add Wizstar to the directory yet. The pricing page needs verification before we will. If you want the same model capabilities without the middleman, our [Seedance card](/tools/seedance) is updated and the video guide covers the alternatives.

## Vercel's fx: a coding agent that is small enough to miss

Vercel Labs shipped fx, an open-source coding agent written in Zig, on August 21. The numbers matter more than the brand: the binary is around 7.8 MiB and cold starts in about 10 microseconds. Vercel's own framing is that the interesting thing is not that it is small, it is that it can be embedded, inside a CLI, an editor, or another agent's loop. The same week, Antigravity shipped IDE extensions that put its agents inside your existing editor (156 votes), and Epho, Plow Latch, and OneCLI all launched variations of running agents on infrastructure you control. Six of the top sixteen launches on August 21 were developer tooling. That is a crowded lane.

## DeepSeek Harness shipped three versions in three days

DeepSeek Harness went from v0.1.0-rc.8 to v0.1.1-rc.1 to v0.1.1-rc.2 between August 19 and 21. The rc.8 release is the one that matters: multimodal image input for /goal and /plan commands, and Claude Code and Codex subagents installable as plugins on demand. The rc.1 release added the V4-Flash-Vision-Exp visual model to the DeepSeek adapter and fixed a sandbox escape in Bubblewrap, the container layer. The rc.2 release improved image uploads. Three days, three versions, one of them a security fix. That is what developer preview means here, and our [DeepSeek Harness card](/tools/deepseek-harness) now reflects it, including the official post-August-17 price sheet.

## The B2B lane: Astute and Clara AI SDR

August 19 gave Astute the top spot with 498 votes, the highest single-day total of the month so far. Astute automates B2B brand distribution: it matches your content to new-media creators and handles the outreach. August 18 belonged to Clara AI SDR from TruGen AI with 415 votes, an AI sales representative that converts website visitors into qualified pipeline and books meetings around the clock. Two days, two winners, both in the same lane: AI that does the unglamorous middle of marketing and sales instead of the creative top. Neither is new to the market, Clara launched in April, but both peaked on Product Hunt this week, which says something about what buyers are currently shopping for.

## Data you already own, in the chat you already use

The rest of the week's top ten was mostly data plumbing. Supernova (308 votes) puts your business data into Claude and Codex. Mindcase (228 votes) extracts structured data from web pages. Router by Ramp (118 votes) is a token router that shaves API costs by picking the cheapest endpoint per call. Actx0 built memory infrastructure for agents. None of these asks you to open a new app. They plug into the tools where the work already happens.

Other launches worth a glance: Meridian (August 17, 406 votes), HarnessRouter Community Edition (August 16, 328 votes), Inferock Bench (August 15, 287 votes), HyNote for Mac (August 20, 360 votes), and ShogunAI's "personal AGI" pitch (96 votes). We did not verify these five beyond their listings, so treat them as leads, not recommendations.

## The bottom line

Six days, one theme: AI is leaving its own apps. The week's winners were either tools that embed into existing surfaces (Supernova, Mindcase, fx, the IDE extensions) or tools that commoditize a capability other vendors own (Wizstar, Router by Ramp). The standalone AI chat app is still the most common product on Earth, but it is no longer where the momentum is. We wrote up that pattern separately, and we will keep the directory updated as the pricing pages get verifiable.
