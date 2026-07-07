import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import type { Metadata } from "next";
import ReactMarkdown from "@/app/tools/[slug]/MarkdownContent";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "UseToolAI" },
    publisher: { "@type": "Organization", name: "UseToolAI" },
  };

  const relatedPosts = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-sm text-[var(--color-text-muted)] mb-6">
        <Link href="/" className="hover:text-[var(--color-primary)]">Home</Link>
        {" / "}
        <Link href="/blog" className="hover:text-[var(--color-primary)]">Blog</Link>
        {" / "}
        <span className="text-[var(--color-text)] font-medium truncate">{post.title.slice(0, 40)}...</span>
      </nav>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <article>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[var(--color-surface)] text-[var(--color-primary)]">
              {post.category}
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">{post.date}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-3">{post.title}</h1>
          <p className="text-lg text-[var(--color-text-muted)]">{post.description}</p>
        </div>

        <div className="bg-[var(--color-card)] rounded-2xl p-6 md:p-8 border border-[var(--color-border)] prose-sm">
          <ReactMarkdown content={post.content} />
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs bg-[var(--color-surface)] text-[var(--color-primary)] px-3 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="mt-12 pt-8 border-t border-[var(--color-border)]">
          <h2 className="text-xl font-bold mb-4">More Comparisons</h2>
          <div className="grid grid-cols-1 gap-4">
            {relatedPosts.map((rp) => (
              <Link
                key={rp.slug}
                href={`/blog/${rp.slug}`}
                className="block bg-[var(--color-card)] rounded-xl p-5 border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-sm transition-all group"
              >
                <h3 className="font-semibold group-hover:text-[var(--color-primary)] transition-colors">
                  {rp.title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">{rp.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
