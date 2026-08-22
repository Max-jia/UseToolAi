---
title: "DeepSeek V4-Flash-Vision-Exp: The Model That Reads Your Screenshots for Pennies"
description: "DeepSeek's first visual model tokenizes images at a hard 384-token cap and charges ¥1 per million input tokens. That math changes who can afford GUI agents. We checked the numbers and the trade-offs."
date: "2026-08-22"
author: "Max Jia"
category: "Developer Tools"
tags: ["deepseek", "vision-model", "gui-agent", "pricing", "multimodal"]
featured: false
---

DeepSeek shipped V4-Flash-Vision-Exp on August 21. It is the first visual model in the V4 family, it is marked Exp for experimental, and on paper it rewrites the cost of giving an agent eyes. The headline number: input tokens at ¥1 per million, output at ¥2 per million, cache hits at ¥0.02 per million. The model does not charge extra for images at all. Every image is converted to tokens, and each one is capped at 384 tokens. That cap is the entire story.

## The math that changes things

A screenshot becomes at most 384 tokens, which costs ¥0.000384. Roughly 2,600 screenshots for one yuan. A GUI agent that checks its screen twenty times per task now spends nothing you could measure. Compare that to what vision input costs on the big closed models, where an image can eat thousands of tokens at rates several orders of magnitude higher, and the gap is not a discount, it is a different category of product.

That is why the vision model exists in the first place, and DeepSeek says as much. The Exp release notes position it squarely at agentic use: the model reads what is on screen, decides the next action, and the cost structure assumes it will do this thousands of times. DeepSeek Harness, the open-source agent framework, already wires it into its adapter (v0.1.1-rc.1), and the [Harness card](/tools/deepseek-harness) is updated to match.

## Where the cap bites

The 384-token ceiling cuts both ways. Images are compressed coarsely, so the model reads the gist of a screen, not every pixel. Dense tables, small text, fine print in a dashboard, those will blur. If your workflow is "read this legal document as an image," this model is the wrong tool. If your workflow is "look at the screen, find the button, click it," it is probably enough, and the price means you can afford to retry when it misreads.

The official benchmarks back that split. Terminal Bench 2.1 at 83.9 and DeepSWE at 59.3 show strong performance on terminal and coding-agent tasks, where the visual load is light. NL2Repo at 57.7 and Chartography at 64.3 are respectable but not dominant. DeepSeek's own line, that the model gets multimodal agents "close to Opus-4.8," is marketing shorthand. Treat it as a direction, not a measurement. The gap that matters for real users is the cost gap, and on that metric nothing else this month comes close.

## Four months, four versions

The cadence says more than any single release does. V4 launched April 24. V4-Flash followed July 31. V4-Pro landed August 13. Vision arrived August 21. Four models in four months, each filling a slot in the same architecture: a fast tier, a strong tier, and now a multimodal tier. DeepSeek is not shipping improvements to one product. It is completing a product line at a rate the big labs have not matched since 2023.

One warning before you build on it: Exp stands for experimental preview. DeepSeek states plainly that Exp models are for evaluation, not production. The price is the draw, but prices on preview models change, and the model itself may change shape mid-series. If you are building a tool that shows screenshots to an agent, prototype on this. When you harden the product, budget for the possibility that the production vision model is priced differently.

Prices and benchmarks above are from official DeepSeek sources: the pricing page, the release notes, and the model's benchmark table. Pricing checked August 22, 2026.
