import { getAllPosts } from "@/lib/blog"
import { siteConfig } from "@/lib/site-config"
import { tools } from "@/lib/tools"

// GET handlers are dynamic by default; the file only changes at build time.
export const dynamic = "force-static"

// Not siteConfig.description: that is a casual greeting shared with SEO metadata.
const summary = "Personal site of João Victor, a Telecommunications Engineer."

type Entry = {
  title: string;
  path: string;
  description?: string
}

function section(heading: string, entries: Entry[]): string {
  if (entries.length === 0) {
    return ""
  }

  const lines = entries.map(({ title, path, description }) => {
    const link = `- [${title}](${path.startsWith("http") ? path : siteConfig.url + path})`
    return description ? `${link}: ${description}` : link
  })
  return `## ${heading}\n\n${lines.join("\n")}\n`
}

export async function GET() {
  const posts = await getAllPosts()

  const body = [
    `# ${siteConfig.name}\n\n> ${summary}\n`,
    section(
      "Blog",
      posts.map(({ slug, title, description }) => ({ title, path: `/blog/${slug}`, description }))
    ),
    section(
      "Tools",
      tools.map(({ href, title, description }) => ({ title, path: href, description }))
    ),
    section("Pages", [
      {
        title: "Home",
        path: "/",
        description: "The home page."
      },
      {
        title: "Career",
        path: "/career",
        description: "Where I've been and what I built."
      },
      ...Object.entries(siteConfig.socials).map(([title, path]) => ({ title, path })),
    ]),
    section("Optional", [
      {
        title: "Privacy",
        path: "/privacy",
        description: "Privacy policy."
      },
      {
        title: "Sitemap",
        path: "/sitemap.xml",
        description: "All public pages."
      },
    ]),
  ]
    .filter(Boolean)
    .join("\n")

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}
