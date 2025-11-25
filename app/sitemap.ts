import { getPosts } from "@/lib/blog";
import { MetadataRoute } from "next";

export const baseUrl = "https://mjoaovictor.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPosts = getPosts();

  const latestPostDate =
    allPosts.length > 0
      ? new Date(allPosts[0].metadata.publishedAt)
      : new Date();

  const blogUrls = allPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const mainRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date("2025-11-23"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date("2025-11-23"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/5g-nr-arfcn-calculator`,
      lastModified: new Date("2025-11-23"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: latestPostDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  return [...mainRoutes, ...blogUrls];
}
