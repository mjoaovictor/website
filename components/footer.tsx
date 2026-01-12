"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AnimatedBackground } from "./animated_background";

const THEMES = [
  {
    label: "Light",
    id: "light",
    icon: SunIcon,
  },
  {
    label: "Dark",
    id: "dark",
    icon: MoonIcon,
  },
  {
    label: "System",
    id: "system",
    icon: MonitorIcon,
  },
] as const;

function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-8 w-[100px]" />;
  }

  return (
    <AnimatedBackground
      className="pointer-events-none rounded-lg bg-zinc-100 dark:bg-zinc-900"
      defaultValue={theme}
      transition={{
        type: "spring",
        bounce: 0,
        duration: 0.2,
      }}
      enableHover={false}
      onValueChange={(id) => {
        setTheme(id as string);
      }}
    >
      {THEMES.map((item) => {
        return (
          <button
            key={item.id}
            data-id={item.id}
            type="button"
            aria-label={`switch to ${item.label} theme`}
            className="inline-flex h-8 w-8 items-center justify-center text-zinc-600 data-[checked=true]:text-zinc-900 dark:text-zinc-400 dark:data-[checked=true]:text-zinc-100"
          >
            <item.icon className="h-4 w-4" />
          </button>
        );
      })}
    </AnimatedBackground>
  );
}

export function Footer() {
  return (
    <footer className="border-zinc-100 border-t py-4 dark:border-zinc-900">
      <div className="flex items-center justify-end">
        <ThemeSwitch />
      </div>
    </footer>
  );
}
