export default function SwissClock({ time }: { time: number[] }) {
	const rotateHour = 30 * time[0] + (time[1] / 60) * 30;
	const rotateMinute = 6 * time[1] + 360 * time[0] + 0.1 * time[2];
	const rotateSecond = 6 * time[2] + 360 * time[1] + 360 * time[0];

	return (
		<div className="relative size-64 rounded-full">
			<div className="absolute inset-0">
				{[...Array(60)].map((_, index) => (
					<div
						className="absolute inline-flex items-center justify-center top-0 left-1/2 size-2"
						style={{ transform: `translateX(-50%) rotate(${(index * 360) / 60}deg)`, transformOrigin: "4px 128px" }}
					>
						<div className={`${index % 5 === 0 ? "size-2  bg-foreground-2" : "size-1  bg-elevate-2"} rounded-full`} />
					</div>
				))}
			</div>
			<div
				id="hour"
				className="absolute inset-0"
				style={{
					transform: `rotate(${rotateHour}deg)`,
				}}
			>
				<div className="absolute bg-foreground-2 w-2 h-12 top-16 left-1/2 -translate-x-1/2 rounded-full" />
			</div>
			<div
				id="minute"
				className="absolute inset-0"
				style={{
					transform: `rotate(${rotateMinute}deg)`,
				}}
			>
				<div className="absolute bg-foreground-2 w-2 h-24 top-4 left-1/2 -translate-x-1/2 rounded-full" />
			</div>
			{time[2] !== undefined && time[2] !== null && (
				<div
					id="second"
					className="absolute inset-0"
					style={{
						transform: `rotate(${rotateSecond}deg)`,
					}}
				>
					<div className="absolute bg-accent w-2 h-24 top-4 left-1/2 -translate-x-1/2 rounded-full" />
				</div>
			)}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-4 bg-foreground-2 rounded-full" />
		</div>
	);
}
