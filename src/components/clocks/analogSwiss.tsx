"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

function SwissClock() {
	const lsHideSec = localStorage.getItem("hideSec");
	const [time, setTime] = useState(getTime);

	function getTime() {
		const now = new Date();
		const hour = now.getHours();
		const minute = now.getMinutes();
		const second = now.getSeconds();
		return [hour, minute, second];
	}

	const rotateHour = 30 * time[0] + (time[1] / 60) * 30;
	const rotateMinute = 6 * time[1] + 360 * time[0];
	const rotateSecond = (360 / 59) * time[2] + 6;

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTime(getTime);
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<div className="relative size-64 border border-neutral-50 dark:border-neutral-800 rounded-full shadow-inner">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 186 186"
				className="absolute inset-2 fill-neutral-950 dark:fill-neutral-100"
			>
				<path d="M90 0h6v24h-6zM142.098 13.96l-12 20.784-5.196-3 12-20.784zM175.04 49.098l-20.784 12-3-5.196 20.784-12zM186 96h-24v-6h24zM172.04 142.098l-20.784-12 3-5.196 20.784 12zM136.902 175.04l-12-20.784 5.196-3 12 20.784zM90 162h6v24h-6zM61.098 154.256l-12 20.784-5.196-3 12-20.784zM34.744 130.098l-20.784 12-3-5.196 20.784-12zM24 96H0v-6h24zM31.744 61.098l-20.784-12 3-5.196 20.784 12zM55.902 34.744l-12-20.784 5.196-3 12 20.784zM103.716.614l-.732 6.962-1.989-.209.732-6.962zM113.314 2.24l-1.455 6.847-1.957-.416 1.456-6.847zM122.69 4.861l-2.163 6.657-1.903-.618 2.164-6.657zM131.74 8.447l-2.847 6.395-1.827-.814 2.847-6.394zM148.473 18.349l-4.114 5.663-1.618-1.175 4.114-5.663zM155.972 24.557l-4.684 5.202-1.486-1.339 4.684-5.202zM162.782 31.514l-5.202 4.684-1.339-1.486 5.202-4.684zM168.826 39.145l-5.663 4.114-1.175-1.618 5.663-4.114zM178.366 56.087l-6.394 2.847-.814-1.827 6.395-2.847zM181.757 65.212l-6.657 2.164-.618-1.903 6.657-2.163zM184.176 74.642l-6.847 1.456-.416-1.957 6.847-1.455zM185.595 84.273l-6.962.732-.209-1.989 6.962-.732zM185.386 103.716l-6.962-.732.209-1.989 6.962.732zM183.76 113.314l-6.847-1.455.416-1.957 6.847 1.456zM181.139 122.69l-6.657-2.163.618-1.903 6.657 2.164zM177.553 131.74l-6.395-2.847.814-1.827 6.394 2.847zM167.651 148.473l-5.663-4.114 1.175-1.618 5.663 4.114zM161.443 155.972l-5.202-4.684 1.339-1.486 5.202 4.684zM154.486 162.782l-4.684-5.202 1.486-1.339 4.684 5.202zM146.855 168.826l-4.114-5.663 1.618-1.175 4.114 5.663zM129.913 178.366l-2.847-6.394 1.827-.814 2.847 6.395zM120.788 181.757l-2.164-6.657 1.903-.618 2.163 6.657zM111.358 184.176l-1.456-6.847 1.957-.416 1.455 6.847zM101.727 185.595l-.732-6.962 1.989-.209.732 6.962zM85.005 178.633l-.732 6.962-1.989-.209.732-6.962zM76.098 177.329l-1.456 6.847-1.956-.416 1.455-6.847zM67.376 175.1l-2.164 6.657-1.902-.618 2.163-6.657zM58.934 171.972l-2.847 6.394-1.827-.813 2.847-6.395zM43.259 163.163l-4.114 5.663-1.618-1.175 4.114-5.663zM36.198 157.58l-4.684 5.202-1.486-1.339 4.684-5.202zM29.759 151.288l-5.202 4.684-1.339-1.486 5.202-4.684zM24.012 144.359l-5.663 4.114-1.175-1.618 5.663-4.114zM14.842 128.893l-6.395 2.847-.813-1.827 6.394-2.847zM11.518 120.527l-6.657 2.163-.618-1.902 6.657-2.164zM9.087 111.859l-6.847 1.455-.416-1.956 6.847-1.456zM7.576 102.984l-6.962.732-.209-1.989 6.962-.732zM7.367 85.005l-6.962-.732.209-1.989 6.962.732zM8.671 76.098l-6.847-1.456.416-1.956 6.847 1.455zM10.9 67.376l-6.657-2.164.618-1.902 6.657 2.163zM14.028 58.934l-6.394-2.847.813-1.827 6.395 2.847zM22.837 43.259l-5.663-4.114 1.175-1.618 5.663 4.114zM28.42 36.198l-5.202-4.684 1.339-1.486 5.202 4.684zM34.712 29.759l-4.684-5.202 1.486-1.339 4.684 5.202zM41.641 24.012l-4.114-5.663 1.618-1.175 4.114 5.663zM57.107 14.842 54.26 8.447l1.827-.813 2.847 6.394zM65.473 11.518 63.31 4.861l1.902-.618 2.164 6.657zM74.141 9.087 72.686 2.24l1.956-.416 1.456 6.847zM83.016 7.576 82.284.614l1.989-.209.732 6.962z" />
			</svg>
			<div className="absolute inset-0 drop-shadow-md">
				<div
					id="hour"
					className="absolute inset-0 duration-100"
					style={{
						transform: `rotate(${rotateHour}deg)`,
					}}
				>
					<div className="absolute bg-neutral-950 dark:bg-white w-2.5 h-24 top-14 left-1/2 -translate-x-1/2" />
				</div>
				<div
					id="minute"
					className="absolute inset-0 duration-[0.4s]"
					style={{
						transform: `rotate(${rotateMinute}deg)`,
						transitionTimingFunction: "cubic-bezier(0.3, 2.5, 0, 0.5)",
					}}
				>
					<div className="absolute bg-neutral-950 dark:bg-white w-1.5 h-32 top-6 left-1/2 -translate-x-1/2" />
				</div>
				{lsHideSec !== "true" && (
					<div
						id="second"
						className={`absolute inset-0 ${time[2] <= 58 && "duration-[0.99s]"} ease-linear`}
						style={{
							transform: `rotate(${time[2] == 0 ? 6 : time[2] <= 58 ? rotateSecond : 0}deg)`,
						}}
					>
						<div className="absolute bg-red w-1 h-28 top-12 left-1/2 -translate-x-1/2" />
						<div className="absolute bg-red size-5 top-10 left-1/2 -translate-x-1/2 rounded-full" />
					</div>
				)}
			</div>
			<div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/15 dark:from-white/10" />
		</div>
	);
}

export default dynamic(() => Promise.resolve(SwissClock), {
	ssr: false,
});
