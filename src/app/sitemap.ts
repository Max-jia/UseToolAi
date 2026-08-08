import { getAllTools, getAllTags, slugifyCategory } from "@/lib/tools";
import { getAllPosts } from "@/lib/blog";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://usetoolai.com";

  const tools = getAllTools();
  const posts = getAllPosts();

  const staticPages = [
    { url: baseUrl, priority: 1, changeFrequency: "daily" as const },
    { url: `${baseUrl}/categories`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/blog`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/new`, priority: 0.6, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/about`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${baseUrl}/contact`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${baseUrl}/privacy`, priority: 0.2, changeFrequency: "yearly" as const },
  ];

  const categories = Array.from(
    new Set(tools.map((t) => slugifyCategory(t.category)))
  );
  const categoryPages = categories.map((cat) => ({
    url: `${baseUrl}/categories/${cat}`,
    priority: 0.7,
    changeFrequency: "weekly" as const,
  }));

  const toolPages = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    priority: 0.9,
    changeFrequency: "monthly" as const,
  }));

  // Only index tags with enough tools to be a useful landing page
  const allTags = getAllTags();
  const tagPages = allTags
    .filter((t) => t.count >= 3)
    .map((t) => ({
      url: `${baseUrl}/tag/${t.tag}`,
      priority: 0.5,
      changeFrequency: "weekly" as const,
    }));

  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...categoryPages, ...tagPages, ...toolPages, ...blogPages];
}
