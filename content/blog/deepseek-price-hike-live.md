---
title: "DeepSeek Raised Prices Today. Here's the Real Bill."
description: "The new peak/off-peak API pricing went live on August 17. Which workloads actually got more expensive, which barely moved, and three ways to keep your bill low."
date: "2026-08-17"
author: "Max Jia"
category: "AI Assistants"
tags: ["deepseek", "api", "pricing", "peak-off-peak", "fact-checking"]
featured: false
---

DeepSeek's new API pricing went live at 00:00 Beijing time today, August 17, and V4-Pro became a fully commercial service on the same day. The headlines are real: on the most extreme line item, the price rose about 12 times. But most headlines stop there, and the details matter more. Some workloads barely moved, a few are still nearly free, and the structure of the new pricing tells you exactly what DeepSeek wants you to do: move your jobs out of peak hours.

## The new price table

DeepSeek split every rate into peak and off-peak. Peak hours are 01:00-04:00 and 06:00-10:00 UTC, which is 09:00-12:00 and 14:00-18:00 in Beijing. Off-peak rates are exactly half of peak rates, so the table below (official USD list prices per 1M tokens) is all you need:

| Model | Input, cache hit | Input, cache miss | Output |
|---|---|---|---|
| V4-Flash off-peak | $0.007 | $0.22 | $0.66 |
| V4-Flash peak | $0.014 | $0.44 | $1.32 |
| V4-Pro off-peak | $0.022 | $0.66 | $1.98 |
| V4-Pro peak | $0.044 | $1.32 | $3.96 |

In yuan, the numbers most Chinese developers will see are the off-peak ones: V4-Flash at ¥0.05 / ¥1.5 / ¥4.5 and V4-Pro at ¥0.15 / ¥4.5 / ¥13.5, all doubled during peak hours.

## What the "11x" headline is really about

The largest jump is real but narrow. V4-Pro's cache-hit input rate went from ¥0.025 per million tokens to ¥0.30 during peak hours, about 12 times the old price. That is where the "prices up 11x" and "up to 1100%" headlines come from.

Output did not get that treatment. V4-Pro output went from ¥6 to ¥27 at peak, 4.5x, and to ¥13.5 off-peak, about 2.25x the old rate. Off-peak rates on the same models were never part of the old pricing, so they are new baselines rather than hikes on top of hikes. The honest summary: the biggest increases hit the line items that were already almost free, and they only apply during six hours of the day.

## What this means for your bill

Against Western frontier models, DeepSeek still looks like a discount, just a smaller one. V4-Pro output at peak is $3.96 per million tokens, compared with roughly $50 for Claude Fable 5 output, about 13x cheaper. Off-peak, it is $1.98, about 25x cheaper. V4-Flash output at peak is $1.32, about 38x cheaper. The "1/10th of the price" era is over for peak usage, but the gap is still a wide one.

The real story is cache hits. Cache-hit input costs $0.007 to $0.044 per million tokens, depending on model and time. A million tokens of cached system prompt costs about the same as a few seconds of electricity. For workloads with stable context, the bill barely changed.

## Three ways to keep costs down

1. **Shift jobs off the six peak hours.** This is the pricing's explicit purpose. DeepSeek says it introduced peak/off-peak rates to balance compute load and push developers to schedule off-peak. Batch jobs, nightly syncs, and re-indexing runs cost half as much after 18:00 Beijing time.
2. **Structure prompts so they hit the cache.** Reuse a stable system prompt, keep the codebase context in a fixed order, and let the cache do its work. At $0.007 per million tokens for a cache hit, your static input is effectively free.
3. **Use the right model for the job.** V4-Flash at $0.44 cache-miss input and $1.32 output during peak is still cheaper than most competitors' off-peak rates. Reserve V4-Pro for the tasks that need the stronger model.

## The bottom line

The price increase is real and it lands mostly on peak-hour usage of already-expensive line items. For off-peak, cache-friendly workloads, DeepSeek is still the cheapest frontier-class option by a wide margin. We updated our [DeepSeek card](/tools/deepseek) with the confirmed rates and the August 17 verification date, and the card will tell you the day we last checked the numbers.
