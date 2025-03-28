const plugin = require("tailwindcss/plugin");
const { createThemes } = require("tw-colors");
/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				red: {
					DEFAULT: "#f44",
					50: "#fce3e7",
					100: "#fdcdcf",
					200: "#fea9ab",
					300: "#fe8687",
					400: "#ff6465",
					500: "#f44",
					600: "#df333a",
					700: "#b5262b",
					800: "#8e1a1d",
					900: "#640d0e",
					950: "#3b0000",
				},
				orange: {
					DEFAULT: "#f71",
					50: "#ffece0",
					100: "#ffdac1",
					200: "#ffc397",
					300: "#ffab6c",
					400: "#ff9443",
					500: "#f71",
					600: "#e36311",
					700: "#bc4e0e",
					800: "#95380a",
					900: "#6d2207",
					950: "#430f04",
				},
				yellow: {
					DEFAULT: "#fb0",
					50: "#fff4d6",
					100: "#ffeab1",
					200: "#ffe18e",
					300: "#ffd767",
					400: "#ffce44",
					500: "#fb0",
					600: "#e59801",
					700: "#bc7801",
					800: "#935802",
					900: "#703d03",
					950: "#441f02",
				},
				lime: {
					DEFAULT: "#9c3",
					50: "#f0fadb",
					100: "#dff0be",
					200: "#cfe89d",
					300: "#bfe17c",
					400: "#afd95c",
					500: "#9c3",
					600: "#82ad2b",
					700: "#688a23",
					800: "#4f6a1b",
					900: "#394c13",
					950: "#1f290b",
				},
				green: {
					DEFAULT: "#4b5",
					50: "#e4f7e5",
					100: "#c4ebc8",
					200: "#a6dfae",
					300: "#88d493",
					400: "#6ac977",
					500: "#4b5",
					600: "#3da447",
					700: "#32863a",
					800: "#27682d",
					900: "#1c4a21",
					950: "#112c14",
				},
				cyan: {
					DEFAULT: "#2cf",
					50: "#c7f9ff",
					100: "#acf3ff",
					200: "#8febff",
					300: "#70e2ff",
					400: "#50d9ff",
					500: "#2cf",
					600: "#1fb5e3",
					700: "#1894bc",
					800: "#106f90",
					900: "#084c65",
					950: "#062835",
				},
				blue: {
					DEFAULT: "#29f",
					50: "#c7f0ff",
					100: "#a4e1ff",
					200: "#88d2ff",
					300: "#68c0ff",
					400: "#4db1ff",
					500: "#29f",
					600: "#1f83e9",
					700: "#196bc0",
					800: "#135395",
					900: "#0d3b6a",
					950: "#00213d",
				},
				violet: {
					DEFAULT: "#a7e",
					50: "#f0e2ff",
					100: "#e1cafb",
					200: "#d3b6f8",
					300: "#c6a1f5",
					400: "#b88df1",
					500: "#a7e",
					600: "#9363ce",
					700: "#784caa",
					800: "#5c3586",
					900: "#411e62",
					950: "#220c3f",
				},
				pink: {
					DEFAULT: "#e6c",
					50: "#ffdeff",
					100: "#fcc6f5",
					200: "#f8afeb",
					300: "#f597e1",
					400: "#f180d7",
					500: "#e6c",
					600: "#d654b5",
					700: "#af3f93",
					800: "#882a70",
					900: "#62154e",
					950: "#3c002c",
				},
				neutral: {
					DEFAULT: "#aaa",
					50: "#eee",
					100: "#ddd",
					200: "#ccc",
					300: "#bbb",
					400: "#999",
					500: "#777",
					600: "#555",
					700: "#444",
					800: "#333",
					900: "#222",
					950: "#111",
				},
			},
			fontFamily: {
				sans: "Inter, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Roboto, 'Segoe UI Variable', 'Segoe UI Variable Text', 'Segoe UI', Cantarell, Ubuntu, system-ui, sans-serif",
				mono: "'Iosevka Mint Extended', 'Iosevka Extended', Iosevka, 'SF Mono', 'JetBrains Mono', 'Hack', monospace",
				number: "'Mina Sans Digits', 'Roboto Mono', monospace",
				triangles: "'Mint Triangles', 'Roboto Mono', monospace",
			},
			keyframes: {
				dialogEnter: {
					from: { opacity: "0%", transform: "translateX(-50%) translateY(calc(-50% + 20px))" },
					to: { opacity: "100%", transform: "translateX(-50%) translateY(-50%)" },
				},
				dialogExit: {
					from: { opacity: "100%", transform: "translateX(-50%) translateY(-50%)" },
					to: { opacity: "0%", transform: "translateX(-50%) translateY(calc(-50% + 20px))" },
				},
				selectOpen: {
					from: { opacity: "0%" },
					to: { opacity: "100%" },
				},
				selectClose: {
					from: { opacity: "100%" },
					to: { opacity: "0%" },
				},
				fadeIn: {
					from: { opacity: "0%" },
					to: { opacity: "100%" },
				},
				fadeOut: {
					from: { opacity: "100%" },
					to: { opacity: "0%" },
				},
				tooltipEnterBottom: {
					from: {
						opacity: 0,
						transform: "translateY(4px)",
					},
					to: {
						opacity: 1,
						transform: "translateY(0px)",
					},
				},
				tooltipExitBottom: {
					from: {
						opacity: 1,
						transform: "translateY(0px)",
					},
					to: {
						opacity: 0,
						transform: "translateY(4px)",
					},
				},
			},
			animation: {
				"dialog-enter": "dialogEnter .4s cubic-bezier(0.3, 0, 0, 1) .05s backwards",
				"dialog-exit": "dialogExit .2s cubic-bezier(0.4, 0, 0.5, 1)",
				"select-open": "selectOpen .2s;",
				"select-close": "selectClose .2s;",
				"fade-in": "fadeIn .25s cubic-bezier(0, 0, 0.2, 1)",
				"fade-out": "fadeOut .25s cubic-bezier(0, 0, 0.2, 1)",
				"tooltip-enter-bottom": "tooltipEnterBottom .2s cubic-bezier(0.33, 1, 0.68, 1) forwards",
				"tooltip-exit-bottom": "tooltipExitBottom .2s cubic-bezier(0.33, 1, 0.68, 1) forwards",
			},
		},
	},
	plugins: [
		createThemes({
			light: {
				background: "#fff",
				"elevate-1": "#eee",
				"elevate-2": "#ddd",
				"foreground-1": "#777",
				"foreground-2": "#111",
				accent: "#f44",
			},
			dark: {
				background: "#111",
				"elevate-1": "#222",
				"elevate-2": "#333",
				"foreground-1": "#aaa",
				"foreground-2": "#eee",
				accent: "#f44",
			},
			amoled: {
				background: "#000",
				"elevate-1": "#111",
				"elevate-2": "#222",
				"foreground-1": "#aaa",
				"foreground-2": "#eee",
				accent: "#f44",
			},
			pink: {
				background: "#1f0d16",
				"elevate-1": "#441e31",
				"elevate-2": "#64354b",
				"foreground-1": "#e699b9",
				"foreground-2": "#f8c8dc",
				accent: "#e698b8",
			},
			toothpaste: {
				background: "#F9FDF9",
				"elevate-1": "#E4F5E6",
				"elevate-2": "#C9EACD",
				"foreground-1": "#558052",
				"foreground-2": "#162a09",
				accent: "#27ab36",
			},
			forest: {
				background: "#141a14",
				"elevate-1": "#1C231B",
				"elevate-2": "#272f25",
				"foreground-1": "#a7b3a2",
				"foreground-2": "#e5e8e3",
				accent: "#27ab36",
			},
			ice: {
				background: "#f4f6fb",
				"elevate-1": "#e8ecf6",
				"elevate-2": "#ccd7eb",
				"foreground-1": "#4a72ad",
				"foreground-2": "#273753",
				accent: "#3a5d97",
			},
			ocean: {
				background: "#131d2b",
				"elevate-1": "#1D2B41",
				"elevate-2": "#263956",
				"foreground-1": "#B5CCE4",
				"foreground-2": "#e8edf6",
				accent: "#477db0",
			},
		}),
	],
};
