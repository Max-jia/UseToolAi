"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

const categories = [
  { name: "Writing & Text", icon: "✍️" },
  { name: "Image & Design", icon: "🎨" },
  { name: "Video & Animation", icon: "🎬" },
  { name: "Code & Development", icon: "💻" },
  { name: "Productivity", icon: "⚡" },
  { name: "Audio & Voice", icon: "🎙️" },
  { name: "Marketing & SEO", icon: "📈" },
  { name: "Data & Analysis", icon: "📊" },
];

export default function HeaderNav() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const slug = (cat: string) => cat.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0F0F1A]/80 backdrop-blur-xl border-b border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 mr-2">
          <img src="/logo-small.png" alt="UseToolAI" width={28} height={28} className="rounded-lg" />
          <span className="font-bold text-base tracking-tight hidden sm:inline">
            UseTool<span className="text-[var(--color-primary)]">AI</span>
          </span>
        </Link>

        {/* Browse dropdown */}
        <div className="relative flex-shrink-0" ref={ref}>
          <button
            onClick={() => setOpen(!open)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              open
                ? "bg-[var(--color-surface)] text-[var(--color-primary)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)]"
            }`}
          >
            Browse
            <svg className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {open && (
            <div className="absolute top-full mt-1.5 left-0 w-64 bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] shadow-xl shadow-black/5 py-2 animate-[fadeIn_0.15s_ease]">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={`/categories/${slug(cat.name)}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--color-surface)] transition-colors text-sm"
                >
                  <span className="text-base">{cat.icon}</span>
                  <span className="font-medium text-[var(--color-text)]">{cat.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right nav */}
        <div className="flex items-center gap-1 text-sm flex-shrink-0">
          <Link href="/compare" className="px-2.5 py-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors font-medium">
            Compare
          </Link>
          <Link href="/new" className="px-2.5 py-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors font-medium">
            New
          </Link>
          <Link href="/blog" className="px-2.5 py-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors font-medium">
            Blog
          </Link>
          <div className="ml-1">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
