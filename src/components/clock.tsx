"use client";
import dynamic from "next/dynamic";
import DigitalClock from "./clocks/digital";
import DigitalClockNoAnim from "./clocks/digitalNoAnim";
import SwissClock from "./clocks/analogSwiss";
import BahnClock from "./clocks/analogGerman";

function Clock() {
	const lsClock = localStorage.getItem("clock");
	return lsClock === "German station clock" ? (
		<BahnClock />
	) : lsClock === "Swiss station clock" ? (
		<SwissClock />
	) : lsClock === "Digital (no animations)" ? (
		<DigitalClockNoAnim />
	) : lsClock === "None" ? null : (
		<DigitalClock />
	);
}

export default dynamic(() => Promise.resolve(Clock), {
	ssr: false,
});
