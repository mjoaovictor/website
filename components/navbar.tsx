"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
	{
		path: "/",
		name: "home",
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

export function Navbar() {
	const pathname = usePathname();

	return (
		<nav className="mb-8 -ml-2 tracking-tight">
			<div className="flex flex-row gap-2">
				{NAV_ITEMS.map(({ path, name }) => {
					const isActive = path === "/" ? pathname === "/" : pathname.startsWith(path);

					return (
						<Link
							key={path}
							href={path}
							className={cn(
								"flex px-2 py-1 align-middle hover:underline hover:underline-offset-6",
								isActive
									? "text-neutral-900 dark:text-neutral-100"
									: "text-neutral-500 dark:text-neutral-400",
							)}
						>
							{name}
						</Link>
					);
				})}
			</div>
		</nav>
	);
}
