import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCategories, getToolsByCategory, getAllTools } from "@/lib/tools";
import ToolIcon from "@/components/ToolIcon";
import ToolCardGrid from "@/components/ToolCardGrid";

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
