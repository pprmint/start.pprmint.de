"use client";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useEffect, useState } from "react";
import hexToHSL from "./hexToHsl";
import CustomThemeApplier from "./customThemeApplier";
import * as Dialog from "@radix-ui/react-dialog";
import confetti from "canvas-confetti";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const customThemeRegEx = /^(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})(?:,(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})){5}$/;

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
	const hexCustomTheme =
		lsCustomTheme && customThemeRegEx.test(lsCustomTheme)
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
	const hexCustomTheme =
		lsCustomTheme && customThemeRegEx.test(lsCustomTheme)
			? lsCustomTheme.split(",")
			: ["111", "222", "333", "aaa", "eee", "0c6"];

	const [background, setBackground] = useState(hexCustomTheme[0]);
	const [elevate1, setElevate1] = useState(hexCustomTheme[1]);
	const [elevate2, setElevate2] = useState(hexCustomTheme[2]);
	const [foreground1, setForeground1] = useState(hexCustomTheme[3]);
	const [foreground2, setForeground2] = useState(hexCustomTheme[4]);
	const [accent, setAccent] = useState(hexCustomTheme[5]);

	const [copied, setCopied] = useState(false);
	const themeLink = `https://start.pprmint.de/settings?theme=${background}_${elevate1}_${elevate2}_${foreground1}_${foreground2}_${accent}`;
	function handleThemeLinkCopy() {
		navigator.clipboard.writeText(themeLink);
		setCopied(true);
		confetti({
			shapes: ["circle"],
			colors: [`#${elevate1}`, `#${elevate2}`, `#${foreground1}`, `#${foreground2}`, `#${accent}`],
			origin: {
				y: 0.6,
			},
			scalar: 0.8,
		});
		setTimeout(() => {
			setCopied(false);
		}, 1500);
	}
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				ApplyCustomTheme;
			}}
		>
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
									className="bg-transparent border-b border-elevate-2 text-foreground-2 w-full focus:border-elevate-2 outline-none focus:bg-elevate-1"
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
									className="bg-transparent border-b border-elevate-2 text-foreground-2 w-full focus:border-elevate-2 outline-none focus:bg-elevate-1"
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
									className="bg-transparent border-b border-elevate-2 text-foreground-2 w-full focus:border-elevate-2 outline-none focus:bg-elevate-1"
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
									className="bg-transparent border-b border-elevate-2 text-foreground-2 w-full focus:border-elevate-2 outline-none focus:bg-elevate-1"
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
									className="bg-transparent border-b border-elevate-2 text-foreground-2 w-full focus:border-elevate-2 outline-none focus:bg-elevate-1"
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
									className="bg-transparent border-b border-elevate-2 text-foreground-2 w-full focus:border-elevate-2 outline-none focus:bg-elevate-1"
									id="accent"
									type="text"
									value={accent}
									onChange={(e) => setAccent(e.target.value)}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="flex gap-3">
					<Dialog.Root>
						<Dialog.Trigger asChild>
							<button
								className="btn"
								onClick={() => {
									localStorage.setItem(
										"customTheme",
										`${background},${elevate1},${elevate2},${foreground1},${foreground2},${accent}`
									),
										ApplyCustomTheme();
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="15"
									height="15"
									viewBox="0 0 15 15"
									fill="currentColor"
								>
									<path d="m7 2.614-2 2V3.2L7.5.7 10 3.2v1.414l-2-2v7.409H7z"></path>
									<path d="M5 6.045v1H2.5a.5.5 0 0 0-.5.5V12.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V7.545a.5.5 0 0 0-.5-.5H10v-1h2.5a1.5 1.5 0 0 1 1.5 1.5V12.5a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 1 12.5V7.545a1.5 1.5 0 0 1 1.5-1.5z"></path>
								</svg>
								Share
							</button>
						</Dialog.Trigger>
						<Dialog.Portal>
							<Dialog.Overlay className="fixed inset-0 bg-background/75 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out" />
							<Dialog.Content className="flex flex-col justify-center data-[state=open]:animate-dialog-enter data-[state=closed]:animate-dialog-exit fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 md:p-9 md:rounded-xl md:shadow-2xl bg-background md:border border-elevate-2 size-full md:max-w-4xl md:h-max md:max-h-screen">
								<Dialog.Title className="text-2xl lg:text-4xl font-bold text-foreground-2">
									Share this theme<span className="text-accent">.</span>
								</Dialog.Title>
								<Dialog.Description>
									Use the link below to share your current custom theme with others, or save it in
									your bookmarks to re-apply it at a later date.
								</Dialog.Description>
								<p className="text-center font-bold text-foreground-2 text-xl my-6">{themeLink}</p>
								<div className="flex justify-center w-full">
									<button className="btn" onClick={handleThemeLinkCopy}>
										{copied ? (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="15"
												height="15"
												viewBox="0 0 15 15"
												fill="currentColor"
											>
												<path d="m1.646 7.354.708-.708L6 10.293l6.646-6.647.708.708L6 11.707z"></path>
											</svg>
										) : (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="15"
												height="15"
												viewBox="0 0 15 15"
												fill="currentColor"
											>
												<path d="M11 4.5v8A1.5 1.5 0 0 1 9.5 14h-6A1.5 1.5 0 0 1 2 12.5v-8A1.5 1.5 0 0 1 3.5 3h6A1.5 1.5 0 0 1 11 4.5m-1 0a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5z"></path>
												<path d="M5 2V1h6.5A1.5 1.5 0 0 1 13 2.5V11h-1V2.5a.5.5 0 0 0-.5-.5z"></path>
											</svg>
										)}{" "}
										Copy to clipboard
									</button>
								</div>
								<Dialog.Close asChild>
									<button className="absolute top-3 right-3 hover:text-foreground-2 hover:bg-elevate-1 active:bg-elevate-2 p-2 duration-100 rounded-full">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="15"
											height="15"
											viewBox="0 0 15 15"
											fill="currentColor"
										>
											<path d="M6.793 7.5 3.646 4.354l.708-.708L7.5 6.793l3.146-3.147.708.708L8.207 7.5l3.147 3.146-.708.708L7.5 8.207l-3.146 3.147-.708-.708z"></path>
										</svg>
									</button>
								</Dialog.Close>
							</Dialog.Content>
						</Dialog.Portal>
					</Dialog.Root>
					<button
						className="btn-accent"
						onClick={() => {
							localStorage.setItem(
								"customTheme",
								`${background},${elevate1},${elevate2},${foreground1},${foreground2},${accent}`
							),
								ApplyCustomTheme();
						}}
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
			</div>
		</form>
	);
}

