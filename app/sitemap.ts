import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/blog"
import { siteConfig } from "@/lib/site-config"
import { TOOLS } from "@/lib/tools"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()

  return [
    { url: siteConfig.url },
    { url: `${siteConfig.url}/blog`, lastModified: posts[0]?.date },
    { url: `${siteConfig.url}/career` },
    { url: `${siteConfig.url}/privacy` },
    { url: `${siteConfig.url}/tools` },
    ...TOOLS.map(({ href }) => ({ url: `${siteConfig.url}${href}` })),
    ...posts.map(({ slug, date }) => ({
      url: `${siteConfig.url}/blog/${slug}`,
      lastModified: date,
    })),
  ]
}
