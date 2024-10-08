"use client";
import { useMemo } from "react";
import { useTransition, a, easings, Globals } from "@react-spring/web";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  weight: "800",
  subsets: ["latin"],
  display: "swap",
});

export default function PlayfulClock({ time, meridiem, large }: { time: string; meridiem?: "am" | "pm", large?: boolean }) {
  // Disable transitions when tab is in background.
  document.addEventListener("visibilitychange", () => {
    Globals.assign({ skipAnimation: document.visibilityState !== "visible" });
  });

  const digits = useMemo(() => time.split(""), [time]);

  // Function to generate a random number within a range
  function DBWagenreihung(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Generate random rotations for each digit
  function generateRandomRotations(digits: string[], min: number, max: number) {
    return digits.map(() => DBWagenreihung(min, max));
  }
  const rotations = generateRandomRotations(digits, -6, 6);

  const transitions = useTransition(digits, {
    keys: digits.map((digit, index) => `${digit}-${index}`),
    from: { transform: `translateY(0.2em) rotateZ(0deg)` },
    enter: (_, index) => ({
      transform: `translateY(0em) rotateZ(${rotations[index]}deg)`,
      config: { duration: 400, easing: easings.easeOutBack },
    }),
    leave: {
      transform: `translateY(0.2em) rotateZ(0deg)`,
      config: { duration: 200, easing: easings.easeInCubic },
    },
    exitBeforeEnter: true,
  });

  return (
    <div className={`flex items-start ${nunito.className}`}>
      <h1 className={`${large ? "text-7xl md:text-9xl lg:text-[11rem]" : "text-6xl md:text-9xl"} text-foreground-2 tracking-wide duration-700 ease-in-out`}>
        <div className="flex" style={{ perspective: 1000 }}>
          {transitions((style, item, index) => (
            <a.span key={`${item}-${index}`} style={style}>
              {item === ":" ? <p className="animate-pulse mx-1 text-accent -translate-y-3">:</p> : item}
            </a.span>
          ))}
        </div>
      </h1>
      <p className="text-foreground-2 text-2xl font-bold p-2">{meridiem}</p>
    </div>
  );
}