export function PassedThemeDialog({ colors }: { colors: string[] }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const nextSearchParams = new URLSearchParams(searchParams.toString());

	const { setTheme } = useTheme();
	function applyPassedTheme() {
		setTheme("custom");
		localStorage.setItem(
			"customTheme",
			`${colors[0]},${colors[1]},${colors[2]},${colors[3]},${colors[4]},${colors[5]}`
		),
			ApplyCustomTheme();
	}

	const [passedThemeOpen, setPassedThemeOpen] = useState(colors.length < 6 ? false : true);

	useEffect(() => {
		if (!passedThemeOpen) {
			nextSearchParams.delete("theme");
			router.replace(`${pathname}?${nextSearchParams}`);
		}
	}, [passedThemeOpen]);

	return (
		<Dialog.Root open={passedThemeOpen} onOpenChange={setPassedThemeOpen}>
			<Dialog.Portal>
				<Dialog.Overlay
					className="fixed inset-0 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out"
					style={{ backgroundColor: `${colors[0].length === 3 ? `#${colors[0]}b` : `#${colors[0]}bb`}` }}
				/>
				<Dialog.Content
					className="flex flex-col justify-center data-[state=open]:animate-dialog-enter data-[state=closed]:animate-dialog-exit fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 md:p-9 md:rounded-xl md:shadow-2xl md:border size-full md:max-w-xl md:h-max md:max-h-screen"
					style={{ backgroundColor: `#${colors[0]}`, borderColor: `#${colors[2]}`, color: `#${colors[3]}` }}
				>
					<Dialog.Title
						className="text-2xl lg:text-4xl font-bold sm:text-center"
						style={{ color: `#${colors[4]}` }}
					>
						Apply custom theme<span style={{ color: `#${colors[5]}` }}>.</span>
					</Dialog.Title>
					<Dialog.Description className="sm:text-center">
						Would you like to apply this custom theme?
					</Dialog.Description>
					<div className="flex -space-x-2 w-full justify-center my-9">
						{colors.map(
							(color, index) =>
								index > 0 && (
									<div
										key={index}
										className="size-16 rounded-full"
										style={{ backgroundColor: `#${color}`, boxShadow: `0 0 0 4px #${colors[0]}` }}
									/>
								)
						)}
					</div>
					<div className="flex gap-3 justify-center w-full">
						<Dialog.Close asChild>
							<button
								className="p-2 rounded-full hover:scale-105 duration-100"
								style={{ backgroundColor: `#${colors[1]}`, color: `#${colors[4]}` }}
								onClick={applyPassedTheme}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="25"
									height="25"
									viewBox="0 0 15 15"
									fill="currentColor"
								>
									<path d="m1.646 7.354.708-.708L6 10.293l6.646-6.647.708.708L6 11.707z"></path>
								</svg>
							</button>
						</Dialog.Close>
						<Dialog.Close asChild>
							<button
								className="p-2 rounded-full hover:scale-105 duration-100"
								style={{ backgroundColor: `#${colors[1]}`, color: `#${colors[4]}` }}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="25"
									height="25"
									viewBox="0 0 15 15"
									fill="currentColor"
								>
									<path d="M6.793 7.5 3.646 4.354l.708-.708L7.5 6.793l3.146-3.147.708.708L8.207 7.5l3.147 3.146-.708.708L7.5 8.207l-3.146 3.147-.708-.708z"></path>
								</svg>
							</button>
						</Dialog.Close>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
