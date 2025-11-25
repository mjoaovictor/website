import { getPosts } from "@/lib/blog";

export async function GET() {
  const baseUrl = "https://mjoaovictor.dev";
  const allPosts = getPosts();

  const itemsXml = allPosts
    .sort((a, b) => {
      return (
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
      );
    })
    .map(
      (post) =>
        `<item>
          <title><![CDATA[${post.metadata.title}]]></title>
          <link>${baseUrl}/blog/${post.slug}</link>
          <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
          <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
          <description><![CDATA[${post.metadata.summary}]]></description>
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
