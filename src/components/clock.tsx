"use client";
import dynamic from "next/dynamic";
import DigitalClock from "./clocks/digital";
import DigitalClockNoAnim from "./clocks/digitalNoAnim";

function Clock() {
	const lsClock = localStorage.getItem("clock");
	return lsClock === "Digital (no animations)" ? (
		<DigitalClockNoAnim />
	) : lsClock === "None" ? null : (
		<DigitalClock />
	);
}

export default dynamic(() => Promise.resolve(Clock), {
	ssr: false,
});
