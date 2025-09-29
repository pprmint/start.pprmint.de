"use client";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useEffect, useState } from "react";
import hexToHSL from "./hexToHsl";
import CustomThemeApplier from "./customThemeApplier";
import * as Dialog from "@radix-ui/react-dialog";
import confetti from "canvas-confetti";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const customThemeRegEx = /^(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})(?:,(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})){5}$/;
const fieldRegEx = /^(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

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
			: ["111", "222", "333", "aaa", "eee", "0b7"];

	document.documentElement.style.setProperty("--color-background", `#${hexCustomTheme[0]}`);
	document.documentElement.style.setProperty("--color-elevate-1", `#${hexCustomTheme[1]}`);
	document.documentElement.style.setProperty("--color-elevate-2", `#${hexCustomTheme[2]}`);
	document.documentElement.style.setProperty("--color-foreground-1", `#${hexCustomTheme[3]}`);
	document.documentElement.style.setProperty("--color-foreground-2", `#${hexCustomTheme[4]}`);
	document.documentElement.style.setProperty("--color-accent", `#${hexCustomTheme[5]}`);
}

export function ThemeCustomizer() {
	const lsCustomTheme = localStorage.getItem("customTheme");
	const hexCustomTheme =
		lsCustomTheme && customThemeRegEx.test(lsCustomTheme)
			? lsCustomTheme.split(",")
			: ["111", "222", "333", "aaa", "eee", "0b7"];

	const [background, setBackground] = useState(hexCustomTheme[0]);
	const [elevate1, setElevate1] = useState(hexCustomTheme[1]);
	const [elevate2, setElevate2] = useState(hexCustomTheme[2]);
	const [foreground1, setForeground1] = useState(hexCustomTheme[3]);
	const [foreground2, setForeground2] = useState(hexCustomTheme[4]);
	const [accent, setAccent] = useState(hexCustomTheme[5]);

	const Fields = [
		{
			name: "Background",
			state: background,
			change: setBackground,
		},
		{
			name: "Elevate 1",
			state: elevate1,
			change: setElevate1,
		},
		{
			name: "Elevate 2",
			state: elevate2,
			change: setElevate2,
		},
		{
			name: "Foreground 1",
			state: foreground1,
			change: setForeground1,
		},
		{
			name: "Foreground 2",
			state: foreground2,
			change: setForeground2,
		},
		{
			name: "Accent",
			state: accent,
			change: setAccent,
		},
	];

	const handlePaste = (
		event: React.ClipboardEvent<HTMLInputElement>,
		setState: React.Dispatch<React.SetStateAction<string>>,
		index: number
	) => {
		event.preventDefault();
		const text = event.clipboardData.getData("text");
		const hex = text.replace("#", "").slice(0, 6);
		setState(hex);
		validate(hex, index);
	};

	const [invalidFields, setInvalidFields] = useState<number[]>([]);

	const validate = (value: string, index: number) => {
		if (fieldRegEx.test(value)) {
			setInvalidFields((prev) => prev.filter((i) => i !== index));
		} else {
			setInvalidFields((prev) => {
				if (!prev.includes(index)) {
					return [...prev, index];
				}
				return prev;
			});
		}
	};

	const validateField = useDebouncedCallback((value: string, index: number) => {
		validate(value, index);
	}, 500);

	const validateAllFields = (): boolean => {
		let allValid = true;
		Fields.forEach((field, index) => {
			if (!fieldRegEx.test(field.state)) {
				validate(field.state, index);
				allValid = false;
			}
		});
		return allValid;
	};

	function handleApplyTheme() {
		const allValid = validateAllFields();
		if (allValid) {
			localStorage.setItem(
				"customTheme",
				`${background},${elevate1},${elevate2},${foreground1},${foreground2},${accent}`
			);
			ApplyCustomTheme();
		}
	}

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
				if (validateAllFields()) {
					handleApplyTheme();
				}
			}}
		>
			<p className="text-foreground-2 font-medium text-lg mb-1">Custom theme colors</p>
			<div className="w-full flex flex-col gap-6 items-end">
				<div className="grid grid-cols-2 sm:grid-cols-3 grid-flow-row gap-6 w-full">
					{Fields.map((field, index) => (
						<div key={index} className="flex gap-3 items-center">
							<div>
								<div
									className={`size-10 rounded-full ring-inset ring-1 ${
										invalidFields.includes(index) ? "ring-red" : "ring-neutral-500/20"
									}`}
									style={{ backgroundColor: `#${field.state}` }}
								/>
							</div>
							<div className="grow">
								<label className="text-xs leading-none" htmlFor="background">
									{field.name}
								</label>
								<div
									className={`relative font-mono flex grow ${
										invalidFields.includes(index) && "bg-red-500 border-red-500 text-black"
									} duration-100`}
								>
									#
									<input
										maxLength={6}
										className={`border-b w-full outline-none ${
											invalidFields.includes(index)
												? "bg-red-500 border-red-500 text-black"
												: "bg-transparent border-elevate-1 focus:border-elevate-2 focus:bg-elevate-1 text-foreground-2"
										} rounded-0 duration-100`}
										id={field.name}
										type="text"
										value={field.state}
										onChange={(e) => {
											field.change(e.target.value);
											validateField(e.target.value, index);
										}}
										onPaste={(e) => handlePaste(e, field.change, index)}
									/>
									{invalidFields.includes(index) && (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="15"
											height="15"
											viewBox="0 0 15 15"
											className="absolute right-1 top-1 fill-current"
										>
											<path d="M6.8 5.5a.7.7 0 0 1 1.4 0s-.108 1.619-.153 2.8c-.025.672-.025 1.2-.025 1.2a.522.522 0 0 1-1.044 0s0-.528-.025-1.2A121 121 0 0 0 6.8 5.5"></path>
											<circle cx="7.5" cy="11.5" r=".75"></circle>
											<path d="M1.503 14.008a1.501 1.501 0 0 1-1.291-2.264L6.209 1.608a1.5 1.5 0 0 1 2.582 0l5.997 10.136a1.501 1.501 0 0 1-1.291 2.264zm0-1h11.994a.5.5 0 0 0 .43-.755L7.93 2.117a.5.5 0 0 0-.86 0L1.073 12.253a.502.502 0 0 0 .43.755"></path>
										</svg>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
				<div className="flex gap-3 w-full flex-wrap">
					<div className="text-xs grow">
						<p className={`${invalidFields.length > 0 && "text-foreground-2 font-bold underline"}`}>
							Only 3 and 6 digit HEX codes are supported.
						</p>
						<p>
							For example: <b>#4b5</b> is the same as <b>#44bb55</b>.
						</p>
					</div>
					<div className="flex gap-3">
						<Dialog.Root>
							<Dialog.Trigger asChild>
								<button
									className="btn disabled:pointer-events-none disabled:opacity-50 disabled:border-dashed"
									disabled={invalidFields.length > 0}
									onClick={(e) => {
										if (validateAllFields()) {
											handleApplyTheme();
										} else {
											e.preventDefault();
										}
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
							className="btn-accent disabled:pointer-events-none disabled:opacity-50 disabled:border-dashed"
							disabled={invalidFields.length > 0}
							onClick={() => {
								if (validateAllFields()) {
									handleApplyTheme();
								}
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
			</div>
		</form>
	);
}

export function PassedThemeDialog({ colors }: { colors: string[] }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

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
		if (!passedThemeOpen && searchParams.has("theme")) {
			const nextSearchParams = new URLSearchParams(searchParams.toString());
			nextSearchParams.delete("theme");
			router.replace(`${pathname}?${nextSearchParams}`);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [passedThemeOpen]);

	return (
		<Dialog.Root open={passedThemeOpen} onOpenChange={setPassedThemeOpen}>
			<Dialog.Portal>
				<Dialog.Overlay
					className="fixed inset-0 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out"
					style={{
						backgroundColor: `${colors[0].length === 3 ? `#${colors[0]}b` : `#${colors[0]}bb`}`,
					}}
				/>
				<Dialog.Content
					className="flex flex-col justify-center data-[state=open]:animate-dialog-enter data-[state=closed]:animate-dialog-exit fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 md:p-9 md:rounded-xl md:shadow-2xl md:border size-full md:max-w-xl md:h-max md:max-h-screen"
					style={{
						backgroundColor: `#${colors[0]}`,
						borderColor: `#${colors[2]}`,
						color: `#${colors[3]}`,
					}}
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
										style={{
											backgroundColor: `#${color}`,
											boxShadow: `0 0 0 4px #${colors[0]}`,
										}}
									/>
								)
						)}
					</div>
					<div className="flex gap-3 justify-center w-full">
						<Dialog.Close asChild>
							<button
								className="p-2 rounded-full hover:scale-105 duration-100"
								style={{
									backgroundColor: `#${colors[1]}`,
									color: `#${colors[4]}`,
								}}
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
								style={{
									backgroundColor: `#${colors[1]}`,
									color: `#${colors[4]}`,
								}}
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
