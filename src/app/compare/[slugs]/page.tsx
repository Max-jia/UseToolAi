import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTools, getToolBySlug } from "@/lib/tools";
import type { Metadata } from "next";
import ToolIcon from "@/components/ToolIcon";

// Generate ALL 1,485 pairs at build time
export function generateStaticParams() {
  const tools = getAllTools();
  const params: { slugs: string }[] = [];
  for (let i = 0; i < tools.length; i++) {
    for (let j = i + 1; j < tools.length; j++) {
      params.push({ slugs: `${tools[i].slug}-vs-${tools[j].slug}` });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slugs: string }>;
}): Promise<Metadata> {
  const { slugs } = await params;
  const parts = slugs.split("-vs-");
  const [t1, t2] = [getToolBySlug(parts[0]), getToolBySlug(parts[1])];
  if (!t1 || !t2) return {};

  // Only meaningful comparisons: same category → indexable
  const isSameCategory = t1.category === t2.category;

  return {
    title: `${t1.name} vs ${t2.name} 2026 — Which Should You Choose?`,
    description: `Compare ${t1.name} and ${t2.name} side by side: pricing, features, pros & cons, ratings, and best use cases. Find out which AI tool is right for your workflow.`,
    robots: isSameCategory ? undefined : "noindex",
  };
}

