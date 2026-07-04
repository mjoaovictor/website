"use client";

import { useMemo, useState } from "react";
import {
	CartesianGrid,
	Line,
	LineChart,
	ReferenceLine,
	type TooltipContentProps,
	XAxis,
	YAxis,
} from "recharts";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
} from "@/components/ui/chart";
import {
	formatDistance,
	PROPAGATION_SCENARIOS,
	type PropagationFamily,
} from "@/lib/linkbudget/budget";
import { isWithinValidity, pathLossDb } from "@/lib/linkbudget/pathloss";
import { cn } from "@/lib/utils";

const ALL_FAMILIES = ["UMa", "UMi", "RMa", "InH", "FSPL"] as const;

const FAMILY_COLORS: Record<PropagationFamily, { light: string; dark: string }> = {
	UMa: { light: "#2a78d6", dark: "#3987e5" },
	UMi: { light: "#1baf7a", dark: "#199e70" },
	RMa: { light: "#eda100", dark: "#c98500" },
	InH: { light: "#008300", dark: "#008300" },
	FSPL: { light: "#52514e", dark: "#c3c2b7" },
};

const MAPL_COLOR = { light: "#c3c2b7", dark: "#383835" };

const SAMPLE_COUNT = 60;
const MIN_DISTANCE_M = 1;
const CHART_ID = "link-budget-range";

const chartConfig = {
	...Object.fromEntries(
		PROPAGATION_SCENARIOS.map((scenario) => [
			scenario.id,
			{
				label: `${scenario.family} · ${scenario.condition}`,
				theme: FAMILY_COLORS[scenario.family],
			},
		]),
	),
	UMa: { label: "Urban Macro", theme: FAMILY_COLORS.UMa },
	UMi: { label: "Urban Micro", theme: FAMILY_COLORS.UMi },
	RMa: { label: "Rural Macro", theme: FAMILY_COLORS.RMa },
	InH: { label: "Indoor Hotspot", theme: FAMILY_COLORS.InH },
	FSPL: { label: "Free Space", theme: FAMILY_COLORS.FSPL },
	mapl: { label: "MAPL", theme: MAPL_COLOR },
} satisfies ChartConfig;

