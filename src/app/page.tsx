import Link from "next/link";
import { getAllTools, getAllCategories, getToolsByCategory } from "@/lib/tools";

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
      {/* Hero section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="max-w-5xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
            Find the Best AI Tools<br />
            <span className="text-yellow-300">for Every Task</span>
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Hand-picked directory of {tools.length}+ AI tools. Compare features,
            pricing, and ratings to find the perfect tool for your workflow.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/categories"
              className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-full hover:bg-indigo-50 transition shadow-lg"
            >
              Browse Categories
            </Link>
            <a
              href="#featured"
              className="border-2 border-white/40 text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition"
            >
              Top Rated Tools ↓
            </a>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const catTools = getToolsByCategory(cat);
            const slug = cat.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
            return (
              <Link
                key={cat}
                href={`/categories/${slug}`}
                className="bg-white rounded-2xl p-6 border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-md transition-all group"
              >
                <div className="text-3xl mb-3">{categoryIcons[cat] || "🔧"}</div>
                <h3 className="font-semibold group-hover:text-[var(--color-primary)] transition-colors">
                  {cat}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                  {catTools.length} tools
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Top Rated */}
      <section id="featured" className="max-w-6xl mx-auto px-4 py-8 pb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">⭐ Top Rated AI Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="bg-white rounded-2xl p-6 border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-lg transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600">
                  {tool.category}
                </span>
                <span className="stars text-sm tracking-wider">
                  {"★".repeat(Math.floor(tool.rating))}
                  {"☆".repeat(5 - Math.floor(tool.rating))}
                </span>
              </div>
              <h3 className="font-bold text-lg mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                {tool.name}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 mb-3">
                {tool.description}
              </p>
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-[var(--color-text-muted)]">
                  {tool.pricing.split(" / ")[0]}
                </span>
                <span className="text-[var(--color-primary)] group-hover:translate-x-1 transition-transform">
                  View details →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 pb-20 text-center">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-12 border border-indigo-100">
          <h2 className="text-2xl font-bold mb-3">Can&apos;t find what you need?</h2>
          <p className="text-[var(--color-text-muted)] mb-6">
            Browse all {tools.length} tools across {categories.length} categories
          </p>
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white font-semibold px-8 py-3 rounded-full hover:bg-[var(--color-primary-dark)] transition shadow-lg"
          >
            Explore All Categories →
          </Link>
        </div>
      </section>
    </div>
  );
}
