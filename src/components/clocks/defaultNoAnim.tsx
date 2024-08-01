export default function DefaultClockNoAnim({ time, meridiem }: { time: string; meridiem?: "AM" | "PM" }) {
	return (
		<div className="flex">
			<h1 className="font-number text-6xl md:text-9xl text-foreground-2">
				<div className="flex" style={{ perspective: 1000 }}>
					{time}
				</div>
			</h1>
			<p className="text-foreground-2 text-2xl font-bold p-1.5">{meridiem}</p>
		</div>
	);
}
