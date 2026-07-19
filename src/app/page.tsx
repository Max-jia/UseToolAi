import Link from "next/link";
import { getAllTools, getAllCategories, getToolsByCategory } from "@/lib/tools";
import SearchFilter from "@/components/SearchFilter";
import ToolIcon from "@/components/ToolIcon";
import NewsletterSignup from "@/components/NewsletterSignup";
import HeroSearch from "@/components/HeroSearch";

const TASKS = [
  { emoji: "✍️", label: "Write content", desc: "AI writing, editing & SEO", href: "/categories/writing-and-text" },
  { emoji: "🎨", label: "Generate images", desc: "Text-to-image, logos & design", href: "/categories/image-and-design" },
  { emoji: "🎬", label: "Create videos", desc: "AI video generation & editing", href: "/categories/video-and-animation" },
  { emoji: "💻", label: "Build with code", desc: "AI coding assistants & agents", href: "/categories/code-and-development" },
  { emoji: "🔬", label: "Research & analyze", desc: "Deep research, data & facts", href: "/categories/data-and-analysis" },
  { emoji: "⚡", label: "Boost productivity", desc: "Meetings, notes & workflows", href: "/categories/productivity" },
];

export default function HomePage() {
  const tools = getAllTools();
  const categories = getAllCategories();
  const topTools = tools.filter((t) => t.rating >= 4.5).slice(0, 9);

  return (
    <div>
      {/* Hero — task-oriented */}
      <section className="bg-white border-b border-[var(--color-border)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-white to-emerald-50/40" />
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-3">
              Find the right{" "}
              <span className="text-gradient">AI tool</span>
              {" "}for the job
            </h1>
            <p className="text-base text-[var(--color-text-muted)] max-w-lg mx-auto">
              {tools.length}+ AI tools, honestly reviewed. No marketing fluff.
              Just real comparisons to help you choose.
            </p>
          </div>

          <HeroSearch />

          {/* Task entry cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {TASKS.map((task) => (
              <Link
                key={task.label}
                href={task.href}
                className="group bg-white rounded-xl p-4 border border-[var(--color-border)] hover:border-[var(--color-primary-light)] card-lift text-center"
              >
                <div className="text-2xl mb-2">{task.emoji}</div>
                <div className="font-semibold text-sm text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
                  {task.label}
                </div>
                <div className="text-xs text-[var(--color-text-dim)] mt-1 hidden md:block">
                  {task.desc}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-lg font-bold mb-6">Featured Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group bg-white rounded-xl p-5 border border-[var(--color-border)] hover:border-[var(--color-primary-light)] card-lift"
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

      {/* Newsletter */}
      <NewsletterSignup />

      {/* Browse by Category */}
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
                    className="group bg-white rounded-lg p-3 border border-[var(--color-border)] hover:border-[var(--color-primary-light)] card-lift flex items-center gap-2.5"
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
