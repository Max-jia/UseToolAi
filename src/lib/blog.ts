import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  featured?: boolean;
  content: string;
}

const blogDirectory = path.join(process.cwd(), 'content/blog');

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) return [];
  const filenames = fs.readdirSync(blogDirectory);
  const posts = filenames
    .filter((f) => f.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '');
      const fullPath = path.join(blogDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      return { slug, ...data, content } as BlogPost;
    });
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export interface FAQItem {
  question: string;
  answer: string;
}

/** Extract FAQ Q&A pairs from markdown content. Expects: ### Q: ... \n **A:** ... */
export function extractFAQ(content: string): FAQItem[] {
  const faqs: FAQItem[] = [];
  const lines = content.split("\n");
  let i = 0;
  while (i < lines.length) {
    const qMatch = lines[i].match(/^###\s*Q:\s*(.+)/);
    if (qMatch) {
      const question = qMatch[1].trim();
      const answerLines: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim() && !lines[i].startsWith("###") && !lines[i].startsWith("##")) {
        const line = lines[i].trim();
        if (line.startsWith("**A:**")) {
          answerLines.push(line.replace(/^\*\*A:\*\*\s*/, ""));
        } else if (answerLines.length > 0) {
          answerLines.push(line);
        }
        i++;
      }
      const answer = answerLines.join(" ").trim();
      if (question && answer) {
        faqs.push({ question, answer });
      }
    } else {
      i++;
    }
  }
  return faqs;
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return { slug, ...data, content } as BlogPost;
  } catch {
    return null;
  }
}
