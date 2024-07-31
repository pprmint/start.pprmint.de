export default function DigitalClockNoAnim({ time }: { time: string }) {
	return (
		<h1 className="font-number text-6xl md:text-9xl text-foreground-2">
			<div className="flex" style={{ perspective: 1000 }}>
				{time}
			</div>
		</h1>
	);
}
