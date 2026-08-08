import { getAllTools, getAllCategories, slugifyCategory, getToolsByCategory } from "@/lib/tools";
import { getAllPosts } from "@/lib/blog";

const BASE = "https://usetoolai.com";

const BLOG_SECTIONS: { category: string; heading: string }[] = [
  { category: "AI Assistants", heading: "AI Assistant Comparisons" },
  { category: "Developer Tools", heading: "AI Coding Tools" },
  { category: "Video & Animation", heading: "AI Video Tools" },
  { category: "Image Generation", heading: "AI Image Tools" },
  { category: "Productivity", heading: "How-To Guides & Productivity" },
  { category: "Writing", heading: "AI Writing Guides" },
  { category: "Marketing & SEO", heading: "AI Marketing & SEO" },
  { category: "Audio & Voice", heading: "AI Audio Tools" },
  { category: "Monetization", heading: "AI Monetization & Side Hustles" },
];

export function GET() {
  const tools = getAllTools();
  const categories = getAllCategories();
  const posts = getAllPosts();

  const lines: string[] = [];
  lines.push("# UseToolAI");
  lines.push("");
  lines.push(
    `> Discover and compare ${tools.length}+ hand-picked AI tools for writing, design, video, coding, audio, productivity, and marketing. Honest reviews, real pricing, and verified comparisons. Updated August 2026.`
  );
  lines.push("");

  lines.push("## What We Do Not Do");
  lines.push("");
  lines.push("- UseToolAI does not develop, sell, or host AI tools — it is an independent review and comparison directory.");
  lines.push("- UseToolAI does not scrape listings from other directories; every tool is verified by hand against its official site.");
  lines.push("- UseToolAI does not accept paid placements; reviews and ratings are independent. Some pages carry affiliate links, marked as sponsored.");
  lines.push("- UseToolAI is not affiliated with any of the tools it reviews.");
  lines.push("- UseToolAI is not itself an AI tool or service.");
  lines.push("");

  // Categories
  lines.push("## AI Tool Categories");
  for (const cat of categories) {
    const count = getToolsByCategory(cat).length;
    const slug = slugifyCategory(cat);
    lines.push(`- [${cat} AI Tools](${BASE}/categories/${slug}): ${count} hand-picked tools compared by pricing, features, and real user reviews.`);
  }
  lines.push("");

  // Blog posts grouped by category
  for (const section of BLOG_SECTIONS) {
    const sectionPosts = posts.filter((p) => p.category === section.category);
    if (sectionPosts.length === 0) continue;
    lines.push(`## ${section.heading}`);
    for (const post of sectionPosts) {
      lines.push(`- [${post.title}](${BASE}/blog/${post.slug}): ${post.description}`);
    }
    lines.push("");
  }

  // All tool reviews
  lines.push("## AI Tool Reviews (All Tools)");
  for (const tool of tools) {
    lines.push(`- [${tool.name} review](${BASE}/tools/${tool.slug}): ${tool.description}`);
  }
  lines.push("");

  // Index pages
  lines.push("## More");
  lines.push(`- [All AI tool comparisons](${BASE}/blog): every comparison, roundup, and guide.`);
  lines.push(`- [New & recently added AI tools](${BASE}/new): latest additions and updates.`);
  lines.push(`- [AI tool categories](${BASE}/categories): browse every category.`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
