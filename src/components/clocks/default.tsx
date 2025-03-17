"use client";
import { useMemo } from "react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { customColonStyle, customFontStyle } from "../customFont";

export default function DefaultClock({
	time,
	meridiem,
	large,
}: {
	time: string;
	meridiem?: "AM" | "PM";
	large?: boolean;
}) {
	const digits = useMemo(() => time.split(""), [time]);
	return (
		<div className="flex">
			<h1
				className={`font-number ${large ? "text-7xl md:text-9xl lg:text-[11rem]" : "text-6xl md:text-9xl"
					} text-foreground-2 duration-700 ease-in-out`}
				style={{ fontVariantNumeric: "tabular-nums", fontVariationSettings: "tnum", ...customFontStyle }}
			>
				<div className="flex" style={{ perspective: 1000 }}>
					<AnimatePresence mode="popLayout">
						{digits.map((digit, index) => (
							<m.span
								key={`${digit}${index}`}
								initial={{ opacity: 0, transform: "translateY(-0.2em) rotateX(30deg)" }}
								animate={{
									opacity: 1,
									transform: "translateY(0em) rotateX(0deg)",
									transition: {
										type: "spring",
										duration: 0.5,
										delay: 0.15 + 0.02 * index,
										bounce: 0.4,
									},
								}}
								exit={{
									opacity: 0,
									transform: "translateY(0.2em) rotateX(-30deg)",
									transition: { duration: 0.15, delay: 0.02 * index, ease: "easeIn" },
								}}
							>
								{digit === ":" ? (
									<div
										className="mx-1 text-accent"
										style={customColonStyle}
									>
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
			{meridiem && <p className="text-foreground-2 text-2xl font-bold p-1.5">{meridiem}</p>}
		</div>
	);
}