function RangeTooltipContent({
	active,
	payload = [],
	label,
}: Partial<TooltipContentProps<number, string>>) {
	if (!active || !payload?.length) {
		return null;
	}

	return (
		<div className="grid gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
			<div className="font-medium">{formatDistance(Number(label))}</div>
			<div className="grid gap-1">
				{payload.map((entry) => (
					<div key={String(entry.dataKey)} className="flex items-center gap-2">
						<span
							className="h-2 w-2 shrink-0 rounded-[2px]"
							style={{ backgroundColor: entry.color }}
						/>
						<span className="text-muted-foreground">
							{chartConfig[entry.dataKey as keyof typeof chartConfig]?.label ?? entry.name}
						</span>
						<span className="ml-auto font-medium font-mono text-foreground tabular-nums">
							{typeof entry.value === "number"
								? `${entry.value.toFixed(1)} dB`
								: entry.value}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}

function logSpace(min: number, max: number, count: number): number[] {
	const logMin = Math.log10(min);
	const logMax = Math.log10(max);
	return Array.from(
		{ length: count },
		(_, i) => 10 ** (logMin + ((logMax - logMin) * i) / (count - 1)),
	);
}

type LinkBudgetChartProps = {
	freqMHz: number;
	bsHeightM: number;
	utHeightM: number;
	maplDb: number;
	maxRangesM: Partial<Record<string, number>>;
};

export function LinkBudgetChart({
	freqMHz,
	bsHeightM,
	utHeightM,
	maplDb,
	maxRangesM,
}: LinkBudgetChartProps) {
	const [hiddenFamilies, setHiddenFamilies] = useState<Set<PropagationFamily>>(() => new Set());

	function toggleFamily(family: PropagationFamily) {
		setHiddenFamilies((prev) => {
			const next = new Set(prev);
			if (next.has(family)) next.delete(family);
			else next.add(family);
			return next;
		});
	}

	const data = useMemo(() => {
		const solvedRanges = Object.values(maxRangesM).filter((r): r is number => r != null,);
		const maxDistance = Math.max(...solvedRanges, MIN_DISTANCE_M * 10) * 1.15;
		const distances = logSpace(MIN_DISTANCE_M, maxDistance, SAMPLE_COUNT);

		return distances.map((distance) => {
			const point: Record<string, number | null> = { distance };
			for (const scenario of PROPAGATION_SCENARIOS) {
				// stop each curve at its own 3GPP-validated domain edge
				point[scenario.id] = isWithinValidity(
					scenario.id,
					distance,
					bsHeightM,
					utHeightM,
				) ? pathLossDb(scenario.id, distance, freqMHz, bsHeightM, utHeightM) : null;
			}
			return point;
		});
	}, [freqMHz, bsHeightM, utHeightM, maxRangesM]);

	return (
		// data-chart mirrors ChartContainer's own scope so the legend below (a sibling, not a
		// descendant of the container's inner div) can still read the same --color-* variables.
		<div data-chart={`chart-${CHART_ID}`} className="space-y-3">
			<ChartContainer
				id={CHART_ID}
				config={chartConfig}
				className="aspect-auto h-80 w-full"
			>
				<LineChart
					data={data}
					margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
				>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="distance"
						type="number"
						scale="log"
						domain={["dataMin", "dataMax"]}
						tickFormatter={formatDistance}
						tickLine={false}
						axisLine={false}
						tickMargin={8}
					/>
					<YAxis
						tickFormatter={(v: number) => `${v} dB`}
						tickLine={false}
						axisLine={false}
						width={56}
					/>
					<ChartTooltip content={<RangeTooltipContent />} />
					<ReferenceLine
						y={maplDb}
						stroke="var(--color-mapl)"
						strokeDasharray="4 4"
						label={{
							value: `MAPL: ${maplDb.toFixed(1)} dB`,
							position: "insideBottomRight",
							className: "fill-muted-foreground text-xs",
						}}
					/>
					{PROPAGATION_SCENARIOS.map((scenario) => (
						<Line
							key={scenario.id}
							type="monotone"
							dataKey={scenario.id}
							stroke={`var(--color-${scenario.id})`}
							strokeWidth={1.5}
							strokeDasharray={
								scenario.family === "FSPL"
									? "2 4"
									: scenario.condition === "NLOS"
										? "6 4"
										: undefined
							}
							dot={false}
							isAnimationActive={true}
							hide={hiddenFamilies.has(scenario.family)}
						/>
					))}
				</LineChart>
			</ChartContainer>

			<div className="flex flex-wrap items-center gap-x-1 gap-y-1 text-neutral-500 text-xs dark:text-neutral-400">
				{ALL_FAMILIES.map((family) => {
					const hidden = hiddenFamilies.has(family);
					return (
						<button
							key={family}
							type="button"
							onClick={() => toggleFamily(family)}
							aria-pressed={!hidden}
							className={cn(
								"flex items-center gap-1.5 rounded px-1.5 py-1 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900",
								hidden && "opacity-40",
							)}
						>
							<span
								className="h-2 w-2 shrink-0 rounded-full"
								style={{ backgroundColor: `var(--color-${family})` }}
							/>
							<span className={cn(hidden && "line-through")}>
								{chartConfig[family].label}
							</span>
						</button>
					);
				})}
				<span className="ml-auto flex items-center gap-3">
					<span className="flex items-center gap-1.5">
						<span className="h-0.5 w-4 bg-current" /> LOS
					</span>
					<span className="flex items-center gap-1.5">
						<span className="h-0.5 w-4 bg-[repeating-linear-gradient(90deg,currentColor_0_3px,transparent_3px_6px)]" />{" "}
						NLOS
					</span>
				</span>
			</div>
		</div>
	);
}
