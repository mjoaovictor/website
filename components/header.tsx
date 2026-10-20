"use client"

import { siteConfig } from "@/lib/site-config"
import { cn } from "cn"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  {
    label: "Career",
    href: "/career",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Tools",
    href: "/tools",
  },
]

export function Header() {
  const pathname = usePathname()

  const isActive = (href: string) => (
    pathname === href || pathname.startsWith(`${href}/`)
  )

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:bg-background focus:z-50 focus:p-2 focus:fixed focus:top-2 focus:left-2"
      >
        Skip To Content
      </a>
      <nav className="flex items-center justify-between max-w-3xl px-4 mx-auto tracking-tight h-14">
        <Link
          href="/"
          aria-current={isActive("/") ? "page" : undefined}
          className="inline-flex items-center font-mono tracking-normal min-h-11 text-foreground"
        >
          {siteConfig.name}
        </Link>
        <div className="flex gap-1">
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              className={cn(
                "inline-flex min-h-11 items-center px-3",
                isActive(href)
                  ? "text-foreground underline decoration-2 underline-offset-6"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
