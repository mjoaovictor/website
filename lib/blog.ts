import "server-only"
import { readdir, readFile } from "node:fs/promises"
import path from "node:path"
import matter from "gray-matter"
import { cache, type ComponentType } from "react"
import { z } from "zod"

// YAML parses unquoted dates (2026-10-17) to Date, quoted ones stay strings; coerce handles both.
const frontmatterSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  date: z.coerce.date(),
})

export type PostFrontmatter = z.infer<typeof frontmatterSchema>

export type PostMetadata = PostFrontmatter & { slug: string }

const POSTS_DIR = path.join(process.cwd(), "content", "blog")
const MDX_EXTENSION = ".mdx"

async function readMetadata(slug: string): Promise<PostMetadata> {
  const filePath = path.join(POSTS_DIR, `${slug}${MDX_EXTENSION}`)
  const { data } = matter(await readFile(filePath, "utf8"))

  const result = frontmatterSchema.safeParse(data)
  if (!result.success) {
    throw new Error(`${filePath}: Invalid frontmatter\n${z.prettifyError(result.error)}`)
  }

  return { slug, ...result.data }
}

export async function getAllSlugs(): Promise<string[]> {
  const files = await readdir(POSTS_DIR)
  return files
    .filter((file) => file.endsWith(MDX_EXTENSION))
    .map((file) => path.basename(file, MDX_EXTENSION))
}

export async function getAllPosts(): Promise<PostMetadata[]> {
  const slugs = await getAllSlugs()
  const posts = await Promise.all(slugs.map(readMetadata))
  return posts.sort(
    (a, b) => b.date.getTime() - a.date.getTime() || a.slug.localeCompare(b.slug)
  )
}

export const getPost = cache(async (
  slug: string
): Promise<{ meta: PostMetadata; Content: ComponentType } | null> => {
  const slugs = await getAllSlugs()
  if (!slugs.includes(slug)) {
    return null
  }

  const [meta, { default: Content }] = await Promise.all([
    readMetadata(slug),
    import(`@/content/blog/${slug}.mdx`),
  ])
  return { meta, Content }
})
