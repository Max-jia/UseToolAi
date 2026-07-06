import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <nav className="text-sm text-[var(--color-text-muted)] mb-6">
        <Link href="/" className="hover:text-[var(--color-primary)]">Home</Link>
        {" / "}
        <span className="text-[var(--color-text)] font-medium">Privacy Policy</span>
      </nav>

      <h1 className="text-3xl font-extrabold mb-8">Privacy Policy</h1>
      <p className="text-[var(--color-text-muted)] mb-6">Last updated: July 7, 2026</p>

      <div className="space-y-8 text-[var(--color-text-muted)] leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-3">1. Information We Collect</h2>
          <p>
            We use Google Analytics to collect anonymous usage data including pages visited, time on site, and traffic sources. This data cannot identify you personally. We use Google AdSense to display advertisements, which may use cookies to serve relevant ads.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-3">2. Cookies</h2>
          <p>
            Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to this site and/or other sites on the Internet. You may opt out of personalized advertising by visiting{" "}
            <a href="https://www.google.com/settings/ads" className="text-[var(--color-primary)] hover:underline" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-3">3. Google Analytics</h2>
          <p>
            We use Google Analytics to understand how visitors interact with our site. Google Analytics collects information anonymously and reports website trends without identifying individual visitors. You can opt out of Google Analytics by installing the{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" className="text-[var(--color-primary)] hover:underline" target="_blank" rel="noopener noreferrer">
              Google Analytics Opt-out Browser Add-on
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-3">4. Affiliate Disclosure</h2>
          <p>
            Some links on this site are affiliate links. This means we may earn a small commission if you click through and make a purchase, at no additional cost to you. We only recommend tools we have researched and believe provide genuine value.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-3">5. Contact</h2>
          <p>
            If you have questions about this privacy policy, please contact us through our website.
          </p>
        </section>
      </div>
    </div>
  );
}
