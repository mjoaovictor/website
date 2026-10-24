import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"

type OpenGraph = NonNullable<Metadata["openGraph"]>

export const openGraphBase = {
  siteName: siteConfig.name,
  locale: "en_US",
  type: "website",
  // Page-level openGraph drops the root opengraph-image file's tags, so routes without their own image point at it here.
  images: ["/opengraph-image"],
} satisfies OpenGraph

// A page's openGraph replaces the layout's instead of merging, so the shared fields are re-applied here.
export function pageMetadata({ title, description, path, openGraph }: {
  title: string
  description: string
  path: `/${string}`
  openGraph?: OpenGraph
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...openGraphBase,
      url: path,
      ...openGraph,
    },
  }
}
