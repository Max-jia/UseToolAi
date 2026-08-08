import { getAllTools, getToolBySlug } from "@/lib/tools";
import { getAllPosts } from "@/lib/blog";

const BASE = "https://usetoolai.com";

export function GET() {
  const tools = getAllTools();
  const posts = getAllPosts();

  const out: string[] = [];
  out.push("# UseToolAI — Full Content");
  out.push("");
  out.push(
    `> Complete site content for AI crawlers: ${tools.length} tool reviews and ${posts.length} in-depth guides. See /llms.txt for the curated index.`
  );
  out.push("");

  // Full blog posts
  out.push("## Blog Posts");
  out.push("");
  for (const post of posts) {
    out.push(`### ${post.title}`);
    out.push("");
    out.push(`- URL: ${BASE}/blog/${post.slug}`);
    out.push(`- Category: ${post.category}`);
    out.push(`- Date: ${post.date}`);
    out.push(`- Description: ${post.description}`);
    out.push("");
    out.push(post.content.trim());
    out.push("");
    out.push("---");
    out.push("");
  }

  // Full tool pages
  out.push("## Tool Reviews");
  out.push("");
  for (const tool of tools) {
    const full = getToolBySlug(tool.slug);
    if (!full) continue;
    out.push(`### ${full.name}`);
    out.push("");
    out.push(`- URL: ${BASE}/tools/${full.slug}`);
    out.push(`- Category: ${full.category}`);
    out.push(`- Pricing: ${full.pricing}`);
    out.push(`- Rating: ${full.rating}/5 (editorial review by UseToolAI)`);
    out.push(`- Description: ${full.description}`);
    if (full.pricingDetails) out.push(`- Pricing details: ${full.pricingDetails}`);
    if (full.bestFor) out.push(`- Best for: ${full.bestFor}`);
    if (full.coreStrength) out.push(`- Core strength: ${full.coreStrength}`);
    if (full.features?.length) out.push(`- Features: ${full.features.join("; ")}`);
    if (full.pros?.length) out.push(`- Pros: ${full.pros.join("; ")}`);
    if (full.cons?.length) out.push(`- Cons: ${full.cons.join("; ")}`);
    if (full.content) {
      out.push("");
      out.push(full.content.trim());
    }
    out.push("");
    out.push("---");
    out.push("");
  }

  return new Response(out.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
