import { ImageResponse } from "next/og";

export const runtime = "edge";

const size = {
  width: 1200,
  height: 630,
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "mjoaovictor.dev";

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
          backgroundColor: "#555555",
          fontFamily: "sans-serif",
          padding: "0 80px",
        }}
      >
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

        <div
          style={{
            fontSize: 56,
            color: "white",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            letterSpacing: "-0.02em",
            lineHeight: 1.3,
          }}
        >
          {title}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 60,
            fontSize: 24,
            letterSpacing: "0.05em",
            color: "#e5e7eb",
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
