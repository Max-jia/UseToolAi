export interface CategoryGuide {
  intro: string;
  howToChoose: string[];
  startHere: { label: string; href: string; note: string }[];
}

/**
 * Curated, human-written content for category landing pages.
 * Keys are URL slugs generated from category names
 * (lowercase, spaces -> "-", "&" -> "and").
 */
export const categoryContent: Record<string, CategoryGuide> = {
  "writing-and-text": {
    intro:
      "AI writing tools now handle everything from first drafts to final edits, and the gap between the good ones and the rest is huge. The tools below are the ones that consistently produce clean, publishable copy without sounding like a robot. We test them on real tasks — blog posts, emails, ad copy, long-form research — and only recommend tools we'd actually pay for.",
    howToChoose: [
      "Free tier limits: check message caps, not just 'free' — several tools throttle hard after 10-20 queries a day.",
      "Output style: models like Claude and GPT-5.5 write more naturally; cheaper models need heavier editing.",
      "Workflow fit: do you need a browser editor, a docs integration, or an API you can automate?",
      "Cost per word: the $20/mo subscriptions usually beat per-word pricing once you write daily.",
    ],
    startHere: [
      { label: "Best AI writing tools (tested)", href: "/blog/best-free-ai-writing-tools-2026", note: "10 tools we actually tested" },
      { label: "ChatGPT vs Claude vs Gemini", href: "/blog/chatgpt-vs-claude-vs-gemini-2026", note: "which assistant writes best" },
      { label: "Writing that doesn't sound like AI", href: "/blog/how-to-write-with-ai-without-sounding-like-ai-2026", note: "the editing techniques that matter" },
    ],
  },
  "image-and-design": {
    intro:
      "Image generation moved from novelty to production tool in 2025-2026. Current models render accurate text, follow complex prompts, and are cheap enough to iterate on. This category is where 'best tool' depends most on what you make: photoreal product shots, marketing assets, illustrations, or edits to your own photos. We compare them on prompt fidelity, text rendering, and licensing terms — the three things that actually bite users.",
    howToChoose: [
      "Text rendering: if you generate ads or posters, pick a model with proven text accuracy (GPT Image, Ideogram).",
      "Licensing: for commercial use, verify the model's license — not every 'free' tool allows selling your output.",
      "Editing vs generation: inpainting and reference-image tools save more time than raw text-to-image quality.",
      "Batch work: API access and consistency features matter if you produce at volume.",
    ],
    startHere: [
      { label: "Best free AI image generators", href: "/blog/best-free-ai-image-generators-2026", note: "10 tools ranked for quality" },
      { label: "Midjourney vs DALL-E vs Leonardo", href: "/blog/midjourney-vs-dalle-vs-leonardo-2026", note: "the three-way showdown" },
      { label: "Selling AI images legally", href: "/blog/sell-ai-images-on-stock-platforms-2026", note: "stock platform workflow" },
    ],
  },
  "video-and-animation": {
    intro:
      "AI video tools split into two very different jobs: generating footage from text, and editing existing video faster. The best generators (Runway, Kling, Pika) produce short cinematic clips; the best editors (Descript, CapCut) cut hours off post-production. Most creators need one of each. We test both sides and keep pricing current, because this space changes every few weeks.",
    howToChoose: [
      "Generation length: most text-to-video tools cap clips at 5-10 seconds; longer needs extension features.",
      "Style consistency: check character and scene consistency if you need multi-shot stories.",
      "Editing speed: transcription-based editing (Descript) beats timeline editing for talking-head content.",
      "Cost per render: credit systems vary wildly — compute real cost per finished minute.",
    ],
    startHere: [
      { label: "Best free AI video generators", href: "/blog/best-free-ai-video-generators-2026", note: "what the free tiers actually allow" },
      { label: "Runway vs Pika vs Kling", href: "/blog/runway-vs-pika-vs-kling-2026", note: "the 2026 generator comparison" },
      { label: "Edit video 10x faster", href: "/blog/how-to-edit-videos-faster-with-ai-2026", note: "Descript + CapCut workflow" },
    ],
  },
  "code-and-development": {
    intro:
      "AI coding tools went from autocomplete to autonomous agents in 18 months. In 2026 the real question isn't 'does AI write code' — it's 'which tool fits how I work.' Cursor and Claude Code shine for agentic, multi-file changes; GitHub Copilot stays the best inline assistant for existing workflows. We benchmark them on real repos, not marketing benchmarks.",
    howToChoose: [
      "Agent mode: tools that plan and edit multiple files (Claude Code, Cursor) beat simple autocomplete for big refactors.",
      "Editor integration: VS Code/JetBrains plugins matter if you don't want to switch editors.",
      "Context handling: larger context windows mean less re-explaining your codebase.",
      "Cost: terminal-based agents burn credits fast — estimate your daily token usage before subscribing.",
    ],
    startHere: [
      { label: "Best AI coding tools (verified)", href: "/blog/best-ai-coding-tools-2026", note: "the only two with real numbers" },
      { label: "Claude Code vs Cursor vs Copilot", href: "/blog/cursor-vs-github-copilot-vs-claude-code-2026", note: "agentic workflows compared" },
      { label: "Cursor vs Copilot vs Windsurf", href: "/blog/cursor-vs-copilot-vs-windsurf-2026", note: "editor-first comparison" },
    ],
  },
  "audio-and-voice": {
    intro:
      "AI audio now covers text-to-speech that passes as human, voice cloning, music generation, and podcast production. ElevenLabs leads on natural-sounding speech; PlayHT and Murf compete on price and studio features; Suno and Udio handle music. The right pick depends on whether you need a narrator, a song, or a full podcast pipeline.",
    howToChoose: [
      "Voice quality: listen to samples in your language before buying — demo quality varies by language.",
      "Cloning rules: verify the platform's voice-cloning consent policy if you clone real people.",
      "Commercial rights: check whether output can be used on YouTube, ads, or Spotify without royalties.",
      "API pricing: per-character vs per-minute billing changes the math at volume.",
    ],
    startHere: [
      { label: "ElevenLabs vs PlayHT vs Murf", href: "/blog/elevenlabs-vs-playht-vs-murf-2026", note: "speech tools head-to-head" },
      { label: "Make money with AI music", href: "/blog/make-money-with-ai-music-2026", note: "from generation to revenue" },
      { label: "Best AI voice tools", href: "/categories/audio-and-voice", note: "browse all 12 tools" },
    ],
  },
  productivity: {
    intro:
      "The best AI productivity tools don't add another app to your stack — they remove work you were already doing. Meeting notes that write themselves, inboxes that draft replies, documents that summarize themselves. The tools here passed one test: they save more time than they cost in setup and subscription.",
    howToChoose: [
      "Integration depth: a notes tool that plugs into your calendar beats a standalone AI chatbot.",
      "Privacy: don't feed sensitive company data to tools without clear data-processing terms.",
      "Search quality: AI recall is only useful if it finds the right note when you need it.",
      "Price per hour saved: $20/mo is worth it only if it actually removes a recurring task.",
    ],
    startHere: [
      { label: "Best free AI productivity tools", href: "/blog/best-free-ai-productivity-tools-2026", note: "10 tools that save hours" },
      { label: "AI newsletter automation", href: "/blog/ai-automated-newsletter-2026", note: "build it in an afternoon" },
      { label: "Best tools for students", href: "/blog/best-free-ai-tools-for-students-2026", note: "research + writing + study" },
    ],
  },
  "marketing-and-seo": {
    intro:
      "Marketing AI tools range from content generation to full SEO platforms with rank tracking, backlink analysis, and site audits. The honest split: generative tools (Jasper, Writesonic) speed up drafting, while data platforms (Ahrefs, Semrush) give you the research that tells you what to write. For serious SEO, you need both — and we compare the data platforms on accuracy and coverage.",
    howToChoose: [
      "Data accuracy: keyword volumes and backlink indexes differ a lot between providers — verify on your own site.",
      "Content vs data: pick a dedicated writer for copy and a dedicated SEO suite for research; all-in-ones compromise both.",
      "Free tier value: Ahrefs Webmaster Tools covers most small-site needs for $0.",
      "Team seats: per-seat pricing changes the math once you add editors and clients.",
    ],
    startHere: [
      { label: "Semrush vs Ahrefs", href: "/blog/semrush-vs-ahrefs-2026", note: "the SEO platform showdown" },
      { label: "AI affiliate blueprint", href: "/blog/ai-affiliate-marketing-blueprint-2026", note: "recurring commissions with AI" },
      { label: "Perplexity vs ChatGPT Search", href: "/blog/perplexity-vs-chatgpt-vs-gemini-search-2026", note: "AI search for research" },
    ],
  },
  "automation-and-productivity": {
    intro:
      "Automation tools are the force multiplier of the AI stack: they connect your apps, trigger workflows, and let AI agents act on your data. Zapier and Make dominate the no-code space, while AI-native tools like Taskade and Mem bring agents into team workflows. If you're spending hours copying data between apps, start here.",
    howToChoose: [
      "Connector library: count the actual integrations you need — the popular 50 don't always include yours.",
      "AI steps: check whether the platform lets AI parse, summarize, or decide inside a workflow.",
      "Pricing model: task-based pricing (Zapier) vs execution-based (Make) — real cost depends on your volume.",
      "Failure handling: look for retries, error branches, and logs before you trust it with production data.",
    ],
    startHere: [
      { label: "Zapier vs Make", href: "/tools/zapier", note: "workflow automation compared" },
      { label: "Build a one-person AI business", href: "/blog/build-one-person-ai-content-business-2026", note: "automation-first playbook" },
      { label: "AI newsletter on autopilot", href: "/blog/ai-automated-newsletter-2026", note: "Zapier + AI in action" },
    ],
  },
  "data-and-analytics": {
    intro:
      "AI data tools turn natural language into SQL, build charts from spreadsheets, and summarize reports in seconds. For most people, the practical win is asking questions of your own data instead of wrangling pivot tables. We test these tools on real messy datasets — because clean-demo data is where they all look good.",
    howToChoose: [
      "Connectivity: can it read your actual source (Excel, Google Sheets, databases, exports)?",
      "Accuracy: verify that numbers match your source on edge cases — AI SQL can quietly hallucinate.",
      "Visualization: chart quality and export options matter if the output goes into reports.",
      "Privacy: local or cloud processing matters for sensitive business data.",
    ],
    startHere: [
      { label: "ChatGPT for data analysis", href: "/tools/chatgpt", note: "the $0 starting point" },
      { label: "Best free AI tools for students", href: "/blog/best-free-ai-tools-for-students-2026", note: "research and analysis picks" },
      { label: "Browse all data tools", href: "/categories/data-and-analytics", note: "see the full category" },
    ],
  },
};

export function getCategoryContent(slug: string): CategoryGuide | null {
  return categoryContent[slug] ?? null;
}
