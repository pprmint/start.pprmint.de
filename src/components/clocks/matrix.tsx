"use client";
import { useMemo } from "react";

const Patterns = {
	0: [
		0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0,
		0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
	],
	1: [
		0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
		0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
	],
	2: [
		0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
		0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
	],
	3: [
		0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
		0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
	],
	4: [
		0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
		1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
	],
	5: [
		0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
		0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
	],
	6: [
		0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0,
		0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
	],
	7: [
		0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
		0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	],
	8: [
		0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0,
		0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
	],
	9: [
		0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
		0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
	],
};

function Display({ digit }: { digit?: keyof typeof Patterns }) {
	const Colon = [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
	return (
		<div className={`grid ${digit !== undefined && digit !== null ? "grid-cols-6" : "grid-cols-2"} gap-0.5 `}>
			{digit !== undefined && digit !== null
				? Patterns[digit].map((dot, index) => (
						<div
							key={index}
							className={`size-3 ${
								dot === 1 ? "bg-foreground-2" : "bg-elevate-1/50 shadow-inner"
							} rounded-sm duration-200 ease-out`}
							style={{ transitionDelay: `${index / 150}s` }}
						/>
				  ))
				: Colon.map((dot, index) => (
						<div
							key={index}
							className={`${
								dot === 1 ? "bg-accent" : "bg-elevate-1/50 shadow-inner"
							} size-3 rounded-sm duration-200 ease-out`}
							style={{ transitionDelay: `${index / 150}s` }}
						/>
				  ))}
		</div>
	);
}

export default function MatrixClock({ time, meridiem }: { time: string; meridiem?: "AM" | "PM" }) {
	const digits = useMemo(() => time.split("").map(Number), [time]);
	return (
		<div className="flex gap-0.5 p-1 border border-elevate-2 rounded-md bg-gradient-to-b from-elevate-2/25">
			<div className="grid gap-0.5 grid-cols-1">
				{[...Array(9)].map((_, index) => (
					<div key={index} className="size-3 bg-elevate-1/50 shadow-inner rounded-sm" />
				))}
			</div>
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
	);
}
