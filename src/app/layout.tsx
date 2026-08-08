import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import HeaderNav from "@/components/HeaderNav";
import Link from "next/link";

const GA_ID = "G-4DHWWJV4YK";

export const metadata: Metadata = {
  metadataBase: new URL("https://usetoolai.com"),
  title: "UseToolAI — Find the Best AI Tools in 2026",
  description:
    "Discover and compare 100+ hand-picked AI tools for writing, design, video, coding, audio, and productivity. Honest reviews, real pricing, and Reddit-verified comparisons.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://usetoolai.com",
    siteName: "UseToolAI",
    title: "UseToolAI — Find the Best AI Tools in 2026",
    description:
      "Discover and compare 100+ hand-picked AI tools for writing, design, video, coding, audio, and productivity. Honest reviews, real pricing, and Reddit-verified comparisons.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "UseToolAI — Find the Best AI Tools in 2026",
    description:
      "Discover and compare 100+ hand-picked AI tools. Honest reviews, real pricing, and verified comparisons.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo-small.png",
    apple: "/logo-small.png",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "UseToolAI",
  url: "https://usetoolai.com",
  logo: "https://usetoolai.com/logo.png",
  description:
    "UseToolAI reviews and compares AI tools for writing, design, video, coding, audio, and productivity.",
  sameAs: [
    "https://www.producthunt.com/products/usetoolai/launches/usetoolai",
    "https://github.com/Max-jia/UseToolAi",
  ],
  founder: {
    "@type": "Person",
    name: "Max Jia",
    url: "https://x.com/maxjia1988",
  },
  contactPoint: {
    "@type": "ContactPoint",
    url: "https://usetoolai.com/contact",
    contactType: "customer support",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Max Jia",
  url: "https://x.com/maxjia1988",
  sameAs: ["https://x.com/maxjia1988"],
  founderOf: {
    "@type": "Organization",
    name: "UseToolAI",
    url: "https://usetoolai.com",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "UseToolAI",
  url: "https://usetoolai.com",
  description:
    "Discover and compare 100+ hand-picked AI tools. Honest reviews, real pricing, and verified comparisons.",
  inLanguage: "en",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="impact-site-verification" content="b5b276a2-1c78-4976-9d24-3bbd8d689428" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--color-bg)]" suppressHydrationWarning>
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}');
(function(){
  try {
    var ref = document.referrer || "";
    if (!ref) return;
    var aiHosts = ["chatgpt.com","perplexity.ai","claude.ai","gemini.google.com","aistudio.google.com","copilot.microsoft.com","grok.com","deepseek.com","poe.com"];
    var host = new URL(ref).hostname;
    var match = aiHosts.filter(function(h){ return host === h || host.endsWith("." + h); })[0];
    if (match) gtag("event", "ai_referral", { ai_engine: match, page_location: location.href });
  } catch(e) {}
})();`}
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
              <Link href="/how-we-verify" className="hover:text-[var(--color-text-muted)] transition-colors">How We Verify</Link>
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
