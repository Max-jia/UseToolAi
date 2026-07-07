import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTools, getToolBySlug, getToolsByCategory } from "@/lib/tools";
import type { Metadata } from "next";
import ToolIcon from "@/components/ToolIcon";

export function generateStaticParams() {
  return getAllTools().map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: `Best ${tool.name} Alternatives in 2026 — Top Competitors Compared`,
    description: `Looking for alternatives to ${tool.name}? We compare the top ${tool.category.toLowerCase()} tools with better pricing, different features, or stronger capabilities.`,
  };
}

export default async function AlternativesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  // Get alternatives: same-category tools with highest rating, excluding this tool
  const sameCat = getToolsByCategory(tool.category).filter((t) => t.slug !== tool.slug);
  const alternatives = sameCat.sort((a, b) => b.rating - a.rating).slice(0, 12);

  // Also get top tools from OTHER categories as "broader alternatives"
  const broaderAlternatives = getAllTools()
    .filter((t) => t.category !== tool.category && t.slug !== tool.slug)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <nav className="text-sm text-[var(--color-text-muted)] mb-6">
        <Link href="/" className="hover:text-[var(--color-primary)]">Home</Link>
        {" / "}
        <Link href={`/tools/${tool.slug}`} className="hover:text-[var(--color-primary)]">{tool.name}</Link>
        {" / "}
        <span className="text-[var(--color-text)] font-medium">Alternatives</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight mb-3">
          Best {tool.name} Alternatives in 2026
        </h1>
        <p className="text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
          {tool.name} is great for {tool.bestFor?.split(".")[0] || tool.description.toLowerCase()}.
          But it&apos;s not the only option. Here are the best alternatives, compared by pricing, features, and use case.
        </p>
      </div>

      {/* Same-category alternatives */}
      <section className="mb-12">
        <h2 className="text-lg font-bold mb-4">
          Top {tool.category} Alternatives
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alternatives.map((alt) => (
            <Link
              key={alt.slug}
              href={`/tools/${alt.slug}`}
              className="group bg-white rounded-xl p-5 border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <ToolIcon url={alt.url} name={alt.name} size={32} />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm group-hover:text-[var(--color-primary)] transition-colors">
                    {alt.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="stars text-xs tracking-wider">
                      {"★".repeat(Math.floor(alt.rating))}
                      {"☆".repeat(5 - Math.floor(alt.rating))}
                    </span>
                    <span className="text-xs text-[var(--color-text-dim)]">{alt.pricing.split(" / ")[0]}</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] line-clamp-2 leading-relaxed">
                {alt.description}
              </p>
              {alt.coreStrength && (
                <p className="text-xs text-[var(--color-primary)] mt-2">💎 {alt.coreStrength.split(".")[0]}.</p>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* Broader alternatives */}
      {broaderAlternatives.length > 0 && (
        <section className="mb-12">
          <h2 className="text-lg font-bold mb-4">
            Other AI Tools to Consider
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {broaderAlternatives.map((alt) => (
              <Link
                key={alt.slug}
                href={`/tools/${alt.slug}`}
                className="group bg-white rounded-lg p-3 border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-colors flex items-center gap-2.5"
              >
                <ToolIcon url={alt.url} name={alt.name} size={24} />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-xs truncate group-hover:text-[var(--color-primary)] transition-colors">
                    {alt.name}
                  </h4>
                  <span className="text-[10px] text-[var(--color-text-dim)]">{alt.category}</span>
                </div>
                <span className="stars text-[10px] tracking-wider flex-shrink-0">
                  {"★".repeat(Math.floor(alt.rating))}
                  {"☆".repeat(5 - Math.floor(alt.rating))}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Compare CTA */}
      <section className="bg-[var(--color-surface)] rounded-2xl p-6 text-center">
        <p className="text-[var(--color-text-muted)] mb-3">
          Want a side-by-side comparison?
        </p>
        <div className="flex justify-center gap-2 flex-wrap">
          {alternatives.slice(0, 3).map((alt) => {
            const slugs = [tool.slug, alt.slug].sort().join("-vs-");
            return (
              <Link
                key={alt.slug}
                href={`/compare/${slugs}`}
                className="inline-flex items-center gap-1.5 bg-[var(--color-primary)] text-white font-medium px-4 py-2 rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors text-sm"
              >
                {tool.name} vs {alt.name}
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
