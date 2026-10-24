import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { siteConfig } from "@/lib/site-config"

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = "image/png"

const fontsDir = join(process.cwd(), "assets", "fonts")
const [geistRegular, geistSemiBold, geistMono] = await Promise.all([
  readFile(join(fontsDir, "Geist-Regular.ttf")),
  readFile(join(fontsDir, "Geist-SemiBold.ttf")),
  readFile(join(fontsDir, "GeistMono-Regular.ttf")),
])

// Satori has no oklch(); these are the dark theme tokens from app/globals.css as hex.
const colors = {
  background: "#1B1B1B",
  foreground: "#ECECE7",
  muted: "#B4B4AE",
  tick: "rgba(255, 255, 255, 0.22)",
  accent: "#3183D8",
}

const host = new URL(siteConfig.url).host

const MARGIN = 72
const TICK_COUNT = 101
const ACCENT_TICK_INDEX = 62

// The ticks are a frequency raster; the accent tick is the selected channel.
const ticks = Array.from({ length: TICK_COUNT }, (_, index) => index)

export function renderOgImage({ title, description }: {
  title: string
  description?: string
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: colors.background,
          color: colors.foreground,
          fontFamily: "Geist",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: `${MARGIN}px ${MARGIN}px 0`,
          }}
        >
          <div style={{ fontFamily: "Geist Mono", fontSize: 30, color: colors.muted }}>
            {host}
          </div>
          <div
            style={{
              marginTop: 72,
              fontSize: 60,
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
              display: "block",
              lineClamp: 3,
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                marginTop: 28,
                fontSize: 30,
                lineHeight: 1.4,
                color: colors.muted,
                display: "block",
                lineClamp: 2,
              }}
            >
              {description}
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            padding: `0 ${MARGIN}px ${MARGIN}px`,
          }}
        >
          {ticks.map((index) => (
            <div
              key={index}
              style={{
                width: index === ACCENT_TICK_INDEX ? 4 : 2,
                height: index === ACCENT_TICK_INDEX ? 72 : 24,
                background: index === ACCENT_TICK_INDEX ? colors.accent : colors.tick,
              }}
            />
          ))}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Geist", data: geistRegular, weight: 400, style: "normal" },
        { name: "Geist", data: geistSemiBold, weight: 600, style: "normal" },
        { name: "Geist Mono", data: geistMono, weight: 400, style: "normal" },
      ],
    }
  )
}
