"use client";
import { useMemo, useEffect, useState } from "react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { Nunito } from "next/font/google";
import { customColonStyle, customFontStyle } from "../customFont";

const nunito = Nunito({
	weight: "800",
	subsets: ["latin"],
	display: "swap",
});

export default function PlayfulClock({
	time,
	meridiem,
	large,
}: {
	time: string;
	meridiem?: "am" | "pm";
	large?: boolean;
}) {
	const [prevDigits, setPrevDigits] = useState<string[]>([]);
	const [rotations, setRotations] = useState<number[]>([]);
	const digits = useMemo(() => time.split(""), [time]);

	useEffect(() => {
		const randomRotation = () => Math.floor(Math.random() * 13) - 6;
		const newRotations = digits.map((digit, index) =>
			digit !== prevDigits[index] ? randomRotation() : rotations[index] || 0
		);
		if (prevDigits.length === 0 || newRotations.some((r, i) => r !== rotations[i])) {
			setRotations(newRotations);
			setPrevDigits(digits);
		}
	}, [digits]);

	return (
		<div className={`flex items-start ${nunito.className}`} style={customFontStyle}>
			<h1
				className={`${
					large ? "text-7xl md:text-9xl lg:text-[11rem]" : "text-6xl md:text-9xl"
				} text-foreground-2 tracking-wide duration-700 ease-in-out`}
			>
				<div className="flex" style={{ perspective: 1000 }}>
					<AnimatePresence mode="popLayout">
						{digits.map((digit, index) => (
							<m.span
								key={`${digit}${index}`}
								initial={{
									opacity: 0,
									transform: `translateY(0.2em) rotateZ(${rotations[index] | 0}deg)`,
								}}
								animate={{
									opacity: 1,
									transform: `translateY(0em) rotateZ(${rotations[index] | 0}deg)`,
									transition: {
										type: "spring",
										duration: 0.5,
										delay: 0.15 + 0.02 * index,
										bounce: 0.4,
									},
								}}
								exit={{
									opacity: 0,
									transform: `translateY(0.2em) rotateZ(${rotations[index] | 0}deg)`,
									transition: { duration: 0.15, delay: 0.02 * index, ease: "easeIn" },
								}}
							>
								{digit === ":" ? (
									<div className="mx-1 translate-y-[-0.1em] text-accent" style={customColonStyle}>
										:
									</div>
								) : (
									digit
								)}
							</m.span>
						))}
					</AnimatePresence>
				</div>
			</h1>
			<p className="text-foreground-2 text-2xl font-bold p-2">{meridiem}</p>
		</div>
	);
}
