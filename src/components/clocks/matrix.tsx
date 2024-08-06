"use client";
import { useMemo } from "react";

const Patterns = {
	0: [0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0],
	1: [1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1],
	2: [1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
	3: [1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
	4: [0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
	5: [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
	6: [0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0],
	7: [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
	8: [0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0],
	9: [0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0],
};

function Display({ digit }: { digit?: keyof typeof Patterns }) {
	const Colon = [0, 0, 1, 0, 1, 0, 0];
	return (
		<div
			className={`grid ${
				digit !== undefined && digit !== null ? "grid-cols-5 w-[68px]" : "grid-cols-1 w-3"
			} gap-0.5 h-24 `}
		>
			{digit !== undefined && digit !== null
				? Patterns[digit].map((dot, index) => (
						<div
							key={index}
							className={`bg-foreground-2 ${
								dot === 1 ? "opacity-100 size-3" : "opacity-0 size-3"
							} rounded-sm duration-200 ease-out`}
							style={{ transitionDelay: `${index / 150}s` }}
						/>
				  ))
				: Colon.map((dot, index) => (
						<div
							key={index}
							className={`${dot === 1 && "bg-accent"} size-3 rounded-sm duration-200 ease-out`}
							style={{ transitionDelay: `${index / 150}s` }}
						/>
				  ))}
		</div>
	);
}

export default function MatrixClock({ time, meridiem }: { time: string; meridiem?: "AM" | "PM" }) {
	const digits = useMemo(() => time.split("").map(Number), [time]);
	return (
		<div className="relative p-1 border border-elevate-2 rounded-md bg-gradient-to-b from-elevate-2/25">
			<div className="absolute -z-10 inset-1 grid grid-rows-9 grid-flow-col gap-0.5">
				{[...Array(digits.length > 4 ? 369 : 243)].map((_, index) => (
					<div key={index} className="bg-elevate-1/50 size-3 rounded-sm shadow-inner" />
				))}
			</div>
			<div className="flex gap-4 p-3.5 drop-shadow-[0px_1px_1px_#0003]">
				<Display digit={digits[0] as keyof typeof Patterns} />
				<Display digit={digits[1] as keyof typeof Patterns} />
				<Display />
				<Display digit={digits[2] as keyof typeof Patterns} />
				<Display digit={digits[3] as keyof typeof Patterns} />
				{digits.length > 4 && (
					<>
						<Display />
						<Display digit={digits[4] as keyof typeof Patterns} />
						<Display digit={digits[5] as keyof typeof Patterns} />
					</>
				)}
			</div>
		</div>
	);
}
