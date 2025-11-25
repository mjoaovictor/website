import { ImageResponse } from "next/og";

// next.js route segment config
export const runtime = "edge";

// image metadata
export const alt = "mjoaovictor | Telecommunications Engineer";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#555555",  // dark slate background (matches dark mode)
          fontFamily: "sans-serif",
        }}
      >
        {/* top gradient line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "linear-gradient(90deg, #3b82f6, #a855f7, #ec4899)",
          }}
        />

        {/* main center text */}
        <div
          style={{
            fontSize: 48,
            color: 'white',
            fontWeight: 400,
            display: 'flex',
            alignItems: 'center',
            letterSpacing: '-0.02em',
          }}
        >
          mjoaovictor | Telecommunications Engineer
        </div>

        {/* footer URL */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            fontSize: 24,
            letterSpacing: "0.05em",
            color: "#e5e7eb"
          }}
        >
          mjoaovictor.dev
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
