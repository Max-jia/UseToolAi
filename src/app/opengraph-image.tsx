import { ImageResponse } from "next/og";

export const alt = "UseToolAI — Find the Best AI Tools in 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          background: "linear-gradient(135deg, #312e81 0%, #4f46e5 45%, #059669 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 800,
              color: "#4f46e5",
            }}
          >
            U
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>
            UseToolAI
          </div>
        </div>
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, letterSpacing: -1.5, maxWidth: 900 }}>
          Find the Best AI Tools in 2026
        </div>
        <div style={{ fontSize: 30, marginTop: 28, color: "#e0e7ff", lineHeight: 1.4, maxWidth: 800 }}>
          100+ hand-picked tools, honestly reviewed and compared. Real pricing, real trade-offs, no fluff.
        </div>
        <div style={{ marginTop: 48, display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ fontSize: 22, color: "#c7d2fe" }}>
            Writing · Design · Video · Coding · Audio · Productivity
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
