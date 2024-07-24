"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

function DigitalClockNoAnim() {
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
	}, [getTime]);

	return (
		<div className="flex" style={{ perspective: 1000 }}>
			{time}
		</div>
	);
}

export default dynamic(() => Promise.resolve(DigitalClockNoAnim), {
	ssr: false,
});
