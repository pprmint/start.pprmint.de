"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

function Time() {
	const [time, setTime] = useState(getTime);

	function getTime() {
		const hour = new Date().getHours().toString().padStart(2, "0");
		const minute = new Date().getMinutes().toString().padStart(2, "0");
		const second = new Date().getSeconds().toString().padStart(2, "0");
		return `${hour}:${minute}:${second}`;
	}

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTime(getTime);
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	return time;
}

export default dynamic(() => Promise.resolve(Time), {
	ssr: false,
});
