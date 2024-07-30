"use client";
import dynamic from "next/dynamic";
import { useEffect, useState, useMemo } from "react";
import { useTransition, a, easings } from "@react-spring/web";
import { Nunito } from "next/font/google";

const nunito = Nunito({
	weight: "800",
	subsets: ["latin"],
	display: "swap",
});

function SquishyClock() {
	const lsHideSec = localStorage.getItem("hideSec");
	const [time, setTime] = useState(getTime);
	function getTime() {
		const now = new Date();
		const hour = now.getHours().toString().padStart(2, "0");
		const minute = now.getMinutes().toString().padStart(2, "0");
		const second = now.getSeconds().toString().padStart(2, "0");
		return `${hour}:${minute}${lsHideSec !== "true" ? `:${second}` : ""}`;
	}

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTime(getTime);
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	const digits = useMemo(() => time.split(""), [time]);

	// Function to generate a random number within a range
	function DBWagenreihung(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	// Generate random rotations for each digit
	function generateRandomRotations(digits: string[], min: number, max: number) {
		return digits.map(() => DBWagenreihung(min, max));
	}
	const rotations = generateRandomRotations(digits, -6, 6);

	const transitions = useTransition(digits, {
		keys: digits.map((digit, index) => `${digit}-${index}`),
		from: { transform: `translateY(20px) rotateZ(0deg)` },
		enter: (_, index) => ({
			transform: `translateY(0px) rotateZ(${rotations[index]}deg)`,
			config: { duration: 400, easing: easings.easeOutBack },
		}),
		leave: (_, index) => ({
			transform: `translateY(20px) rotateZ(0deg)`,
			config: { duration: 200, easing: easings.easeInCubic },
		}),
		exitBeforeEnter: true,
	});

	return (
		<h1 className={`text-6xl md:text-9xl text-foreground-2 tracking-wide ${nunito.className}`}>
			<div className="flex" style={{ perspective: 1000 }}>
				{transitions((style, item, index) => (
					<a.span key={`${item}-${index}`} style={style}>
						{item === ":" ? <span className="animate-pulse mx-1">:</span> : item}
					</a.span>
				))}
			</div>
		</h1>
	);
}

export default dynamic(() => Promise.resolve(SquishyClock), {
	ssr: false,
});
