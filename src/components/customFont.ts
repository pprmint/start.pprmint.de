export interface CustomFont {
	fontFamily: string;
	italic: boolean;
	weight: number;
	colon: number;
}

const fallback: CustomFont = { fontFamily: "", italic: false, weight: 400, colon: 0 };
export const customFontStyle: React.CSSProperties = {
	...(getCustomFont().fontFamily && { fontFamily: getCustomFont().fontFamily }),
	...(getCustomFont().fontFamily && { fontWeight: getCustomFont().weight }),
	...(getCustomFont().fontFamily && { fontStyle: getCustomFont().italic ? "italic" : "normal" }),
};
export const customColonStyle: React.CSSProperties = {
	...(getCustomFont().fontFamily && { transform: `translateY(-${getCustomFont().colon}em)` }),
};

export function getCustomFont(): CustomFont {
	try {
		const stored = localStorage.getItem("customFont");
		if (!stored) return fallback;

		const parsed: CustomFont = JSON.parse(stored);
		if (typeof parsed !== "object" || parsed === null) throw new Error("Invalid JSON structure.");

		return {
			fontFamily: typeof parsed.fontFamily === "string" ? parsed.fontFamily : fallback.fontFamily,
			italic: typeof parsed.italic === "boolean" ? parsed.italic : fallback.italic,
			weight: typeof parsed.weight === "number" ? parsed.weight : fallback.weight,
			colon: typeof parsed.colon === "number" ? parsed.colon : fallback.colon,
		};
	} catch {
		return fallback;
	}
}
