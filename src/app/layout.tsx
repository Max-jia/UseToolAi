import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import HeaderNav from "@/components/HeaderNav";
import Link from "next/link";

const GA_ID = "G-4DHWWJV4YK";

export const metadata: Metadata = {
  title: "UseToolAI — Find the Best AI Tools in 2026",
  description:
    "Discover and compare 100+ hand-picked AI tools for writing, design, video, coding, audio, and productivity. Honest reviews, real pricing, and Reddit-verified comparisons.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="impact-site-verification" content="b5b276a2-1c78-4976-9d24-3bbd8d689428" />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--color-bg)]" suppressHydrationWarning>
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}');`}
        </Script>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7649257223930816" crossOrigin="anonymous" strategy="lazyOnload" />
        <HeaderNav />

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
