"use client";
import { useEffect, useMemo, useState } from "react";

const Patterns = {
	0: [1, 1, 1, 1, 1, 1, 0],
	1: [0, 1, 1, 0, 0, 0, 0],
	2: [1, 1, 0, 1, 1, 0, 1],
	3: [1, 1, 1, 1, 0, 0, 1],
	4: [0, 1, 1, 0, 0, 1, 1],
	5: [1, 0, 1, 1, 0, 1, 1],
	6: [1, 0, 1, 1, 1, 1, 1],
	7: [1, 1, 1, 0, 0, 0, 0],
	8: [1, 1, 1, 1, 1, 1, 1],
	9: [1, 1, 1, 1, 0, 1, 1],
};

function Display({ digit }: { digit: keyof typeof Patterns }) {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 120 200"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				className={`${Patterns[digit][0] ? "fill-foreground-2 duration-75" : "fill-elevate-1 duration-200"}`}
				d="M6.379,4.258c3.137,-2.656 7.193,-4.258 11.621,-4.258l84,0c4.428,0 8.484,1.602 11.621,4.258l-16.742,16.742l-73.758,0l-16.742,-16.742Z"
			/>
			<path
				className={`${Patterns[digit][1] ? "fill-foreground-2 duration-75" : "fill-elevate-1 duration-200"}`}
				d="M115.742,6.379c2.656,3.137 4.258,7.193 4.258,11.621l-0,80.5l-9.257,0l-11.743,-11.743l-0,-63.636l16.742,-16.742Z"
			/>
			<path
				className={`${Patterns[digit][2] ? "fill-foreground-2 duration-75" : "fill-elevate-1 duration-200"}`}
				d="M120,101.5l-0,80.5c-0,4.428 -1.602,8.484 -4.258,11.621l-16.742,-16.742l-0,-63.636l11.743,-11.743l9.257,-0Z"
			/>
			<path
				className={`${Patterns[digit][3] ? "fill-foreground-2 duration-75" : "fill-elevate-1 duration-200"}`}
				d="M113.621,195.742c-3.137,2.656 -7.193,4.258 -11.621,4.258l-84,0c-4.428,0 -8.484,-1.602 -11.621,-4.258l16.742,-16.742l73.758,0l16.742,16.742Z"
			/>
			<path
				className={`${Patterns[digit][4] ? "fill-foreground-2 duration-75" : "fill-elevate-1 duration-200"}`}
				d="M4.258,193.621c-2.656,-3.137 -4.258,-7.193 -4.258,-11.621l0,-80.5l9.257,0l11.743,11.743l0,63.636l-16.742,16.742Z"
			/>
			<path
				className={`${Patterns[digit][5] ? "fill-foreground-2 duration-75" : "fill-elevate-1 duration-200"}`}
				d="M0,98.5l0,-80.5c0,-4.428 1.602,-8.484 4.258,-11.621l16.742,16.742l0,63.636l-11.743,11.743l-9.257,0Z"
			/>
			<path
				className={`${Patterns[digit][6] ? "fill-foreground-2 duration-75" : "fill-elevate-1 duration-200"}`}
				d="M22,110l-10,-10l10,-10l76,0l10,10l-10,10l-76,0Z"
			/>
		</svg>
	);
}

export default function LCDClock({
	time,
	meridiem,
	large,
}: {
	time: string;
	meridiem?: "AM" | "PM";
	large?: boolean;
}) {
	const digits = useMemo(() => time.split(""), [time]);
	const [colon, setColon] = useState(true);

	useEffect(
		() => {
			if (digits.length > 5) {
				// For clocks with seconds, update colon based on time changes
				setColon(!colon);
			} else {
				// For clocks without seconds, blink colon every second
				const interval = setInterval(() => {
					setColon((prev) => !prev);
				}, 1000);
				return () => clearInterval(interval);
			}
		},
		digits.length > 5 ? [time] : [],
	);
	return (
		<div
			className={`flex items-center gap-3 h-28 ${large && "lg:h-40 lg:gap-4"} duration-700 ease-in-out`}
		>
			{digits.map((digit, index) =>
				digit === ":" ? (
					<div
						key={index}
						className={`flex flex-col h-full ${colon ? "opacity-100 duration-75" : "opacity-0 duration-200"} justify-evenly`}
					>
						<div
							className={`size-3 ${large && "lg:size-4"} bg-accent rounded-full duration-700 ease-in-out`}
						/>
						<div
							className={`size-3 ${large && "lg:size-4"} bg-accent rounded-full duration-700 ease-in-out`}
						/>
					</div>
				) : (
					<Display
						key={index}
						digit={parseInt(digits[index]) as keyof typeof Patterns}
					/>
				),
			)}
			<p className="self-start font-bold text-foreground-2">{meridiem}</p>
		</div>
	);
}
