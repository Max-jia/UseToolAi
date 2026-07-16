import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact UseToolAI",
  description: "Get in touch with UseToolAI. Suggest a tool, report an error, or ask a question.",
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-sm text-[var(--color-text-muted)] mb-6">
        <Link href="/" className="hover:text-[var(--color-primary)]">Home</Link>
        {" / "}
        <span className="text-[var(--color-text)] font-medium">Contact</span>
      </nav>

      <h1 className="text-3xl font-extrabold mb-6">Contact Us</h1>

      <div className="bg-[var(--color-card)] rounded-2xl p-6 md:p-8 border border-[var(--color-border)] space-y-6 text-[var(--color-text-muted)] leading-relaxed">
        <p>
          Have a tool you'd like us to review? Found an error? Just want to say hi? We read every email.
        </p>

        <div>
          <h2 className="text-lg font-bold text-[var(--color-text)] mb-2">Email</h2>
          <a href="mailto:hello@usetoolai.com" className="text-[var(--color-primary)] hover:underline">hello@usetoolai.com</a>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[var(--color-text)] mb-2">Submit a Tool</h2>
          <p>Think your AI tool belongs on UseToolAI? Email us with the tool name, URL, and a brief description. We review every submission. No guarantees, but we respond to everyone.</p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[var(--color-text)] mb-2">Report an Error</h2>
          <p>Pricing changes. Tools shut down. If you spot outdated or incorrect information, please let us know. We update tool pages regularly and appreciate corrections.</p>
        </div>
      </div>
    </div>
  );
}
