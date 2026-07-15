import { getPosts } from "@/lib/blog";

const baseUrl = "https://mjoaovictor.dev";

export async function GET() {
  const posts = getPosts().sort((a, b) =>
		b.metadata.publishedAt.localeCompare(a.metadata.publishedAt),
	);

  const postLines = posts.map((post) => (
    `- [${post.metadata.title}](${baseUrl}/blog/${post.slug}): ${post.metadata.summary}`
  )).join("\n");

  const body = `# mjoaovictor.dev

> Personal site of João Victor, a Telecommunications Engineer. Technical writing on 5G NR and interactive calculators for telecom engineering, grounded in 3GPP specifications.

## Pages

- [Home](${baseUrl}/): Profile, current role, and links.
- [Career](${baseUrl}/career): Professional experience and education timeline.
- [Tools](${baseUrl}/tools): Index of interactive telecom calculators.
- [5G NR-ARFCN Calculator](${baseUrl}/tools/5g-nr-arfcn-calculator): Convert between NR-ARFCN and Frequency (MHz) based on 3GPP TS 38.104.
- [5G Link Budget Calculator](${baseUrl}/tools/link-budget-calculator): Calculate 5G NR Link Budget and maximum cell range based on 3GPP TR 38.901.
- [Blog](${baseUrl}/blog): Articles on 5G NR technical topics.

## Blog posts

${postLines}

## Sitemap

${baseUrl}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
