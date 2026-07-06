import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Tool Directory - Find the Best AI Tools in 2026",
  description:
    "Discover and compare 50+ hand-picked AI tools for writing, design, video, coding, audio, and productivity. Updated daily.",
};

const categories = [
  "Writing & Text", "Image & Design", "Video & Animation",
  "Productivity", "Code & Development", "Audio & Voice",
  "Marketing & SEO", "Data & Analysis",
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-[var(--color-bg)]">
        <header className="bg-white border-b border-[var(--color-border)] sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-[var(--color-primary)] flex items-center gap-2">
              🤖 AI Tool Directory
            </Link>
            <nav className="hidden md:flex gap-1 text-sm">
              {categories.slice(0, 5).map((cat) => (
                <Link
                  key={cat}
                  href={`/categories/${cat.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`}
                  className="px-3 py-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-indigo-50 transition-colors"
                >
                  {cat.split(" & ")[0]}
                </Link>
              ))}
              <Link
                href="/categories"
                className="px-3 py-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-indigo-50 transition-colors font-medium"
              >
                More →
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-white border-t border-[var(--color-border)] py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm text-[var(--color-text-muted)]">
            <p>AI Tool Directory &copy; 2026 — Helping you find the right AI tools.</p>
            <p className="mt-1">We may earn affiliate commissions from some links.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
