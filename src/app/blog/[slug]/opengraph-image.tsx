import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";

export const alt = "AI tool guide on UseToolAI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.title ?? "UseToolAI Guide";
  const category = post?.category ?? "AI Tools";
  const date = post?.date ?? "";

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
          background: "linear-gradient(135deg, #0f172a 0%, #4f46e5 60%, #059669 100%)",
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
          <div style={{ fontSize: 24, fontWeight: 700 }}>UseToolAI Guide · {category}</div>
        </div>
        <div style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.15, letterSpacing: -1.2, maxWidth: 950 }}>
          {title.slice(0, 160)}
        </div>
        {date && <div style={{ fontSize: 22, marginTop: 28, color: "#a5b4fc" }}>Updated {date}</div>}
      </div>
    ),
    { ...size }
  );
}
