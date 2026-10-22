import { ImageResponse } from "next/og";

export const alt = "Colder — Make the call.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, #1a2d80 0%, #050607 70%)",
          color: "#f5f6f8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 36, fontWeight: 600 }}>
          <svg width="56" height="56" viewBox="0 0 100 100">
            <rect width="100" height="100" rx="24" fill="#2f5bff" />
            <path
              fill="#f6f7fb"
              d="M42 28.3h40.5L73 40.9H43.7c-1.7 0-3.1 1.1-3.7 2.8l-3.7 12.1c-.5 1.7.5 3.1 2.1 3.1h38.2l-9.8 12.7H32.5c-9 0-15.5-8.1-13.4-16.6l4.5-13.5C26.5 33.5 34 28.3 42 28.3z"
            />
          </svg>
          colder.
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 132, fontWeight: 700, letterSpacing: -6, lineHeight: 1 }}>Make the call.</div>
          <div style={{ marginTop: 24, fontSize: 36, color: "#9097a3" }}>Cold call tracking. A clear next move.</div>
        </div>
      </div>
    ),
    size,
  );
}
