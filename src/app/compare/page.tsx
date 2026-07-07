"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ToolItem { slug: string; name: string; category: string; }

export default function ComparePage() {
  const router = useRouter();
  const [tools, setTools] = useState<ToolItem[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/tools").then(r => r.json()).then(setTools);
  }, []);

  const categories = [...new Set(tools.map(t => t.category))].sort();

  const filtered = tools.filter(t => {
    if (category !== "All" && t.category !== category) return false;
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const toggleTool = (slug: string) => {
    if (selected.includes(slug)) {
      setSelected(selected.filter(s => s !== slug));
    } else if (selected.length < 2) {
      setSelected([...selected, slug]);
    }
  };

  const goCompare = () => {
    if (selected.length === 2) {
      router.push(`/compare/${selected.sort().join("-vs-")}`);
    }
  };

  const t1 = tools.find(t => t.slug === selected[0]);
  const t2 = tools.find(t => t.slug === selected[1]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-extrabold tracking-tight mb-2">Compare AI Tools</h1>
      <p className="text-[var(--color-text-muted)] mb-8">
        Pick 2 tools to compare side by side.
        {selected.length === 2 && " Ready!"}
      </p>

      {/* Selection status */}
      <div className="flex items-center gap-4 mb-8">
        <div className={`flex-1 rounded-xl border-2 p-4 text-center transition-colors ${t1 ? 'border-[var(--color-primary)] bg-indigo-50' : 'border-dashed border-[var(--color-border)]'}`}>
          {t1 ? (
            <div className="flex items-center justify-center gap-2">
              <span className="font-semibold text-sm">{t1.name}</span>
              <button onClick={() => setSelected(selected.filter(s => s !== t1.slug))} className="text-xs text-red-500 hover:underline">Remove</button>
            </div>
          ) : (
            <span className="text-sm text-[var(--color-text-dim)]">Select first tool ↓</span>
          )}
        </div>
        <span className="text-[var(--color-text-dim)] font-bold text-lg">VS</span>
        <div className={`flex-1 rounded-xl border-2 p-4 text-center transition-colors ${t2 ? 'border-[var(--color-primary)] bg-indigo-50' : 'border-dashed border-[var(--color-border)]'}`}>
          {t2 ? (
            <div className="flex items-center justify-center gap-2">
              <span className="font-semibold text-sm">{t2.name}</span>
              <button onClick={() => setSelected(selected.filter(s => s !== t2.slug))} className="text-xs text-red-500 hover:underline">Remove</button>
            </div>
          ) : selected.length === 1 ? (
            <span className="text-sm text-[var(--color-text-dim)]">Select second tool ↓</span>
          ) : (
            <span className="text-sm text-[var(--color-text-dim)]">Pick 2 tools</span>
          )}
        </div>
      </div>

      {/* Compare button */}
      <button
        onClick={goCompare}
        disabled={selected.length !== 2}
        className="w-full py-3 rounded-xl bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed mb-8"
      >
        {selected.length === 2 ? `Compare ${t1?.name} vs ${t2?.name} →` : "Select 2 tools to compare"}
      </button>

      {/* Search & filter */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search tools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-white text-sm focus:outline-none focus:border-[var(--color-primary)]"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2.5 rounded-lg border border-[var(--color-border)] bg-white text-sm focus:outline-none focus:border-[var(--color-primary)] cursor-pointer"
        >
          <option value="All">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Tool grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-12">
        {filtered.map(tool => {
          const isSel = selected.includes(tool.slug);
          const isFull = selected.length >= 2 && !isSel;
          return (
            <button
              key={tool.slug}
              onClick={() => toggleTool(tool.slug)}
              disabled={isFull}
              className={`text-left px-3 py-2 rounded-lg border text-sm transition-colors ${
                isSel
                  ? 'border-[var(--color-primary)] bg-indigo-50 text-[var(--color-primary)] font-medium'
                  : 'border-[var(--color-border)] bg-white text-[var(--color-text)] hover:border-[var(--color-primary)]/30'
              } ${isFull ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="truncate">{tool.name}</div>
              <div className="text-[10px] text-[var(--color-text-dim)] truncate">{tool.category}</div>
            </button>
          );
        })}
      </div>

      {/* Popular comparisons */}
      <div className="pt-8 border-t border-[var(--color-border)]">
        <h2 className="text-sm font-semibold tracking-wider uppercase text-[var(--color-text-dim)] mb-4">Popular Comparisons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            ["chatgpt", "claude"],
            ["midjourney", "dall-e"],
            ["cursor", "github-copilot"],
            ["runway", "pika"],
            ["elevenlabs", "play-ht"],
            ["notion-ai", "gemini-gmail"],
            ["kling", "runway"],
            ["suno", "udio"],
          ].map(([a, b]) => (
            <Link
              key={`${a}-${b}`}
              href={`/compare/${[a, b].sort().join("-vs-")}`}
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors py-1"
            >
              {a.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())} vs{" "}
              {b.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
