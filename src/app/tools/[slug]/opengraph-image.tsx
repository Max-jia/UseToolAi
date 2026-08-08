import { ImageResponse } from "next/og";
import { getToolBySlug } from "@/lib/tools";

export const alt = "AI tool review on UseToolAI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  const name = tool?.name ?? "AI Tool";
  const description = tool?.description ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 90px",
          background: "linear-gradient(135deg, #312e81 0%, #4f46e5 55%, #0f172a 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 800,
              color: "#4f46e5",
            }}
          >
            U
          </div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>UseToolAI Review</div>
        </div>
        <div style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.12, letterSpacing: -1.5, maxWidth: 950 }}>
          {name}: The 2026 Review
        </div>
        <div style={{ fontSize: 26, marginTop: 24, color: "#c7d2fe", lineHeight: 1.45, maxWidth: 880 }}>
          {description.slice(0, 300)}
        </div>
      </div>
    ),
    { ...size }
  );
}
