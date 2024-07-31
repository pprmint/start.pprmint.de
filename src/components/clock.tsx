"use client";
import dynamic from "next/dynamic";
import DefaultClock from "./clocks/default";
import DefaultClockNoAnim from "./clocks/defaultNoAnim";
import PlayfulClock from "./clocks/playful";
import SwissClock from "./clocks/analogSwiss";
import BahnClock from "./clocks/analogGerman";
import { useEffect, useState } from "react";

function Clock() {
	const lsClock = localStorage.getItem("clock");
	const lsHideSec = localStorage.getItem("hideSec");
	const timeCheckFreq = localStorage.getItem("incrTimeCheckFreq") === "true" ? 250 : 1000;
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

	return lsClock === "None" ? null : lsClock === "Playful" ? (
		<PlayfulClock
			time={`${time[0].toString().padStart(2, "0")}:${time[1].toString().padStart(2, "0")}${
				lsHideSec ? "" : `:${time[2].toString().padStart(2, "0")}`
			}`}
		/>
	) : lsClock === "German station clock" ? (
		<BahnClock time={time} />
	) : lsClock === "Swiss station clock" ? (
		<SwissClock time={time} />
	) : lsClock === "Default (no animations)" ? (
		<DefaultClockNoAnim
			time={`${time[0].toString().padStart(2, "0")}:${time[1].toString().padStart(2, "0")}${
				lsHideSec ? "" : `:${time[2].toString().padStart(2, "0")}`
			}`}
		/>
	) : (
		<DefaultClock
			time={`${time[0].toString().padStart(2, "0")}:${time[1].toString().padStart(2, "0")}${
				lsHideSec ? "" : `:${time[2].toString().padStart(2, "0")}`
			}`}
		/>
	);
}

export default dynamic(() => Promise.resolve(Clock), {
	ssr: false,
});
