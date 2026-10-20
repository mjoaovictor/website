import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site-config";

export async function GET() {
  const baseUrl = siteConfig.url;
  const allPosts = await getAllPosts();

  const itemsXml = allPosts
    .map(
      (post) =>
        `<item>
          <title><![CDATA[${post.title}]]></title>
          <link>${baseUrl}/blog/${post.slug}</link>
          <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
          <pubDate>${post.date.toUTCString()}</pubDate>
          <description><![CDATA[${post.description}]]></description>
        </item>`,
    )
    .join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>mjoaovictor | Telecommunications Engineer</title>
    <link>${baseUrl}</link>
    <description>Articles exploring telecommunications, software development, and more.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
