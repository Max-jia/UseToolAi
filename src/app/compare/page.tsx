"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Tool } from "@/lib/tools";

export default function ComparePage() {
  const router = useRouter();
  const [toolA, setToolA] = useState("");
  const [toolB, setToolB] = useState("");
  const [toolList, setToolList] = useState<Tool[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load tools lazily
  const loadTools = async () => {
    if (loaded) return;
    const res = await fetch("/api/tools");
    if (res.ok) {
      const data = await res.json();
      setToolList(data);
      setLoaded(true);
    }
  };

  const goCompare = () => {
    if (toolA && toolB && toolA !== toolB) {
      const slugs = [toolA, toolB].sort().join("-vs-");
      router.push(`/compare/${slugs}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-extrabold tracking-tight mb-2">Compare AI Tools</h1>
      <p className="text-[var(--color-text-muted)] mb-8">Select two tools to see a side-by-side comparison.</p>

      <div className="space-y-4 mb-6">
        <div>
          <label className="text-xs font-semibold text-[var(--color-text-dim)] uppercase tracking-wider mb-1 block">Tool A</label>
          <select
            value={toolA}
            onChange={(e) => setToolA(e.target.value)}
            onFocus={loadTools}
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)] cursor-pointer"
          >
            <option value="">Select a tool...</option>
            {toolList.map((t) => (
              <option key={t.slug} value={t.slug}>{t.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-[var(--color-text-dim)] uppercase tracking-wider mb-1 block">Tool B</label>
          <select
            value={toolB}
            onChange={(e) => setToolB(e.target.value)}
            onFocus={loadTools}
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)] cursor-pointer"
          >
            <option value="">Select a tool...</option>
            {toolList.map((t) => (
              <option key={t.slug} value={t.slug}>{t.name}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={goCompare}
        disabled={!toolA || !toolB || toolA === toolB}
        className="w-full py-3 rounded-xl bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Compare →
      </button>

      <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
        <h2 className="text-sm font-semibold tracking-wider uppercase text-[var(--color-text-dim)] mb-4">Popular Comparisons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            ["chatgpt", "claude"],
            ["midjourney", "dall-e"],
            ["cursor", "github-copilot"],
            ["runway", "pika"],
            ["elevenlabs", "play-ht"],
            ["notion-ai", "gemini-gmail"],
            ["jasper", "copy-ai"],
            ["suno", "udio"],
          ].map(([a, b]) => (
            <Link
              key={`${a}-${b}`}
              href={`/compare/${[a, b].sort().join("-vs-")}`}
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors py-1"
            >
              {a.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} vs{" "}
              {b.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
