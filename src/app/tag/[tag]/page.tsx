import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTags, getToolsByTag } from "@/lib/tools";
import type { Metadata } from "next";
import ToolIcon from "@/components/ToolIcon";

export function generateStaticParams() {
  return getAllTags().map((t) => ({ tag: t.tag }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  const tags = getAllTags();
  const info = tags.find((t) => t.tag === tag);
  if (!info) return {};
  return {
    title: `Best ${info.label} AI Tools (2026) — Free & Paid Options`,
    description: `Discover ${info.count} AI tools tagged "${info.label}". Compare features, pricing, and real user reviews to find the right ${info.label.toLowerCase()} tool for your workflow.`,
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const tags = getAllTags();
  const info = tags.find((t) => t.tag === tag);
  if (!info) notFound();

  const tools = getToolsByTag(tag);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <nav className="text-sm text-[var(--color-text-muted)] mb-6">
        <Link href="/" className="hover:text-[var(--color-primary)]">Home</Link>
        {" / "}
        <span className="text-[var(--color-text)] font-medium">{info.label} Tools</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-2">Best {info.label} AI Tools</h1>
        <p className="text-[var(--color-text-muted)]">
          {tools.length} hand-picked tools for {info.label.toLowerCase()}. Compare features, pricing, and real reviews.
        </p>
      </div>

      {/* Tag cloud */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tags.slice(0, 20).map((t) => (
          <Link
            key={t.tag}
            href={`/tag/${t.tag}`}
            className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${t.tag === tag ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"}`}
          >
            {t.label}
            <span className="ml-1.5 opacity-60">{t.count}</span>
          </Link>
        ))}
      </div>

      {/* Tool cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group bg-[var(--color-card)] rounded-xl p-5 border border-[var(--color-border)] hover:border-[var(--color-primary-light)] card-lift"
          >
            <div className="flex items-center gap-3 mb-2">
              <ToolIcon url={tool.url} name={tool.name} size={32} />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm group-hover:text-[var(--color-primary)] transition-colors truncate">
                  {tool.name}
                </h3>
                <span className="text-xs text-[var(--color-text-dim)]">{tool.category}</span>
              </div>
              <span className="stars text-xs tracking-wider flex-shrink-0">
                {"★".repeat(Math.floor(tool.rating))}
                {"☆".repeat(5 - Math.floor(tool.rating))}
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] line-clamp-2 mb-2">{tool.description}</p>
            <div className="text-xs font-medium text-[var(--color-text-dim)]">{tool.pricing.split(" / ")[0]}</div>
          </Link>
        ))}
      </div>

      {tools.length === 0 && (
        <div className="text-center py-16 text-[var(--color-text-muted)]">
          <p className="text-lg mb-2">No tools found for this tag.</p>
          <Link href="/" className="text-[var(--color-primary)] hover:underline">Browse all tools →</Link>
        </div>
      )}
    </div>
  );
}
