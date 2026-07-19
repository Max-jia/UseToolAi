import Link from "next/link";
import { getAllTools } from "@/lib/tools";
import type { Metadata } from "next";
import ToolIcon from "@/components/ToolIcon";

export const metadata: Metadata = {
  title: "New & Recently Updated AI Tools — UseToolAI",
  description: "Latest AI tool additions and updates. Fresh reviews, new comparisons, and recently updated tool pages.",
};

export default function NewToolsPage() {
  const tools = getAllTools()
    .filter((t) => t.updated)
    .sort((a, b) => (b.updated || "").localeCompare(a.updated || ""))
    .slice(0, 20);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <nav className="text-sm text-[var(--color-text-muted)] mb-6">
        <Link href="/" className="hover:text-[var(--color-primary)]">Home</Link>
        {" / "}
        <span className="text-[var(--color-text)] font-medium">New & Updated</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-2">New & Recently Updated</h1>
        <p className="text-[var(--color-text-muted)]">
          Latest AI tool additions and updates. We refresh tool information regularly — pricing, features, and reviews.
        </p>
      </div>

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
            </div>
            <p className="text-xs text-[var(--color-text-muted)] line-clamp-2 mb-2">{tool.description}</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--color-text-dim)]">{tool.pricing.split(" / ")[0]}</span>
              {tool.updated && (
                <span className="text-[var(--color-accent)] font-medium">Updated {tool.updated}</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
