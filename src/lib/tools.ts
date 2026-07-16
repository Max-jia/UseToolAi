import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Alternative {
  name: string;
  slug: string;
}

export interface Tool {
  slug: string;
  name: string;
  description: string;
  category: string;
  pricing: string;
  url: string;
  rating: number;
  tags: string[];
  features?: string[];
  pros?: string[];
  cons?: string[];
  bestFor?: string;
  coreStrength?: string;
  pricingDetails?: string;
  alternatives?: Alternative[];
  content?: string;
  updated?: string;
  affiliateUrl?: string;
}

const toolsDirectory = path.join(process.cwd(), 'content/tools');

export function getAllTools(): Tool[] {
  const filenames = fs.readdirSync(toolsDirectory);
  const tools = filenames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '');
      const fullPath = path.join(toolsDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const excerpt = content.trim().slice(0, 400);
      const stat = fs.statSync(fullPath);
      const updated = stat.mtime.toISOString().slice(0, 10); // YYYY-MM-DD
      return { slug, ...data, updated, content: excerpt } as Tool;
    });
  return tools.sort((a, b) => a.name.localeCompare(b.name));
}

export function getToolBySlug(slug: string): (Tool & { content: string }) | null {
  try {
    const fullPath = path.join(toolsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const stat = fs.statSync(fullPath);
    const updated = stat.mtime.toISOString().slice(0, 10);
    return { slug, ...data, updated, content: content.trim() } as Tool & { content: string };
  } catch {
    return null;
  }
}

export function getAllCategories(): string[] {
  const tools = getAllTools();
  const cats = new Set(tools.map((t) => t.category));
  return Array.from(cats).sort();
}

export function getToolsByCategory(category: string): Tool[] {
  const tools = getAllTools();
  return tools.filter(
    (t) => t.category.toLowerCase() === category.toLowerCase()
  );
}

export function searchTools(query: string): Tool[] {
  const tools = getAllTools();
  const q = query.toLowerCase();
  return tools.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      t.category.toLowerCase().includes(q)
  );
}
