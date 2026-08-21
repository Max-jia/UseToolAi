import Link from "next/link";
import { PenLine, Palette, Clapperboard, Terminal, FlaskConical, Zap } from "lucide-react";
import { getAllTools, getAllCategories, getToolsByCategory } from "@/lib/tools";
import { categoryIcons, fallbackCategoryIcon } from "@/lib/categoryIcons";
import { SearchProvider } from "@/components/SearchContext";
import SearchFilter from "@/components/SearchFilter";
import HeroSearch from "@/components/HeroSearch";
import ToolIcon from "@/components/ToolIcon";
import NewsletterSignup from "@/components/NewsletterSignup";
import { formatHumanDate } from "@/lib/dates";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UseToolAI — Find the Best AI Tools in 2026",
  description:
    "Discover and compare 100+ hand-picked AI tools for writing, design, video, coding, audio, and productivity. Honest reviews, real pricing, and verified comparisons.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "UseToolAI — Find the Best AI Tools in 2026",
    description:
      "Discover and compare 100+ hand-picked AI tools. Honest reviews, real pricing, and verified comparisons.",
    url: "/",
    type: "website",
  },
};

function HomepageSchemas({ tools }: { tools: { name: string; slug: string; description: string; rating: number }[] }) {
  const itemListSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured AI Tools",
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool.name,
      url: `https://usetoolai.com/tools/${tool.slug}`,
      description: tool.description,
    })),
  });
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: itemListSchema }} />
  );
}

const TASKS = [
  { icon: PenLine, label: "Write content", desc: "AI writing, editing & SEO", href: "/categories/writing-and-text" },
  { icon: Palette, label: "Generate images", desc: "Text-to-image, logos & design", href: "/categories/image-and-design" },
  { icon: Clapperboard, label: "Create videos", desc: "AI video generation & editing", href: "/categories/video-and-animation" },
  { icon: Terminal, label: "Build with code", desc: "AI coding assistants & agents", href: "/categories/code-and-development" },
  { icon: FlaskConical, label: "Research & analyze", desc: "Deep research, data & facts", href: "/categories/data-and-analytics" },
  { icon: Zap, label: "Boost productivity", desc: "Meetings, notes & workflows", href: "/categories/productivity" },
];

export default function HomePage() {
  const tools = getAllTools();
  const categories = getAllCategories();
  const topTools = tools.filter((t) => t.rating >= 4.5 && t.updated).slice(0, 9);

  return (
    <SearchProvider>
      <div>
      <HomepageSchemas tools={topTools} />
      {/* Hero — task-oriented */}
      <section className="bg-white border-b border-[var(--color-border)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-white to-emerald-50/40" />
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h1 className="text-3xl md:text-5xl font-bold leading-snug tracking-tight mb-3">
              Find the Best{" "}
              <span className="text-gradient">AI Tools in 2026</span>
              <br />
              <span className="text-[var(--color-text)]">— Honestly Reviewed.</span>
            </h1>
            <p className="text-base text-[var(--color-text-muted)] max-w-lg mx-auto leading-relaxed mt-4">
              {tools.length}+ hand-picked AI tools, tested and compared on real pricing, real features, and real trade-offs. No fluff.
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
                <div className="mb-2 flex justify-center">
                  <task.icon className="w-6 h-6 text-[var(--color-primary)]" strokeWidth={1.5} />
                </div>
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
            <div
              key={tool.slug}
              className="group bg-white rounded-xl p-5 border border-[var(--color-border)] hover:border-[var(--color-primary-light)] card-lift"
            >
              <Link href={`/tools/${tool.slug}`} className="block">
                <div className="flex items-center gap-3 mb-1.5">
                  <ToolIcon url={tool.url} name={tool.name} size={28} />
                  <h3 className="font-semibold text-sm group-hover:text-[var(--color-primary)] transition-colors">
                    {tool.name}
                  </h3>
                </div>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed line-clamp-2">
                  {tool.description}
                </p>
                <div className="mt-1.5 flex items-center gap-2 text-xs">
                  <span className="text-[var(--color-text-dim)]">{tool.pricing.split(" / ")[0]}</span>
                  <span className="stars text-xs tracking-wider">
                    {"★".repeat(Math.floor(tool.rating))}
                    {"☆".repeat(5 - Math.floor(tool.rating))}
                  </span>
                </div>
              </Link>
              <p className="mt-1.5 text-xs">
                {tool.updated ? (
                  <Link href="/how-we-verify" className="text-emerald-700 font-medium hover:underline">
                    ✓ Verified {formatHumanDate(tool.updated)}
                  </Link>
                ) : (
                  <span className="text-[var(--color-text-dim)]">Not yet verified</span>
                )}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSignup />

      {/* Browse by Category */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <h2 className="text-lg font-bold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.slice(0, 9).map((cat) => {
            const catTools = getToolsByCategory(cat);
            const slug = cat.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
            const CategoryIcon = categoryIcons[cat] ?? fallbackCategoryIcon;
            return (
              <Link
                key={cat}
                href={`/categories/${slug}`}
                className="group bg-white rounded-xl p-4 border border-[var(--color-border)] hover:border-[var(--color-primary-light)] card-lift flex items-center gap-3"
              >
                <CategoryIcon className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0" strokeWidth={1.5} />
                <div className="min-w-0">
                  <div className="font-semibold text-sm truncate group-hover:text-[var(--color-primary)] transition-colors">
                    {cat}
                  </div>
                  <div className="text-xs text-[var(--color-text-muted)]">{catTools.length} tools</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* All tools with search */}
      <section id="all-tools" className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-lg font-bold mb-6">All Tools</h2>
        <SearchFilter tools={tools} categories={categories} />
      </section>
    </div>
    </SearchProvider>
  );
}
