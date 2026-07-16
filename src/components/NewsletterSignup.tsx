"use client";

import { useState } from "react";

const BUTTONDOWN_ACTION = "https://buttondown.email/api/emails/embed-subscribe/questlog";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "submitted" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const formData = new FormData();
      formData.append("email", email.trim());
      const res = await fetch(BUTTONDOWN_ACTION, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("submitted");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "submitted") {
    return (
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 md:p-10 border border-indigo-100 text-center">
          <p className="text-lg font-semibold text-indigo-800">Thanks for subscribing!</p>
          <p className="text-sm text-indigo-600 mt-1">We&apos;ll send you one AI tool deep-dive every week. No fluff.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 md:p-10 border border-indigo-100">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-2">Get the Best AI Tools, Every Week</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-6">
            One honest review. No fluff. No spam. Unsubscribe anytime.
          </p>
          {status === "error" && (
            <p className="text-sm text-red-600 mb-4">Something went wrong. Please try again or email us directly.</p>
          )}
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={status === "loading"}
              className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-5 py-2.5 bg-[var(--color-primary)] text-white font-semibold text-sm rounded-xl hover:bg-[var(--color-primary-dark)] transition shadow-md flex-shrink-0 disabled:opacity-50"
            >
              {status === "loading" ? "Subscribing…" : "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
