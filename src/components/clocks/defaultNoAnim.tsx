export default function DefaultClockNoAnim({ time, meridiem, large }: { time: string; meridiem?: "AM" | "PM", large?: boolean }) {
  return (
    <div className="flex">
      <h1 className={`font-number ${large ? "text-7xl md:text-9xl lg:text-[11rem]" : "text-6xl md:text-9xl"} text-foreground-2 duration-700 ease-in-out`}>
        <div className="flex" style={{ perspective: 1000 }}>
          {time.split("").map((character, index) => character === ":" ? <span key={index} className="text-accent">:</span> : <span key={index}>{character}</span>)}
        </div>
      </h1>
      <p className="text-foreground-2 text-2xl font-bold p-1.5">{meridiem}</p>
    </div>
  );
}
