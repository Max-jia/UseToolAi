"use client";

import { useState } from "react";
import Link from "next/link";
import ToolIcon from "@/components/ToolIcon";
import type { Tool } from "@/lib/tools";

export default function ToolCardGrid({ tools }: { tools: Tool[] }) {
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  const filtered = showFreeOnly
    ? tools.filter((t) => t.pricing.toLowerCase().includes("free"))
    : tools;

  return (
    <>
      {/* Quick filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setShowFreeOnly(false)}
          className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${!showFreeOnly ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]" : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"}`}
        >
          All ({tools.length})
        </button>
        <button
          onClick={() => setShowFreeOnly(true)}
          className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${showFreeOnly ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]" : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"}`}
        >
          Free ({tools.filter((t) => t.pricing.toLowerCase().includes("free")).length})
        </button>
      </div>

      {/* Tool cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group bg-[var(--color-card)] rounded-xl p-5 border border-[var(--color-border)] hover:border-[var(--color-primary-light)] card-lift"
          >
            <div className="flex items-center gap-3 mb-2">
              <ToolIcon url={tool.url} name={tool.name} size={36} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-sm truncate group-hover:text-[var(--color-primary)] transition-colors">
                    {tool.name}
                  </h3>
                  <span className="stars text-xs tracking-wider flex-shrink-0 ml-2">
                    {"★".repeat(Math.floor(tool.rating))}
                    {"☆".repeat(5 - Math.floor(tool.rating))}
                  </span>
                </div>
                <span className="text-xs text-[var(--color-text-dim)]">{tool.category}</span>
              </div>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 mb-3">
              {tool.description}
            </p>
            <div className="text-xs font-medium text-[var(--color-text-dim)]">
              {tool.pricing.split(" / ")[0]}
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-[var(--color-text-muted)]">
          <p>No free tools in this category yet.</p>
          <button onClick={() => setShowFreeOnly(false)} className="text-[var(--color-primary)] hover:underline text-sm mt-1">Show all tools →</button>
        </div>
      )}
    </>
  );
}
