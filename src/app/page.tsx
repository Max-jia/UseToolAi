import Link from "next/link";
import { getAllTools, getAllCategories, getToolsByCategory } from "@/lib/tools";
import SearchFilter from "@/components/SearchFilter";
import ToolIcon from "@/components/ToolIcon";

export default function HomePage() {
  const tools = getAllTools();
  const categories = getAllCategories();
  const topTools = tools.filter((t) => t.rating >= 4.5).slice(0, 9);

  return (
    <div>
      {/* Hero — like indiemakers.tools: clean, simple */}
      <section className="bg-white border-b border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-3">
            All in One Tools<br />for AI Builders
          </h1>
          <p className="text-base text-[var(--color-text-muted)] max-w-lg">
            A curated directory of {tools.length}+ AI tools and resources to build your startup.
            Let&apos;s make it happen.
          </p>
        </div>
      </section>

      {/* Feature Products — exactly like indiemakers.tools */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-lg font-bold mb-6">Feature Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group bg-white rounded-xl p-5 border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-1.5">
                <ToolIcon url={tool.url} name={tool.name} size={28} />
                <h3 className="font-semibold text-sm group-hover:text-[var(--color-primary)] transition-colors">
                  {tool.name}
                </h3>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed line-clamp-2">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Browse by Category — horizontal layout like indiemakers.tools nav */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <h2 className="text-lg font-bold mb-6">Browse by Category</h2>
        {categories.map((cat) => {
          const catTools = getToolsByCategory(cat);
          const slug = cat.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
          return (
            <div key={cat} className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Link
                  href={`/categories/${slug}`}
                  className="font-semibold text-sm text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {cat}
                </Link>
                <span className="text-xs text-[var(--color-text-dim)]">{catTools.length} tools</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {catTools.slice(0, 3).map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="group bg-white rounded-lg p-3 border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-colors flex items-center gap-2.5"
                  >
                    <ToolIcon url={tool.url} name={tool.name} size={24} />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-xs truncate group-hover:text-[var(--color-primary)] transition-colors">
                        {tool.name}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
              {catTools.length > 3 && (
                <Link
                  href={`/categories/${slug}`}
                  className="inline-block mt-2 text-xs text-[var(--color-primary)] hover:underline"
                >
                  View all {catTools.length} tools →
                </Link>
              )}
            </div>
          );
        })}
      </section>

      {/* All tools with search */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-lg font-bold mb-6">All Tools</h2>
        <SearchFilter tools={tools} categories={categories} />
      </section>
    </div>
  );
}
