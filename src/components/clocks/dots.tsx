export default function DotsClock({ time, large }: { time: number[], large?: boolean }) {
  const rotateHour = 30 * time[0] + (time[1] / 60) * 30;
  const rotateMinute = time[2] ? 6 * time[1] + 360 * time[0] + 0.1 * time[2] : 6 * time[1] + 360 * time[0];
  const rotateSecond = 6 * time[2] + 360 * time[1] + 360 * time[0];

  return (
    <div className={`relative size-64 ${large && "lg:size-96"} rounded-full duration-700 ease-in-out`}>
      <div className="absolute inset-0">
        {[...Array(60)].map((_, index) => (
          <div
            className={`absolute inline-flex items-center justify-center top-0 left-1/2 size-3 origin-[6px_128px] ${large && "lg:origin-[6px_192px]"} duration-700 ease-in-out`}
            style={{
              transform: `translateX(-50%) rotate(${(index * 360) / 60}deg)`,
            }}
          >
            <div
              className={`rounded-full ${index % 5 === 0
                ? index === time[2]
                  ? "size-3 bg-foreground-2"
                  : index === (time[2] + 59) % 60 || index === (time[2] + 1) % 60
                    ? "size-2.5 bg-foreground-2"
                    : "size-2 bg-foreground-2"
                : index === time[2]
                  ? "size-2 bg-elevate-2"
                  : index === (time[2] + 59) % 60 || index === (time[2] + 1) % 60
                    ? "size-1.5 bg-elevate-2"
                    : "size-1 bg-elevate-2"
                }`}
            />
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
        <div className={`absolute bg-foreground-2 w-2 h-12 top-16 ${large && "lg:h-20 lg:top-24"} left-1/2 -translate-x-1/2 rounded-full duration-700 ease-in-out`} />
      </div>
      <div
        id="minute"
        className="absolute inset-0"
        style={{
          transform: `rotate(${rotateMinute}deg)`,
        }}
      >
        <div className={`absolute bg-foreground-2 w-2 h-24 top-4 ${large && "lg:h-[9.75rem] lg:top-5"} left-1/2 -translate-x-1/2 rounded-full duration-700 ease-in-out`} />
      </div>
      {time[2] !== undefined && time[2] !== null && (
        <div
          id="second"
          className="absolute inset-0"
          style={{
            transform: `rotate(${rotateSecond}deg)`,
          }}
        >
          <div className={`absolute bg-accent w-2 h-24 top-4 ${large && "lg:h-[9.75rem] lg:top-5"} left-1/2 -translate-x-1/2 rounded-full duration-700 ease-in-out`} />
        </div>
      )}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-4 bg-foreground-2 rounded-full" />
    </div>
  );
}
