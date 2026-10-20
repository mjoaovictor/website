import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site-config";
import { MetadataRoute } from "next";

const baseUrl = siteConfig.url;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPosts = await getAllPosts();

  const latestPostDate = allPosts[0]?.date ?? new Date();

  const blogUrls = allPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
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
      url: `${baseUrl}/career`,
      lastModified: new Date("2026-07-02"),
      changeFrequency: "monthly",
      priority: 0.6,
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
      url: `${baseUrl}/tools/link-budget-calculator`,
      lastModified: new Date("2026-07-05"),
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
