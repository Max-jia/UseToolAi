---
title: "August 2026 AI Launch Roundup: What's Real and Worth Trying"
description: "Grok Bot versus DeepSeek Harness, the DeepSeek V4 Pro launch-day mixup, Kimi K3's front-end crown, Gemini 3.7 Flash at half price, and more. Every claim in this roundup was checked against official sources or first-party reporting."
date: "2026-08-16"
author: "Max Jia"
category: "AI Assistants"
tags: ["roundup", "august-2026", "launches", "fact-checking", "grok-bot", "deepseek-harness"]
featured: false
---

August 2026 has been the busiest month for AI releases this year, and the noise is worse than usual. A model "launch" that turned out to be a false alarm, an agent product that signs into your accounts, and an open-source framework that promises to make tokens nearly free. We went through each headline, checked it against official sources, and added cards to the directory where the product was real and the pricing published. Here is what actually happened, in order of how much it matters.

## The story of the month: two opposite ways to build an agent

The same week produced the two most interesting agent releases of the year, and they could hardly disagree more.

[Grok Bot](/tools/grok-bot) hit public beta on August 11. Each Bot gets its own persistent cloud computer, signs into the apps you already use, and keeps working while you sleep. Setup is watch-and-learn: show it a job once and it saves the routine. The catch is structural. There is no standalone plan, no free tier, and no trial. You get Grok Bot by buying SuperGrok Heavy (~$300/month) or a Cursor subscription, because xAI is acquiring Cursor with the deal expected to close in Q3 2026. And every Bot on your account shares one cloud computer with one set of credentials. xAI's own documentation says plainly: do not use separate Bots as a security boundary. If your work involves finance, regulated data, or client accounts, that alone is a reason to stay away.

[DeepSeek Harness](/tools/deepseek-harness) (DSH) went open-source on August 14, five days later, and it is Grok Bot's philosophical opposite. The computer is yours. Everything is a plugin: the model, the tools, even the agent loop, with reversible effects that roll back cleanly when a component unloads, and hot module replacement so you never restart the whole system to swap a part. The launch reviews put the cost math in one line: the same task that burned about $9.80 in Claude Fable 5 tokens ran for roughly ¥0.59 on DSH paired with DeepSeek V4 Pro, about 120x cheaper, helped by cache hit rates measured as high as 99%. The honest trade-offs: installation needs Node.js and npm, the interface is a browser tab rather than a desktop app, and the plugin ecosystem is young.

One managed teammate on the vendor's computer, one open framework on yours. Both cards are live in the directory.

## DeepSeek V4 Pro went stable. Twice.

August 13 produced a launch-day mixup worth remembering. In the morning, the web lit up with news that the V4 Pro stable release had shipped. DeepSeek removed the announcement from its homepage that afternoon. The real stable release landed that evening. If you only read the first headlines, you got the wrong version of events, which is exactly why we check sources before publishing anything here.

The real V4 Pro is a large jump in agent capability. DeepSWE scores went from 12.8 in the preview to 62.7, and on Terminal Bench 2.1, the benchmark agent teams watch most, it matches Claude Fable 5. The catch arrived three days later: API prices rose on August 17 under a new peak/off-peak model (Beijing peak hours 9:00-12:00 and 14:00-18:00 cost double). Peak-hour output on V4-Pro is ¥27 per million tokens, 4.5x the old rate, and cache-hit input went up roughly 12x. The free chat app is unchanged. The era of DeepSeek at 1/10th of Western prices is over for peak usage, though off-peak rates still undercut Western frontier APIs by a wide margin. Our [DeepSeek card](/tools/deepseek) reflects the new pricing.

## Kimi K3 keeps its front-end crown

K3 launched on July 18 but kept making headlines through August: it is the largest open-source model ever released, at 2.8 trillion parameters, and it tops Frontend Code Arena at Elo 1,679, ahead of Claude Fable 5 and GPT-5.6 Sol. That is the first open-source win over closed frontier models on a public arena, though the ranking is marked preliminary and the vote count is lower than the incumbents. Moonshot's own launch note admits K3 still trails the top closed models overall, which is refreshingly honest marketing. API output is ¥100 per million tokens, about 3.5x the previous generation, but in coding workflows the Mooncake cache reportedly hits 90% or more, dropping effective input costs near ¥3.8 per million tokens. If you build web front-ends, this is the best tool for it right now. Full review in our [Kimi card](/tools/kimi).

## Google ships Gemini 3.7 Flash at half price

On August 14, Google released Gemini 3.7 Flash, aimed squarely at coding and agent workflows, with the ability to generate production-near code in a single pass. The pricing news got as much attention as the model: Google is running API pricing at half the rate of the previous generation for the rest of 2026. Google describes it as its most capable versatile model; the flagship release date is still unannounced.

## Video got longer and cheaper

ByteDance's [Seedance](/tools/seedance) 2.5 arrived on July 31 and single-generation length jumped from 15 to 30 seconds. The Mini variant keeps its cost edge at around 0.16 RMB per second, and the 2.5 update keeps the price-performance math firmly in ByteDance's favor. Text rendering in frames is still unreliable and faces stay blocked as reference input, but for high-volume short-form work inside CapCut, nothing beats the price.

## Facebook's creator assistant

Two releases in the creator lane: on July 30 Meta launched Creator Assistant for Facebook, an AI that explains why content works rather than just reporting that it did, and on August 12 Facebook shipped the standalone Creator Studio app with those AI tools built in. Both are free and aimed at creators who want performance analysis and comment management without leaving the platform.

## The bottom line

Six releases, two new directory entries (Grok Bot, DeepSeek Harness), three updated cards (DeepSeek, Kimi, Seedance), and one headline that turned out to be a false alarm. The pattern to watch into September: the agent wave is splitting into managed teammates and open frameworks, and pricing moved in both directions this month, with Google cutting API prices in half while DeepSeek raised its peak-hour rates. We will keep verifying before we publish, and the cards will tell you the date we last checked the numbers.
