"use client";

import { AnimatePresence, motion, type Transition } from "motion/react";
import {
	Children,
	cloneElement,
	type HTMLAttributes,
	isValidElement,
	type ReactElement,
	useEffect,
	useId,
	useState,
} from "react";
import { cn } from "@/lib/utils";

interface AnimatedChildProps extends HTMLAttributes<HTMLElement> {
  "data-id": string;
  "data-checked"?: boolean;
}

export type AnimatedBackgroundProps = {
	children: ReactElement<AnimatedChildProps>[] | ReactElement<AnimatedChildProps>;
	defaultValue?: string;
	onValueChange?: (newActiveId: string | null) => void;
	className?: string;
	transition?: Transition;
	enableHover?: boolean;
};

export function AnimatedBackground({
	children,
	defaultValue,
	onValueChange,
	className,
	transition,
	enableHover = false,
}: AnimatedBackgroundProps) {
	const [activeId, setActiveId] = useState<string | null>(null);
	const uniqueId = useId();

	useEffect(() => {
		if (defaultValue !== undefined) {
			setActiveId(defaultValue);
		}
	}, [defaultValue]);

	const handleSetActiveId = (id: string | null) => {
		setActiveId(id);
		onValueChange?.(id);
	};

	return (
		<>
			{Children.map(children, (child) => {
				if (!isValidElement(child)) return null;

				const element = child as ReactElement<AnimatedChildProps>;
        const id = element.props["data-id"];

				const interactionProps = enableHover
					? {
							onMouseEnter: () => handleSetActiveId(id),
							onMouseLeave: () => handleSetActiveId(null),
						}
					: {
							onClick: () => handleSetActiveId(id),
						};

				return cloneElement(
					element,
					{
            key: id,
            className: cn("relative inline-flex", element.props.className),
            "aria-checked": activeId === id,
            "data-checked": activeId === id,
            ...interactionProps,
          },
					<>
            <AnimatePresence initial={false}>
              {activeId === id && (
                <motion.div
                  layoutId={`background-${uniqueId}`}
                  className={cn("absolute inset-0", className)}
                  transition={transition}
                  initial={{ opacity: defaultValue ? 1 : 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </AnimatePresence>
            <div className="z-10">{element.props.children}</div>
          </>
				);
			})}
		</>
	);
}
