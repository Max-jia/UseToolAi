import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About UseToolAI — Honest AI Tool Reviews & Comparisons",
  description: "We test and compare AI tools so you don't have to. 56+ tools reviewed, 26 in-depth comparison articles. No marketing fluff. Just honest, data-driven recommendations.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-sm text-[var(--color-text-muted)] mb-6">
        <Link href="/" className="hover:text-[var(--color-primary)]">Home</Link>
        {" / "}
        <span className="text-[var(--color-text)] font-medium">About</span>
      </nav>

      <h1 className="text-3xl font-extrabold mb-6">About UseToolAI</h1>

      <div className="bg-[var(--color-card)] rounded-2xl p-6 md:p-8 border border-[var(--color-border)] space-y-6 text-[var(--color-text-muted)] leading-relaxed">
        <p>
          We test AI tools so you don't have to. Every tool on this site has been researched, compared, and reviewed — not copy-pasted from a marketing page.
        </p>

        <p>
          The AI tools market is overwhelming. Thousands of products claim to be "the best." Most comparison articles are written by content farms that have never used the tools they review. We do things differently.
        </p>

        <h2 className="text-xl font-bold text-[var(--color-text)]">What We Do</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Honest reviews</strong> — every tool page includes pros, cons, and a "skip this if" section. No tool is perfect, and we tell you why.</li>
          <li><strong>Data-driven comparisons</strong> — we run real tests, not benchmark copypasta. Our ChatGPT vs Claude comparison used 50 identical prompts.</li>
          <li><strong>Regular updates</strong> — every tool page shows its last updated date. Pricing and features change. So do our reviews.</li>
        </ul>

        <h2 className="text-xl font-bold text-[var(--color-text)]">How We Make Money</h2>
        <p>
          UseToolAI is free to use. We earn affiliate commissions when you click through to a tool and make a purchase — at no extra cost to you. We never accept payment for positive reviews. Our recommendations are based on testing, not sponsorship deals.
        </p>

        <h2 className="text-xl font-bold text-[var(--color-text)]">Contact</h2>
        <p>
          Questions, corrections, or tools you'd like us to review? Email us at <a href="mailto:hello@usetoolai.com" className="text-[var(--color-primary)] hover:underline">hello@usetoolai.com</a>.
        </p>
      </div>
    </div>
  );
}
