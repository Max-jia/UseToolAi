"use client";

import { useState } from "react";

function getFaviconUrls(url: string): string[] {
  try {
    const u = new URL(url);
    const domain = u.hostname;
    return [
      `https://logo.clearbit.com/${domain}?size=80`,
      `https://www.google.com/s2/favicons?domain=${domain}&sz=256`,
      `https://icon.horse/icon/${domain}`,
    ];
  } catch {
    return [];
  }
}

export default function ToolIcon({ url, name, size = 40 }: { url: string; name: string; size?: number }) {
  const sources = getFaviconUrls(url);
  const [failed, setFailed] = useState(0);
  const [currentSrc, setCurrentSrc] = useState(0);

  if (sources.length === 0) {
    return (
      <div
        className="rounded-lg bg-[var(--color-surface)] flex items-center justify-center text-sm font-bold text-[var(--color-text-dim)] flex-shrink-0"
        style={{ width: size, height: size }}
      >
        {name.charAt(0)}
      </div>
    );
  }

  const handleError = () => {
    if (currentSrc < sources.length - 1) {
      setCurrentSrc(currentSrc + 1);
    } else {
      setFailed(sources.length);
    }
  };

  if (failed >= sources.length) {
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
      src={sources[currentSrc]}
      alt={`${name} logo`}
      width={size}
      height={size}
      className="rounded-lg flex-shrink-0 bg-[var(--color-surface)]"
      loading="lazy"
      onError={handleError}
    />
  );
}
