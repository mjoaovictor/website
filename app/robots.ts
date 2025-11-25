import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://mjoaovictor.dev";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
