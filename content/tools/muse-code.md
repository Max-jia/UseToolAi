---
name: "Muse Code"
description: "Meta's terminal coding agent powered by Muse Spark 1.2. Plans, writes, and validates changes across entire repositories with persistent background agents and crash-safe resume — at prices up to 21x below rivals."
category: "Code & Development"
pricing: "Free beta / API $1.25 per M in / $4.25 per M out / Contributor tier $0.10–$0.20 per M tokens"
url: "https://www.meta.ai"
rating: 4
updated: "2026-08-10"
tags: ["coding", "agent", "terminal", "cli", "meta", "developer"]
added: "2026-08-10"
features:
  - "Terminal agent: plans code changes, writes code, runs tests, and validates results across large repositories"
  - "Persistent background agents: async agents stay active for the whole session instead of spawning per task — less re-gathering, less latency on multi-step work"
  - "Crash-safe runtime: every model call, tool run, approval, and edit is appended to a local event log — sessions resume exactly where they stopped"
  - "Muse Spark 1.2 engine: 1-million-token context window, co-trained with the agent itself"
  - "Built-in skills: /plan turns a task into an approval-gated plan, /grill stress-tests the plan, /goal tracks work toward completion"
  - "Parallel sub-agents run in isolated worktrees for independent tasks"
pros:
  - "Aggressive pricing: $1.25/$4.25 per M tokens standard; $0.10/$0.20 contributor tier — roughly 4–21x cheaper than rivals"
  - "1M-token context window matches top-tier competitors"
  - "Terminal-Bench 2.1: 82.9% — ahead of GPT-5.6 Terra, behind Claude Opus 5 (86.7%)"
  - "Crash-safe event log is a genuinely useful reliability feature for long jobs"
  - "Meta openly acknowledges the benchmark gap — refreshingly honest positioning"
cons:
  - "Contributor tier's discount means your prompts, completions, and repo context are used to train Meta's models"
  - "Contributor pricing is available only in selected countries and rate-limited to 60 req/min"
  - "Public beta: macOS and Linux only at launch"
  - "Price is the pitch, not peak performance — Meta trails Claude Opus 5 on benchmarks"
coreStrength: "A terminal coding agent that undercuts every serious rival on price (up to 21x) while matching their 1M-token context window — with crash-safe resume so long jobs survive interruptions."
bestFor: "Developers and teams who want agentic coding without premium subscription costs. Best for: cost-sensitive engineers, teams hitting Claude Code or Codex credit walls, long-running automation jobs. Not for: teams with strict data-use policies (contributor tier), or those needing Windows support today."
alternatives:
  - name: "Claude Code"
    slug: "claude"
  - name: "Cursor"
    slug: "cursor"
---

Muse Code is Meta's entry into the terminal coding agent race, announced by Mark Zuckerberg on August 5 and available immediately in public beta for macOS and Linux. It's powered by Muse Spark 1.2, a 1-million-token model co-trained with the agent itself — meaning the model was trained on the exact failure modes of agentic coding, not just code completion. The architecture is built around persistence: background agents that live for the whole session, and a local append-only event log that makes the runtime replay-exact, so a crashed session resumes precisely where it stopped.

The pricing is the real story. At $1.25/$4.25 per million tokens (standard) it already undercuts most rivals; the contributor tier at $0.10/$0.20 is roughly 12–21x cheaper. The catch — and Meta is explicit about it — is that contributor users consent to their prompts, completions, and repository context being used to train Meta's models, and the tier is only available in selected countries. For teams with proprietary code, the standard tier or enterprise zero-data-retention options are the realistic path.

On benchmarks, Muse Code scores 82.9% on Terminal-Bench 2.1 — ahead of GPT-5.6 Terra but behind Claude Opus 5's 86.7%. Meta openly admits this gap and competes on price and architecture rather than raw capability. That's a healthy dynamic for the market: three real terminal agents now have verifiable numbers, and price competition is finally happening where it matters — per-token cost for long, credit-burning sessions.
