export default function HexToHSL(hex: string): [number, number, number] {
	// Remove # if present.
	hex = hex.replace(/^#/, "");

	// Expand 3 digit hex codes to 6 digits.
	if (hex.length === 3) {
		hex = hex
			.split("")
			.map((char) => char + char)
			.join("");
	}

	// Parse r, g, b values.
	const r = parseInt(hex.substring(0, 2), 16) / 255;
	const g = parseInt(hex.substring(2, 4), 16) / 255;
	const b = parseInt(hex.substring(4, 6), 16) / 255;

	// Find max and min values of r, g, b.
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const delta = max - min;

	// Calculate hue.
	let h: number;
	if (delta === 0) {
		h = 0;
	} else if (max === r) {
		h = ((g - b) / delta + (g < b ? 6 : 0)) * 60;
	} else if (max === g) {
		h = ((b - r) / delta + 2) * 60;
	} else {
		h = ((r - g) / delta + 4) * 60;
	}

	// Calculate lightness.
	const l = (max + min) / 2;

	// Calculate saturation.
	const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

	return [h, s * 100, l * 100];
}
