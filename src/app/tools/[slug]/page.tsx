import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTools, getToolBySlug, getToolsByCategory } from "@/lib/tools";
import type { Metadata } from "next";
import ReactMarkdown from "./MarkdownContent";
import AdSlot from "@/components/AdSlot";
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
    title: `${tool.name} Review 2026 – Pricing, Features & Alternatives`,
    description: `In-depth ${tool.name} review: features, pricing, pros & cons, best use cases, and top alternatives. Find out if ${tool.name} is right for you.`,
  };
}

function ProductSchema({ tool }: { tool: ReturnType<typeof getToolBySlug> }) {
  if (!tool) return null;
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: tool.category,
    offers: {
      "@type": "Offer",
      description: tool.pricing,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tool.rating,
      bestRating: 5,
      worstRating: 1,
      ratingCount: 10,
    },
    operatingSystem: "Web",
    url: `https://usetoolai.com/tools/${tool.slug}`,
  });
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />;
}

function ToolFAQSchema({ tool }: { tool: ReturnType<typeof getToolBySlug> }) {
  if (!tool) return null;
  // Auto-generate FAQ from tool data
  const faqs: { q: string; a: string }[] = [
    { q: `What is ${tool.name}?`, a: tool.description },
    { q: `How much does ${tool.name} cost?`, a: tool.pricingDetails || tool.pricing },
  ];
  if (tool.bestFor) {
    faqs.push({ q: `Who is ${tool.name} best for?`, a: tool.bestFor });
  }
  const altNames = tool.alternatives?.map((a) => a.name).join(", ");
  if (altNames) {
    faqs.push({ q: `What are the best alternatives to ${tool.name}?`, a: `Top alternatives include ${altNames}. Click through for full comparisons on each.` });
  }
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  });
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />;
}

