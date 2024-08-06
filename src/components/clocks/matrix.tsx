"use client";
import { useMemo } from "react";

function Display(digit: { digit: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 }) {
	const Patterns = { 0: [0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0], 1: [0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0] };

	return (
		<div className="grid grid-cols-5 gap-1">
			{Patterns[0].map((dot, index) => (
				<div
					key={index}
					className={`${dot === 1 ? "bg-foreground-2 size-3" : "bg-elevate-1 size-1 m-1"} rounded-full`}
				/>
			))}
		</div>
	);
}

export default function MatrixClock({ time, meridiem }: { time: string; meridiem?: "AM" | "PM" }) {
	const digits = useMemo(() => time.split(""), [time]);

	return (
		<div className="flex">
			<h1 className="font-number text-6xl md:text-9xl text-foreground-2">
				<div className="flex">
					<Display digit={0} />
				</div>
			</h1>
			<p className="text-foreground-2 text-2xl font-bold p-1.5">{meridiem}</p>
		</div>
	);
}
