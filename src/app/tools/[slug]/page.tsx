import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTools, getToolBySlug, getToolsByCategory } from "@/lib/tools";

export function generateStaticParams() {
  return getAllTools().map((tool) => ({ slug: tool.slug }));
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
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

      {/* Tool header */}
      <div className="bg-white rounded-2xl p-8 border border-[var(--color-border)] mb-8">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
          <div>
            <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 mb-3">
              {tool.category}
            </span>
            <h1 className="text-3xl font-extrabold mb-2">{tool.name}</h1>
            <p className="text-lg text-[var(--color-text-muted)]">{tool.description}</p>
          </div>
          <div className="text-center">
            <div className="stars text-2xl mb-1">
              {"★".repeat(Math.floor(tool.rating))}
              {"☆".repeat(5 - Math.floor(tool.rating))}
            </div>
            <span className="text-sm text-[var(--color-text-muted)]">{tool.rating}/5</span>
          </div>
        </div>

        {/* Meta cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-xs text-[var(--color-text-muted)] mb-1">Pricing</div>
            <div className="font-semibold text-sm">{tool.pricing}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-xs text-[var(--color-text-muted)] mb-1">Category</div>
            <div className="font-semibold text-sm">{tool.category}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-xs text-[var(--color-text-muted)] mb-1">Tags</div>
            <div className="flex flex-wrap gap-1">
              {tool.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs bg-white px-2 py-0.5 rounded border border-[var(--color-border)]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[var(--color-primary-dark)] transition shadow-md text-lg"
        >
          Visit {tool.name} →
        </a>
      </div>

      {/* Related tools */}
      {relatedTools.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4">More in {tool.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedTools.map((rt) => (
              <Link
                key={rt.slug}
                href={`/tools/${rt.slug}`}
                className="bg-white rounded-xl p-5 border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-sm transition-all group"
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
                <p className="text-xs text-[var(--color-text-muted)] mt-2">{rt.pricing.split(" / ")[0]}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
