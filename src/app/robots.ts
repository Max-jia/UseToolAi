import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // Explicitly welcome AI / LLM crawlers (default behavior, made explicit for GEO)
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "PerplexityBot", "ClaudeBot", "anthropic-ai", "Google-Extended", "Applebot-Extended", "Bytespider"],
        allow: "/",
      },
    ],
    sitemap: "https://usetoolai.com/sitemap.xml",
    host: "https://usetoolai.com",
  };
}
