import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const GA_ID = "G-4DHWWJV4YK";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UseToolAI — Find the Best AI Tools in 2026",
  description:
    "Discover and compare 55+ hand-picked AI tools for writing, design, video, coding, audio, and productivity. Honest reviews, real pricing, and Reddit-verified comparisons.",
};

const categories = [
  "Writing & Text", "Image & Design", "Video & Animation",
  "Productivity", "Code & Development", "Audio & Voice",
  "Marketing & SEO", "Data & Analysis",
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}></script>
        <script dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}');`
        }} />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7649257223930816" crossOrigin="anonymous"></script>
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--color-bg)]">
        {/* Header — logo + horizontal scrollable category menu like indiemakers.tools */}
        <header className="bg-white border-b border-[var(--color-border)] sticky top-0 z-50">
          <div className="max-w-6xl mx-auto">
            {/* Top row: logo */}
            <div className="px-6 h-14 flex items-center">
              <Link href="/" className="font-bold text-lg tracking-tight mr-8 flex-shrink-0">
                UseTool<span className="text-[var(--color-primary)]">AI</span>
              </Link>
              <Link href="/blog" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors flex-shrink-0">
                Blog
              </Link>
            </div>
            {/* Bottom row: scrollable category menu — like indiemakers.tools */}
            <div className="px-6 pb-2 overflow-x-auto scrollbar-none">
              <div className="flex gap-1 text-sm whitespace-nowrap min-w-max">
                {categories.map((cat) => {
                  const slug = cat.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
                  return (
                    <Link
                      key={cat}
                      href={`/categories/${slug}`}
                      className="px-3 py-1.5 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)] transition-colors"
                    >
                      {cat}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-[var(--color-border)] py-12 mt-24 bg-white">
          <div className="max-w-6xl mx-auto px-6 text-center text-sm text-[var(--color-text-dim)]">
            <p className="text-[var(--color-text-muted)] font-medium mb-1">UseToolAI</p>
            <p>&copy; 2026 — Helping you find the right AI tools.</p>
            <p className="mt-1">
              <Link href="/privacy" className="hover:text-[var(--color-text-muted)] transition-colors">Privacy Policy</Link>
              {" · "}We may earn affiliate commissions from some links.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
