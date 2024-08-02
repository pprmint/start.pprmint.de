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

function Clock() {
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

	return lsClock === "None" ? null : lsClock === "Triangles" ? (
		<TrianglesClock
			time={`${(use12hr ? ((time[0] + 11) % 12) + 1 : time[0]).toString().padStart(2, "0")}:${time[1]
				.toString()
				.padStart(2, "0")}${lsHideSec ? "" : `:${time[2].toString().padStart(2, "0")}`}`}
			meridiem={use12hr ? (time[0] < 12 ? "AM" : "PM") : undefined}
		/>
	) : lsClock === "Playful" ? (
		<PlayfulClock
			time={`${(use12hr ? ((time[0] + 11) % 12) + 1 : time[0]).toString().padStart(2, "0")}:${time[1]
				.toString()
				.padStart(2, "0")}${lsHideSec ? "" : `:${time[2].toString().padStart(2, "0")}`}`}
			meridiem={use12hr ? (time[0] < 12 ? "am" : "pm") : undefined}
		/>
	) : lsClock === "German station clock" ? (
		<BahnClock time={time} />
	) : lsClock === "Swiss station clock" ? (
		<SwissClock time={time} />
	) : lsClock === "Dots" ? (
		<DotsClock time={time} />
	) : lsClock === "Default (no animations)" ? (
		<DefaultClockNoAnim
			time={`${(use12hr ? ((time[0] + 11) % 12) + 1 : time[0]).toString().padStart(2, "0")}:${time[1]
				.toString()
				.padStart(2, "0")}${lsHideSec ? "" : `:${time[2].toString().padStart(2, "0")}`}`}
			meridiem={use12hr ? (time[0] < 12 ? "AM" : "PM") : undefined}
		/>
	) : (
		<DefaultClock
			time={`${(use12hr ? ((time[0] + 11) % 12) + 1 : time[0]).toString().padStart(2, "0")}:${time[1]
				.toString()
				.padStart(2, "0")}${lsHideSec ? "" : `:${time[2].toString().padStart(2, "0")}`}`}
			meridiem={use12hr ? (time[0] < 12 ? "AM" : "PM") : undefined}
		/>
	);
}

export default dynamic(() => Promise.resolve(Clock), {
	ssr: false,
});
