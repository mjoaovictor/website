import type { Metadata } from "next"
import Link from "next/link"
import { pageMetadata } from "@/lib/seo"
import { tools } from "@/lib/tools"

export const metadata: Metadata = pageMetadata({
  title: "Tools",
  description: "Tools for telecommunications and software development.",
  path: "/tools",
})

export default function Page() {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-semibold tracking-tight">
        Tools
      </h1>
      <p className="mt-2 text-muted-foreground">
        Tools for telecommunications and software development.
      </p>
      <ul className="flex flex-col gap-8 py-8 mt-8 border-t">
        {tools.map(({ href, title, description }) => (
          <li key={href} className="relative">
            <Link
              href={href}
              className="text-lg font-medium tracking-tight underline-offset-6 after:absolute after:inset-0 hover:underline"
            >
              {title}
            </Link>
            <p className="mt-1 max-w-prose text-muted-foreground">
              {description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
