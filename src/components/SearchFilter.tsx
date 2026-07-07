"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Tool } from "@/lib/tools";
import ToolIcon from "./ToolIcon";

interface Props {
  tools: Tool[];
  categories: string[];
}

export default function SearchFilter({ tools, categories }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [pricing, setPricing] = useState("All");
  const [rating, setRating] = useState(0);
  const [sort, setSort] = useState("name");

  const filtered = useMemo(() => {
    let result = [...tools];

    // Keyword search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          t.category.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (category !== "All") {
      result = result.filter((t) => t.category === category);
    }

    // Pricing filter
    if (pricing === "Free") {
      result = result.filter((t) =>
        t.pricing.toLowerCase().startsWith("free")
      );
    } else if (pricing === "Paid") {
      result = result.filter(
        (t) => !t.pricing.toLowerCase().startsWith("free")
      );
    }

    // Rating filter
    if (rating > 0) {
      result = result.filter((t) => t.rating >= rating);
    }

    // Sort
    if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sort === "category") {
      result.sort((a, b) => a.category.localeCompare(b.category));
    }

    return result;
  }, [tools, search, category, pricing, rating, sort]);

  return (
    <div>
      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 md:p-6 border border-[var(--color-border)] shadow-sm mb-6">
        {/* Search input */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder='Search tools... (e.g. "video generator", "free coding", "voice cloning")'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-[var(--color-border)] text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-indigo-100 transition"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔍</span>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap gap-3 items-center text-sm">
          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-white text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)] cursor-pointer"
          >
            <option value="All">📂 All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Pricing */}
          <select
            value={pricing}
            onChange={(e) => setPricing(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-white text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)] cursor-pointer"
          >
            <option value="All">💰 All Pricing</option>
            <option value="Free">🆓 Free / Freemium</option>
            <option value="Paid">💳 Paid Only</option>
          </select>

          {/* Rating */}
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-white text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)] cursor-pointer"
          >
            <option value="0">⭐ All Ratings</option>
            <option value="4">★★★★+ (4.0+)</option>
            <option value="5">★★★★★ (5.0 only)</option>
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-white text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)] cursor-pointer"
          >
            <option value="name">🔤 Sort: A-Z</option>
            <option value="rating">⭐ Sort: Rating</option>
            <option value="category">📂 Sort: Category</option>
          </select>

          {/* Clear all */}
          {(search || category !== "All" || pricing !== "All" || rating > 0) && (
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
                setPricing("All");
                setRating(0);
                setSort("name");
              }}
              className="px-4 py-2.5 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition font-medium"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4 text-sm text-[var(--color-text-muted)]">
        <span>
          {filtered.length} of {tools.length} tools
          {(search || category !== "All" || pricing !== "All" || rating > 0) && " match your filters"}
        </span>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-[var(--color-text-muted)]">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-lg font-medium mb-2">No tools match your filters</p>
          <p className="text-sm">Try adjusting your search or removing some filters</p>
        </div>
      ) : (
        <>
          {!search && category === "All" && pricing === "All" && rating === 0 && sort === "name" ? (
            <>
              {/* Featured row — larger, 2-column, with descriptions */}
              <div className="mb-3">
                <p className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-dim)] mb-3">
                  Featured
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filtered.filter(t => t.rating >= 4.5).slice(0, 6).map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="bg-white rounded-xl p-6 border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-colors group"
                    >
                      <div className="flex items-start gap-4">
                        <ToolIcon url={tool.url} name={tool.name} size={48} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-bold text-base group-hover:text-[var(--color-primary)] transition-colors">
                              {tool.name}
                            </h3>
                            <span className="stars text-xs tracking-wider flex-shrink-0 ml-2">
                              {"★".repeat(Math.floor(tool.rating))}
                              {"☆".repeat(5 - Math.floor(tool.rating))}
                            </span>
                          </div>
                          <span className="text-xs text-[var(--color-text-dim)]">{tool.category}</span>
                          <p className="text-xs text-[var(--color-text-muted)] mt-2 line-clamp-2 leading-relaxed">
                            {tool.description}
                          </p>
                          <div className="flex items-center gap-2 mt-3">
                            <span className="text-xs text-[var(--color-text-dim)]">{tool.pricing.split(" / ")[0]}</span>
                            {tool.pricing.toLowerCase().startsWith("free") && (
                              <span className="text-xs text-green-500 font-medium bg-green-500/10 px-2 py-0.5 rounded-full">Free</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* All tools — denser 3-col grid */}
              <p className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-dim)] mb-3 mt-8">
                All {filtered.length} tools
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filtered.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="bg-white rounded-xl p-4 border border-[var(--color-border)] hover:border-indigo-500/20 transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <ToolIcon url={tool.url} name={tool.name} size={28} />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-xs truncate group-hover:text-[var(--color-primary)] transition-colors">
                          {tool.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="stars text-[10px] tracking-wider">
                            {"★".repeat(Math.floor(tool.rating))}
                            {"☆".repeat(5 - Math.floor(tool.rating))}
                          </span>
                          <span className="text-[10px] text-[var(--color-text-dim)]">{tool.category.split(" & ")[0]}</span>
                          {tool.pricing.toLowerCase().startsWith("free") && (
                            <span className="text-[10px] text-green-500 font-medium">Free</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            /* Filtered/search results — uniform grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="bg-white rounded-2xl p-5 border border-[var(--color-border)] hover:border-indigo-500/20 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
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
                  <p className="text-xs text-[var(--color-text-muted)] line-clamp-2 mb-2">
                    {tool.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-[var(--color-text-muted)]">{tool.pricing.split(" / ")[0]}</span>
                    {tool.pricing.toLowerCase().startsWith("free") && (
                      <span className="text-xs text-green-500 font-medium bg-green-500/10 px-2 py-0.5 rounded-full">Free</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
