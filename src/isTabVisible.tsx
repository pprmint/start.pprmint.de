"use client";
import { useState, useCallback, useEffect } from "react";

export default function isTabVisible() {
	const [isTabVisible, setIsTabVisible] = useState(true);

	const handleVisibilityChange = useCallback(() => {
		setIsTabVisible(document.visibilityState === "visible");
	}, []);

	useEffect(() => {
		document.addEventListener("visibilitychange", handleVisibilityChange);
		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, []);

	return isTabVisible;
}
