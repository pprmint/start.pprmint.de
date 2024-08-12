"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Clock from "src/components/clock";
import Link from "next/link";
import { Engines } from "../app/settings/engines";

function Home() {
	const mainRef = useRef<HTMLElement | null>(null);

	const lsEngine = localStorage.getItem("engine");
	const searchEngine = Engines.some((engine) => engine.name === lsEngine) ? lsEngine : "Inquest";
	const router = useRouter();
	const [query, setQuery] = useState("");
	function handleSearch() {
		const selectedEngine = Engines.find((engine) => engine.name === searchEngine);
		if (query !== "") {
			router.push(`${selectedEngine?.query.replace("%s", encodeURIComponent(query))}`);
		}
	}

	function handleKeyPress(event: { key: any }) {
		if (event.key === "Enter") return handleSearch();
	}

	const [showOther, setShowOther] = useState(true);
	useEffect(() => {
		let timer: NodeJS.Timeout;
		const handleMouseMove = () => {
			setShowOther(true);
			clearTimeout(timer);

			if (mainRef.current) {
				timer = setTimeout(() => {
					if (query === "") {
						setShowOther(false);
					}
				}, 3000);
			}
		};

		document.addEventListener("mousemove", handleMouseMove);

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			clearTimeout(timer);
		};
	}, [query]);

	return (
		<>
			<main
				ref={mainRef}
				className={`flex flex-col ${
					showOther ? "gap-12" : "gap-0"
				} items-center justify-center min-h-svh p-6 max-w-7xl mx-auto duration-700 ease-in-out`}
			>
				<Clock large={!showOther} />
				<div
					className={`relative w-full max-w-3xl mx-6 ${
						showOther ? "h-12 md:h-14" : "h-0 opacity-0 translate-y-6"
					} duration-700 ease-in-out`}
				>
					<input
						type="text"
						placeholder={`Search with ${searchEngine}.`}
						autoFocus
						onChange={(e) => setQuery(e.target.value)}
						onKeyDown={handleKeyPress}
						className="placeholder:text-foreground-1 text-foreground-2 size-full px-4 h-12 md:h-14 md:text-lg rounded-lg bg-background border border-elevate-1 hover:border-elevate-2 focus:border-elevate-2 outline-none"
					/>
					<button
						type="submit"
						onClick={handleSearch}
						disabled={query === ""}
						className="group disabled:pointer-events-none absolute right-0 cursor-pointer h-12 md:h-14 px-3 md:px-4 hover:bg-elevate-2 active:bg-elevate-1 rounded-r-lg duration-100 overflow-clip"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 15 15"
							className="size-5 md:size-6 stroke-0 group-hover:stroke-1 fill-current group-hover:fill-foreground-2 stroke-current group-hover:stroke-foreground-2 duration-100"
						>
							<path d="m6.621 9.086-5.267 5.268-.708-.708 5.268-5.267A4.58 4.58 0 0 1 4.9 5.5C4.9 2.961 6.961.9 9.5.9s4.6 2.061 4.6 4.6-2.061 4.6-4.6 4.6a4.58 4.58 0 0 1-2.879-1.014M9.5 1.9a3.6 3.6 0 0 0-3.6 3.6c0 1.987 1.613 3.6 3.6 3.6s3.6-1.613 3.6-3.6-1.613-3.6-3.6-3.6"></path>
						</svg>
					</button>
				</div>
			</main>
			<footer
				className={`flex items-end justify-between fixed bottom-0 inset-x-0 p-4 text-sm ${
					!showOther && "opacity-0"
				} duration-700 ease-in-out`}
			>
				<p className="p-2">
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
				<Link href="/settings">
					<button className="group p-2 text-foreground-1 hover:bg-elevate-1 hover:text-foreground-2 rounded-full duration-200">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="15"
							height="15"
							viewBox="0 0 15 15"
							className="fill-current group-hover:rotate-[60deg] group-hover:duration-300 ease-in-out"
						>
							<path d="m9.483 1.531.145 1.361q.42.195.798.461l1.571-.697.243.251a6.6 6.6 0 0 1 1.607 2.785l.096.336-1.389 1.011a5 5 0 0 1 0 .922l1.389 1.011-.096.336a6.6 6.6 0 0 1-1.607 2.785l-.243.251-1.571-.698a5 5 0 0 1-.798.461l-.182 1.709-.338.085a6.6 6.6 0 0 1-3.216 0l-.338-.085-.182-1.708a5 5 0 0 1-.798-.461l-1.571.697-.243-.251a6.6 6.6 0 0 1-1.607-2.785l-.096-.336 1.389-1.011a5 5 0 0 1 0-.922L1.057 6.028l.096-.336A6.6 6.6 0 0 1 2.76 2.907l.243-.251 1.571.698q.378-.267.798-.461l.182-1.709.338-.085a6.6 6.6 0 0 1 3.216 0l.338.085zm-.956.464a5.6 5.6 0 0 0-2.054 0l-.17 1.598-.283.11c-.385.15-.745.358-1.068.617l-.237.19-1.469-.652a5.6 5.6 0 0 0-1.027 1.779l1.299.946-.046.301a4 4 0 0 0 0 1.232l.046.301-1.299.946c.23.651.578 1.254 1.027 1.779l1.469-.652.237.19c.323.259.683.467 1.068.617l.283.11.17 1.598a5.6 5.6 0 0 0 2.054 0l.17-1.598.283-.11c.385-.15.745-.358 1.068-.617l.237-.19 1.469.652a5.6 5.6 0 0 0 1.027-1.779l-1.299-.946.046-.301a4 4 0 0 0 0-1.232l-.046-.301 1.299-.946a5.6 5.6 0 0 0-1.027-1.779l-1.469.652-.237-.19a4 4 0 0 0-1.068-.617l-.283-.11z"></path>
							<path d="M7.5 5.4a2.101 2.101 0 0 1 0 4.2 2.101 2.101 0 0 1 0-4.2m0 1a1.1 1.1 0 1 0 .001 2.201A1.1 1.1 0 0 0 7.5 6.4"></path>
						</svg>
					</button>
				</Link>
			</footer>
		</>
	);
}

export default dynamic(() => Promise.resolve(Home), {
	ssr: false,
});
