import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found",
}

export default function NotFound() {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-semibold tracking-tight">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-2 text-muted-foreground">
        The link may be broken, or the page may have moved.
      </p>
    </div>
  )
}
