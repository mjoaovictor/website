import { notFound } from "next/navigation"
import { getAllSlugs, getPost } from "@/lib/blog"
import { ogContentType, ogSize, renderOgImage } from "@/lib/og-image"

export const alt = "Blog post cover"
export const size = ogSize
export const contentType = ogContentType

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return renderOgImage({
    title: post.meta.title,
    description: post.meta.description,
  })
}

export async function generateStaticParams() {
  return (await getAllSlugs()).map((slug) => ({ slug }))
}
