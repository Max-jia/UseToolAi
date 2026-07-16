import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <meta name="impact-site-verification" content="b5b276a2-1c78-4976-9d24-3bbd8d689428" />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--color-bg)]" suppressHydrationWarning>
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}');`}
        </Script>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7649257223930816" crossOrigin="anonymous" strategy="lazyOnload" />
        {/* Header — single row: logo | categories | compare + blog */}
        <header className="bg-white border-b border-[var(--color-border)] sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-5">
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <img src="/logo-small.png" alt="UseToolAI" width={26} height={26} className="rounded-md" />
              <span className="font-bold text-base tracking-tight hidden sm:inline">UseTool<span className="text-[var(--color-primary)]">AI</span></span>
            </Link>
            <div className="flex-1 overflow-x-auto scrollbar-none">
              <div className="flex gap-1 text-sm whitespace-nowrap">
                {categories.map((cat) => {
                  const slug = cat.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
                  return (
                    <Link key={cat} href={`/categories/${slug}`} className="px-2.5 py-1 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)] transition-colors">
                      {cat}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0 text-sm">
              <Link href="/compare" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">Compare</Link>
              <Link href="/blog" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">Blog</Link>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-[var(--color-border)] py-12 mt-24 bg-white">
          <div className="max-w-6xl mx-auto px-6 text-center text-sm text-[var(--color-text-dim)]">
            <p className="text-[var(--color-text-muted)] font-medium mb-1">UseToolAI</p>
            <p>&copy; 2026 — Helping you find the right AI tools.</p>
            <p className="mt-1">
              <Link href="/about" className="hover:text-[var(--color-text-muted)] transition-colors">About</Link>
              {" · "}
              <Link href="/contact" className="hover:text-[var(--color-text-muted)] transition-colors">Contact</Link>
              {" · "}
              <Link href="/privacy" className="hover:text-[var(--color-text-muted)] transition-colors">Privacy Policy</Link>
            </p>
            <p className="text-xs mt-1">We may earn affiliate commissions from some links.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
