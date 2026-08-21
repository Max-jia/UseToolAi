import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How We Verify — UseToolAI's Fact-Checking Process",
  description:
    "Every tool on UseToolAI is verified by hand against its official site. 100 tools checked in August 2026 — 46 were outdated. Here's exactly how we do it.",
};

export default function HowWeVerifyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-sm text-[var(--color-text-muted)] mb-6">
        <Link href="/" className="hover:text-[var(--color-primary)]">Home</Link>
        {" / "}
        <span className="text-[var(--color-text)] font-medium">How We Verify</span>
      </nav>

      <h1 className="text-3xl font-extrabold mb-6">How We Verify</h1>

      <div className="bg-[var(--color-card)] rounded-2xl p-6 md:p-8 border border-[var(--color-border)] space-y-6 text-[var(--color-text-muted)] leading-relaxed">
        <p>
          Most AI directories copy from each other. We don't. Every tool on this site is checked <strong>by hand against its official sources</strong> — pricing pages, product docs, and live websites — before it earns a verified date.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          <div className="bg-[var(--color-bg)] rounded-xl p-4 border border-[var(--color-border)]">
            <p className="text-2xl font-extrabold text-[var(--color-text)]">100</p>
            <p className="text-xs mt-1">tools verified</p>
          </div>
          <div className="bg-[var(--color-bg)] rounded-xl p-4 border border-[var(--color-border)]">
            <p className="text-2xl font-extrabold text-[var(--color-text)]">46</p>
            <p className="text-xs mt-1">were outdated</p>
          </div>
          <div className="bg-[var(--color-bg)] rounded-xl p-4 border border-[var(--color-border)]">
            <p className="text-2xl font-extrabold text-[var(--color-text)]">3</p>
            <p className="text-xs mt-1">dead or acquired</p>
          </div>
          <div className="bg-[var(--color-bg)] rounded-xl p-4 border border-[var(--color-border)]">
            <p className="text-2xl font-extrabold text-[var(--color-text)]">1</p>
            <p className="text-xs mt-1">retired product rewritten</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-[var(--color-text)]">What We Check</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Pricing and plans</strong> — current tiers, monthly vs annual rates, and what each plan actually includes.</li>
          <li><strong>Product status</strong> — is it alive, in maintenance mode, acquired, or shut down entirely?</li>
          <li><strong>Links</strong> — official domains move (Cursor became cursor.com, Pixelcut became Pixa). We follow them.</li>
          <li><strong>What changed</strong> — plan renames, price hikes, discontinued tiers, new flagships.</li>
        </ul>

        <h2 className="text-xl font-bold text-[var(--color-text)]">How It Works</h2>
        <p>
          Verification is done tool by tool, against the official website or primary documentation. Nothing is automated, and no date is ever backfilled. If we haven't actually re-checked a tool, it honestly shows <em>Not yet verified</em> instead of a fake date.
        </p>
        <p>
          Every tool page carries a <strong>Last Verified</strong> date — the day we actually checked its pricing and features. When you see <span className="text-emerald-700 font-medium">✓ August 8, 2026</span>, that means someone went to the source that day. Not last year. Not "sometime."
        </p>

        <h2 className="text-xl font-bold text-[var(--color-text)]">What We Found in August 2026</h2>
        <p>
          Our first full sweep of all 100 tools found that <strong>46 of them had outdated information</strong> — nearly half. A few examples:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>DALL-E 4 never existed</strong> — OpenAI retired the DALL-E line in 2025; the page was rewritten for GPT Image 2, the model you actually get.</li>
          <li><strong>Phind shut down</strong> in January 2026, and <strong>Rows was wound down</strong> in May 2026 after an acquisition. Both pages now say so, instead of quietly linking to dead products.</li>
          <li><strong>Copilot Pro was discontinued</strong> for new subscribers, <strong>Replit's Teams plan was retired</strong>, and <strong>Gemini's Advanced plan was renamed</strong> — all captured and corrected.</li>
          <li><strong>Prices moved</strong> in both directions: Synthesia cut prices ~38%, while QuillBot's monthly rate rose to $19.95.</li>
        </ul>
        <p>
          That's why the dates exist. AI tools change faster than any static review can keep up with — the verified date is our way of telling you exactly how fresh the information is.
        </p>

        <h2 className="text-xl font-bold text-[var(--color-text)]">Found Something Stale?</h2>
        <p>
          Tell us. If a tool's pricing or status has changed since our last check, <Link href="/contact" className="text-[var(--color-primary)] hover:underline">contact us</Link> and we'll re-verify it — same day when we can.
        </p>
      </div>
    </div>
  );
}
