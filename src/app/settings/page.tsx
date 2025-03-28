"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Themes } from "./themes";
import { Engines } from "./engines";
import { Clocks } from "./clocks";
import * as Select from "@radix-ui/react-select";
import * as Switch from "@radix-ui/react-switch";
import * as Slider from "@radix-ui/react-slider";
import * as Tooltip from "@radix-ui/react-tooltip";
import { PassedThemeDialog, ThemeCustomizer } from "src/components/themeProvider";
import { getCustomFont } from "src/components/customFont";

const customThemeRegEx = /^(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})(?:_(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})){5}$/;

function Page() {
	// Theme.
	const { theme, setTheme } = useTheme();

	// Handle ?theme param.
	const searchParams = useSearchParams();
	const themeParam = customThemeRegEx.test(String(searchParams.get("theme"))) && searchParams.get("theme");
	const passedTheme = String(themeParam).split("_") || [];

	// Search engine.
	const lsEngine = localStorage.getItem("engine");
	const [searchEngine, setSearchEngine] = useState(
		Engines.some((engine) => engine.name === lsEngine) ? lsEngine : "DuckDuckGo"
	);
	function handleEngineChange(engine: string) {
		setSearchEngine(engine);
		localStorage.setItem("engine", engine);
	}

	// 12/24 hour format.
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

	// Clock design.
	const lsClock = localStorage.getItem("clock");
	const [clock, setClock] = useState(Clocks.some((clock) => clock.name === lsClock) ? lsClock : "Default");
	function handleClockChange(clock: string) {
		setClock(clock);
		localStorage.setItem("clock", clock);
	}

	// Hide seconds.
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

	// Custom font.
	const customFont = getCustomFont();
	const [customFontFamily, setCustomFontFamily] = useState(customFont.fontFamily);
	const [customFontItalic, setCustomFontItalic] = useState(customFont.italic);
	const [customFontWeight, setCustomFontWeight] = useState([customFont.weight]);
	const [customFontColon, setCustomFontColon] = useState([customFont.colon]);

	const edited =
		customFontFamily !== customFont.fontFamily ||
		customFontItalic !== customFont.italic ||
		customFontWeight[0] !== customFont.weight ||
		customFontColon[0] !== customFont.colon;

	function handleApplyCustomFont() {
		localStorage.setItem(
			"customFont",
			JSON.stringify({
				fontFamily: customFontFamily,
				italic: customFontItalic,
				weight: customFontWeight[0],
				colon: customFontColon[0],
			})
		);
	}

	// Increase time check frequency.
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

	// Digital clock preview
	const [time, setTime] = useState(getTime);
	function getTime() {
		const now = new Date();
		const hour = now.getHours();
		const minute = now.getMinutes();
		const second = now.getSeconds();
		return lsHideSec ? [hour, minute] : [hour, minute, second];
	}
	useEffect(() => {
		const intervalId = setInterval(() => {
			setTime(getTime);
		}, 250);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<>
			<main>
				<section
					id="header"
					className="bg-gradient-to-t from-background via-transparent border-b border-elevate-1"
				>
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
					<div className="relative w-full max-w-3xl px-6 md:px-0 mx-auto pb-6 md:pb-9 overflow-clip">
						<h1 className="text-2xl md:text-4xl text-foreground-2 font-bold">
							Settings<span className="text-accent">.</span>
						</h1>
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
				<div id="main" className="max-w-3xl px-6 md:px-0 mx-auto mt-12 mb-24 flex flex-col gap-6">
					<section
						id="theme"
						className="bg-background border border-elevate-1 rounded-xl flex flex-col md:flex-row gap-6 p-5"
					>
						<div className="flex flex-col gap-2 w-full md:w-min">
							<label className="text-foreground-2 font-medium text-lg" htmlFor="theme">
								Theme
							</label>
							<Select.Root
								value={theme}
								defaultValue="theme"
								onValueChange={(value: string) => setTheme(value)}
							>
								<Select.Trigger
									className="group capitalize relative inline-flex items-center justify-between w-full sm:w-56 px-2 py-2 overflow-clip ease-in-out outline-none hover:bg-elevate-1 border border-elevate-1 hover:border-elevate-2 rounded-md duration-100 hover:text-foreground-2"
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
									<Select.Content className="capitalize data-[state=open]:animate-select-open data-[state=closed]:animate-select-close overflow-hidden bg-background text-foreground-2 rounded-md shadow-xl border border-elevate-2">
										<Select.ScrollUpButton className="absolute top-px inset-x-px rounded-t-lg inline-flex items-center justify-center h-[25px] bg-gradient-to-b from-background text-foreground-2 cursor-default z-10">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="15"
												height="15"
												viewBox="0 0 15 15"
												fill="currentColor"
											>
												<path d="M12 9.043v1.414l-4.5-4.5-4.5 4.5V9.043l4.5-4.5z"></path>
											</svg>
										</Select.ScrollUpButton>
										<Select.Viewport className="p-1 flex flex-col">
											{Themes.map((theme, index) => (
												<Select.Item
													key={index}
													value={theme.text}
													className="relative p-1 inline-flex items-center rounded-sm hover:bg-elevate-1 cursor-pointer select-none outline-none duration-100"
												>
													<Select.ItemText asChild>
														<div className="flex gap-2 items-center">
															<div
																className="p-1 rounded-full"
																style={{
																	backgroundColor: theme.bgColor,
																	color: theme.fgColor,
																	border: `1px solid ${theme.borderColor}`,
																}}
															>
																{theme.icon ? (
																	theme.icon
																) : (
																	<div
																		className="size-[15px] rounded-full"
																		style={{ backgroundColor: theme.accentColor }}
																	/>
																)}
															</div>
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
											<Select.Item
												value="custom"
												className="relative p-1 inline-flex items-center rounded-sm hover:bg-elevate-1 cursor-pointer select-none outline-none duration-100"
											>
												<Select.ItemText asChild>
													<div className="flex gap-2 items-center">
														<div
															className="p-[5px] rounded-full ring-1 ring-inset ring-black/20"
															style={{
																backgroundImage:
																	"conic-gradient(#f44, #f71, #fb0, #9c3, #4b5, #2cf, #29f, #a7e, #e6b, #f44)",
															}}
														>
															<div className="size-[15px] rounded-full bg-white shadow-md shadow-black/25" />
														</div>
														Custom
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
										</Select.Viewport>
										<Select.ScrollDownButton className="absolute bottom-px inset-x-px rounded-b-lg inline-flex items-center justify-center h-[25px] bg-gradient-to-t from-background text-foreground-2 cursor-default z-10">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="15"
												height="15"
												viewBox="0 0 15 15"
												fill="currentColor"
											>
												<path d="M3 5.957V4.543l4.5 4.5 4.5-4.5v1.414l-4.5 4.5z"></path>
											</svg>
										</Select.ScrollDownButton>
									</Select.Content>
								</Select.Portal>
							</Select.Root>
						</div>
						{theme === "custom" && <ThemeCustomizer />}
						<PassedThemeDialog colors={passedTheme} />
					</section>
					<section
						id="engine"
						className="bg-background border border-elevate-1 rounded-xl flex flex-col gap-2 p-5"
					>
						<label className="text-foreground-2 font-medium text-lg" htmlFor="engine">
							Search engine
						</label>
						<Select.Root
							value={searchEngine || undefined}
							defaultValue="DuckDuckGo"
							onValueChange={(value: string) => handleEngineChange(value)}
						>
							<Select.Trigger
								className="group capitalize relative inline-flex items-center justify-between w-full sm:w-56 px-3 py-2 overflow-clip ease-in-out outline-none hover:bg-elevate-1 border border-elevate-1 hover:border-elevate-2 rounded-md duration-100 hover:text-foreground-2"
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
								<Select.Content className="capitalize data-[state=open]:animate-select-open data-[state=closed]:animate-select-close overflow-hidden bg-background text-foreground-2 rounded-md shadow-xl border border-elevate-2">
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
							{Engines.find((engine) => engine.name === searchEngine)?.description}
						</div>
					</section>
					<section
						id="clock"
						className="relative w-full bg-background border border-elevate-1 rounded-xl flex flex-col gap-2 p-5"
					>
						<div className="flex justify-between">
							<label className="text-foreground-2 font-medium text-lg" htmlFor="clock">
								Clock
							</label>
							<button
								aria-label="Time format"
								className="group relative h-8 w-[85px] hover:text-foreground-2 border border-elevate-1 hover:border-elevate-2 rounded-full hover:bg-elevate-1 duration-100"
								onClick={handleUse12hrChange}
							>
								<div
									className={`absolute top-1 bottom-1 inline-flex justify-center items-center bg-foreground-2 text-background text-xs font-medium w-[38px] group-active:w-[42px] ${use12hr ? "left-[41px] group-active:left-[37px]" : "left-1"
										} rounded-full duration-200 ease-out`}
								/>
								<div className="absolute inset-0 flex items-center text-xs px-1">
									<span
										className={`w-full text-center ${!use12hr && "font-bold text-background"
											} duration-100`}
									>
										24h
									</span>
									<span
										className={`w-full text-center ${use12hr && "font-bold text-background"
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
										className={`w-full h-auto ${item.name === clock
											? "border border-foreground-2 ring-1 ring-inset ring-foreground-2"
											: "border border-elevate-1 group-hover:bg-elevate-1 group-hover:border-elevate-2"
											} duration-100 rounded-md overflow-clip`}
									>
										{item.preview}
									</div>
									<p
										className={`duration-100 ${item.name === clock
											? "text-foreground-2 font-medium"
											: "group-hover:text-foreground-2"
											}`}
									>
										{item.name}
									</p>
								</button>
							))}
						</div>
					</section>
					<section
						id="font"
						className="relative bg-background border border-elevate-1 rounded-xl flex flex-col gap-2 p-5"
					>
						<div className="mb-2">
							<label className="text-foreground-2 font-medium text-lg" htmlFor="hideSec">
								Custom font
							</label>
							<p className="text-sm">
								Replace the fonts used in certain clocks with one that's installed on your device. Leave
								the font family feld empty to use the default fonts.
							</p>
							<p className="text-sm">
								The font should support tabular (same width) numbers or be monospaced for best results.
							</p>
						</div>
						<div className="grid grid-cols-2 gap-3">
							<div className="flex flex-col col-span-2 gap-1">
								<label htmlFor="customFontFamily" className="text-xs">
									Font family
								</label>
								<div className="flex">
									<input
										type="text"
										className="group inline-flex items-center w-full px-3 py-2 overflow-clip ease-in-out outline-none bg-transparent hover:bg-elevate-1 focus:bg-transparent border border-elevate-1 hover:border-elevate-2 rounded-md duration-100 text-foreground-2 rounded-r-none"
										id="customFontFamily"
										placeholder="Default"
										value={customFontFamily}
										onChange={(e) => setCustomFontFamily(e.target.value || "")}
									/>
									<button
										className={`btn h-full rounded-l-none border-l-0 ${customFontItalic &&
											"border-elevate-2 bg-elevate-2 hover:bg-elevate-2 active:bg-transparent"
											}`}
										onClick={() => setCustomFontItalic(!customFontItalic)}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<line x1="19" x2="10" y1="4" y2="4" />
											<line x1="14" x2="5" y1="20" y2="20" />
											<line x1="15" x2="9" y1="4" y2="20" />
										</svg>
									</button>
								</div>
							</div>
							<div className="flex flex-col gap-1">
								<label htmlFor="fontWeight" className="text-xs">
									Weight
								</label>
								<Slider.Root
									className="relative flex items-center select-none touch-none w-full h-5"
									value={customFontWeight}
									onValueChange={setCustomFontWeight}
									defaultValue={[400]}
									min={100}
									max={900}
									step={10}
									id="fontWeight"
								>
									<Slider.Track className="bg-elevate-1 relative grow rounded-full h-1">
										<Slider.Range className="absolute bg-foreground-2 rounded-full h-1" />
									</Slider.Track>
									<Slider.Thumb
										className="group block relative size-3.5 hover:h-5 hover:w-9 bg-foreground-2 rounded-full hover:bg-violet3 focus:outline-none duration-150 ease-out overflow-clip cursor-pointer"
										aria-label="Font weight"
										style={{ fontVariantNumeric: "tabular-nums" }}
									>
										<span
											aria-hidden
											className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-background opacity-0 group-hover:opacity-100 duration-100 group-hover:delay-75"
										>
											{customFontWeight}
										</span>
									</Slider.Thumb>
								</Slider.Root>
							</div>
							<div className="flex flex-col gap-1">
								<label htmlFor="fontColon" className="text-xs">
									Colon vertical position
								</label>
								<Slider.Root
									className="relative flex items-center select-none touch-none w-full h-5"
									value={customFontColon}
									onValueChange={setCustomFontColon}
									defaultValue={[0]}
									min={0}
									max={0.5}
									step={0.005}
									id="fontColon"
								>
									<Slider.Track className="bg-elevate-1 relative grow rounded-full h-1">
										<Slider.Range className="absolute bg-foreground-2 rounded-full h-1" />
									</Slider.Track>
									<Slider.Thumb
										className="group block relative size-3.5 hover:h-5 hover:w-16 bg-foreground-2 rounded-full hover:bg-violet3 focus:outline-none duration-150 ease-out overflow-clip cursor-pointer"
										aria-label="Font weight"
										style={{ fontVariantNumeric: "tabular-nums" }}
									>
										<span
											aria-hidden
											className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-background opacity-0 group-hover:opacity-100 duration-100 group-hover:delay-75"
										>
											{customFontColon}em
										</span>
									</Slider.Thumb>
								</Slider.Root>
							</div>
						</div>
						<div
							className="font-number flex justify-center text-6xl sm:text-7xl lg:text-8xl text-foreground-2 text-center mt-12 mb-6"
							style={{
								fontFamily: customFontFamily !== "" ? `${customFontFamily}, system-ui, sans-serif` : "",
								fontVariantNumeric: "tabular-nums", fontVariationSettings: "tnum",
								fontStyle: customFontFamily !== "" && customFontItalic ? "italic" : "normal",
								fontWeight: customFontFamily !== "" ? Number(customFontWeight) : "",
							}}
						>
							<div>{time[0].toString().padStart(2, "0")}</div>
							<div
								className="text-accent"
								style={{ transform: `translateY(-${customFontFamily !== "" ? customFontColon : 0}em)` }}
							>
								:
							</div>
							<div>{time[1].toString().padStart(2, "0")}</div>
							{!hideSec && (
								<>
									<div
										className="text-accent"
										style={{
											transform: `translateY(-${customFontFamily !== "" ? customFontColon : 0
												}em)`,
										}}
									>
										:
									</div>
									<div>{time[2].toString().padStart(2, "0")}</div>
								</>
							)}
						</div>
						<div className="flex justify-end">
							<button
								className="btn-accent disabled:pointer-events-none disabled:opacity-50 disabled:border-dashed"
								onClick={handleApplyCustomFont}
								disabled={!edited}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="15"
									height="15"
									viewBox="0 0 15 15"
									fill="currentColor"
								>
									<path d="m1.646 7.354.708-.708L6 10.293l6.646-6.647.708.708L6 11.707z"></path>
								</svg>
								Apply
							</button>
						</div>
					</section>
					<section
						id="hidesec"
						className="bg-background border border-elevate-1 rounded-xl flex flex-col gap-2 p-5"
					>
						<div>
							<label className="text-foreground-2 font-medium text-lg" htmlFor="hideSec">
								Hide seconds
							</label>
							<p className="text-sm">
								Hide the seconds in digital clocks and the second hand in analog clocks.
							</p>
						</div>
						<Switch.Root
							className="group relative w-14 h-8 bg-transparent data-[state=checked]:bg-accent data-[state=unchecked]:hover:bg-elevate-1 outline-none rounded-full border data-[state=unchecked]:border-elevate-1 data-[state=unchecked]:hover:border-elevate-2 data-[state=checked]:border-accent duration-100"
							id="hideSec"
							checked={hideSec}
							onCheckedChange={handleHideSecChange}
						>
							<Switch.Thumb className="relative block size-5 group-active:w-6 data-[state=unchecked]:bg-foreground-2 data-[state=checked]:bg-background rounded-full duration-200 ease-out translate-x-1 data-[state=checked]:translate-x-7 data-[state=checked]:group-active:translate-x-6">
								<div className="absolute top-1.5 group-data-[state=unchecked]:left-1.5 group-data-[state=unchecked]:group-active:left-2 group-data-[state=checked]:left-2.5 group-data-[state=checked]:group-active:left-3 size-2 group-data-[state=checked]:w-0 rounded-full group-data-[state=unchecked]:ring-2 group-data-[state=checked]:ring-1 group-data-[state=unchecked]:ring-background group-data-[state=checked]:ring-accent duration-200 ease-out" />
							</Switch.Thumb>
						</Switch.Root>
					</section>
					<section
						id="timecheckfreq"
						className="bg-background border border-elevate-1 rounded-xl flex flex-col gap-2 p-5"
					>
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
							className="group relative w-14 h-8 bg-transparent data-[state=checked]:bg-accent data-[state=unchecked]:hover:bg-elevate-1 outline-none rounded-full border data-[state=unchecked]:border-elevate-1 data-[state=unchecked]:hover:border-elevate-2 data-[state=checked]:border-accent duration-100"
							id="incrTimeCheckFreq"
							checked={timeCheckFreq}
							onCheckedChange={handleChangeTimeCheckFreq}
						>
							<Switch.Thumb className="relative block size-5 group-active:w-6 data-[state=unchecked]:bg-foreground-2 data-[state=checked]:bg-background rounded-full duration-200 ease-out translate-x-1 data-[state=checked]:translate-x-7 data-[state=checked]:group-active:translate-x-6">
								<div className="absolute top-1.5 group-data-[state=unchecked]:left-1.5 group-data-[state=unchecked]:group-active:left-2 group-data-[state=checked]:left-2.5 group-data-[state=checked]:group-active:left-3 size-2 group-data-[state=checked]:w-0 rounded-full group-data-[state=unchecked]:ring-2 group-data-[state=checked]:ring-1 group-data-[state=unchecked]:ring-background group-data-[state=checked]:ring-accent duration-200 ease-out" />
							</Switch.Thumb>
						</Switch.Root>
					</section>
					<div
						id="version"
						className="bg-background border border-elevate-1 rounded-xl flex flex-col gap-2 p-5 mt-12"
					>
						<div className="flex flex-col md:flex-row gap-3 w-full items-center">
							<div className="w-full">
								<p className="text-foreground-2 text-lg">
									Made with{" "}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="15"
										height="15"
										viewBox="0 0 15 15"
										className="fill-accent inline size-5 mb-1"
									>
										<path d="M1.881 7.619a3.353 3.353 0 0 1 0-4.738 3.353 3.353 0 0 1 4.738 0l.881.881.881-.881a3.353 3.353 0 0 1 4.738 0 3.353 3.353 0 0 1 0 4.738L7.5 13.238zM7.5 11.823l4.912-4.911a2.35 2.35 0 0 0 0-3.324 2.35 2.35 0 0 0-3.324 0L7.5 5.177 5.912 3.588a2.35 2.35 0 0 0-3.324 0 2.35 2.35 0 0 0 0 3.324z"></path>
									</svg>{" "}
									and{" "}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="15"
										height="15"
										viewBox="0 0 15 15"
										className="fill-yellow-600 inline size-5 mb-1"
									>
										<path d="M12 12.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 1 12.5V6h11v1.5a2.5 2.5 0 0 1 0 5m0-4v3a1.5 1.5 0 0 0 0-3M11 7H2v5.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5zM3.8 1S5 2 5 3 3.8 5 3.8 5H5s1-1 1-2-1-2-1-2zM6.8 1S8 2 8 3 6.8 5 6.8 5H8s1-1 1-2-1-2-1-2z"></path>
									</svg>{" "}
									by{" "}
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
								<p className="text-sm my-2">Found an error? Got ideas?</p>
								<div className="flex gap-2">
									<Link
										href="https://github.com/pprmint/start.pprmint.de/issues/new?assignees=&labels=&projects=&template=bug-report-.md&title="
										target="_blank"
										rel="noopener noreferrer"
									>
										<button className="btn">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="15"
												height="15"
												viewBox="0 0 15 15"
												fill="currentColor"
											>
												<path d="M8.995 12.491 9 11.755c0-.623-.175-.993-.394-1.192L7.8 9.826l1.085-.129c.953-.114 2.044-.27 2.756-1.03.46-.492.74-1.238.74-2.367 0-.792-.276-1.459-.735-1.963l-.211-.232.117-.291c.062-.157.253-.898.035-1.742-.321.085-.9.301-1.696.842l-.192.13-.224-.063A7.4 7.4 0 0 0 7.5 2.715c-.671 0-1.343.089-1.975.266l-.224.063-.192-.13c-.796-.541-1.376-.757-1.696-.842-.218.844-.027 1.585.035 1.742l.117.291-.211.232c-.459.504-.735 1.171-.735 1.963 0 1.129.28 1.875.74 2.367.712.76 1.803.916 2.756 1.03l1.085.129-.806.737c-.218.199-.393.567-.394 1.192v.007l.004.713a1.5 1.5 0 0 1-1.525 1.508L4 13.975s-.643-1.011.015-1l.481.008a.5.5 0 0 0 .508-.5c-1.225-.088-1.707-.506-2.062-.897C2.692 11.311 2.571 11 2 11v-1c.831 0 1.166.316 1.498.701.153.177.299.382.58.537.218.119.511.206.931.242a3 3 0 0 1 .197-.906c-.942-.173-1.893-.494-2.576-1.223-.598-.638-1.011-1.588-1.011-3.051 0-.954.304-1.771.811-2.418-.12-.508-.241-1.509.174-2.547l.105-.261.277-.047s.778-.184 2.493.932A8.4 8.4 0 0 1 7.5 1.715c.685 0 1.369.082 2.02.244 1.716-1.116 2.494-.932 2.494-.932l.277.047.105.261c.415 1.038.294 2.04.174 2.546.507.647.811 1.465.811 2.419 0 1.463-.413 2.413-1.011 3.051-.683.729-1.634 1.05-2.576 1.223.124.307.206.694.206 1.181l-.005.742a.5.5 0 0 0 .5.503h.498c.658 0 .007 1 .007 1h-.505a1.5 1.5 0 0 1-1.5-1.509"></path>
											</svg>
											<span>Bug report</span>
										</button>
									</Link>
									<Link
										href="https://github.com/pprmint/start.pprmint.de/issues/new?assignees=&labels=Feature+request&projects=&template=feature-request-.md&title="
										target="_blank"
										rel="noopener noreferrer"
									>
										<button className="btn">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="15"
												height="15"
												viewBox="0 0 15 15"
												fill="currentColor"
											>
												<path d="M8.995 12.491 9 11.755c0-.623-.175-.993-.394-1.192L7.8 9.826l1.085-.129c.953-.114 2.044-.27 2.756-1.03.46-.492.74-1.238.74-2.367 0-.792-.276-1.459-.735-1.963l-.211-.232.117-.291c.062-.157.253-.898.035-1.742-.321.085-.9.301-1.696.842l-.192.13-.224-.063A7.4 7.4 0 0 0 7.5 2.715c-.671 0-1.343.089-1.975.266l-.224.063-.192-.13c-.796-.541-1.376-.757-1.696-.842-.218.844-.027 1.585.035 1.742l.117.291-.211.232c-.459.504-.735 1.171-.735 1.963 0 1.129.28 1.875.74 2.367.712.76 1.803.916 2.756 1.03l1.085.129-.806.737c-.218.199-.393.567-.394 1.192v.007l.004.713a1.5 1.5 0 0 1-1.525 1.508L4 13.975s-.643-1.011.015-1l.481.008a.5.5 0 0 0 .508-.5c-1.225-.088-1.707-.506-2.062-.897C2.692 11.311 2.571 11 2 11v-1c.831 0 1.166.316 1.498.701.153.177.299.382.58.537.218.119.511.206.931.242a3 3 0 0 1 .197-.906c-.942-.173-1.893-.494-2.576-1.223-.598-.638-1.011-1.588-1.011-3.051 0-.954.304-1.771.811-2.418-.12-.508-.241-1.509.174-2.547l.105-.261.277-.047s.778-.184 2.493.932A8.4 8.4 0 0 1 7.5 1.715c.685 0 1.369.082 2.02.244 1.716-1.116 2.494-.932 2.494-.932l.277.047.105.261c.415 1.038.294 2.04.174 2.546.507.647.811 1.465.811 2.419 0 1.463-.413 2.413-1.011 3.051-.683.729-1.634 1.05-2.576 1.223.124.307.206.694.206 1.181l-.005.742a.5.5 0 0 0 .5.503h.498c.658 0 .007 1 .007 1h-.505a1.5 1.5 0 0 1-1.5-1.509"></path>
											</svg>
											<span>Feature request</span>
										</button>
									</Link>
								</div>
							</div>
							{process.env.NEXT_PUBLIC_VERCEL_GIT_PROVIDER === "github" ? (
								<div className="w-full p-3 md:p-4 border border-elevate-1 hover:border-elevate-2 rounded-md">
									<p className="text-xs mb-2">Current version</p>
									<Link
										href={`https://github.com/${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER}/${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG}/commit/${process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA}`}
										target="_blank"
										rel="noopener noreferrer"
										className="text-2xl text-foreground-2 inline-flex items-center gap-3 font-medium underline decoration-dotted decoration-elevate-2 hover:decoration-foreground-1"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="30"
											height="30"
											viewBox="0 0 15 15"
											fill="currentColor"
										>
											<path d="M8.995 12.491 9 11.755c0-.623-.175-.993-.394-1.192L7.8 9.826l1.085-.129c.953-.114 2.044-.27 2.756-1.03.46-.492.74-1.238.74-2.367 0-.792-.276-1.459-.735-1.963l-.211-.232.117-.291c.062-.157.253-.898.035-1.742-.321.085-.9.301-1.696.842l-.192.13-.224-.063A7.4 7.4 0 0 0 7.5 2.715c-.671 0-1.343.089-1.975.266l-.224.063-.192-.13c-.796-.541-1.376-.757-1.696-.842-.218.844-.027 1.585.035 1.742l.117.291-.211.232c-.459.504-.735 1.171-.735 1.963 0 1.129.28 1.875.74 2.367.712.76 1.803.916 2.756 1.03l1.085.129-.806.737c-.218.199-.393.567-.394 1.192v.007l.004.713a1.5 1.5 0 0 1-1.525 1.508L4 13.975s-.643-1.011.015-1l.481.008a.5.5 0 0 0 .508-.5c-1.225-.088-1.707-.506-2.062-.897C2.692 11.311 2.571 11 2 11v-1c.831 0 1.166.316 1.498.701.153.177.299.382.58.537.218.119.511.206.931.242a3 3 0 0 1 .197-.906c-.942-.173-1.893-.494-2.576-1.223-.598-.638-1.011-1.588-1.011-3.051 0-.954.304-1.771.811-2.418-.12-.508-.241-1.509.174-2.547l.105-.261.277-.047s.778-.184 2.493.932A8.4 8.4 0 0 1 7.5 1.715c.685 0 1.369.082 2.02.244 1.716-1.116 2.494-.932 2.494-.932l.277.047.105.261c.415 1.038.294 2.04.174 2.546.507.647.811 1.465.811 2.419 0 1.463-.413 2.413-1.011 3.051-.683.729-1.634 1.05-2.576 1.223.124.307.206.694.206 1.181l-.005.742a.5.5 0 0 0 .5.503h.498c.658 0 .007 1 .007 1h-.505a1.5 1.5 0 0 1-1.5-1.509"></path>
										</svg>
										{process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.substring(0, 7)}
									</Link>
									<p className="text-sm">{process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_MESSAGE}</p>
								</div>
							) : (
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 434 102" className="h-16 px-6">
									<g className="fill-foreground-2">
										<path d="M 231.29688,22.128906 V 99.431641 H 244.2793 V 55.763672 c 0,-14.014584 9.29421,-21.832031 22.27734,-21.832031 h 11.35547 V 22.128906 h -11.21289 c -16.81564,0 -22.41992,13.13086 -22.41992,13.13086 v -13.13086 z" />
										<path d="m 32.453125,20.064453 c -26.7013193,0 -30.2402343,18.440205 -30.2402343,24.193359 0,17.850193 20.6527063,20.801057 29.2089843,22.128907 17.850193,2.655183 20.652344,7.522826 20.652344,11.505859 0,10.769189 -14.456401,11.800781 -20.652344,11.800781 C 21.095475,89.398511 11.654263,84.531565 6.9335939,81.433594 L 0,91.611328 c 11.211461,7.523793 24.340502,9.884762 32.011719,9.884762 30.242079,0 32.896484,-17.260587 32.896484,-23.30859 0,-17.997617 -19.768196,-21.538398 -31.865234,-23.013672 C 21.388719,53.845979 17.11083,49.12594 16.962891,48.978516 15.782981,47.650666 15.19336,45.732 15.19336,43.814453 c 0,-5.606246 5.01639,-11.949219 17.703124,-11.949219 11.801674,0.295364 21.538123,7.819373 21.685547,7.966797 l 7.671875,-9.736328 C 49.419232,20.359 34.666036,20.064453 32.453125,20.064453 Z" />
										<path d="m 169.63282,19.916016 c -20.80074,0 -38.94532,15.78466 -38.94532,40.863281 0,25.079137 18.14458,40.716793 38.94532,40.716793 20.80022,0 28.17578,-15.341793 28.17578,-15.341793 v 13.277344 h 12.83398 V 21.982422 H 197.8086 v 13.277344 c 0,0 -7.37556,-15.34375 -28.17578,-15.34375 z m -0.29493,11.949218 c 22.27602,0 28.47071,14.900418 28.47071,28.767578 0,13.867161 -6.19469,28.914063 -28.47071,28.914063 -14.60428,0 -25.8164,-12.392659 -25.8164,-28.767578 0,-16.374919 11.21212,-28.914063 25.8164,-28.914063 z" />
										<path d="m 295.61719,0 v 74.205078 c 0.29382,15.341918 9.43952,25.079138 23.89844,25.226563 h 14.89648 V 87.628906 h -12.83008 c -3.98457,0 -12.69055,-7.65e-4 -12.98437,-12.6875 V 33.931641 h 25.81445 V 22.128906 H 308.59766 V 0 Z" />
										<path d="m 81.136719,0 v 74.205078 c 0.294848,15.341918 9.441065,25.079138 23.898441,25.226563 H 119.9336 V 87.628906 h -12.83399 c -3.98303,0 -12.685621,-7.65e-4 -12.980469,-12.6875 V 33.931641 H 119.9336 V 22.128906 H 94.119141 V 0 Z" />
									</g>
									<g className="fill-accent">
										<path
											d="M1176.45 476V371.827h104.17V476zm81.28-81.278h-58.39v58.383h58.39z"
											transform="matrix(.51547 0 0 .51547 -250.304 -145.933)"
										/>
										<path
											d="M1303.52 348.932h-81.28v-22.895h104.17V430.21h-22.89z"
											transform="matrix(.51547 0 0 .51547 -250.304 -145.933)"
											className="brightness-75"
										/>
									</g>
								</svg>
							)}
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

export default dynamic(() => Promise.resolve(Page), {
	ssr: false,
});
