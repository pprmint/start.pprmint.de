import type { Metadata } from "next";
import "public/MinaSans/MinaSans.css";
import "./globals.css";
import Link from "next/link";
import { ThemeProvider } from "../components/themeProvider";
import Settings from "src/components/settings";

export const metadata: Metadata = {
	title: "start.",
	description: "A simple browser start page.",
	metadataBase: new URL("https://start.pprmint.art"),
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="dark:bg-neutral-950 text-neutral-500 dark:text-neutral">
				<ThemeProvider defaultTheme="system" themes={["light", "dark", "system"]} attribute="class">
					{children}
					<footer className="flex items-end justify-between fixed bottom-0 inset-x-0 p-6 text-sm">
						<p>
							Made by{" "}
							<Link
								className="group text-neutral-950 dark:text-neutral-50"
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
				</ThemeProvider>
			</body>
		</html>
	);
}
