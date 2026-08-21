import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCategories, getToolsByCategory, getAllTools, slugifyCategory } from "@/lib/tools";
import { getCategoryContent } from "@/lib/categoryContent";
import type { Metadata } from "next";
import ToolIcon from "@/components/ToolIcon";
import ToolCardGrid from "@/components/ToolCardGrid";
import { formatHumanDate } from "@/lib/dates";

export function generateStaticParams() {
  const cats = getAllCategories();
  return cats.map((cat) => ({ slug: slugifyCategory(cat) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const allCats = getAllCategories();
  const category = allCats.find((c) => slugifyCategory(c) === slug);
  if (!category) return {};
  const count = getToolsByCategory(category).length;
  return {
    title: `Best ${category} AI Tools (2026) — ${count} Tested & Compared`,
    description: `Compare ${count} hand-picked ${category.toLowerCase()} AI tools: pricing, features, pros & cons, and best use cases. Honest reviews with real user feedback to help you choose.`,
    alternates: { canonical: `/categories/${slug}` },
    openGraph: {
      title: `Best ${category} AI Tools (2026)`,
      description: `Compare ${count} hand-picked ${category.toLowerCase()} AI tools with honest reviews and real pricing.`,
      url: `/categories/${slug}`,
    },
  };
}

function CategorySchemas({ slug, category, tools }: { slug: string; category: string; tools: ReturnType<typeof getToolsByCategory> }) {
  const listSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category} AI Tools`,
    description: `Hand-picked ${category.toLowerCase()} AI tools compared by pricing, features, and real user reviews.`,
    url: `https://usetoolai.com/categories/${slug}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: tools.length,
      itemListElement: tools.map((tool, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: tool.name,
        url: `https://usetoolai.com/tools/${tool.slug}`,
        description: tool.description,
      })),
    },
  });
  const breadcrumbSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://usetoolai.com" },
      { "@type": "ListItem", position: 2, name: "Categories", item: "https://usetoolai.com/categories" },
      { "@type": "ListItem", position: 3, name: `${category} AI Tools`, item: `https://usetoolai.com/categories/${slug}` },
    ],
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: listSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
    </>
  );
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const allCats = getAllCategories();
  const category = allCats.find((c) => slugifyCategory(c) === slug);

  if (!category) notFound();

  const tools = getToolsByCategory(category);
  const allTools = getAllTools();
  const guide = getCategoryContent(slug);
  const topTools = [...tools].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <CategorySchemas slug={slug} category={category} tools={tools} />

      <nav className="text-sm text-[var(--color-text-muted)] mb-6">
        <Link href="/" className="hover:text-[var(--color-primary)]">Home</Link>
        {" / "}
        <Link href="/categories" className="hover:text-[var(--color-primary)]">Categories</Link>
        {" / "}
        <span className="text-[var(--color-text)] font-medium">{category}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-2">Best {category} AI Tools (2026)</h1>
        <p className="text-[var(--color-text-muted)]">
          {tools.length} hand-picked tools, compared on pricing, features, and real user reviews.
        </p>
      </div>

      {/* Curated category guide */}
      {guide && (
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="md:col-span-2 bg-[var(--color-card)] rounded-2xl p-6 border border-[var(--color-border)]">
            <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{guide.intro}</p>
            {guide.howToChoose.length > 0 && (
              <>
                <h2 className="font-bold text-sm mt-5 mb-3">How to choose</h2>
                <ul className="space-y-2">
                  {guide.howToChoose.map((tip) => (
                    <li key={tip} className="text-sm text-[var(--color-text-muted)] flex gap-2">
                      <span className="text-[var(--color-primary)] flex-shrink-0">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-emerald-50 rounded-2xl p-6 border border-indigo-100/60">
            <h2 className="font-bold text-sm mb-4">Start here</h2>
            <div className="space-y-3">
              {guide.startHere.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block bg-white rounded-xl p-3.5 border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors group"
                >
                  <span className="font-semibold text-sm text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors block">
                    {item.label}
                  </span>
                  <span className="text-xs text-[var(--color-text-dim)] mt-0.5 block">{item.note}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Top picks strip */}
      {topTools.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-bold mb-4">Top rated in {category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topTools.map((tool) => (
              <div
                key={tool.slug}
                className="group bg-[var(--color-card)] rounded-xl p-5 border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-sm transition-all"
              >
                <Link href={`/tools/${tool.slug}`} className="block">
                  <div className="flex items-center gap-3 mb-2">
                    <ToolIcon url={tool.url} name={tool.name} size={32} />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm group-hover:text-[var(--color-primary)] transition-colors truncate">
                        {tool.name}
                      </h3>
                      <span className="stars text-xs tracking-wider">
                        {"★".repeat(Math.floor(tool.rating))}
                        {"☆".repeat(5 - Math.floor(tool.rating))}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)] line-clamp-2">{tool.description}</p>
                </Link>
                <p className="mt-1.5 text-xs">
                  {tool.updated ? (
                    <Link href="/how-we-verify" className="text-emerald-600 font-medium hover:underline">
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
      )}

      {/* Other categories quick links */}
      <div className="flex flex-wrap gap-2 mb-8">
        {allCats
          .filter((c) => c !== category)
          .map((c) => (
            <Link
              key={c}
              href={`/categories/${slugifyCategory(c)}`}
              className="text-xs font-medium px-3 py-1.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            >
              {c}
            </Link>
          ))}
      </div>

      {/* Comparison Matrix */}
      <section className="mb-10">
        <h2 className="text-lg font-bold mb-4">Quick Comparison</h2>
        <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                <th className="text-left p-4 font-semibold text-[var(--color-text)]">Tool</th>
                <th className="text-left p-4 font-semibold text-[var(--color-text)] hidden md:table-cell">Pricing</th>
                <th className="text-center p-4 font-semibold text-[var(--color-text)] w-20">Rating</th>
                <th className="text-left p-4 font-semibold text-[var(--color-text)] hidden lg:table-cell">Best For</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((tool, i) => (
                <tr key={tool.slug} className={`border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-surface)]/50 transition-colors ${i % 2 === 0 ? "bg-white/30" : ""}`}>
                  <td className="p-4">
                    <Link href={`/tools/${tool.slug}`} className="flex items-center gap-3 group/link">
                      <ToolIcon url={tool.url} name={tool.name} size={28} />
                      <span className="font-semibold group-hover/link:text-[var(--color-primary)] transition-colors">{tool.name}</span>
                    </Link>
                  </td>
                  <td className="p-4 text-[var(--color-text-muted)] hidden md:table-cell text-xs">{tool.pricing}</td>
                  <td className="p-4 text-center">
                    <span className="stars text-xs tracking-wider">
                      {"★".repeat(Math.floor(tool.rating))}
                      {"☆".repeat(5 - Math.floor(tool.rating))}
                    </span>
                    <span className="text-xs text-[var(--color-text-dim)] ml-1">{tool.rating}</span>
                  </td>
                  <td className="p-4 text-[var(--color-text-muted)] hidden lg:table-cell text-xs max-w-48 truncate" title={tool.bestFor || ""}>
                    {tool.bestFor?.slice(0, 100) || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tools list */}
      <ToolCardGrid tools={tools} />

      {/* Total count */}
      <div className="mt-12 text-center text-sm text-[var(--color-text-muted)]">
        Showing {tools.length} of {allTools.length} tools —{" "}
        <Link href="/" className="text-[var(--color-primary)] hover:underline font-medium">
          Back to all tools
        </Link>
      </div>
    </div>
  );
}