function compare(a: string, b: string): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slugs: string }>;
}) {
  const { slugs } = await params;
  const parts = slugs.split("-vs-");
  const [toolA, toolB] = [getToolBySlug(parts[0]), getToolBySlug(parts[1])];
  if (!toolA || !toolB) notFound();

  const catA = toolA.category
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/&/g, "and");
  const catB = toolB.category
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/&/g, "and");

  // Build comparison rows
  const rows = [
    { label: "Category", a: toolA.category, b: toolB.category },
    { label: "Pricing", a: toolA.pricing, b: toolB.pricing },
    {
      label: "Rating",
      a: "★".repeat(Math.floor(toolA.rating)) + "☆".repeat(5 - Math.floor(toolA.rating)),
      b: "★".repeat(Math.floor(toolB.rating)) + "☆".repeat(5 - Math.floor(toolB.rating)),
    },
    { label: "Best For", a: (toolA.bestFor || "—").slice(0, 120) + ((toolA.bestFor?.length ?? 0) > 120 ? "..." : ""), b: (toolB.bestFor || "—").slice(0, 120) + ((toolB.bestFor?.length ?? 0) > 120 ? "..." : "") },
  ];

  // Shared tags
  const sharedTags = toolA.tags.filter((t) => toolB.tags.includes(t));
  const uniqueTagsA = toolA.tags.filter((t) => !toolB.tags.includes(t));
  const uniqueTagsB = toolB.tags.filter((t) => !toolA.tags.includes(t));

  // Find all related tools in the same categories
  const related = getAllTools()
    .filter(
      (t) =>
        (t.category === toolA.category || t.category === toolB.category) &&
        t.slug !== toolA.slug &&
        t.slug !== toolB.slug
    )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <nav className="text-sm text-[var(--color-text-muted)] mb-8">
        <Link href="/" className="hover:text-[var(--color-primary)]">Home</Link>
        {" / "}
        <Link href="/categories" className="hover:text-[var(--color-primary)]">Compare</Link>
        {" / "}
        <span className="text-[var(--color-text)] font-medium">
          {toolA.name} vs {toolB.name}
        </span>
      </nav>

      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
          {toolA.name}{" "}
          <span className="text-[var(--color-text-dim)] font-normal">vs</span>{" "}
          {toolB.name}
        </h1>
        <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
          Side-by-side comparison of pricing, features, ratings, and best use cases.
          Find out which tool fits your workflow.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] overflow-hidden mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--color-border)]">
              <th className="text-left p-5 text-xs font-semibold tracking-wider uppercase text-[var(--color-text-dim)] w-1/4">
                —
              </th>
              <th className="text-left p-5 text-sm font-bold">
                <Link href={`/tools/${toolA.slug}`} className="hover:text-[var(--color-primary)] transition-colors">
                  {toolA.name} →
                </Link>
              </th>
              <th className="text-left p-5 text-sm font-bold">
                <Link href={`/tools/${toolB.slug}`} className="hover:text-[var(--color-primary)] transition-colors">
                  {toolB.name} →
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-[var(--color-border)] last:border-0">
                <td className="p-5 text-xs font-semibold tracking-wider uppercase text-[var(--color-text-dim)]">
                  {row.label}
                </td>
                <td className="p-5 text-sm text-[var(--color-text-muted)]">{row.a}</td>
                <td className="p-5 text-sm text-[var(--color-text-muted)]">{row.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Core Strengths side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {([toolA, toolB] as const).map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="bg-[var(--color-card)] rounded-2xl p-6 border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-all group"
          >
            <h3 className="font-bold text-lg mb-2 group-hover:text-[var(--color-primary)] transition-colors">
              {tool.name}
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-3">
              {tool.coreStrength || tool.description}
            </p>
            <div className="flex items-center gap-2 mt-3">
              <span className="stars text-sm">
                {"★".repeat(Math.floor(tool.rating))}
                {"☆".repeat(5 - Math.floor(tool.rating))}
              </span>
              <span className="text-xs text-[var(--color-text-dim)]">{tool.pricing.split(" / ")[0]}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Tags comparison */}
      <div className="bg-[var(--color-card)] rounded-2xl p-6 border border-[var(--color-border)] mb-8">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-[var(--color-text-dim)] mb-4">
          Feature Tags
        </h3>
        {sharedTags.length > 0 && (
          <div className="mb-3">
            <span className="text-xs text-[var(--color-text-dim)] mr-2">Shared:</span>
            {sharedTags.map((t) => (
              <span key={t} className="text-xs bg-amber-500/10 text-[var(--color-primary)] px-2 py-0.5 rounded-full mr-1">
                {t}
              </span>
            ))}
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <span className="text-xs text-[var(--color-text-dim)] block mb-1">{toolA.name} only:</span>
            {uniqueTagsA.map((t) => (
              <span key={t} className="text-xs bg-[var(--color-surface)] text-[var(--color-text-muted)] px-2 py-0.5 rounded-full mr-1">
                {t}
              </span>
            ))}
          </div>
          <div className="flex-1">
            <span className="text-xs text-[var(--color-text-dim)] block mb-1">{toolB.name} only:</span>
            {uniqueTagsB.map((t) => (
              <span key={t} className="text-xs bg-[var(--color-surface)] text-[var(--color-text-muted)] px-2 py-0.5 rounded-full mr-1">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Pros & Cons side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {([toolA, toolB] as const).map((tool) => (
          <div key={tool.slug} className="bg-[var(--color-card)] rounded-2xl p-5 border border-[var(--color-border)]">
            <h3 className="font-bold text-sm mb-3">
              <Link href={`/tools/${tool.slug}`} className="hover:text-[var(--color-primary)] transition-colors">
                {tool.name} →
              </Link>
            </h3>
            {tool.pros && (
              <div className="mb-3">
                <h4 className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2">Pros</h4>
                <ul className="space-y-1">
                  {tool.pros.slice(0, 3).map((p, i) => (
                    <li key={i} className="text-xs text-[var(--color-text-muted)]">+ {p}</li>
                  ))}
                </ul>
              </div>
            )}
            {tool.cons && (
              <div>
                <h4 className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-2">Cons</h4>
                <ul className="space-y-1">
                  {tool.cons.slice(0, 3).map((c, i) => (
                    <li key={i} className="text-xs text-[var(--color-text-muted)]">− {c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Related comparisons */}
      {related.length > 0 && (
        <section className="border-t border-[var(--color-border)] pt-8">
          <h2 className="text-sm font-semibold tracking-wider uppercase text-[var(--color-text-dim)] mb-4">
            More Comparisons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {related.map((t) => {
              const slugA = [toolA.slug, t.slug].sort(compare).join("-vs-");
              const slugB = [toolB.slug, t.slug].sort(compare).join("-vs-");
              const useSlug = slugA.includes(toolA.slug) ? slugA : slugB;
              return (
                <Link
                  key={t.slug}
                  href={`/compare/${useSlug}`}
                  className="bg-[var(--color-card)] rounded-xl p-4 border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-all group text-sm"
                >
                  <span className="font-medium group-hover:text-[var(--color-primary)] transition-colors">
                    {t.name} vs {useSlug.includes(toolA.slug) ? toolA.name : toolB.name}
                  </span>
                  <span className="text-[var(--color-text-dim)] ml-2">→</span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Full reviews CTA */}
      <section className="text-center mt-12 pt-8 border-t border-[var(--color-border)]">
        <p className="text-[var(--color-text-muted)] mb-4">
          Want more detail? Read our in-depth reviews:
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href={`/tools/${toolA.slug}`}
            className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors text-sm"
          >
            {toolA.name} Full Review →
          </Link>
          <Link
            href={`/tools/${toolB.slug}`}
            className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors text-sm"
          >
            {toolB.name} Full Review →
          </Link>
        </div>
      </section>
    </div>
  );
}
