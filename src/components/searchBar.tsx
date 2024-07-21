"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTransition, easings, a } from "@react-spring/web";
import * as Select from "@radix-ui/react-select";
import { Engines } from "./engines";

function SearchBar() {
	const lsEngine = localStorage.getItem("engine");
	const [searchEngine, setSearchEngine] = useState(
		Engines.some((engine) => engine.name === lsEngine) ? lsEngine : "Inquest"
	);
	function handleEngineChange(engine: string) {
		setSearchEngine(engine);
		localStorage.setItem("engine", engine);
	}

	const router = useRouter();
	const [query, setQuery] = useState("");
	function handleSearch() {
		const selectedEngine = Engines.find((engine) => engine.name === searchEngine);
		router.push(`${selectedEngine?.query.replace("%s", encodeURIComponent(query))}`);
	}

	function handleKeyPress(event: { key: any }) {
		if (event.key === "Enter") return handleSearch();
	}

	const searchButtonTransition = useTransition(query === "", {
		from: { opacity: 0, x: query === "" ? 10 : -10 },
		enter: {
			opacity: 1,
			x: 0,
			config: { duration: 200, easing: easings.easeOutCirc },
		},
		leave: {
			opacity: 0,
			x: query === "" ? -10 : 10,
			config: { duration: 100, easing: easings.easeInCirc },
		},
		exitBeforeEnter: true,
	});
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
				{searchButtonTransition((style, item) =>
					item ? (
						<a.div style={style} className="h-full">
							<Select.Root
								value={searchEngine || undefined}
								defaultValue="Inquest"
								onValueChange={(value: string) => handleEngineChange(value)}
							>
								<Select.Trigger
									className="group relative inline-flex items-center justify-between h-full w-12 md:hover:w-44 data-[state='open']:w-44 px-3 duration-300 overflow-clip ease-in-out outline-none"
									aria-label="Search engine"
								>
									<Select.Value />
									<Select.Icon className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 md:group-hover:opacity-100 md:group-data-[state='open']:opacity-100 duration-200">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="15"
											height="15"
											viewBox="0 0 15 15"
											fill="currentColor"
										>
											<path d="M3 5.957V4.543l4.5 4.5 4.5-4.5v1.414l-4.5 4.5z"></path>
										</svg>
									</Select.Icon>
								</Select.Trigger>
								<Select.Portal>
									<Select.Content className="overflow-hidden bg-white dark:bg-neutral-900 text-neutral-950 dark:text-neutral-50 rounded-lg shadow-xl dark:shadow-neutral-950 border border-neutral-50 dark:border-neutral-800">
										<Select.Viewport className="p-1">
											{Engines.map((engine, index) => (
												<Select.Item
													key={index}
													value={engine.name}
													className="relative px-2 py-1 rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer select-none outline-none duration-100"
												>
													<Select.ItemText asChild>
														<div className="flex gap-3 items-center">
															<div className="size-5 group-data-[state='closed']:saturate-0 group-data-[state='closed']:group-hover:saturate-100 duration-200">
																{engine.icon}
															</div>
															<span className="group-data-[state='closed']:opacity-0 md:group-data-[state='closed']:group-hover:opacity-100 duration-200">
																{engine.name}
															</span>
														</div>
													</Select.ItemText>
													<Select.ItemIndicator className="absolute right-2 top-1/2 -translate-y-1/2">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="15"
															height="15"
															viewBox="0 0 15 15"
															fill="currentColor"
														>
															<path d="m1.646 7.354.708-.708L6 10.293l6.646-6.647.708.708L6 11.707z"></path>
														</svg>
													</Select.ItemIndicator>
												</Select.Item>
											))}
										</Select.Viewport>
									</Select.Content>
								</Select.Portal>
							</Select.Root>
						</a.div>
					) : (
						<a.button
							type="submit"
							style={style}
							onClick={handleSearch}
							className="group cursor-pointer h-full px-3 md:px-4 hover:bg-neutral-50 active:bg-neutral-100 dark:hover:bg-neutral-800 dark:active:bg-neutral-700 rounded-r-lg duration-100"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 15 15"
								className="size-5 md:size-6 stroke-0 group-hover:stroke-1 fill-current group-hover:fill-neutral-950 dark:group-hover:fill-neutral-50 stroke-current group-hover:stroke-neutral-950 dark:group-hover:stroke-neutral-50 duration-100"
							>
								<path d="m6.621 9.086-5.267 5.268-.708-.708 5.268-5.267A4.58 4.58 0 0 1 4.9 5.5C4.9 2.961 6.961.9 9.5.9s4.6 2.061 4.6 4.6-2.061 4.6-4.6 4.6a4.58 4.58 0 0 1-2.879-1.014M9.5 1.9a3.6 3.6 0 0 0-3.6 3.6c0 1.987 1.613 3.6 3.6 3.6s3.6-1.613 3.6-3.6-1.613-3.6-3.6-3.6"></path>
							</svg>
						</a.button>
					)
				)}
			</div>
		</div>
	);
}

export default dynamic(() => Promise.resolve(SearchBar), {
	ssr: false,
});
