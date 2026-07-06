// Extract domain from tool URL and use Google's favicon service
export function getFaviconUrl(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return "";
  }
}

export default function ToolIcon({ url, name, size = 40 }: { url: string; name: string; size?: number }) {
  const favicon = getFaviconUrl(url);
  if (!favicon) {
    return (
      <div
        className="rounded-lg bg-[var(--color-surface)] flex items-center justify-center text-sm font-bold text-[var(--color-text-dim)] flex-shrink-0"
        style={{ width: size, height: size }}
      >
        {name.charAt(0)}
      </div>
    );
  }
  return (
    <img
      src={favicon}
      alt={`${name} logo`}
      width={size}
      height={size}
      className="rounded-lg flex-shrink-0 bg-[var(--color-surface)]"
      loading="lazy"
    />
  );
}
