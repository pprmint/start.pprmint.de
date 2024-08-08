"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useState } from "react";
import hexToHSL from "./hexToHsl";
import CustomThemeApplier from "./customThemeApplier";

type ThemeProviderProps = Parameters<typeof NextThemesProvider>[0];

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return (
		<NextThemesProvider {...props}>
			<CustomThemeApplier>{children}</CustomThemeApplier>
		</NextThemesProvider>
	);
}

export function ApplyCustomTheme() {
	const lsCustomTheme = localStorage.getItem("customTheme");
	const hexCustomTheme = lsCustomTheme
		? lsCustomTheme.split(",")
		: ["111", "222", "333", "aaa", "eee", "0c6"];

	const hslBackground = hexToHSL(hexCustomTheme[0]);
	const hslElevate1 = hexToHSL(hexCustomTheme[1]);
	const hslElevate2 = hexToHSL(hexCustomTheme[2]);
	const hslForeground1 = hexToHSL(hexCustomTheme[3]);
	const hslForeground2 = hexToHSL(hexCustomTheme[4]);
	const hslAccent = hexToHSL(hexCustomTheme[5]);

	document.documentElement.style.setProperty(
		"--twc-background",
		`${hslBackground[0]} ${hslBackground[1]}% ${hslBackground[2]}%`
	);
	document.documentElement.style.setProperty(
		"--twc-elevate-1",
		`${hslElevate1[0]} ${hslElevate1[1]}% ${hslElevate1[2]}%`
	);
	document.documentElement.style.setProperty(
		"--twc-elevate-2",
		`${hslElevate2[0]} ${hslElevate2[1]}% ${hslElevate2[2]}%`
	);
	document.documentElement.style.setProperty(
		"--twc-foreground-1",
		`${hslForeground1[0]} ${hslForeground1[1]}% ${hslForeground1[2]}%`
	);
	document.documentElement.style.setProperty(
		"--twc-foreground-2",
		`${hslForeground2[0]} ${hslForeground2[1]}% ${hslForeground2[2]}%`
	);
	document.documentElement.style.setProperty("--twc-accent", `${hslAccent[0]} ${hslAccent[1]}% ${hslAccent[2]}%`);
}

export function ThemeCustomizer() {
	const lsCustomTheme = localStorage.getItem("customTheme");
	const hexCustomTheme = lsCustomTheme
		? lsCustomTheme.split(",")
		: ["111", "222", "333", "aaa", "eee", "0c6"];

	const [background, setBackground] = useState(hexCustomTheme[0]);
	const [elevate1, setElevate1] = useState(hexCustomTheme[1]);
	const [elevate2, setElevate2] = useState(hexCustomTheme[2]);
	const [foreground1, setForeground1] = useState(hexCustomTheme[3]);
	const [foreground2, setForeground2] = useState(hexCustomTheme[4]);
	const [accent, setAccent] = useState(hexCustomTheme[5]);
	return (
		<div>
			<p className="text-foreground-2 font-medium text-lg mb-1">Custom theme colors</p>
			<div className="w-full flex flex-col gap-6 items-end">
				<div className="grid grid-cols-2 sm:grid-cols-3 grid-flow-row gap-6 w-full">
					<div className="flex gap-3 items-center">
						<div>
							<div
								className="size-9 rounded-full ring-1 ring-inset ring-neutral-400/20"
								style={{ backgroundColor: `#${background}` }}
							/>
						</div>
						<div className="grow">
							<label className="text-xs leading-none" htmlFor="background">
								Background
							</label>
							<div className="font-mono flex grow">
								#
								<input
									maxLength={6}
									className="bg-transparent border-b border-elevate-2 text-foreground-2 w-full"
									id="background"
									type="text"
									value={background}
									onChange={(e) => setBackground(e.target.value)}
								/>
							</div>
						</div>
					</div>
					<div className="flex gap-3 items-center">
						<div>
							<div
								className="size-9 rounded-full ring-1 ring-inset ring-neutral-400/20"
								style={{ backgroundColor: `#${elevate1}` }}
							/>
						</div>
						<div className="grow">
							<label className="text-xs leading-none" htmlFor="elevate1">
								Elevate 1
							</label>
							<div className="font-mono flex grow">
								#
								<input
									maxLength={6}
									className="bg-transparent border-b border-elevate-2 text-foreground-2 w-full"
									id="elevate1"
									type="text"
									value={elevate1}
									onChange={(e) => setElevate1(e.target.value)}
								/>
							</div>
						</div>
					</div>
					<div className="flex gap-3 items-center">
						<div>
							<div
								className="size-9 rounded-full ring-1 ring-inset ring-neutral-400/20"
								style={{ backgroundColor: `#${elevate2}` }}
							/>
						</div>
						<div className="grow">
							<label className="text-xs leading-none" htmlFor="elevate2">
								Elevate 2
							</label>
							<div className="font-mono flex grow">
								#
								<input
									maxLength={6}
									className="bg-transparent border-b border-elevate-2 text-foreground-2 w-full"
									id="elevate2"
									type="text"
									value={elevate2}
									onChange={(e) => setElevate2(e.target.value)}
								/>
							</div>
						</div>
					</div>
					<div className="flex gap-3 items-center">
						<div>
							<div
								className="size-9 rounded-full ring-1 ring-inset ring-neutral-400/20"
								style={{ backgroundColor: `#${foreground1}` }}
							/>
						</div>
						<div className="grow">
							<label className="text-xs leading-none" htmlFor="foreground1">
								Foreground 1
							</label>
							<div className="font-mono flex grow">
								#
								<input
									maxLength={6}
									className="bg-transparent border-b border-elevate-2 text-foreground-2 w-full"
									id="foreground1"
									type="text"
									value={foreground1}
									onChange={(e) => setForeground1(e.target.value)}
								/>
							</div>
						</div>
					</div>
					<div className="flex gap-3 items-center">
						<div>
							<div
								className="size-9 rounded-full ring-1 ring-inset ring-neutral-400/20"
								style={{ backgroundColor: `#${foreground2}` }}
							/>
						</div>
						<div className="grow">
							<label className="text-xs leading-none" htmlFor="foreground2">
								Foreground 2
							</label>
							<div className="font-mono flex grow">
								#
								<input
									maxLength={6}
									className="bg-transparent border-b border-elevate-2 text-foreground-2 w-full"
									id="foreground2"
									type="text"
									value={foreground2}
									onChange={(e) => setForeground2(e.target.value)}
								/>
							</div>
						</div>
					</div>
					<div className="flex gap-3 items-center">
						<div>
							<div
								className="size-9 rounded-full ring-1 ring-inset ring-neutral-400/20"
								style={{ backgroundColor: `#${accent}` }}
							/>
						</div>
						<div className="grow">
							<label className="text-xs leading-none" htmlFor="accent">
								Accent
							</label>
							<div className="font-mono flex grow">
								#
								<input
									maxLength={6}
									className="bg-transparent border-b border-elevate-2 text-foreground-2 w-full"
									id="accent"
									type="text"
									value={accent}
									onChange={(e) => setAccent(e.target.value)}
								/>
							</div>
						</div>
					</div>
				</div>
				<button
					className="hover:bg-elevate-1 active:bg-elevate-2 text-foreground-2 border border-elevate-2 rounded-md text-sm px-3 py-1.5 duration-100"
					onClick={() => {
						localStorage.setItem(
							"customTheme",
							`${background},${elevate1},${elevate2},${foreground1},${foreground2},${accent}`
						),
							ApplyCustomTheme();
					}}
				>
					Apply
				</button>
			</div>
		</div>
	);
}
