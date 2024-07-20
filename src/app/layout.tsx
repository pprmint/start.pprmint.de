import type { Metadata } from "next";
import "public/MinaSans/MinaSans.css";
import "./globals.css";

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
			<body className="bg-neutral-50 dark:bg-neutral-950 text-neutral-600 dark:text-neutral">
				<nav className="fixed top-0 inset-x-0 px-6 py-5">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 434 102" className="h-6">
						<path
							d="M489.879 368.965c0 34.629 40.066 40.353 56.665 42.929 34.629 5.151 40.067 14.595 40.067 22.322 0 20.892-28.047 22.895-40.067 22.895-20.033-.572-38.349-10.016-47.507-16.026l-13.451 19.747c21.75 14.596 47.221 19.175 62.103 19.175 58.669 0 63.82-33.485 63.82-45.218 0-34.915-38.349-41.784-61.817-44.646-22.609-2.576-30.908-11.734-31.195-12.02-2.289-2.576-3.434-6.296-3.434-10.016 0-10.876 9.731-23.182 34.343-23.182 22.895.573 41.784 15.168 42.07 15.454l14.882-18.888c-24.899-18.889-53.518-19.461-57.811-19.461-51.8 0-58.668 35.774-58.668 46.935M668.175 428.493v-79.561h50.083v-22.895h-50.083v-42.929H642.99v143.954c.572 29.763 18.316 48.652 46.363 48.938h28.905v-22.895h-24.899c-7.727 0-24.612 0-25.184-24.612M746.877 401.018c0 48.653 35.201 78.989 75.554 78.989 40.352 0 54.662-29.764 54.662-29.764V476h24.898V325.751h-24.898v25.757s-14.31-29.764-54.662-29.764c-40.353 0-75.554 30.622-75.554 79.274m130.216-.286c0 26.902-12.02 56.093-55.235 56.093-28.332 0-50.083-24.04-50.083-55.807s21.751-56.093 50.083-56.093c43.215 0 55.235 28.905 55.235 55.807M967.243 391.288c0-27.188 18.03-42.356 43.217-42.356h22.03v-22.895h-21.75c-32.622 0-43.497 25.471-43.497 25.471v-25.471h-25.185V476h25.185zM1092.02 428.493v-79.561h50.08v-22.895h-50.08v-42.929h-25.18v143.954c.57 29.763 18.31 48.652 46.36 48.938h28.9v-22.895h-24.89c-7.73 0-24.62 0-25.19-24.612"
							className="fill-neutral-950 dark:fill-neutral-50"
							transform="matrix(.51547 0 0 .51547 -250.304 -145.933)"
						/>
						<path
							d="M1176.45 476V371.827h104.17V476zm81.28-81.278h-58.39v58.383h58.39z"
							style={{ fill: "url(#a)" }}
							transform="matrix(.51547 0 0 .51547 -250.304 -145.933)"
						/>
						<path
							d="M1303.52 348.932h-81.28v-22.895h104.17V430.21h-22.89z"
							style={{ fill: "url(#b)" }}
							transform="matrix(.51547 0 0 .51547 -250.304 -145.933)"
						/>
						<defs>
							<linearGradient
								id="a"
								x1="0"
								x2="1"
								y1="0"
								y2="0"
								gradientTransform="rotate(90 428.351 800.179)scale(104.173)"
								gradientUnits="userSpaceOnUse"
							>
								<stop offset="0" style={{ stopColor: "#0c6", stopOpacity: 1 }} />
								<stop offset="1" style={{ stopColor: "#00ab56", stopOpacity: 1 }} />
							</linearGradient>
							<linearGradient
								id="b"
								x1="0"
								x2="1"
								y1="0"
								y2="0"
								gradientTransform="rotate(90 483.342 831.418)scale(82.1349)"
								gradientUnits="userSpaceOnUse"
							>
								<stop offset="0" style={{ stopColor: "#008b45", stopOpacity: 1 }} />
								<stop offset="1" style={{ stopColor: "#006b35", stopOpacity: 1 }} />
							</linearGradient>
						</defs>
					</svg>
				</nav>
				{children}
			</body>
		</html>
	);
}
