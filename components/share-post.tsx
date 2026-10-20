"use client"

import { Check, Link as LinkIcon, Share2, Share as ShareIcon } from "lucide-react"
import { cn } from "cn"
import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { WhatsAppIcon } from "@/components/icons"
import { Button, buttonVariants } from "@/components/ui/button"

type SharePostProps = {
  title: string
  url: string
  className?: string
}

type CopyStatus = "idle" | "copied" | "failed"

const copyLabels: Record<CopyStatus, string> = {
  idle: "Copy Link",
  copied: "Copied!",
  failed: "Couldn't Copy",
}

const subscribe = () => () => {}

export function SharePost({ title, url, className }: SharePostProps) {
  // Support is unknown on the server, so the system share sheet is only offered after hydration.
  const canShare = useSyncExternalStore(subscribe, () => "share" in navigator, () => false)
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle")
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopyStatus("copied")
    } catch {
      // Clipboard is blocked outside secure contexts or when permission is denied
      setCopyStatus("failed")
    }
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setCopyStatus("idle"), 2000)
  }

  async function handleShare() {
    try {
      await navigator.share({ title, url })
    } catch (error) {
      // Closing the share sheet rejects with AbortError; that's not a failure
      if (error instanceof DOMException && error.name === "AbortError") return
      await handleCopy()
    }
  }

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {canShare ? (
        <Button variant="outline" size="sm" onClick={handleShare}>
          <Share2 className="size-4" />
          Share
        </Button>
      ) : (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          <WhatsAppIcon className="size-4.5" />
          Share
        </a>
      )}
      <Button variant="outline" size="sm" onClick={handleCopy}>
        {copyStatus === "copied" ? (
          <Check className="size-4" />
        ) : (
          <LinkIcon className="size-4" />
        )}
        <span aria-live="polite">
          {copyLabels[copyStatus]}
        </span>
      </Button>
    </div>
  )
}
