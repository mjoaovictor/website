"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
	{
		path: "/career",
		name: "career",
	},
	{
		path: "/blog",
		name: "blog",
	},
	{
		path: "/tools",
		name: "tools",
	},
] as const;

const FOCUS_RING =
	"rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function Navbar() {
	const pathname = usePathname();
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 0);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header
			className={cn(
				"sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md transition-colors",
				scrolled ? "border-border" : "border-transparent",
			)}
		>
			<a
				href="#main"
				className="sr-only rounded-md bg-background px-3 py-2 focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:ring-2 focus:ring-ring focus:outline-none"
			>
				skip to content
			</a>
			<nav
				aria-label="Primary"
				className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4 tracking-tight"
			>
				<Link
					href="/"
					aria-current={pathname === "/" ? "page" : undefined}
					className={cn(
						"-ml-2 px-2 py-2 font-medium text-neutral-900 dark:text-neutral-100 tracking-wide",
						FOCUS_RING,
					)}
				>
					{siteConfig.name}
				</Link>
				<div className="-mr-2 flex gap-1">
					{NAV_ITEMS.map(({ path, name }) => {
						const isActive =
							pathname === path || pathname.startsWith(`${path}/`);

						return (
							<Link
								key={path}
								href={path}
								aria-current={isActive ? "page" : undefined}
								className={cn(
									"px-2 py-2 transition-colors",
									FOCUS_RING,
									isActive
										? "text-neutral-900 underline decoration-2 underline-offset-8 dark:text-neutral-100"
										: "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100",
								)}
							>
								{name}
							</Link>
						);
					})}
				</div>
			</nav>
		</header>
	);
}
