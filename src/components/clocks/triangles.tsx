import { useMemo } from "react";

export default function TrianglesClock({ time, meridiem, large }: { time: string; meridiem?: "AM" | "PM", large?: boolean }) {
  const digits = useMemo(() => time.split(""), [time]);
  return (
    <div className={`relative flex items-baseline ${large ? "text-6xl md:text-8xl lg:text-[9rem]" : "text-5xl md:text-8xl"}  duration-700 ease-in-out`}>
      <h1 className="absolute -z-10 font-triangles text-elevate-1">
        **:**{time.length > 5 && ":**"}
      </h1>
      <h1 className="font-triangles text-foreground-2">
        <div className="flex">
          {digits.map((item, index) =>
            item === ":" ? (
              <span className="text-accent animate-pulse">:</span>
            ) : (
              <span key={index}>{item}</span>
            )
          )}
        </div>
      </h1>
      <p className="text-foreground-2 text-2xl font-bold p-1.5">{meridiem}</p>
    </div>
  );
}
