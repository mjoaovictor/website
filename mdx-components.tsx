import type { MDXComponents } from "mdx/types"
import { ChannelRasterTable } from "@/components/channel-raster-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "cn"

// Element classes override the `prose` defaults set on the post wrapper.
// className is merged so classes added by rehype plugins are kept.
const components: MDXComponents = {
  h2: ({ className, ...props }) => (
    <h2 className={cn("tracking-tight mt-14", className)} {...props} />
  ),
  h3: ({ className, ...props }) => (
    <h3 className={cn("tracking-tight", className)} {...props} />
  ),
  a: ({ className, href, ...props }) => (
    <a
      className={cn("underline-offset-6", className)}
      href={href}
      {...(href?.startsWith("http") && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "font-normal text-muted-foreground not-italic [&_p]:before:content-none [&_p]:after:content-none",
        className
      )}
      {...props}
    />
  ),
  // Asides the reader needs (definitions, worked examples), so text stays full contrast.
  Callout: ({ children }) => (
    <div
      role="note"
      className="my-8 rounded-lg border border-accent/30 bg-accent/10 px-5 py-1 dark:border-accent/40 dark:bg-accent/15"
    >
      {children}
    </div>
  ),
  ChannelRasterTable,
  // Markdown tables share the shadcn Table styling used by the tools.
  table: Table,
  thead: TableHeader,
  tbody: TableBody,
  tr: TableRow,
  th: TableHead,
  td: TableCell,
  // Focusable so keyboard users can scroll wide code in browsers that don't do it natively.
  pre: ({ className, ...props }) => (
    <pre
      tabIndex={0}
      className={cn(
        "px-0 text-sm leading-6 border rounded-lg bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className
      )}
      {...props}
    />
  ),
  // rehype-pretty-code tags block code with data-language; anything else is inline.
  code: ({ className, ...props }) =>
    "data-language" in props ? (
      <code className={className} {...props} />
    ) : (
      <code
        className={cn(
          "rounded bg-muted px-1.5 py-0.5 before:content-none after:content-none",
          className
        )}
        {...props}
      />
    ),
}

export function useMDXComponents(): MDXComponents {
  return components
}
