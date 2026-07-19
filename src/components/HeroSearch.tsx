"use client";

export default function HeroSearch() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const input = (e.currentTarget.elements.namedItem("q") as HTMLInputElement);
        if (input?.value) {
          document.getElementById("all-tools")?.scrollIntoView({ behavior: "smooth" });
        }
      }}
      className="max-w-md mx-auto mb-8"
    >
      <div className="flex gap-2">
        <input
          name="q"
          type="text"
          placeholder="Search 56+ AI tools..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary-light)] transition-shadow"
        />
        <button type="submit" className="px-5 py-2.5 bg-[var(--color-primary)] text-white font-semibold text-sm rounded-xl hover:bg-[var(--color-primary-dark)] transition btn-glow">
          Search
        </button>
      </div>
    </form>
  );
}
