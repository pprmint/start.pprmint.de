const plugin = require("tailwindcss/plugin");
const { createThemes } = require("tw-colors");
/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
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
					DEFAULT: "#0c6",
					50: "#d1ffed",
					100: "#b2f6d3",
					200: "#8bedbb",
					300: "#63e4a3",
					400: "#3cda8b",
					500: "#0c6",
					600: "#00ab56",
					700: "#008b45",
					800: "#006b35",
					900: "#004a25",
					950: "#002914",
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
				number: "'Mina Sans Digits', 'Roboto Mono', monospace",
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
			},
			animation: {
				"dialog-enter": "dialogEnter .4s cubic-bezier(.2,0,0,1)",
				"dialog-exit": "dialogExit .25s cubic-bezier(.15,0,.35,1)",
				"select-open": "selectOpen .2s;",
				"select-close": "selectClose .2s;",
				"fade-in": "fadeIn .25s cubic-bezier(0, 0, 0.2, 1)",
				"fade-out": "fadeOut .25s cubic-bezier(0, 0, 0.2, 1)",
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
			},
			dark: {
				background: "#111",
				"elevate-1": "#222",
				"elevate-2": "#333",
				"foreground-1": "#aaa",
				"foreground-2": "#eee",
			},
			amoled: {
				background: "#000",
				"elevate-1": "#111",
				"elevate-2": "#222",
				"foreground-1": "#aaa",
				"foreground-2": "#eee",
			},
		}),
	],
};
