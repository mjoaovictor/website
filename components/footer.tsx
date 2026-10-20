import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { siteConfig } from "@/lib/site-config"

const linkClassName =
  "inline-flex min-h-11 items-center px-3 hover:text-foreground"

export function Footer() {
  return (
    <footer className="mt-8">
      <div className="flex flex-wrap items-center justify-between max-w-3xl gap-2 p-4 mx-auto text-sm tracking-tight text-muted-foreground">
        <nav className="flex -ml-3">
          {Object.entries(siteConfig.socials).map(([label, href]) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="me noopener noreferrer"
              className={linkClassName}
            >
              {label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <Link href="/privacy" className={linkClassName}>
            Privacy
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  )
}
