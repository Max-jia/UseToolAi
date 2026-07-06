"use client";

import { useEffect } from "react";

// Replace this with your actual AdSense publisher ID after approval
const ADSENSE_CLIENT = "ca-pub-7649257223930816";

interface Props {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
}

export default function AdSlot({ slot, format = "auto", className = "" }: Props) {
  useEffect(() => {
    try {
      // @ts-expect-error - Google AdSense global
      if (window.adsbygoogle) {
        // @ts-expect-error
        window.adsbygoogle.push({});
      }
    } catch {
      // AdSense not loaded yet - that's fine for preview
    }
  }, []);

  return (
    <div className={`flex justify-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
