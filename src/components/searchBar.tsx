"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTransition, easings, a } from "@react-spring/web";
import * as Select from "@radix-ui/react-select";
import { Engines } from "./engines";

function SearchBar() {
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

	return (
		<div className="relative w-full md:w-2/3 h-full">
			<input
				type="text"
				placeholder={`Search with ${searchEngine}.`}
				autoFocus
				onChange={(e) => setQuery(e.target.value)}
				onKeyDown={handleKeyPress}
				className="placeholder:text-neutral-500 text-neutral-950 dark:text-neutral-50 w-full px-4 py-3 md:text-lg rounded-lg bg-white border border-neutral-50 shadow-xl dark:bg-neutral-900 dark:border-neutral-800 shadow-black/5 dark:shadow-none outline-none"
			/>
			<div className="absolute right-0 top-0 h-full inline-flex items-center justify-center">
				<button
					type="submit"
					onClick={handleSearch}
					disabled={query === ""}
					className="group disabled:pointer-events-none cursor-pointer h-full px-3 md:px-4 hover:bg-neutral-50 active:bg-neutral-100 dark:hover:bg-neutral-800 dark:active:bg-neutral-700 rounded-r-lg duration-100"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 15 15"
						className="size-5 md:size-6 stroke-0 group-hover:stroke-1 fill-current group-hover:fill-neutral-950 dark:group-hover:fill-neutral-50 stroke-current group-hover:stroke-neutral-950 dark:group-hover:stroke-neutral-50 duration-100"
					>
						<path d="m6.621 9.086-5.267 5.268-.708-.708 5.268-5.267A4.58 4.58 0 0 1 4.9 5.5C4.9 2.961 6.961.9 9.5.9s4.6 2.061 4.6 4.6-2.061 4.6-4.6 4.6a4.58 4.58 0 0 1-2.879-1.014M9.5 1.9a3.6 3.6 0 0 0-3.6 3.6c0 1.987 1.613 3.6 3.6 3.6s3.6-1.613 3.6-3.6-1.613-3.6-3.6-3.6"></path>
					</svg>
				</button>
			</div>
		</div>
	);
}

export default dynamic(() => Promise.resolve(SearchBar), {
	ssr: false,
});
