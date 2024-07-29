"use client";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const Themes = [
	{
		text: "light",
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
				<path d="M7.5 4.9a2.601 2.601 0 0 1 0 5.2 2.601 2.601 0 0 1 0-5.2m0 1a1.6 1.6 0 1 0 .002 3.202A1.6 1.6 0 0 0 7.5 5.9M7 1h1v3H7zM10.328 5.379l-.707-.707 2.122-2.122.707.707zM11 8V7h3v1zM9.621 10.328l.707-.707 2.122 2.122-.707.707zM7 11h1v3H7zM3.257 12.45l-.707-.707 2.122-2.122.707.707zM1 8V7h3v1zM2.55 3.257l.707-.707 2.122 2.122-.707.707z"></path>
			</svg>
		),
	},
	{
		text: "system",
		icon: (
			<>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="15"
					height="15"
					viewBox="0 0 15 15"
					fill="currentColor"
					className="hidden md:block"
				>
					<path d="M4.761 10H2.5A1.5 1.5 0 0 1 1 8.5v-5A1.5 1.5 0 0 1 2.5 2h10A1.5 1.5 0 0 1 14 3.5v5a1.5 1.5 0 0 1-1.5 1.5h-2.261L11 11.904V13H4v-1.096zm4.4 0H5.839l-.8 2h4.922zM13 3.5a.5.5 0 0 0-.5-.5h-10a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5z"></path>
				</svg>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="15"
					height="15"
					viewBox="0 0 15 15"
					fill="currentColor"
					className="block md:hidden"
				>
					<path d="M12 2.5v10a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 3 12.5v-10A1.5 1.5 0 0 1 4.5 1h6A1.5 1.5 0 0 1 12 2.5m-1 0a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5z"></path>
					<circle cx="7.5" cy="11.5" r=".75"></circle>
				</svg>
			</>
		),
	},
	{
		text: "dark",
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
				<path d="M9.031 1.767a.5.5 0 0 1 .938 0l.341.923.923.341a.5.5 0 0 1 0 .938l-.923.341-.341.923a.5.5 0 0 1-.938 0L8.69 4.31l-.923-.341a.5.5 0 0 1 0-.938l.923-.341zM12.031 5.267a.5.5 0 0 1 .938 0l.206.558.558.206a.5.5 0 0 1 0 .938l-.558.206-.206.558a.5.5 0 0 1-.938 0l-.206-.558-.558-.206a.5.5 0 0 1 0-.938l.558-.206zM3.162 2.193a.985.985 0 0 1 1.727.37c.456 1.537 1.397 3.28 2.832 4.716 1.438 1.437 3.185 2.379 4.718 2.821.367.093.65.386.73.756a1 1 0 0 1-.365.998l-.008.006c-2.705 1.962-6.514 1.729-8.95-.706s-2.668-6.246-.691-8.953zm9.025 8.875-.011-.003c-1.682-.484-3.592-1.509-5.162-3.079-1.563-1.564-2.587-3.464-3.086-5.148a5.905 5.905 0 0 0 .626 7.608c2.076 2.077 5.32 2.281 7.633.622"></path>
			</svg>
		),
	},
];

function ThemeSwitch() {
	const { theme, setTheme } = useTheme();
	return (
		<div className="flex gap-0.5 relative rounded-full border border-neutral-50 dark:border-neutral-900 p-0.5">
			<div
				className={`absolute top-0.5 bottom-0.5 aspect-square peer-hover:opacity-0 bg-neutral-50 dark:bg-neutral-900 rounded-full -z-10 ${
					theme === "system"
						? "translate-x-[29px]"
						: theme === "dark"
						? "translate-x-[58px]"
						: "translate-x-0"
				} duration-200 ease-out`}
			/>
			{Themes.map((item, index) => (
				<button
					key={index}
					className={`peer ${
						item.text === theme
							? "text-foreground-2"
							: "hover:text-neutral-950 dark:hover:text-neutral-50"
					} p-1.5 rounded-full duration-200`}
					onClick={() => setTheme(item.text)}
				>
					{item.icon}
				</button>
			))}
		</div>
	);
}

export default dynamic(() => Promise.resolve(ThemeSwitch), {
	ssr: false,
});
