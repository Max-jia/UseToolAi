---
name: "DeepSeek Harness"
description: "DeepSeek's open-source agent framework where everything is a plugin. Reversible effects roll back on unload, modules hot-swap without restarts, and testing shows extreme token savings — the open-source counter to Grok Bot's managed cloud agents."
category: "Code & Development"
pricing: "Free, open-source — run cost is the API fees of the models you plug in"
url: "https://www.deepseek.com/harness/"
rating: 4
updated: "2026-08-16"
tags: ["agent", "open-source", "framework", "developer", "plugin", "deepseek"]
features:
  - "Everything is a plugin: tasks load only the components they need and unload them when done"
  - "Reversible effects: uninstalling a plugin rolls back every change it made to the shared environment"
  - "Hot module replacement (Cordis): swap plugins live without restarting, with transactional rollback if a swap breaks"
  - "Four execution modes: direct tasks, Goal mode for long multi-round jobs, background sub-agents, and Workflow mode that orchestrates many agents via JavaScript"
  - "Ralph Loop: each round spawns a fresh memory-less agent that keeps long-term memory only through a shared workspace"
  - "PTC mode (programmatic tool calling): compresses five model round-trips into one"
  - "28K GitHub stars on launch day"
pros:
  - "Extreme token savings: the same task cost about ¥0.59 with DSH plus V4 Pro versus roughly ¥70 for Claude Fable 5 (about 120x cheaper), with cache hit rates reported up to 99%"
  - "Plugin architecture lets components evolve independently — DeepSeek's pitch is a framework that can modify itself"
  - "Hot-swappable modules without restarts, unlike VS Code's shared-process extension model where unloading needs a full restart"
  - "Fully open-source from a company that already proved the open-weight model market"
cons:
  - "High installation barrier: needs Node.js and an npm install from GitHub — no double-click installer like other agent harnesses"
  - "Browser-based web UI, not a desktop app — a deliberately unconventional choice"
  - "Savings assume DeepSeek's caching architecture; paired with other models the cost math changes"
  - "Early-stage: closed beta with signed NDAs until mid-August, and the plugin ecosystem is young"
coreStrength: "An agent framework where every component is a removable plugin with reversible effects — built to squeeze maximum work from every token and to keep improving its own architecture."
bestFor: "Developers and agent builders who are comfortable with the command line. Best for: custom agent workflows, high-volume token tasks, teams that want agent infrastructure on their own machines. Not for: non-developers or anyone expecting a click-to-install tool."
pricingDetails: "Free and open-source. Costs come from the model APIs you plug in; DeepSeek's V4 Pro pairs best, and the caching architecture (up to 99% hit rates in testing) is where the savings come from. Note: DeepSeek API prices rose on August 17, 2026 with peak/off-peak tiers."
alternatives:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Grok Bot"
    slug: "grok-bot"
  - name: "Cursor"
    slug: "cursor"
---

DeepSeek Harness (DSH) and Grok Bot launched within days of each other in August 2026, and they could hardly disagree more about where an agent should live. Grok Bot gives you a managed teammate whose computer the vendor controls. DSH says the computer is yours: it is an open-source framework where every component, including the model and the agent loop itself, is a removable plugin. The design comes from a paper co-authored with Peking University on spatiotemporal composability, and the practical consequence is two features that matter: reversible effects, so uninstalling a plugin rolls back every change it made, and hot module replacement, so you swap plugins live without restarting the whole system.

The numbers in the launch reviews are the real story. The same task that cost about $9.80 in Claude Fable 5 tokens ran for roughly ¥0.59 on DSH paired with DeepSeek V4 Pro, about 120x cheaper, helped by cache hit rates that testers measured as high as 99%. That is the honest reason to look at DSH even after DeepSeek's August price increase: it does not make the model cheap, it makes the model spend nothing on waste. The trade-offs are equally real. Installation needs Node.js and npm from GitHub, there is no double-click installer, and the web-based UI is a deliberate break from desktop agent tools. It is also early: the beta required an application and an NDA until mid-August, and the plugin ecosystem is thin. For a developer who wants agent infrastructure on their own machines, this is currently the most interesting open option. For everyone else, Grok Bot or Claude Code remain the easier doors in. Pricing checked August 16, 2026.
