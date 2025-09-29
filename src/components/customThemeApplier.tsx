"use client";
import { ReactNode, useEffect, useState } from "react";
import { ApplyCustomTheme } from "./themeProvider";
import { useTheme } from "next-themes";

export default function CustomThemeApplier({ children }: { children: ReactNode }) {
	const { theme } = useTheme();
	const [wasCustom, setWasCustom] = useState(false);
	useEffect(() => {
		if (theme === "custom") {
			ApplyCustomTheme();
			setWasCustom(true);
		} else if (wasCustom) {
			location.reload();
		}
	}, [theme, wasCustom]);
	return children;
}
