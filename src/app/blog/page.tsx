import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import BlogList from "@/components/BlogList";

export const dynamic = "force-static";

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
        <BlogList posts={posts} />
      )}
    </div>
  );
}
