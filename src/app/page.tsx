import Link from "next/link";
import { getAllTools, getAllCategories, getToolsByCategory } from "@/lib/tools";
import SearchFilter from "@/components/SearchFilter";

export default function HomePage() {
  const tools = getAllTools();
  const categories = getAllCategories();

  const categoryIcons: Record<string, string> = {
    "Writing & Text": "✍️",
    "Image & Design": "🎨",
    "Video & Animation": "🎬",
    "Productivity": "⚡",
    "Code & Development": "💻",
    "Audio & Voice": "🎵",
    "Marketing & SEO": "📈",
    "Data & Analysis": "📊",
  };

  const topTools = tools.filter((t) => t.rating >= 4.5).slice(0, 6);

  return (
    <div>
      {/* Hero — clean editorial */}
      <section className="border-b border-[var(--color-border)] bg-white">
        <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
          <h1 className="text-3xl md:text-5xl font-bold leading-[1.15] tracking-tight mb-4">
            Find the right AI tools<br />
            <span className="text-[var(--color-text-dim)]">for every task.</span>
          </h1>
          <p className="text-base text-[var(--color-text-muted)] max-w-xl leading-relaxed">
            {tools.length}+ tools across {categories.length} categories. Real reviews, honest pricing.
          </p>
          <div className="flex gap-3 mt-8">
            <Link
              href="#search"
              className="inline-flex items-center gap-2 bg-indigo-500 text-white font-semibold hover:bg-indigo-400 px-6 py-3 rounded-lg hover:bg-amber-300 transition-colors text-sm"
            >
              Browse tools
              <span className="text-xs opacity-60">↓</span>
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 border border-[var(--color-border)] text-[var(--color-text)] font-medium px-6 py-3 rounded-lg hover:border-[var(--color-text-dim)] transition-colors text-sm"
            >
              Read comparisons
            </Link>
          </div>
        </div>
      </section>

      {/* Category row */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[var(--color-text-dim)] whitespace-nowrap">
            Browse by category
          </h2>
          <div className="flex-1 h-px bg-[var(--color-border)]" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((cat) => {
            const catTools = getToolsByCategory(cat);
            const slug = cat.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
            return (
              <Link
                key={cat}
                href={`/categories/${slug}`}
                className="group bg-[var(--color-card)] rounded-xl p-5 border border-[var(--color-border)] hover:border-amber-500/30 hover:bg-[var(--color-card-hover)] transition-all"
              >
                <div className="text-2xl mb-3">{categoryIcons[cat] || "🔧"}</div>
                <h3 className="font-semibold text-sm mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                  {cat}
                </h3>
                <p className="text-xs text-[var(--color-text-dim)]">{catTools.length} tools</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Search section */}
      <section id="search" className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[var(--color-text-dim)] whitespace-nowrap">
            All tools
          </h2>
          <div className="flex-1 h-px bg-[var(--color-border)]" />
          <span className="text-xs text-[var(--color-text-dim)] whitespace-nowrap">{tools.length} listed</span>
        </div>
        <SearchFilter tools={tools} categories={categories} />
      </section>
    </div>
  );
}
