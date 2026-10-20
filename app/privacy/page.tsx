import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo"
import Content from "@/content/privacy.mdx"

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description: "What this site collects and why.",
  path: "/privacy",
})

export default function Page() {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-semibold tracking-tight">
        Privacy
      </h1>
      <p className="mt-2 text-muted-foreground">
        What this site collects and why.
      </p>

      <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none border-t pt-8 *:first:mt-0">
        <Content />
      </div>
    </div>
  )
}
