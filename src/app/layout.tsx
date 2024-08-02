import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "public/MinaSans/MinaSans.css";
import "public/MintTriangles/minttriangles.css";
import "./globals.css";
import { ThemeProvider } from "../components/themeProvider";

export const metadata: Metadata = {
	title: "start.",
	description: "A simple browser start page.",
	metadataBase: new URL("https://start.pprmint.art"),
};

const inter = Inter({
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`bg-background text-foreground-1 ${inter.className}`}>
				<ThemeProvider
					defaultTheme="system"
					themes={["light", "dark", "amoled", "pink", "toothpaste", "forest", "ice", "ocean", "system"]}
					attribute="class"
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
