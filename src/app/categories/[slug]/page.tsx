import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCategories, getToolsByCategory, getAllTools } from "@/lib/tools";
import ToolIcon from "@/components/ToolIcon";

export function generateStaticParams() {
  const cats = getAllCategories();
  return cats.map((cat) => ({
    slug: cat.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and"),
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Convert slug back to category name
  const allCats = getAllCategories();
  const category = allCats.find(
    (c) => c.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and") === slug
  );

  if (!category) notFound();

  const tools = getToolsByCategory(category);
  const allTools = getAllTools();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <nav className="text-sm text-[var(--color-text-muted)] mb-6">
        <Link href="/" className="hover:text-[var(--color-primary)]">Home</Link>
        {" / "}
        <span className="text-[var(--color-text)] font-medium">{category}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-2">{category}</h1>
        <p className="text-[var(--color-text-muted)]">
          {tools.length} tools in this category
        </p>
      </div>

      {/* Other categories quick links */}
      <div className="flex flex-wrap gap-2 mb-8">
        {allCats
          .filter((c) => c !== category)
          .map((c) => {
            const cSlug = c.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
            return (
              <Link
                key={c}
                href={`/categories/${cSlug}`}
                className="text-xs font-medium px-3 py-1.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
              >
                {c}
              </Link>
            );
          })}
      </div>

      {/* Tools list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="bg-[var(--color-card)] rounded-2xl p-5 border border-[var(--color-border)] hover:border-indigo-500/20 transition-all group"
          >
            <div className="flex items-center gap-3 mb-3">
              <ToolIcon url={tool.url} name={tool.name} size={36} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-sm truncate group-hover:text-[var(--color-primary)] transition-colors">
                    {tool.name}
                  </h3>
                  <span className="stars text-xs tracking-wider flex-shrink-0 ml-2">
                    {"★".repeat(Math.floor(tool.rating))}
                    {"☆".repeat(5 - Math.floor(tool.rating))}
                  </span>
                </div>
                <span className="text-xs text-[var(--color-text-dim)]">{tool.category}</span>
              </div>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 mb-3">
              {tool.description}
            </p>
            <div className="text-xs font-medium text-[var(--color-text-muted)]">
              {tool.pricing.split(" / ")[0]}
            </div>
          </Link>
        ))}
      </div>

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
