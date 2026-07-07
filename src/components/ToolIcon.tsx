"use client";

import { useState } from "react";

function getFaviconUrls(url: string): string[] {
  try {
    const u = new URL(url);
    const domain = u.hostname;
    return [
      `https://logo.clearbit.com/${domain}?size=120`,
      `https://www.google.com/s2/favicons?domain=${domain}&sz=256`,
    ];
  } catch {
    return [];
  }
}

export default function ToolIcon({ url, name, size = 40 }: { url: string; name: string; size?: number }) {
  const sources = getFaviconUrls(url);
  const [currentSrc, setCurrentSrc] = useState(0);
  const [allFailed, setAllFailed] = useState(false);

  const handleError = () => {
    if (currentSrc < sources.length - 1) {
      setCurrentSrc(currentSrc + 1);
    } else {
      setAllFailed(true);
    }
  };

  if (sources.length === 0 || allFailed) {
    return (
      <div
        className="rounded-md bg-[var(--color-surface)] flex items-center justify-center text-sm font-bold text-[var(--color-text-dim)] flex-shrink-0"
        style={{ width: size, height: size }}
      >
        {name.charAt(0)}
      </div>
    );
  }

  return (
    <img
      src={sources[currentSrc]}
      alt={`${name} logo`}
      width={size}
      height={size}
      className="rounded-md flex-shrink-0 object-contain bg-white border border-[var(--color-border)]"
      loading="lazy"
      onError={handleError}
    />
  );
}
