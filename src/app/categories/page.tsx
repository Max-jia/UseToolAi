import Link from "next/link";
import { getAllCategories, getToolsByCategory } from "@/lib/tools";

const categoryIcons: Record<string, string> = {
  "Writing & Text": "✍️",
  "Image & Design": "🎨",
  "Video & Animation": "🎬",
  "Productivity": "⚡",
  "Code & Development": "💻",
  "Audio & Voice": "🎵",
  "Marketing & SEO": "📈",
  "Data & Analysis": "📊",
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <nav className="text-sm text-[var(--color-text-muted)] mb-6">
        <Link href="/" className="hover:text-[var(--color-primary)]">Home</Link>
        {" / "}
        <span className="text-[var(--color-text)] font-medium">All Categories</span>
      </nav>

      <h1 className="text-3xl font-extrabold mb-2">All Categories</h1>
      <p className="text-[var(--color-text-muted)] mb-8">
        {categories.length} categories — click to browse tools
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => {
          const tools = getToolsByCategory(cat);
          const slug = cat.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
          return (
            <Link
              key={cat}
              href={`/categories/${slug}`}
              className="bg-white rounded-2xl p-6 border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-md transition-all group flex items-start gap-5"
            >
              <div className="text-4xl flex-shrink-0 mt-1">{categoryIcons[cat] || "🔧"}</div>
              <div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                  {cat}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-2">
                  {tools.length} tools
                </p>
                <div className="flex flex-wrap gap-1">
                  {tools.slice(0, 3).map((t) => (
                    <span key={t.slug} className="text-xs bg-gray-50 px-2 py-0.5 rounded text-[var(--color-text-muted)]">
                      {t.name}
                    </span>
                  ))}
                  {tools.length > 3 && (
                    <span className="text-xs text-[var(--color-text-muted)]">
                      +{tools.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
