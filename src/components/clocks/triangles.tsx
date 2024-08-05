import { useMemo } from "react";

export default function TrianglesClock({ time, meridiem }: { time: string; meridiem?: "AM" | "PM" }) {
	const digits = useMemo(() => time.split(""), [time]);
	return (
		<div className="relative flex items-baseline">
			<h1 className="absolute -z-10 font-triangles text-6xl md:text-9xl text-elevate-1">
				**:**{time.length > 5 && ":**"}
			</h1>
			<h1 className="font-triangles text-6xl md:text-9xl text-foreground-2">
				<div className="flex">
					{digits.map((item, index) =>
						item === ":" ? (
							<span className="text-foreground-1 animate-pulse">:</span>
						) : (
							<span key={index}>{item}</span>
						)
					)}
				</div>
			</h1>
			<p className="text-foreground-2 text-2xl font-bold p-1.5">{meridiem}</p>
		</div>
	);
}
