"use client";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Engines } from "../../components/engines";
import * as Select from "@radix-ui/react-select";
import * as Switch from "@radix-ui/react-switch";
import Link from "next/link";
import Image from "next/image";
import Icon from "src/app/icon.svg";

function Page() {
	// Theme
	const { theme, setTheme } = useTheme();
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
					<path d="M3.162 2.193a.985.985 0 0 1 1.727.37c.456 1.537 1.397 3.28 2.832 4.716 1.438 1.437 3.185 2.379 4.718 2.821.367.093.65.386.73.756a1 1 0 0 1-.365.998l-.008.006c-2.705 1.962-6.514 1.729-8.95-.706s-2.668-6.246-.691-8.953zm9.025 8.875-.011-.003c-1.682-.484-3.592-1.509-5.162-3.079-1.563-1.564-2.587-3.464-3.086-5.148a5.905 5.905 0 0 0 .626 7.608c2.076 2.077 5.32 2.281 7.633.622"></path>
				</svg>
			),
		},
		{
			text: "amoled",
			icon: (
				<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
					<path d="M9.031 1.767a.5.5 0 0 1 .938 0l.341.923.923.341a.5.5 0 0 1 0 .938l-.923.341-.341.923a.5.5 0 0 1-.938 0L8.69 4.31l-.923-.341a.5.5 0 0 1 0-.938l.923-.341zM12.031 5.267a.5.5 0 0 1 .938 0l.206.558.558.206a.5.5 0 0 1 0 .938l-.558.206-.206.558a.5.5 0 0 1-.938 0l-.206-.558-.558-.206a.5.5 0 0 1 0-.938l.558-.206zM3.162 2.193a.985.985 0 0 1 1.727.37c.456 1.537 1.397 3.28 2.832 4.716 1.438 1.437 3.185 2.379 4.718 2.821.367.093.65.386.73.756a1 1 0 0 1-.365.998l-.008.006c-2.705 1.962-6.514 1.729-8.95-.706s-2.668-6.246-.691-8.953zm9.025 8.875-.011-.003c-1.682-.484-3.592-1.509-5.162-3.079-1.563-1.564-2.587-3.464-3.086-5.148a5.905 5.905 0 0 0 .626 7.608c2.076 2.077 5.32 2.281 7.633.622"></path>
				</svg>
			),
		},
		{
			text: "pink",
			icon: (
				<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
					<path d="M1.881 7.619a3.353 3.353 0 0 1 0-4.738 3.353 3.353 0 0 1 4.738 0l.881.881.881-.881a3.353 3.353 0 0 1 4.738 0 3.353 3.353 0 0 1 0 4.738L7.5 13.238zM7.5 11.823l4.912-4.911a2.35 2.35 0 0 0 0-3.324 2.35 2.35 0 0 0-3.324 0L7.5 5.177 5.912 3.588a2.35 2.35 0 0 0-3.324 0 2.35 2.35 0 0 0 0 3.324z"></path>
				</svg>
			),
		},
	];

	// Search engine
	const lsEngine = localStorage.getItem("engine");
	const [searchEngine, setSearchEngine] = useState(
		Engines.some((engine) => engine.name === lsEngine) ? lsEngine : "Inquest"
	);
	function handleEngineChange(engine: string) {
		setSearchEngine(engine);
		localStorage.setItem("engine", engine);
	}

	// 12/24 hr
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

	// Clock design
	const lsClock = localStorage.getItem("clock");
	const Clocks = [
		{
			name: "Default",
			preview: (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
					<g className="fill-foreground-2">
						<path
							d="M.293-.594v.514H.097V0h.48v-.08H.381V-.7H.317l-.239.133.04.07z"
							transform="translate(286.428 645.762)scale(302.1835)"
						/>
						<path
							d="M.497-.201c0 .08-.071.135-.173.135a.27.27 0 0 1-.202-.091L.06-.101a.36.36 0 0 0 .27.115c.149 0 .255-.084.255-.213 0-.082-.044-.141-.129-.166q.1-.04.101-.154c0-.12-.089-.195-.224-.195a.3.3 0 0 0-.25.123l.068.048a.22.22 0 0 1 .18-.091c.081 0 .14.045.14.113 0 .073-.069.123-.166.123H.236v.08H.31c.108 0 .187.029.187.117"
							transform="translate(488.288 645.762)scale(302.1835)"
						/>
						<path
							d="M.443-.596v.338H.161zm0 .418V0h.088v-.178h.087v-.08H.531V-.7H.434L.06-.253v.075z"
							transform="translate(755.418 645.762)scale(302.1835)"
						/>
						<path
							d="M.353-.404c-.037 0-.158-.025-.158-.12 0-.068.066-.11.14-.11.079 0 .137.05.137.111 0 .03-.025.119-.119.119m-.045.076q.023.001.026.002c.149.021.172.096.172.135 0 .078-.084.125-.173.125C.232-.067.162-.123.162-.192c0-.053.051-.136.146-.136m.028-.386c-.148 0-.227.098-.227.195 0 .06.03.118.09.155a.17.17 0 0 0-.125.169c0 .121.105.209.262.209.167 0 .258-.106.258-.211 0-.07-.041-.139-.125-.177.008 0 .091-.04.091-.148 0-.129-.116-.192-.224-.192"
							transform="translate(957.276 645.762)scale(302.1835)"
						/>
						<path
							d="M.097-.07c0-.26.385-.279.385-.438 0-.042-.016-.125-.148-.125-.097 0-.178.097-.179.099L.09-.586a.34.34 0 0 1 .26-.128c.117 0 .219.071.219.202 0 .233-.384.243-.384.432h.393V0H.097z"
							transform="translate(1224.403 645.762)scale(302.1835)"
						/>
						<path
							d="M.248 0h.088v-.016A.81.81 0 0 1 .59-.625V-.7H.078v.08h.41a.93.93 0 0 0-.24.62"
							transform="translate(1426.267 645.762)scale(302.1835)"
						/>
					</g>
					<g className="fill-foreground-1">
						<path
							d="M.05-.564a.058.058 0 1 0 .116 0 .058.058 0 0 0-.116 0m0 .436a.058.058 0 1 0 .116 0 .058.058 0 0 0-.116 0"
							transform="translate(1159.132 645.762)scale(302.1835)"
						/>
						<path
							d="M.05-.564a.058.058 0 1 0 .116 0 .058.058 0 0 0-.116 0m0 .436a.058.058 0 1 0 .116 0 .058.058 0 0 0-.116 0"
							transform="translate(690.146 645.762)scale(302.1835)"
						/>
					</g>
				</svg>
			),
		},
		{
			name: "Default (no animations)",
			preview: (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" className="fill-foreground-2">
					<path d="M374.97 466.267V621.59h-59.228v24.175H460.79V621.59h-59.228V434.235h-19.34L310 474.426l12.087 21.153zm263.505 118.759c0 24.174-21.455 40.795-52.278 40.795-23.872 0-44.119-9.368-61.041-27.499l-18.736 16.922c19.642 22.06 49.559 34.751 81.59 34.751 45.026 0 77.057-25.383 77.057-64.365 0-24.779-13.296-42.608-38.981-50.163 19.944-7.857 30.52-23.57 30.52-46.536 0-36.262-26.894-58.926-67.689-58.926-31.73 0-57.718 13.598-75.546 37.168l20.548 14.505c10.577-16.016 32.032-27.499 54.393-27.499 24.477 0 42.306 13.599 42.306 34.147 0 22.06-20.85 37.169-50.162 37.169h-20.851v24.175h22.362c32.636 0 56.508 8.763 56.508 35.356m66.783-109.694c0 9.67 7.857 17.527 17.527 17.527s17.526-7.857 17.526-17.527-7.856-17.526-17.526-17.526-17.527 7.856-17.527 17.526m0 131.753c0 9.67 7.857 17.527 17.527 17.527s17.526-7.857 17.526-17.527-7.856-17.527-17.526-17.527-17.527 7.857-17.527 17.527m184.031-141.423v102.139h-85.216zm0 126.314v53.789h26.592v-53.789h26.29v-24.175h-26.29V434.235h-29.312L773.552 569.312v22.664zm174.661-68.294c-11.181 0-47.746-7.555-47.746-36.262 0-20.549 19.945-33.241 42.306-33.241 23.873 0 41.4 15.11 41.4 33.543 0 9.066-7.555 35.96-35.96 35.96m-13.599 22.966c4.533 0 7.253.604 7.857.604 45.026 6.346 51.976 29.01 51.976 40.795 0 23.571-25.384 37.774-52.278 37.774-30.521-.303-51.674-17.225-51.674-38.076 0-16.016 15.412-41.097 44.119-41.097m8.462-116.643c-44.724 0-68.596 29.614-68.596 58.926 0 18.131 9.065 35.658 27.196 46.838-25.081 6.951-37.773 28.708-37.773 51.07 0 36.564 31.729 63.156 79.173 63.156 50.464 0 77.963-32.031 77.963-63.761 0-21.153-12.389-42.003-37.773-53.486 2.418 0 27.499-12.088 27.499-44.724 0-38.982-35.054-58.019-67.689-58.019m115.437 45.327c0 9.67 7.857 17.527 17.527 17.527s17.527-7.857 17.527-17.527-7.857-17.526-17.527-17.526-17.527 7.856-17.527 17.526m0 131.753c0 9.67 7.857 17.527 17.527 17.527s17.527-7.857 17.527-17.527-7.857-17.527-17.527-17.527-17.527 7.857-17.527 17.527m79.47 17.527c0-78.568 116.341-84.31 116.341-132.357 0-12.692-4.835-37.773-44.723-37.773-29.312 0-53.789 29.312-54.091 29.916l-19.642-15.714c22.361-26.592 51.975-38.679 78.568-38.679 35.355 0 66.178 21.455 66.178 61.041 0 70.409-116.039 73.431-116.039 130.544h118.759v24.175H1253.72zm247.49 21.153h26.593v-4.835c0-91.26 40.492-146.862 62.25-170.13 2.115-2.116 14.505-13.901 14.505-13.901v-22.664h-154.719v24.175h123.896c-61.646 64.063-71.618 146.258-72.525 187.355" />
				</svg>
			),
		},
		{
			name: "Playful",
			preview: (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
					<g className="fill-foreground-2">
						<path d="M354.718 640.908q-9.634-.83-14.311-6.39-4.678-5.56-3.899-14.591.804-9.333 6.337-13.709 5.534-4.376 15.168-3.546l30.408 2.621 11.702-135.782 21.978 1.894-46.265 23.007q-7.288 3.618-13.232 2.196-5.642-1.397-9.494-5.975t-4.864-10.428q-.685-6.125 2.216-11.638 2.928-5.813 9.914-9.458l44.028-21.683q6.66-3.369 13.19-5.233 6.831-1.837 13.154-1.293 9.032.778 13.735 6.037 5.03 4.983 4.2 14.617l-13.596 157.76 27.397 2.362q9.333.804 14.036 6.062 4.704 5.259 3.899 14.591-.805 9.333-6.364 14.011-5.533 4.376-14.866 3.571zm242.964 8.083q-15.968 1.233-32.819-1.103-16.572-2.661-29.158-8.661-8.159-3.613-11.614-9.105-3.177-5.817-3.016-11.587.462-5.794 4.053-10.315 3.569-4.821 9.501-6.492 6.234-1.694 14.045 1.341 12.192 4.817 22.924 6.413t21.276.783q12.05-.931 19.954-4.571 7.878-3.943 11.631-10.294t3.056-15.39q-.977-12.654-10.203-18.307t-26.098-4.35l-17.776 1.372q-9.942.767-15.738-3.634-5.517-4.726-6.191-13.464-.699-9.04 4.052-14.255 5.028-5.54 14.97-6.308l13.257-1.023q10.243-.791 16.941-4.339 6.975-3.872 10.45-9.899 3.776-6.05 3.125-14.486-.931-12.052-9.855-17.727-8.624-5.7-24.29-4.49a76 76 0 0 0-18.796 3.875q-9.177 2.83-19.581 9.392-6.373 3.826-12.19 3.063-5.818-.764-10.06-4.679a21.96 21.96 0 0 1-5.565-9.27q-1.346-5.654.623-11.565 2.27-5.934 8.92-10.084 12.374-8.532 27.136-13.612 15.063-5.103 30.73-6.312 22.899-1.767 39.703 3.906 16.804 5.675 26.542 17.955 9.714 11.979 11.109 30.057.954 12.352-3.076 22.969-4.03 10.616-12.209 18.521-7.9 7.581-20.021 11.547l-.303-3.917q21.67 1.965 34.815 15.195t14.796 34.622q1.466 18.98-7.083 33.886-8.571 14.603-26.067 23.531-17.195 8.904-41.9 10.811" />
						<path d="M898.559 648.761q-10.879-.099-17.169-6.201-5.988-6.1-5.882-17.582l.158-17.223-67.687-.622q-11.18-.103-17.783-4.998-6.602-5.199-6.507-15.472.056-6.044 2.834-12.364t9.813-15.625l79.309-113.2q5.207-7.507 11.588-11.377 6.382-3.87 14.54-3.795 9.67.089 15.356 6.185 5.99 5.797 5.882 17.581l-1.076 117.243 11.18.103q9.972.092 15.064 4.973 5.096 4.58 5.012 13.645-.08 8.763-5.261 13.551-4.88 4.79-15.153 4.696l-11.181-.103-.158 17.224q-.105 11.483-6.204 17.471-5.797 5.99-16.675 5.89m-22.555-77.871.764-83.098 8.763.081-65.232 93.989.106-11.483zm193.226 77.092q-25.128 3.594-44.103-1.017t-30.474-16.703q-11.541-12.391-14.28-31.536-2.14-14.957 2.174-27.48 4.612-12.564 14.355-21.285 9.741-8.72 22.946-12.44l1.113 7.777q-19.446-1.491-33.123-13.882-13.421-12.732-16.289-32.775-2.568-17.948 4.566-32.095 7.433-14.19 23.201-23.467 16.067-9.319 38.801-12.572 23.034-3.294 40.77 1.189t28.85 16.02 13.681 29.484q1.926 13.462-1.875 25.3-3.503 11.796-12.048 20.345-8.245 8.505-20.211 12.354l-1.027-7.179q21.069.039 36.028 12.856 15.26 12.775 18.426 34.911 2.74 19.145-4.864 34.275-7.648 14.83-24.568 24.578-16.922 9.747-42.049 13.342m-5.093-35.598q18.546-2.654 27.092-11.202t6.534-22.608-12.568-19.571q-10.6-5.81-29.146-3.156-18.548 2.654-27.092 11.202-8.589 8.25-6.577 22.309 2.011 14.06 12.611 19.87t29.146 3.156m-13.181-92.135q10.17-1.455 16.879-5.773 7.008-4.36 9.699-11.155 2.99-6.839 1.834-14.915-1.797-12.564-11.499-18.503-9.404-5.98-24.659-3.798-15.256 2.183-22.605 10.56t-5.552 20.942q1.798 12.564 11.244 18.844 9.402 5.98 24.659 3.798" />
						<path d="M1287.53 650.211q-11.128 1.096-17.044-3.485-5.644-4.91-6.651-15.135-.651-6.615 2.095-12.655 2.745-6.04 7.868-12.617l50.678-65.108q11.299-14.775 15.677-25.834 4.678-11.088 3.642-21.613-1.302-13.233-10.704-19.291-9.1-6.089-25.34-4.491-8.721.858-17.778 4.482-8.786 3.294-18.147 9.984-6.26 4.26-12.064 3.92-5.532-.67-9.826-4.195-4.323-3.826-6.089-9.421-1.764-5.595.079-11.546 1.844-5.95 8.075-10.511 12.434-9.422 27.687-14.87 15.224-5.75 30.561-7.259 23.758-2.337 40.707 3.282 16.92 5.32 26.673 18.023 9.752 12.705 11.675 32.252a79.7 79.7 0 0 1-1.483 25.045q-2.726 12.414-9.933 25.573-6.936 12.828-19.108 27.993l-47.36 58.709-1.184-12.029 81.498-8.019q9.624-.947 14.909 3.391 5.586 4.309 6.503 13.631.918 9.323-3.692 14.939-4.338 5.285-13.961 6.232zm177.29-5.941q-8.721-.86-13.748-5.303-4.998-4.744-5.248-11.449-.25-6.706 5.063-14.38l102.809-152.616-1.424 14.435-90.819-8.959q-9.924-.979-14.562-6.294-4.608-5.618-3.688-14.94t6.506-13.629q5.617-4.608 15.541-3.63l114.576 11.302q9.623.95 15.134 6.655 5.81 5.736 4.891 15.058-.8 8.12-3.8 13.897-2.698 5.806-6.989 12.367l-96.295 145.06q-4.981 7.404-11.652 10.39-6.671 2.985-16.295 2.036" />
					</g>
					<g className="fill-foreground-1">
						<path d="M1189.96 615.697q-12.087 0-19.34-7.252-6.95-7.252-6.95-18.736 0-11.18 6.95-18.131 7.253-7.252 19.34-7.252t18.735 7.252q6.951 6.951 6.951 18.131 0 11.484-6.951 18.736-6.648 7.252-18.735 7.252m0-100.023q-12.087 0-19.34-7.252-6.95-7.253-6.95-18.434 0-11.482 6.95-18.433 7.253-7.252 19.34-7.252t18.735 7.252q6.951 6.95 6.951 18.433 0 11.181-6.951 18.434-6.648 7.252-18.735 7.252" />
						<path d="M730.642 615.697q-12.088 0-19.34-7.252-6.951-7.252-6.951-18.736 0-11.18 6.951-18.131 7.252-7.252 19.34-7.252 12.087 0 18.735 7.252 6.95 6.951 6.95 18.131 0 11.484-6.95 18.736-6.648 7.252-18.735 7.252m0-100.023q-12.088 0-19.34-7.252-6.951-7.253-6.951-18.434 0-11.482 6.951-18.433 7.252-7.252 19.34-7.252 12.087 0 18.735 7.252 6.95 6.95 6.95 18.433 0 11.181-6.95 18.434-6.648 7.252-18.735 7.252" />
					</g>
				</svg>
			),
		},
		{
			name: "Swiss station clock",
			preview: (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
					<g className="fill-foreground-2">
						<path d="m1020.8 550.472-4.949 15.216-304.998-99.206 4.949-15.215z" />
						<path d="m915.582 586.273-13.98-19.149 192.688-140.679 13.981 19.149z" />
						<path d="M950.4 242.4h19.2v76.8h-19.2zm166.71 44.671-38.4 66.511-16.628-9.6 38.4-66.511zm105.42 112.443-66.511 38.4-9.6-16.628 66.511-38.4zM1257.6 549.6h-76.8v-19.2h76.8zm-44.67 147.514-66.511-38.4 9.6-16.628 66.511 38.4zm-112.44 105.415-38.4-66.511 16.628-9.6 38.4 66.511zM950.4 760.8h19.2v76.8h-19.2zm-92.486-24.782-38.4 66.511-16.628-9.6 38.4-66.511zm-84.332-77.304-66.511 38.4-9.6-16.628 66.511-38.4zM739.2 549.6h-76.8v-19.2h76.8zm17.6-115.832-59.329-34.254 9.6-16.628L766.4 417.14zm80.34-87.368-34.254-59.329 16.628-9.6 34.254 59.329zm157.15-102.035-2.341 22.277-6.365-.669 2.341-22.277zm30.72 5.204-4.658 21.91-6.26-1.331 4.657-21.91zm30 8.385-6.922 21.304-6.087-1.978 6.922-21.303zm28.96 11.476-9.111 20.464-5.846-2.603 9.11-20.464zm53.54 31.687-13.167 18.122-5.177-3.761 13.166-18.122zm24 19.864-14.988 16.647-4.756-4.283 14.988-16.646zm21.79 22.264-16.646 14.988-4.283-4.756 16.647-14.988zm19.34 24.419-18.122 13.166-3.761-5.177 18.122-13.167zm30.53 54.215-20.464 9.11-2.603-5.846 20.464-9.111zm10.85 29.201-21.303 6.922-1.978-6.087 21.304-6.922zm7.74 30.176-21.91 4.657-1.331-6.26 21.91-4.658zm4.54 30.819-22.277 2.341-.669-6.365 22.277-2.341zm-.67 62.215-22.277-2.341.669-6.365 22.277 2.341zm-5.2 30.715-21.91-4.658 1.331-6.26 21.91 4.657zm-8.38 30.002-21.304-6.922 1.978-6.087 21.303 6.922zm-11.48 28.961-20.464-9.111 2.603-5.846 20.464 9.11zm-31.69 53.546-18.122-13.167 3.761-5.177 18.122 13.166zm-19.86 23.997-16.647-14.988 4.283-4.756 16.646 14.988zm-22.26 21.79-14.988-16.646 4.756-4.283 14.988 16.647zm-24.42 19.343-13.166-18.122 5.177-3.761 13.167 18.122zm-54.22 30.529-9.11-20.464 5.846-2.603 9.111 20.464zm-29.2 10.85-6.922-21.303 6.087-1.978 6.922 21.304zm-30.18 7.739-4.657-21.91 6.26-1.331 4.658 21.91zm-30.815 4.542-2.341-22.277 6.365-.669 2.341 22.277zm-53.509-22.277-2.341 22.277-6.365-.669 2.341-22.277zm-28.503-4.175-4.657 21.91-6.261-1.331 4.658-21.91zm-27.911-7.132-6.922 21.303-6.087-1.977 6.922-21.304zm-27.013-10.011-9.11 20.464-5.847-2.603 9.111-20.464zm-50.159-28.187-13.166 18.122-5.178-3.761 13.167-18.122zm-22.597-17.867-14.988 16.646-4.756-4.282 14.988-16.647zm-20.605-20.132-16.647 14.988-4.282-4.756 16.646-14.988zm-18.389-22.176-18.122 13.167-3.761-5.178 18.122-13.166zm-29.345-49.49-20.464 9.111-2.603-5.847 20.464-9.11zm-10.636-26.772-21.304 6.922-1.977-6.087 21.303-6.922zm-7.779-27.738-21.91 4.658-1.331-6.261 21.91-4.657zm-4.837-28.398-22.277 2.341-.669-6.365 22.277-2.341zm-.669-57.533-22.277-2.341.669-6.365 22.277 2.341zm4.175-28.503-21.91-4.657 1.331-6.261 21.91 4.658zm7.132-27.911-21.303-6.922 1.977-6.087 21.304 6.922zm10.011-27.013-20.464-9.11 2.603-5.847 20.464 9.111zm28.187-50.159-18.122-13.166 3.761-5.178 18.122 13.167zm17.867-22.597-16.646-14.988 4.282-4.756 16.647 14.988zm20.132-20.605-14.988-16.647 4.756-4.282 14.988 16.646zm22.176-18.389-13.167-18.122 5.178-3.761 13.166 18.122zm49.49-29.345-9.111-20.464 5.847-2.603 9.11 20.464zm26.772-10.636-6.922-21.304 6.087-1.977 6.922 21.303zm27.738-7.779-4.658-21.91 6.261-1.331 4.657 21.91zm28.398-4.837-2.341-22.277 6.365-.669 2.341 22.277z" />
					</g>
					<circle cx="960" cy="540" r="320" className="stroke-[5px] stroke-elevate-2 fill-none" />
					<g className="fill-red">
						<path d="m987.171 731.791-47.86-272.631 12.607-2.213 47.86 272.63z" />
						<path d="M997.625 754.323c-13.047 2.29-25.498-6.443-27.789-19.489-2.29-13.047 6.443-25.498 19.489-27.788 13.046-2.291 25.498 6.442 27.788 19.488 2.291 13.047-6.442 25.498-19.488 27.789" />
					</g>
				</svg>
			),
		},
		{
			name: "German station clock",
			preview: (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
					<g className="fill-foreground-2">
						<path d="m963.694 527.751-7.388 22.715-266.094-86.552L697.6 441.2z" />
						<path d="m971.612 552.794-21.055-28.839L1090.753 421.6l21.055 28.839zM948.8 242.4h22.4v86.4h-22.4zM1257.6 551.2h-86.4v-22.4h86.4zM948.8 751.2h22.4v86.4h-22.4zM662.4 528.8h86.4v22.4h-86.4zM1118.5 287.871l-34.253 59.329-19.399-11.2 34.254-59.329zM1223.33 400.899l-59.329 34.254-11.2-19.399 59.329-34.253z" />
						<path d="M948.8 751.2h22.4v86.4h-22.4zM662.4 528.8h86.4v22.4h-86.4zM1212.13 698.499l-59.329-34.253 11.2-19.399 59.329 34.254zM1099.1 803.329 1064.846 744l19.399-11.2 34.253 59.329zM855.153 744l-34.254 59.329-19.398-11.2 34.253-59.329zM767.2 664.246l-59.329 34.253-11.2-19.398L756 644.847zM756 435.153l-59.329-34.254 11.2-19.398 59.329 34.253zM835.754 347.2l-34.253-59.329 19.398-11.2L855.153 336zM997.473 244.699l-2.676 25.46-12.73-1.338 2.676-25.46zM1255.3 577.473l-25.46-2.676 1.338-12.73 25.46 2.676zM922.527 835.301l2.676-25.46 12.73 1.338-2.676 25.46zM664.699 502.527l25.46 2.676-1.338 12.73-25.46-2.676zM1028.13 250.234l-5.323 25.04-12.52-2.661 5.322-25.04zM1249.77 608.135l-25.04-5.323 2.661-12.52 25.04 5.322zM891.865 829.766l5.323-25.04 12.52 2.661-5.322 25.04zM670.234 471.865l25.04 5.323-2.661 12.52-25.04-5.322zM1058.05 258.943l-7.911 24.347-12.173-3.955 7.911-24.347zM1241.06 638.05l-24.347-7.911 3.955-12.173 24.347 7.911zM861.95 821.057l7.911-24.347 12.173 3.955-7.911 24.347zM678.943 441.95l24.347 7.911-3.955 12.173-24.347-7.911zM1086.89 270.732l-10.413 23.387-11.693-5.206 10.412-23.387zM1229.27 666.892l-23.387-10.413 5.206-11.693 23.387 10.412zM833.108 809.268l10.413-23.387 11.693 5.206-10.412 23.387zM690.732 413.108l23.387 10.413-5.206 11.693-23.387-10.412zM1140.1 302.998l-15.048 20.711-10.355-7.523 15.047-20.711zM1197 720.103l-20.711-15.048 7.523-10.355 20.711 15.047zM779.897 777.002l15.048-20.711 10.355 7.523-15.047 20.711zM722.998 359.897l20.711 15.048-7.523 10.355-20.711-15.047zM1163.89 323.123l-17.129 19.024-9.513-8.565 17.13-19.024zM1176.88 743.889l-19.024-17.129 8.565-9.513 19.024 17.13zM756.111 756.877l17.129-19.024 9.513 8.565-17.13 19.024zM743.123 336.111l19.024 17.129-8.565 9.513-19.024-17.13zM1185.44 345.623l-19.024 17.13-8.565-9.513 19.024-17.129zM1154.38 765.442l-17.13-19.024 9.513-8.565 17.129 19.024zM734.558 734.377l19.024-17.13 8.565 9.513-19.024 17.129zM765.623 314.558l17.13 19.024-9.513 8.565-17.129-19.024zM1204.53 370.253l-20.711 15.047-7.523-10.355 20.711-15.048zM1129.75 784.525l-15.047-20.711 10.355-7.523 15.048 20.711zM715.475 709.747l20.711-15.047 7.523 10.355-20.711 15.048zM790.253 295.475l15.047 20.711-10.355 7.523-15.048-20.711zM1234.47 424.802l-23.387 10.412-5.206-11.693 23.387-10.413zM1075.2 814.474l-10.412-23.387 11.693-5.206 10.413 23.387zM685.526 655.198l23.387-10.412 5.206 11.693-23.387 10.413zM844.802 265.526l10.412 23.387-11.693 5.206-10.413-23.387zM1245.01 454.123l-24.347 7.911-3.955-12.173 24.347-7.911zM1045.88 825.012l-7.911-24.347 12.173-3.955 7.911 24.347zM674.988 625.877l24.347-7.911 3.955 12.173-24.347 7.911zM874.123 254.988l7.911 24.347-12.173 3.955-7.911-24.347zM1252.43 484.386l-25.04 5.322-2.661-12.52 25.04-5.323zM1015.61 832.427l-5.322-25.04 12.52-2.661 5.323 25.04zM667.573 595.614l25.04-5.322 2.661 12.52-25.04 5.323zM904.386 247.573l5.322 25.04-12.52 2.661-5.323-25.04zM1256.64 515.257l-25.46 2.676-1.338-12.73 25.46-2.676zM984.743 836.639l-2.676-25.46 12.73-1.338 2.676 25.46zM663.361 564.743l25.46-2.676 1.338 12.73-25.46 2.676zM935.257 243.361l2.676 25.46-12.73 1.338-2.676-25.46z" />
					</g>
					<circle cx="960" cy="540" r="320" className="stroke-[5px] stroke-elevate-2 fill-none" />
					<path
						d="m980.621 694.48-26.527-151.106 12.608-2.213 26.526 151.106c13.876.547 25.993 10.691 28.491 24.919 2.497 14.229-5.44 27.893-18.299 33.134l14.372 81.867-12.608 2.213-14.371-81.867c-13.876-.547-25.993-10.691-28.491-24.919-2.497-14.229 5.44-27.893 18.299-33.134m14.528 45.739c9.834-1.727 16.417-11.113 14.69-20.947-1.726-9.835-11.112-16.417-20.947-14.691s-16.417 11.113-14.69 20.947c1.726 9.835 11.112 16.417 20.947 14.691"
						className="fill-red"
					/>
					<circle cx="960" cy="540" r="32" className="fill-foreground-2" />
				</svg>
			),
		},
		{
			name: "None",
			preview: (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
					<path d="M0 1080 1920 0" className="stroke-[10px] stroke-elevate-2" />
				</svg>
			),
		},
	];
	const [clock, setClock] = useState(Clocks.some((clock) => clock.name === lsClock) ? lsClock : "Default");
	function handleClockChange(clock: string) {
		setClock(clock);
		localStorage.setItem("clock", clock);
	}

	// Hide seconds
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

	// Increase time check frequency
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
	return (
		<>
			<main>
				<section className="border-b border-elevate-2">
					<Link href="/" className="flex gap-3 items-center text-foreground-2 p-3">
						<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
							<path d="M9.043 3h1.414l-4.5 4.5 4.5 4.5H9.043l-4.5-4.5z"></path>
						</svg>
						Back to start page
					</Link>
					<div className="relative w-full max-w-3xl px-6 xl:px-0 mx-auto pb-6 md:pb-9 overflow-clip">
						<h1 className="text-2xl md:text-4xl text-foreground-2 font-bold">Settings</h1>
						<h2 className="text-xl">Change the look and feel of your start page.</h2>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="15"
							height="15"
							viewBox="0 0 15 15"
							className="fill-elevate-1 absolute right-0 -bottom-24 size-48 animate-spin -z-10"
							style={{ animationDuration: "15s" }}
						>
							<path d="m9.483 1.531.145 1.361q.42.195.798.461l1.571-.697.243.251a6.6 6.6 0 0 1 1.607 2.785l.096.336-1.389 1.011a5 5 0 0 1 0 .922l1.389 1.011-.096.336a6.6 6.6 0 0 1-1.607 2.785l-.243.251-1.571-.698a5 5 0 0 1-.798.461l-.182 1.709-.338.085a6.6 6.6 0 0 1-3.216 0l-.338-.085-.182-1.708a5 5 0 0 1-.798-.461l-1.571.697-.243-.251a6.6 6.6 0 0 1-1.607-2.785l-.096-.336 1.389-1.011a5 5 0 0 1 0-.922L1.057 6.028l.096-.336A6.6 6.6 0 0 1 2.76 2.907l.243-.251 1.571.698q.378-.267.798-.461l.182-1.709.338-.085a6.6 6.6 0 0 1 3.216 0l.338.085zm-.956.464a5.6 5.6 0 0 0-2.054 0l-.17 1.598-.283.11c-.385.15-.745.358-1.068.617l-.237.19-1.469-.652a5.6 5.6 0 0 0-1.027 1.779l1.299.946-.046.301a4 4 0 0 0 0 1.232l.046.301-1.299.946c.23.651.578 1.254 1.027 1.779l1.469-.652.237.19c.323.259.683.467 1.068.617l.283.11.17 1.598a5.6 5.6 0 0 0 2.054 0l.17-1.598.283-.11c.385-.15.745-.358 1.068-.617l.237-.19 1.469.652a5.6 5.6 0 0 0 1.027-1.779l-1.299-.946.046-.301a4 4 0 0 0 0-1.232l-.046-.301 1.299-.946a5.6 5.6 0 0 0-1.027-1.779l-1.469.652-.237-.19a4 4 0 0 0-1.068-.617l-.283-.11z"></path>
							<path d="M7.5 5.4a2.101 2.101 0 0 1 0 4.2 2.101 2.101 0 0 1 0-4.2m0 1a1.1 1.1 0 1 0 .001 2.201A1.1 1.1 0 0 0 7.5 6.4"></path>
						</svg>
					</div>
				</section>
				<section className="max-w-3xl px-6 xl:px-0 mx-auto mt-12 flex flex-col gap-6">
					<fieldset className="bg-background border border-elevate-2 rounded-xl flex flex-col gap-2 p-5">
						<label className="text-foreground-2 font-medium text-lg" htmlFor="theme">
							Theme
						</label>
						<Select.Root value={theme} defaultValue="theme" onValueChange={(value: string) => setTheme(value)}>
							<Select.Trigger
								className="group capitalize relative inline-flex items-center justify-between w-full sm:w-56 px-3 py-2 overflow-clip ease-in-out outline-none hover:bg-elevate-1 border border-elevate-2 rounded-lg duration-100 hover:text-foreground-2"
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
								<Select.Content className="capitalize data-[state=open]:animate-select-open data-[state=closed]:animate-select-close overflow-hidden bg-background text-foreground-2 rounded-lg shadow-xl border border-elevate-2">
									<Select.Viewport className="p-1 flex flex-col">
										{Themes.map((theme, index) => (
											<Select.Item
												key={index}
												value={theme.text}
												className="relative px-2 h-8 inline-flex items-center rounded-md hover:bg-elevate-1 cursor-pointer select-none outline-none duration-100"
											>
												<Select.ItemText asChild>
													<div className="flex gap-3 items-center">
														{theme.icon}
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
									</Select.Viewport>
								</Select.Content>
							</Select.Portal>
						</Select.Root>
					</fieldset>
					<fieldset className="bg-background border border-elevate-2 rounded-xl flex flex-col gap-2 p-5">
						<label className="text-foreground-2 font-medium text-lg" htmlFor="engine">
							Search engine
						</label>
						<Select.Root
							value={searchEngine || undefined}
							defaultValue="Inquest"
							onValueChange={(value: string) => handleEngineChange(value)}
						>
							<Select.Trigger
								className="group capitalize relative inline-flex items-center justify-between w-full sm:w-56 px-3 py-2 overflow-clip ease-in-out outline-none hover:bg-elevate-1 border border-elevate-2 rounded-lg duration-100 hover:text-foreground-2"
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
								<Select.Content className="capitalize data-[state=open]:animate-select-open data-[state=closed]:animate-select-close overflow-hidden bg-background text-foreground-2 rounded-lg shadow-xl border border-elevate-2">
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
							{searchEngine === "Google" ? (
								<p>I think this one needs no introduction.</p>
							) : searchEngine === "DuckDuckGo" ? (
								<p>
									A private search engine that allows you to search on other sites or engines with so-called{" "}
									<Link
										href="https://duckduckgo.com/bangs"
										target="_blank"
										rel="noopener noreferrer"
										className="text-foreground-2 underline decoration-dotted"
									>
										Bangs
									</Link>
									, by prefixing them with <span className="bg-elevate-2 text-foreground-2 px-0.5 rounded-sm">!</span>.
									They also offer an email relay and browser extensions.
								</p>
							) : searchEngine === "Bing" ? (
								<p>
									The search engine Microsoft desperately wants you to use. You can even earn rewards by using it,
									apparently.
								</p>
							) : (
								<p>
									My personal{" "}
									<Link
										href="https://docs.searxng.org/"
										target="_blank"
										rel="noopener noreferrer"
										className="text-foreground-2 underline decoration-dotted"
									>
										SearXNG
									</Link>{" "}
									instance that aggregates results from different engines. You can also search on other sites or engines
									with DuckDuckGo's Bangs by prefixing them with{" "}
									<span className="bg-elevate-2 text-foreground-2 px-0.5 rounded-sm">!!</span>.{" "}
									<Link
										href="https://inquest.fyi/info/en/search-syntax"
										target="_blank"
										rel="noopener noreferrer"
										className="text-foreground-2 underline decoration-dotted"
									>
										Search syntax here
									</Link>
									.
								</p>
							)}
						</div>
					</fieldset>
					<fieldset className="relative w-full bg-background border border-elevate-2 rounded-xl flex flex-col gap-2 p-5">
						<div className="flex justify-between">
							<label className="text-foreground-2 font-medium text-lg" htmlFor="clock">
								Clock
							</label>
							<button
								aria-label="Time format"
								className="group relative h-8 w-[85px] hover:text-foreground-2 border border-elevate-2 rounded-full hover:bg-elevate-1 duration-100"
								onClick={handleUse12hrChange}
							>
								<div
									className={`absolute top-1 bottom-1 inline-flex justify-center items-center bg-foreground-2 text-background text-xs font-medium w-[38px] group-active:w-[42px] ${
										use12hr ? "left-[41px] group-active:left-[37px]" : "left-1"
									} rounded-full duration-200 ease-out`}
								/>
								<div className="absolute inset-0 flex items-center text-xs px-1">
									<span className={`w-full text-center ${!use12hr && "font-bold text-background"} duration-100`}>24h</span>
									<span className={`w-full text-center ${use12hr && "font-bold text-background"} duration-100`}>12h</span>
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
										className={`w-full h-auto ${
											item.name === clock
												? "ring-2 ring-foreground-2"
												: "ring-1 ring-elevate-2 group-hover:bg-elevate-1 group-active:ring-inset"
										} duration-100 rounded-md overflow-clip`}
									>
										{item.preview}
									</div>
									<p
										className={`duration-100 ${
											item.name === clock ? "text-foreground-2 font-medium" : "group-hover:text-foreground-2"
										}`}
									>
										{item.name}
									</p>
								</button>
							))}
						</div>
					</fieldset>
					<fieldset className="bg-background border border-elevate-2 rounded-xl flex flex-col gap-2 p-5">
						<div>
							<label className="text-foreground-2 font-medium text-lg" htmlFor="hideSec">
								Hide seconds
							</label>
							<p className="text-sm">Hide the seconds in digital clocks and the second hand in analog clocks.</p>
						</div>
						<Switch.Root
							className="group relative w-14 h-8 bg-transparent data-[state=checked]:bg-foreground-2 data-[state=unchecked]:hover:bg-elevate-1 outline-none rounded-full border data-[state=unchecked]:border-elevate-2 data-[state=checked]:border-foreground-2 duration-100"
							id="hideSec"
							checked={hideSec}
							onCheckedChange={handleHideSecChange}
						>
							<Switch.Thumb className="relative block size-5 group-active:w-6 data-[state=unchecked]:bg-foreground-2 data-[state=checked]:bg-background rounded-full duration-200 ease-out translate-x-1 data-[state=checked]:translate-x-7 data-[state=checked]:group-active:translate-x-6">
								<div className="absolute top-1.5 group-data-[state=unchecked]:left-1.5 group-data-[state=unchecked]:group-active:left-2 group-data-[state=checked]:left-2.5 group-data-[state=checked]:group-active:left-3 size-2 group-data-[state=checked]:w-0 rounded-full group-data-[state=unchecked]:ring-2 group-data-[state=checked]:ring-1 group-data-[state=unchecked]:ring-background group-data-[state=checked]:ring-foreground-2 duration-200 ease-out" />
							</Switch.Thumb>
						</Switch.Root>
					</fieldset>
					<div className="flex gap-3 items-center text-yellow-950 font-medium bg-yellow px-3 py-1 rounded-full w-max mt-9">
						<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
							<path d="M6.8 5.5a.7.7 0 0 1 1.4 0s-.108 1.619-.153 2.8c-.025.672-.025 1.2-.025 1.2a.522.522 0 0 1-1.044 0s0-.528-.025-1.2A121 121 0 0 0 6.8 5.5"></path>
							<circle cx="7.5" cy="11.5" r=".75"></circle>
							<path d="M1.503 14.008a1.501 1.501 0 0 1-1.291-2.264L6.209 1.608a1.5 1.5 0 0 1 2.582 0l5.997 10.136a1.501 1.501 0 0 1-1.291 2.264zm0-1h11.994a.5.5 0 0 0 .43-.755L7.93 2.117a.5.5 0 0 0-.86 0L1.073 12.253a.502.502 0 0 0 .43.755"></path>
						</svg>
						Experimental settings
					</div>
					<fieldset className="bg-background border border-elevate-2 rounded-xl flex flex-col gap-2 p-5">
						<div>
							<label className="text-foreground-2 font-medium text-lg" htmlFor="incrTimeCheckFreq">
								Increase time check frequency
							</label>
							<p className="text-sm">
								By default, the current system time is checked every 1000 ms. If the seconds seem a little slow and/or
								the clocks occasionally skip a whole second, enable this option to check every 250 ms instead. This may
								improve the accuracy of the clocks.
							</p>
						</div>
						<Switch.Root
							className="group relative w-14 h-8 bg-transparent data-[state=checked]:bg-foreground-2 data-[state=unchecked]:hover:bg-elevate-1 outline-none rounded-full border data-[state=unchecked]:border-elevate-2 data-[state=checked]:border-foreground-2 duration-100"
							id="incrTimeCheckFreq"
							checked={timeCheckFreq}
							onCheckedChange={handleChangeTimeCheckFreq}
						>
							<Switch.Thumb className="relative block size-5 group-active:w-6 data-[state=unchecked]:bg-foreground-2 data-[state=checked]:bg-background rounded-full duration-200 ease-out translate-x-1 data-[state=checked]:translate-x-7 data-[state=checked]:group-active:translate-x-6">
								<div className="absolute top-1.5 group-data-[state=unchecked]:left-1.5 group-data-[state=unchecked]:group-active:left-2 group-data-[state=checked]:left-2.5 group-data-[state=checked]:group-active:left-3 size-2 group-data-[state=checked]:w-0 rounded-full group-data-[state=unchecked]:ring-2 group-data-[state=checked]:ring-1 group-data-[state=unchecked]:ring-background group-data-[state=checked]:ring-foreground-2 duration-200 ease-out" />
							</Switch.Thumb>
						</Switch.Root>
					</fieldset>
					<fieldset className="relative bg-background border border-elevate-2 rounded-xl flex flex-col gap-2 overflow-clip pointer-events-none">
						<div className="p-5 opacity-25">
							<div className="mb-2">
								<label className="text-foreground-2 font-medium text-lg" htmlFor="hideSec">
									Use local font
								</label>
								<p className="text-sm">
									Override the font used for certain clocks with one that's installed locally on your system. Leave this
									field empty to use the default fonts.
								</p>
								<p className="text-sm">The font should support tabular numbers or be monospaced for best results.</p>
							</div>
							<div className="flex flex-col md:flex-row justify-between">
								<input
									type="text"
									className="group inline-flex items-center w-full sm:w-72 px-3 py-2 overflow-clip ease-in-out outline-none bg-transparent hover:bg-elevate-1 focus:bg-transparent border border-elevate-2 rounded-lg duration-100 hover:text-foreground-2"
									id="customFont"
									placeholder="sans-serif"
								/>
								<p
									className="text-4xl text-foreground-2 leading-none"
									style={{
										fontFamily: "sans-serif",
										fontVariantNumeric: "tabular-nums",
									}}
								>
									12∶45∶30
								</p>
							</div>
						</div>
						<div className="bg-elevate-1 flex justify-end p-3 text-sm border-t border-elevate-2 opacity-25">
							<button className="bg-foreground-2 text-background px-2 py-1 rounded-md">Apply</button>
						</div>
						<p className="absolute text-7xl font-bold text-foreground-2 -rotate-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
							soon™
						</p>
					</fieldset>
				</section>
			</main>
			<footer className="flex items-end justify-between p-6 mt-24 text-sm">
				<p>
					Made by{" "}
					<Link className="group text-foreground-2" href="https://pprmint.de" target="_blank" rel="noopener noreferrer">
						pprmint<span className="text-green">.</span>
						<span className="opacity-0 group-hover:opacity-100 duration-200">de</span>
					</Link>
				</p>
				<Image src={Icon} alt="Logo" />
			</footer>
		</>
	);
}

export default dynamic(() => Promise.resolve(Page), {
	ssr: false,
});
