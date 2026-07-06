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
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0000000000000000" crossOrigin="anonymous"></script>
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--color-bg)]">
        {/* Top accent bar */}
        <div className="h-[2px] bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500" />

        <header className="bg-[var(--color-surface)]/80 backdrop-blur-xl border-b border-[var(--color-border)] sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="font-bold text-lg tracking-tight flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-sm font-extrabold text-black">U</span>
              <span className="text-[var(--color-text)]">UseTool<span className="text-[var(--color-primary)]">AI</span></span>
            </Link>
            <nav className="hidden md:flex gap-0.5 text-sm">
              {categories.slice(0, 5).map((cat) => (
                <Link
                  key={cat}
                  href={`/categories/${cat.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`}
                  className="px-3 py-2 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-card)] transition-colors"
                >
                  {cat.split(" & ")[0]}
                </Link>
              ))}
              <Link
                href="/blog"
                className="px-3 py-2 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-card)] transition-colors font-medium ml-2"
              >
                Blog
              </Link>
              <Link
                href="/categories"
                className="px-3 py-2 rounded-md text-[var(--color-text-dim)] hover:text-[var(--color-text-muted)] hover:bg-[var(--color-card)] transition-colors ml-1"
              >
                All categories →
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[var(--color-border)] py-12 mt-24">
          <div className="max-w-7xl mx-auto px-6 text-center text-sm text-[var(--color-text-dim)]">
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
