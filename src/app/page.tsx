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
      {/* Hero — editorial, not gradient */}
      <section className="border-b border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">
          <p className="text-xs font-medium tracking-widest uppercase text-[var(--color-text-dim)] mb-6">
            Hand-picked AI tools directory
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6">
            Find the <span className="text-gradient">right AI tools</span>
            <br />
            <span className="text-[var(--color-text-dim)]">without the hype.</span>
          </h1>
          <p className="text-lg text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
            {tools.length}+ tools across {categories.length} categories. Real reviews, verified pricing,
            honest pros and cons — not another generic SaaS directory.
          </p>
          <div className="flex gap-3 mt-8">
            <Link
              href="#search"
              className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-black font-semibold px-6 py-3 rounded-lg hover:bg-amber-300 transition-colors text-sm"
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
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[var(--color-text-dim)]">
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
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[var(--color-text-dim)]">
            All tools
          </h2>
          <div className="flex-1 h-px bg-[var(--color-border)]" />
          <span className="text-xs text-[var(--color-text-dim)]">{tools.length} listed</span>
        </div>
        <SearchFilter tools={tools} categories={categories} />
      </section>
    </div>
  );
}
