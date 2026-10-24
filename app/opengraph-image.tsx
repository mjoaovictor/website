import { ogContentType, ogSize, renderOgImage } from "@/lib/og-image"

export const alt = "mjoaovictor: tools, automation and notes on Telecom Engineering"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgImage({
    title: "Hi, I’m João. I automate and explain Telecom Engineering.",
  })
}
