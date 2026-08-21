import Link from "next/link";
import { PenLine, Palette, Clapperboard, Terminal, Zap, Mic, TrendingUp, BarChart3, Wrench, type LucideIcon } from "lucide-react";
import { getAllCategories, getToolsByCategory } from "@/lib/tools";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tool Categories — UseToolAI",
  description:
    "Browse every AI tool category: writing, design, video, coding, audio, productivity, automation, marketing, and data analysis. Compare top tools in each category.",
  alternates: { canonical: "/categories" },
};

const categoryIcons: Record<string, LucideIcon> = {
  "Writing & Text": PenLine,
  "Image & Design": Palette,
  "Video & Animation": Clapperboard,
  "Productivity": Zap,
  "Code & Development": Terminal,
  "Audio & Voice": Mic,
  "Marketing & SEO": TrendingUp,
  "Data & Analytics": BarChart3,
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <nav className="text-sm text-[var(--color-text-muted)] mb-6">
        <Link href="/" className="hover:text-[var(--color-primary)]">Home</Link>
        {" / "}
        <span className="text-[var(--color-text)] font-medium">All Categories</span>
      </nav>

      <h1 className="text-3xl font-extrabold mb-2">All Categories</h1>
      <p className="text-[var(--color-text-muted)] mb-8">
        {categories.length} categories — click to browse tools
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => {
          const tools = getToolsByCategory(cat);
          const slug = cat.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
          const CategoryIcon = categoryIcons[cat] ?? Wrench;
          return (
            <Link
              key={cat}
              href={`/categories/${slug}`}
              className="bg-[var(--color-card)] rounded-2xl p-6 border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-md transition-all group flex items-start gap-5"
            >
              <div className="flex-shrink-0 mt-1">
                <CategoryIcon className="w-9 h-9 text-[var(--color-primary)]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                  {cat}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-2">
                  {tools.length} tools
                </p>
                <div className="flex flex-wrap gap-1">
                  {tools.slice(0, 3).map((t) => (
                    <span key={t.slug} className="text-xs bg-[var(--color-surface)] px-2 py-0.5 rounded text-[var(--color-text-muted)]">
                      {t.name}
                    </span>
                  ))}
                  {tools.length > 3 && (
                    <span className="text-xs text-[var(--color-text-muted)]">
                      +{tools.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
