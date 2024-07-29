"use client";
import SearchBar from "src/components/searchBar";
import Clock from "src/components/clock";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Settings from "src/components/settings";

export default function Home() {
	const mainRef = useRef<HTMLElement | null>(null);
	const [showOther, setShowOther] = useState(true);
	useEffect(() => {
		let timer: NodeJS.Timeout;
		const handleMouseMove = () => {
			setShowOther(true);
			clearTimeout(timer);

			if (mainRef.current) {
				timer = setTimeout(() => {
					setShowOther(false);
				}, 3000);
			}
		};

		document.addEventListener("mousemove", handleMouseMove);

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			clearTimeout(timer);
		};
	}, []);
	return (
		<>
			<main
				ref={mainRef}
				className="flex flex-col gap-9 items-center justify-center min-h-svh p-6 max-w-7xl mx-auto"
			>
				<div
					className={`absolute w-full md:w-2/3 max-w-3xl top-2/3 ${
						showOther ? "-translate-y-3/4" : "opacity-0"
					} duration-700 ease-in-out`}
				>
					<SearchBar />
				</div>
				<div
					className={`absolute top-1/2 ${
						showOther ? "-translate-y-2/3" : "-translate-y-1/2"
					} duration-700 ease-in-out`}
				>
					<Clock />
				</div>
			</main>
			<footer
				className={`flex items-end justify-between fixed bottom-0 inset-x-0 p-6 text-sm ${
					!showOther && "opacity-0"
				} duration-700 ease-in-out`}
			>
				<p>
					Made by{" "}
					<Link
						className="group text-foreground-2"
						href="https://pprmint.de"
						target="_blank"
						rel="noopener noreferrer"
					>
						pprmint<span className="text-green">.</span>
						<span className="opacity-0 group-hover:opacity-100 duration-200">de</span>
					</Link>
				</p>
				<Settings />
			</footer>
		</>
	);
}
