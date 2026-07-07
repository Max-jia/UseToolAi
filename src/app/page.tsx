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
      {/* Hero — minimal, like indiemakers.tools */}
      <section className="bg-white border-b border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-3">
            All in One Tools<br />for AI Builders
          </h1>
          <p className="text-base text-[var(--color-text-muted)] max-w-lg mb-6">
            A curated directory of {tools.length}+ AI tools and resources.
            Honest reviews, real pricing. Let&apos;s find the right one for you.
          </p>
          <Link
            href="#all-tools"
            className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white font-medium px-6 py-3 rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors text-sm"
          >
            Browse tools ↓
          </Link>
        </div>
      </section>

      {/* Categories — horizontal text links like indiemakers.tools */}
      <section className="bg-white border-b border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-6 py-4 overflow-x-auto">
          <div className="flex gap-1 text-sm whitespace-nowrap">
            {categories.map((cat) => {
              const slug = cat.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
              return (
                <Link
                  key={cat}
                  href={`/categories/${slug}`}
                  className="px-3 py-2 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)] transition-colors"
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Products — like indiemakers.tools "Feature Products" */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-lg font-bold mb-6">Feature Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group bg-white rounded-xl p-5 border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <ToolIcon url={tool.url} name={tool.name} size={32} />
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

      {/* All tools — with search */}
      <section id="all-tools" className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-lg font-bold mb-6">All Tools</h2>
        <SearchFilter tools={tools} categories={categories} />
      </section>
    </div>
  );
}
