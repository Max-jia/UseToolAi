"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    posts.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    // Sort by count descending
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return [["All", posts.length] as [string, number], ...sorted];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [posts, activeCategory]);

  return (
    <>
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-1.5 mb-8">
        {categories.map(([cat, count]) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-[var(--color-primary)] text-white"
                : "bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10"
            }`}
          >
            {cat}
            <span className={`ml-1.5 text-xs ${
              activeCategory === cat
                ? "text-white/70"
                : "text-[var(--color-text-dim)]"
            }`}>
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Post List */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 text-[var(--color-text-muted)]">
          <p className="text-lg mb-2">No articles in this category yet — check back soon!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-[var(--color-card)] rounded-2xl p-5 border border-[var(--color-border)] hover:border-[var(--color-primary-light)] card-lift transition-all group"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[var(--color-surface)] text-[var(--color-primary)]">
                  {post.category}
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">{post.date}</span>
              </div>
              <h2 className="text-lg font-bold mb-1.5 group-hover:text-[var(--color-primary)] transition-colors leading-snug">
                {post.title}
              </h2>
              <p className="text-[var(--color-text-muted)] text-sm line-clamp-2 mb-3">
                {post.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="text-xs bg-[var(--color-surface)] text-[var(--color-text-muted)] px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
                {post.tags.length > 4 && (
                  <span className="text-xs text-[var(--color-text-dim)]">+{post.tags.length - 4}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
