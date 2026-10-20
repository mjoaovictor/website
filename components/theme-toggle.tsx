"use client"

import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"
import { Button } from "@/components/ui/button"

const options = [
  {
    value: "system",
    label: "System",
    Icon: Monitor
  },
  {
    value: "light",
    label: "Light",
    Icon: Sun
  },
  {
    value: "dark",
    label: "Dark",
    Icon: Moon
  },
]

const subscribe = () => () => {}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  // The stored theme is unknown on the server, so nothing is marked active until hydration.
  const mounted = useSyncExternalStore(subscribe, () => true, () => false)

  return (
    <div
      role="group"
      aria-label="Theme"
      className="inline-flex gap-0.5 p-0.5 border rounded-full"
    >
      {options.map(({ value, label, Icon }) => (
        <Button
          key={value}
          variant="ghost"
          size="icon-sm"
          aria-label={label}
          aria-pressed={mounted && theme === value}
          onClick={() => setTheme(value)}
          className="rounded-full text-muted-foreground aria-pressed:bg-foreground/10 aria-pressed:text-foreground"
        >
          <Icon aria-hidden />
        </Button>
      ))}
    </div>
  )
}
