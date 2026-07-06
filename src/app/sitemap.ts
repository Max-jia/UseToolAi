import { getAllTools } from "@/lib/tools";
import { getAllPosts } from "@/lib/blog";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://usetoolai.com";

  const tools = getAllTools();
  const posts = getAllPosts();

  const categories = [
    "writing-and-text", "image-and-design", "video-and-animation",
    "productivity", "code-and-development", "audio-and-voice",
    "marketing-and-seo", "data-and-analysis",
  ];

  const staticPages = [
    { url: baseUrl, priority: 1, changeFrequency: "daily" as const },
    { url: `${baseUrl}/categories`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/blog`, priority: 0.8, changeFrequency: "weekly" as const },
  ];

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

  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...categoryPages, ...toolPages, ...blogPages];
}
