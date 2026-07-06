import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="text-sm text-[var(--color-text-muted)] mb-6">
        <Link href="/" className="hover:text-[var(--color-primary)]">Home</Link>
        {" / "}
        <span className="text-[var(--color-text)] font-medium">Blog</span>
      </nav>

      <h1 className="text-3xl font-extrabold mb-2">AI Tool Comparisons & Guides</h1>
      <p className="text-[var(--color-text-muted)] mb-8">
        In-depth comparisons based on real user experiences, Reddit discussions, and hands-on testing.
      </p>

      {posts.length === 0 ? (
        <div className="text-center py-16 text-[var(--color-text-muted)]">
          <p className="text-lg mb-2">No articles yet — check back soon!</p>
          <p>We're writing in-depth comparison guides to help you choose the right AI tools.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-[var(--color-card)] rounded-2xl p-6 border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[var(--color-surface)] text-[var(--color-primary)]">
                  {post.category}
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">{post.date}</span>
              </div>
              <h2 className="text-xl font-bold mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                {post.title}
              </h2>
              <p className="text-[var(--color-text-muted)] text-sm line-clamp-2 mb-3">
                {post.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 text-[var(--color-text-muted)] px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
