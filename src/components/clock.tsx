"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import DefaultClock from "./clocks/default";
import DefaultClockNoAnim from "./clocks/defaultNoAnim";
import PlayfulClock from "./clocks/playful";
import SwissClock from "./clocks/analogSwiss";
import BahnClock from "./clocks/analogGerman";
import DotsClock from "./clocks/dots";
import TrianglesClock from "./clocks/triangles";
import MatrixClock from "./clocks/matrix";
import LCDClock from "./clocks/lcd";

function Clock({ large }: { large?: boolean }) {
	const lsClock = localStorage.getItem("clock");
	const lsHideSec = localStorage.getItem("hideSec");
	const timeCheckFreq = localStorage.getItem("incrTimeCheckFreq") === "true" ? 250 : 1000;
	const use12hr = localStorage.getItem("use12hr") === "true" ? true : false;
	const [time, setTime] = useState(getTime);
	function getTime() {
		const now = new Date();
		const hour = now.getHours();
		const minute = now.getMinutes();
		const second = now.getSeconds();
		return lsHideSec ? [hour, minute] : [hour, minute, second];
	}
	useEffect(() => {
		const intervalId = setInterval(() => {
			setTime(getTime);
		}, timeCheckFreq);

		return () => clearInterval(intervalId);
	}, []);

	return lsClock === "None" ? null : lsClock === "LCD" ? (
		<LCDClock
			time={`${(use12hr ? ((time[0] + 11) % 12) + 1 : time[0]).toString().padStart(2, "0")}:${time[1]
				.toString()
				.padStart(2, "0")}${lsHideSec ? "" : `:${time[2].toString().padStart(2, "0")}`}`}
			meridiem={use12hr ? (time[0] < 12 ? "AM" : "PM") : undefined}
			large={large}
		/>
	) : lsClock === "Matrix" ? (
		<MatrixClock
			time={`${(use12hr ? ((time[0] + 11) % 12) + 1 : time[0]).toString().padStart(2, "0")}${time[1]
				.toString()
				.padStart(2, "0")}${lsHideSec ? "" : `${time[2].toString().padStart(2, "0")}`}`}
			meridiem={use12hr ? (time[0] < 12 ? "AM" : "PM") : undefined}
			large={large}
		/>
	) : lsClock === "Triangles" ? (
		<TrianglesClock
			time={`${(use12hr ? ((time[0] + 11) % 12) + 1 : time[0]).toString().padStart(2, "0")}:${time[1]
				.toString()
				.padStart(2, "0")}${lsHideSec ? "" : `:${time[2].toString().padStart(2, "0")}`}`}
			meridiem={use12hr ? (time[0] < 12 ? "AM" : "PM") : undefined}
			large={large}
		/>
	) : lsClock === "Playful" ? (
		<PlayfulClock
			time={`${(use12hr ? ((time[0] + 11) % 12) + 1 : time[0]).toString().padStart(2, "0")}:${time[1]
				.toString()
				.padStart(2, "0")}${lsHideSec ? "" : `:${time[2].toString().padStart(2, "0")}`}`}
			meridiem={use12hr ? (time[0] < 12 ? "am" : "pm") : undefined}
			large={large}
		/>
	) : lsClock === "German station clock" ? (
		<>
			<BahnClock time={time} large={large} />
		</>
	) : lsClock === "Swiss station clock" ? (
		<SwissClock time={time} large={large} />
	) : lsClock === "Dots" ? (
		<DotsClock time={time} large={large} />
	) : lsClock === "Default (no animations)" ? (
		<DefaultClockNoAnim
			time={`${(use12hr ? ((time[0] + 11) % 12) + 1 : time[0]).toString().padStart(2, "0")}:${time[1]
				.toString()
				.padStart(2, "0")}${lsHideSec ? "" : `:${time[2].toString().padStart(2, "0")}`}`}
			meridiem={use12hr ? (time[0] < 12 ? "AM" : "PM") : undefined}
			large={large}
		/>
	) : (
		<DefaultClock
			time={`${(use12hr ? ((time[0] + 11) % 12) + 1 : time[0]).toString().padStart(2, "0")}:${time[1]
				.toString()
				.padStart(2, "0")}${lsHideSec ? "" : `:${time[2].toString().padStart(2, "0")}`}`}
			meridiem={use12hr ? (time[0] < 12 ? "AM" : "PM") : undefined}
			large={large}
		/>
	);
}

export default dynamic(() => Promise.resolve(Clock), {
	ssr: false,
});