/** Extract a short "Best for" label from the bestFor text */
function bestForShort(bestFor?: string): string | null {
  if (!bestFor) return null;
  // Try to grab the first sentence before "Best for:" or the first sentence
  const match = bestFor.match(/Best for:\s*(.+?)(?:\.|$)/);
  if (match) return match[1].trim();
  // Otherwise take first 80 chars
  return bestFor.length > 80 ? bestFor.slice(0, 80) + "…" : bestFor;
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) notFound();

  const relatedTools = getToolsByCategory(tool.category)
    .filter((t) => t.slug !== tool.slug)
    .slice(0, 4);

  const categorySlug = tool.category
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/&/g, "and");

  const altTools = tool.alternatives
    ?.map((a) => getToolBySlug(a.slug))
    .filter(Boolean) as (ReturnType<typeof getToolBySlug>)[];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <ProductSchema tool={tool} />
      <ToolFAQSchema tool={tool} />
      {/* Breadcrumb */}
      <nav className="text-sm text-[var(--color-text-muted)] mb-6">
        <Link href="/" className="hover:text-[var(--color-primary)]">Home</Link>
        {" / "}
        <Link href={`/categories/${categorySlug}`} className="hover:text-[var(--color-primary)]">
          {tool.category}
        </Link>
        {" / "}
        <span className="text-[var(--color-text)] font-medium">{tool.name}</span>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-50 via-white to-emerald-50 rounded-2xl p-8 md:p-10 mb-8 border border-indigo-100/60 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <ToolIcon url={tool.url} name={tool.name} size={56} />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">{tool.category}</span>
              {bestForShort(tool.bestFor) && (
                <span className="text-xs px-3 py-1 rounded-full bg-amber-100 text-amber-700" title={tool.bestFor}>
                  🎯 {bestForShort(tool.bestFor)}
                </span>
              )}
            </div>
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
          {tool.name} Review 2026
        </h1>
        <p className="text-lg text-[var(--color-text-dim)] mb-4 leading-relaxed">{tool.description}</p>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="stars text-xl tracking-wider">
            {"★".repeat(Math.floor(tool.rating))}
            {"☆".repeat(5 - Math.floor(tool.rating))}
          </span>
          <span className="text-[var(--color-text-dim)] text-sm">{tool.rating}/5</span>
        </div>
      </div>

      {/* Core Strength — What Makes It Unique */}
      {tool.coreStrength && (
        <div className="bg-[var(--color-card)] rounded-2xl p-6 md:p-8 border border-[var(--color-primary)]/20 mb-8">
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">💎</span>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-primary)] mb-2">
                What Makes {tool.name} Unique
              </h2>
              <p className="text-base text-[var(--color-text-muted)] leading-relaxed">
                {tool.coreStrength}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Detailed description */}
          <section className="bg-[var(--color-card)] rounded-2xl p-6 md:p-8 border border-[var(--color-border)]">
            <h2 className="text-xl font-bold mb-4">What is {tool.name}?</h2>
            {tool.content ? (
              <ReactMarkdown content={tool.content} />
            ) : (
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                {tool.description}
              </p>
            )}
          </section>

          {/* Features */}
          {tool.features && tool.features.length > 0 && (
            <section className="bg-[var(--color-card)] rounded-2xl p-6 md:p-8 border border-[var(--color-border)]">
              <h2 className="text-xl font-bold mb-4">Key Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tool.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                    {feat}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Pros & Cons */}
          {(tool.pros || tool.cons) && (
            <section className="bg-[var(--color-card)] rounded-2xl p-6 md:p-8 border border-[var(--color-border)]">
              <h2 className="text-xl font-bold mb-4">Pros & Cons</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tool.pros && tool.pros.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-green-700 mb-3 text-sm uppercase tracking-wide">
                      ✅ Pros
                    </h3>
                    <ul className="space-y-2">
                      {tool.pros.map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                          <span className="text-green-500 mt-0.5 flex-shrink-0">+</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {tool.cons && tool.cons.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-red-600 mb-3 text-sm uppercase tracking-wide">
                      ❌ Cons
                    </h3>
                    <ul className="space-y-2">
                      {tool.cons.map((c, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                          <span className="text-red-400 mt-0.5 flex-shrink-0">−</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Ad */}
          <AdSlot slot="1234567890" format="rectangle" className="py-2" />

          {/* Best for */}
          {tool.bestFor && (
            <section className="bg-gradient-to-r from-[var(--color-surface)] to-[var(--color-card)] rounded-2xl p-6 md:p-8 border border-[var(--color-border)]">
              <h2 className="text-xl font-bold mb-3">Who Is It Best For?</h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed">{tool.bestFor}</p>
            </section>
          )}

          {/* Alternatives */}
          {altTools && altTools.length > 0 && (
            <section className="bg-[var(--color-card)] rounded-2xl p-6 md:p-8 border border-[var(--color-border)]">
              <h2 className="text-xl font-bold mb-4">Top Alternatives to {tool.name}</h2>
              <div className="space-y-3">
                {altTools.filter(Boolean).map((alt) => alt && (
                  <Link
                    key={alt.slug}
                    href={`/tools/${alt.slug}`}
                    className="block bg-[var(--color-surface)] rounded-xl p-4 hover:bg-[var(--color-surface)] transition-colors group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold group-hover:text-[var(--color-primary)] transition-colors">
                          {alt.name}
                        </h3>
                        <p className="text-sm text-[var(--color-text-muted)] mt-1">{alt.description}</p>
                      </div>
                      <span className="text-xs text-[var(--color-primary)] font-medium mt-1 flex-shrink-0 ml-4">
                        Compare →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Pricing card */}
          <div className="bg-[var(--color-card)] rounded-2xl p-6 border border-[var(--color-border)] sticky top-20">
            <h3 className="font-bold text-sm uppercase tracking-wide text-[var(--color-text-muted)] mb-4">
              Quick Facts
            </h3>

            <div className="space-y-4 text-sm">
              <div>
                <span className="text-xs text-[var(--color-text-muted)] block mb-1">Pricing</span>
                <span className="font-semibold">{tool.pricing}</span>
              </div>

              {tool.pricingDetails && (
                <div>
                  <span className="text-xs text-[var(--color-text-muted)] block mb-1">Pricing Details</span>
                  <span className="text-[var(--color-text-muted)]">{tool.pricingDetails}</span>
                </div>
              )}

              <div>
                <span className="text-xs text-[var(--color-text-muted)] block mb-1">Rating</span>
                <span className="stars text-sm tracking-wider">
                  {"★".repeat(Math.floor(tool.rating))}
                  {"☆".repeat(5 - Math.floor(tool.rating))}
                </span>
                <span className="text-[var(--color-text-muted)] ml-1">{tool.rating}/5</span>
              </div>

              {tool.updated && (
                <div>
                  <span className="text-xs text-[var(--color-text-muted)] block mb-1">Last Updated</span>
                  <span className="text-xs text-[var(--color-text-dim)]">{tool.updated}</span>
                </div>
              )}

              <div>
                <span className="text-xs text-[var(--color-text-muted)] block mb-2">Tags</span>
                <div className="flex flex-wrap gap-1.5">
                  {tool.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-[var(--color-text-muted)] px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <a
              href={tool.affiliateUrl || tool.url}
              target="_blank"
              rel={tool.affiliateUrl ? "sponsored noopener noreferrer" : "noopener noreferrer"}
              className="block text-center w-full mt-6 bg-[var(--color-accent)] text-white font-semibold px-6 py-3 rounded-xl hover:bg-emerald-600 transition shadow-md btn-glow"
            >
              Visit {tool.name} →
            </a>
          </div>
        </aside>
      </div>

      {/* Related at bottom */}
      {relatedTools.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4">More in {tool.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedTools.map((rt) => (
              <Link
                key={rt.slug}
                href={`/tools/${rt.slug}`}
                className="bg-[var(--color-card)] rounded-xl p-5 border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-sm transition-all group"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold group-hover:text-[var(--color-primary)] transition-colors">
                    {rt.name}
                  </h3>
                  <span className="stars text-sm">
                    {"★".repeat(Math.floor(rt.rating))}
                    {"☆".repeat(5 - Math.floor(rt.rating))}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-text-muted)] line-clamp-2">{rt.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
