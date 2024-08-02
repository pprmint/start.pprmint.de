"use client";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Themes } from "./themes";
import { Engines } from "./engines";
import { Clocks } from "./clocks";
import * as Select from "@radix-ui/react-select";
import * as Switch from "@radix-ui/react-switch";
import Link from "next/link";
import Image from "next/image";
import Icon from "src/app/icon.svg";

function Page() {
	// Theme
	const { theme, setTheme } = useTheme();

	// Search engine
	const lsEngine = localStorage.getItem("engine");
	const [searchEngine, setSearchEngine] = useState(
		Engines.some((engine) => engine.name === lsEngine) ? lsEngine : "Inquest"
	);
	function handleEngineChange(engine: string) {
		setSearchEngine(engine);
		localStorage.setItem("engine", engine);
	}

	// 12/24 hr
	const lsUse12hr = localStorage.getItem("use12hr");
	const [use12hr, setUse12hr] = useState(lsUse12hr === "true" ? true : false);
	function handleUse12hrChange() {
		if (use12hr) {
			localStorage.removeItem("use12hr");
			setUse12hr(false);
		} else {
			localStorage.setItem("use12hr", "true");
			setUse12hr(true);
		}
	}

	// Clock design
	const lsClock = localStorage.getItem("clock");
	const [clock, setClock] = useState(Clocks.some((clock) => clock.name === lsClock) ? lsClock : "Default");
	function handleClockChange(clock: string) {
		setClock(clock);
		localStorage.setItem("clock", clock);
	}

	// Hide seconds
	const lsHideSec = localStorage.getItem("hideSec");
	const [hideSec, setHideSec] = useState(lsHideSec === "true" ? true : false);
	function handleHideSecChange() {
		if (lsHideSec) {
			localStorage.removeItem("hideSec");
			setHideSec(false);
		} else {
			localStorage.setItem("hideSec", "true");
			setHideSec(true);
		}
	}

	// Increase time check frequency
	const [timeCheckFreq, setTimeCheckFreq] = useState(
		localStorage.getItem("incrTimeCheckFreq") === "true" ? true : false
	);
	function handleChangeTimeCheckFreq() {
		if (timeCheckFreq) {
			setTimeCheckFreq(false);
			localStorage.removeItem("incrTimeCheckFreq");
		} else {
			setTimeCheckFreq(true);
			localStorage.setItem("incrTimeCheckFreq", "true");
		}
	}
	return (
		<>
			<main>
				<section className="bg-gradient-to-t from-background via-transparent border-b border-elevate-2">
					<Link
						href="/"
						className="group flex gap-3 items-center text-foreground-2 p-3 hover:font-bold duration-100 w-max"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="15"
							height="15"
							viewBox="0 0 15 15"
							fill="currentColor"
							className="stroke-0 group-hover:stroke-1 stroke-current duration-100"
							style={{ strokeLinejoin: "miter" }}
						>
							<path d="M9.043 3h1.414l-4.5 4.5 4.5 4.5H9.043l-4.5-4.5z"></path>
						</svg>
						Back to start page
					</Link>
					<div className="relative w-full max-w-3xl px-6 xl:px-0 mx-auto pb-6 md:pb-9 overflow-clip">
						<h1 className="text-2xl md:text-4xl text-foreground-2 font-bold">Settings</h1>
						<h2 className="text-xl">Change the look and feel of your start page.</h2>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 15 15"
							className="fill-elevate-1 absolute right-6 md:right-0 -bottom-16 md:-bottom-28 size-32 md:size-56 animate-spin -z-10"
							style={{ animationDuration: "15s" }}
						>
							<path d="m9.483 1.531.145 1.361q.42.195.798.461l1.571-.697.243.251a6.6 6.6 0 0 1 1.607 2.785l.096.336-1.389 1.011a5 5 0 0 1 0 .922l1.389 1.011-.096.336a6.6 6.6 0 0 1-1.607 2.785l-.243.251-1.571-.698a5 5 0 0 1-.798.461l-.182 1.709-.338.085a6.6 6.6 0 0 1-3.216 0l-.338-.085-.182-1.708a5 5 0 0 1-.798-.461l-1.571.697-.243-.251a6.6 6.6 0 0 1-1.607-2.785l-.096-.336 1.389-1.011a5 5 0 0 1 0-.922L1.057 6.028l.096-.336A6.6 6.6 0 0 1 2.76 2.907l.243-.251 1.571.698q.378-.267.798-.461l.182-1.709.338-.085a6.6 6.6 0 0 1 3.216 0l.338.085zm-.956.464a5.6 5.6 0 0 0-2.054 0l-.17 1.598-.283.11c-.385.15-.745.358-1.068.617l-.237.19-1.469-.652a5.6 5.6 0 0 0-1.027 1.779l1.299.946-.046.301a4 4 0 0 0 0 1.232l.046.301-1.299.946c.23.651.578 1.254 1.027 1.779l1.469-.652.237.19c.323.259.683.467 1.068.617l.283.11.17 1.598a5.6 5.6 0 0 0 2.054 0l.17-1.598.283-.11c.385-.15.745-.358 1.068-.617l.237-.19 1.469.652a5.6 5.6 0 0 0 1.027-1.779l-1.299-.946.046-.301a4 4 0 0 0 0-1.232l-.046-.301 1.299-.946a5.6 5.6 0 0 0-1.027-1.779l-1.469.652-.237-.19a4 4 0 0 0-1.068-.617l-.283-.11z"></path>
							<path d="M7.5 5.4a2.101 2.101 0 0 1 0 4.2 2.101 2.101 0 0 1 0-4.2m0 1a1.1 1.1 0 1 0 .001 2.201A1.1 1.1 0 0 0 7.5 6.4"></path>
						</svg>
					</div>
				</section>
				<section className="max-w-3xl px-6 xl:px-0 mx-auto mt-12 flex flex-col gap-6">
					<fieldset className="bg-background border border-elevate-2 rounded-xl flex flex-col gap-2 p-5">
						<label className="text-foreground-2 font-medium text-lg" htmlFor="theme">
							Theme
						</label>
						<Select.Root
							value={theme}
							defaultValue="theme"
							onValueChange={(value: string) => setTheme(value)}
						>
							<Select.Trigger
								className="group capitalize relative inline-flex items-center justify-between w-full sm:w-56 px-3 py-2 overflow-clip ease-in-out outline-none hover:bg-elevate-1 border border-elevate-2 rounded-lg duration-100 hover:text-foreground-2"
								aria-label="Site theme"
							>
								<Select.Value />
								<Select.Icon className="absolute right-3 top-1/2 -translate-y-1/2 duration-200">
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
								<Select.Content className="capitalize data-[state=open]:animate-select-open data-[state=closed]:animate-select-close overflow-hidden bg-background text-foreground-2 rounded-lg shadow-xl border border-elevate-2">
									<Select.Viewport className="p-1 flex flex-col">
										{Themes.map((theme, index) => (
											<Select.Item
												key={index}
												value={theme.text}
												className="relative px-2 h-8 inline-flex items-center rounded-md hover:bg-elevate-1 cursor-pointer select-none outline-none duration-100"
											>
												<Select.ItemText asChild>
													<div className="flex gap-3 items-center">
														{theme.icon}
														{theme.text}
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
					</fieldset>
					<fieldset className="bg-background border border-elevate-2 rounded-xl flex flex-col gap-2 p-5">
						<label className="text-foreground-2 font-medium text-lg" htmlFor="engine">
							Search engine
						</label>
						<Select.Root
							value={searchEngine || undefined}
							defaultValue="Inquest"
							onValueChange={(value: string) => handleEngineChange(value)}
						>
							<Select.Trigger
								className="group capitalize relative inline-flex items-center justify-between w-full sm:w-56 px-3 py-2 overflow-clip ease-in-out outline-none hover:bg-elevate-1 border border-elevate-2 rounded-lg duration-100 hover:text-foreground-2"
								aria-label="Search engine"
							>
								<Select.Value />
								<Select.Icon className="absolute right-3 top-1/2 -translate-y-1/2 duration-200">
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
								<Select.Content className="capitalize data-[state=open]:animate-select-open data-[state=closed]:animate-select-close overflow-hidden bg-background text-foreground-2 rounded-lg shadow-xl border border-elevate-2">
									<Select.Viewport className="p-1 flex flex-col">
										{Engines.map((engine, index) => (
											<Select.Item
												key={index}
												value={engine.name}
												className="relative px-2 h-8 inline-flex items-center rounded-md hover:bg-elevate-1 cursor-pointer select-none outline-none duration-100"
											>
												<Select.ItemText asChild>
													<div className="flex gap-3 items-center">
														<div className="size-4">{engine.icon}</div>
														<span>{engine.name}</span>
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
						<div className="text-sm">
							{searchEngine === "Google" ? (
								<p>I think this one needs no introduction.</p>
							) : searchEngine === "DuckDuckGo" ? (
								<p>
									A private search engine that allows you to search on other sites or engines with
									so-called{" "}
									<Link
										href="https://duckduckgo.com/bangs"
										target="_blank"
										rel="noopener noreferrer"
										className="text-foreground-2 underline decoration-dotted"
									>
										Bangs
									</Link>
									, by prefixing them with{" "}
									<span className="bg-elevate-2 text-foreground-2 px-0.5 rounded-sm">!</span>. They
									also offer an email relay and browser extensions.
								</p>
							) : searchEngine === "Bing" ? (
								<p>
									The search engine Microsoft desperately wants you to use. You can even earn rewards
									by using it, apparently.
								</p>
							) : (
								<p>
									My personal{" "}
									<Link
										href="https://docs.searxng.org/"
										target="_blank"
										rel="noopener noreferrer"
										className="text-foreground-2 underline decoration-dotted"
									>
										SearXNG
									</Link>{" "}
									instance that aggregates results from different engines. You can also search on
									other sites or engines with DuckDuckGo's Bangs by prefixing them with{" "}
									<span className="bg-elevate-2 text-foreground-2 px-0.5 rounded-sm">!!</span>.{" "}
									<Link
										href="https://inquest.fyi/info/en/search-syntax"
										target="_blank"
										rel="noopener noreferrer"
										className="text-foreground-2 underline decoration-dotted"
									>
										Search syntax here
									</Link>
									.
								</p>
							)}
						</div>
					</fieldset>
					<fieldset className="relative w-full bg-background border border-elevate-2 rounded-xl flex flex-col gap-2 p-5">
						<div className="flex justify-between">
							<label className="text-foreground-2 font-medium text-lg" htmlFor="clock">
								Clock
							</label>
							<button
								aria-label="Time format"
								className="group relative h-8 w-[85px] hover:text-foreground-2 border border-elevate-2 rounded-full hover:bg-elevate-1 duration-100"
								onClick={handleUse12hrChange}
							>
								<div
									className={`absolute top-1 bottom-1 inline-flex justify-center items-center bg-foreground-2 text-background text-xs font-medium w-[38px] group-active:w-[42px] ${
										use12hr ? "left-[41px] group-active:left-[37px]" : "left-1"
									} rounded-full duration-200 ease-out`}
								/>
								<div className="absolute inset-0 flex items-center text-xs px-1">
									<span
										className={`w-full text-center ${
											!use12hr && "font-bold text-background"
										} duration-100`}
									>
										24h
									</span>
									<span
										className={`w-full text-center ${
											use12hr && "font-bold text-background"
										} duration-100`}
									>
										12h
									</span>
								</div>
							</button>
						</div>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-3">
							{Clocks.map((item, index) => (
								<button
									key={index}
									className="group inline-flex flex-col items-center gap-3 w-full h-auto"
									onClick={() => handleClockChange(item.name)}
								>
									<div
										className={`w-full h-auto ${
											item.name === clock
												? "ring-2 ring-foreground-2"
												: "ring-1 ring-elevate-2 group-hover:bg-elevate-1"
										} duration-100 rounded-md overflow-clip`}
									>
										{item.preview}
									</div>
									<p
										className={`duration-100 ${
											item.name === clock
												? "text-foreground-2 font-medium"
												: "group-hover:text-foreground-2"
										}`}
									>
										{item.name}
									</p>
								</button>
							))}
						</div>
					</fieldset>
					<fieldset className="bg-background border border-elevate-2 rounded-xl flex flex-col gap-2 p-5">
						<div>
							<label className="text-foreground-2 font-medium text-lg" htmlFor="hideSec">
								Hide seconds
							</label>
							<p className="text-sm">
								Hide the seconds in digital clocks and the second hand in analog clocks.
							</p>
						</div>
						<Switch.Root
							className="group relative w-14 h-8 bg-transparent data-[state=checked]:bg-foreground-2 data-[state=unchecked]:hover:bg-elevate-1 outline-none rounded-full border data-[state=unchecked]:border-elevate-2 data-[state=checked]:border-foreground-2 duration-100"
							id="hideSec"
							checked={hideSec}
							onCheckedChange={handleHideSecChange}
						>
							<Switch.Thumb className="relative block size-5 group-active:w-6 data-[state=unchecked]:bg-foreground-2 data-[state=checked]:bg-background rounded-full duration-200 ease-out translate-x-1 data-[state=checked]:translate-x-7 data-[state=checked]:group-active:translate-x-6">
								<div className="absolute top-1.5 group-data-[state=unchecked]:left-1.5 group-data-[state=unchecked]:group-active:left-2 group-data-[state=checked]:left-2.5 group-data-[state=checked]:group-active:left-3 size-2 group-data-[state=checked]:w-0 rounded-full group-data-[state=unchecked]:ring-2 group-data-[state=checked]:ring-1 group-data-[state=unchecked]:ring-background group-data-[state=checked]:ring-foreground-2 duration-200 ease-out" />
							</Switch.Thumb>
						</Switch.Root>
					</fieldset>
					<div className="flex gap-3 items-center text-yellow-950 font-medium bg-yellow px-3 py-1 rounded-full w-max mt-9">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="15"
							height="15"
							viewBox="0 0 15 15"
							fill="currentColor"
						>
							<path d="M6.8 5.5a.7.7 0 0 1 1.4 0s-.108 1.619-.153 2.8c-.025.672-.025 1.2-.025 1.2a.522.522 0 0 1-1.044 0s0-.528-.025-1.2A121 121 0 0 0 6.8 5.5"></path>
							<circle cx="7.5" cy="11.5" r=".75"></circle>
							<path d="M1.503 14.008a1.501 1.501 0 0 1-1.291-2.264L6.209 1.608a1.5 1.5 0 0 1 2.582 0l5.997 10.136a1.501 1.501 0 0 1-1.291 2.264zm0-1h11.994a.5.5 0 0 0 .43-.755L7.93 2.117a.5.5 0 0 0-.86 0L1.073 12.253a.502.502 0 0 0 .43.755"></path>
						</svg>
						Experimental settings
					</div>
					<fieldset className="bg-background border border-elevate-2 rounded-xl flex flex-col gap-2 p-5">
						<div>
							<label className="text-foreground-2 font-medium text-lg" htmlFor="incrTimeCheckFreq">
								Increase time check frequency
							</label>
							<p className="text-sm">
								By default, the current system time is checked every 1000 ms. If the seconds seem a
								little slow and/or the clocks occasionally skip a whole second, enable this option to
								check every 250 ms instead. This may improve the accuracy of the clocks.
							</p>
						</div>
						<Switch.Root
							className="group relative w-14 h-8 bg-transparent data-[state=checked]:bg-foreground-2 data-[state=unchecked]:hover:bg-elevate-1 outline-none rounded-full border data-[state=unchecked]:border-elevate-2 data-[state=checked]:border-foreground-2 duration-100"
							id="incrTimeCheckFreq"
							checked={timeCheckFreq}
							onCheckedChange={handleChangeTimeCheckFreq}
						>
							<Switch.Thumb className="relative block size-5 group-active:w-6 data-[state=unchecked]:bg-foreground-2 data-[state=checked]:bg-background rounded-full duration-200 ease-out translate-x-1 data-[state=checked]:translate-x-7 data-[state=checked]:group-active:translate-x-6">
								<div className="absolute top-1.5 group-data-[state=unchecked]:left-1.5 group-data-[state=unchecked]:group-active:left-2 group-data-[state=checked]:left-2.5 group-data-[state=checked]:group-active:left-3 size-2 group-data-[state=checked]:w-0 rounded-full group-data-[state=unchecked]:ring-2 group-data-[state=checked]:ring-1 group-data-[state=unchecked]:ring-background group-data-[state=checked]:ring-foreground-2 duration-200 ease-out" />
							</Switch.Thumb>
						</Switch.Root>
					</fieldset>
					<fieldset className="relative bg-background border border-elevate-2 rounded-xl flex flex-col gap-2 overflow-clip pointer-events-none">
						<div className="p-5 opacity-25">
							<div className="mb-2">
								<label className="text-foreground-2 font-medium text-lg" htmlFor="hideSec">
									Use local font
								</label>
								<p className="text-sm">
									Override the font used for certain clocks with one that's installed locally on your
									system. Leave this field empty to use the default fonts.
								</p>
								<p className="text-sm">
									The font should support tabular numbers or be monospaced for best results.
								</p>
							</div>
							<div className="flex flex-col md:flex-row justify-between">
								<input
									type="text"
									className="group inline-flex items-center w-full sm:w-72 px-3 py-2 overflow-clip ease-in-out outline-none bg-transparent hover:bg-elevate-1 focus:bg-transparent border border-elevate-2 rounded-lg duration-100 hover:text-foreground-2"
									id="customFont"
									placeholder="sans-serif"
								/>
								<p
									className="text-4xl text-foreground-2 leading-none"
									style={{
										fontFamily: "sans-serif",
										fontVariantNumeric: "tabular-nums",
									}}
								>
									12∶45∶30
								</p>
							</div>
						</div>
						<div className="bg-elevate-1 flex justify-end p-3 text-sm border-t border-elevate-2 opacity-25">
							<button className="bg-foreground-2 text-background px-2 py-1 rounded-md">Apply</button>
						</div>
						<p className="absolute text-7xl font-bold text-foreground-2 -rotate-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
							soon™
						</p>
					</fieldset>
				</section>
			</main>
			<footer className="flex items-end justify-between p-6 mt-24 text-sm">
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
				<Image src={Icon} alt="Logo" />
			</footer>
		</>
	);
}

export default dynamic(() => Promise.resolve(Page), {
	ssr: false,
});
