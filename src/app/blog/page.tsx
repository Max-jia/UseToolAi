import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import BlogList from "@/components/BlogList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tool Comparisons & Guides — UseToolAI",
  description:
    "In-depth AI tool comparisons, best-of roundups, and how-to guides based on real testing and verified user experiences. Updated regularly.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "AI Tool Comparisons & Guides",
    description:
      "In-depth AI tool comparisons, best-of roundups, and how-to guides based on real testing.",
    url: "/blog",
    type: "website",
  },
};

export const dynamic = "force-static";

function BlogIndexSchemas({ posts }: { posts: { title: string; slug: string; description: string; date: string }[] }) {
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Tool Comparisons & Guides",
    url: "https://usetoolai.com/blog",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: post.title,
        url: `https://usetoolai.com/blog/${post.slug}`,
        description: post.description,
      })),
    },
  });
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />;
}

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <BlogIndexSchemas posts={posts} />
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
          <p>We&apos;re writing in-depth comparison guides to help you choose the right AI tools.</p>
        </div>
      ) : (
        <BlogList posts={posts} />
      )}
    </div>
  );
}
