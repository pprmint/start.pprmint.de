"use client";
import { useMemo } from "react";
import { useTransition, a, easings, Globals } from "@react-spring/web";

export default function DefaultClock({ time, meridiem, large }: { time: string; meridiem?: "AM" | "PM", large?: boolean }) {
  // Disable transitions when tab is in background.
  document.addEventListener("visibilitychange", () => {
    Globals.assign({ skipAnimation: document.visibilityState !== "visible" });
  });

  const digits = useMemo(() => time.split(""), [time]);

  const transitions = useTransition(digits, {
    keys: digits.map((digit, index) => `${digit}-${index}`),
    from: { opacity: 0, transform: "translateY(-0.2em) rotateX(30deg)" },
    enter: {
      opacity: 1,
      transform: "translateY(0em) rotateX(0deg)",
      config: { duration: 300, easing: easings.easeOutBack },
    },
    leave: {
      opacity: 0,
      transform: "translateY(0.2em) rotateX(-30deg)",
      config: { duration: 150, easing: easings.easeInCirc },
    },
    exitBeforeEnter: true,
  });

  return (
    <div className="flex">
      <h1 className={`font-number ${large ? "text-7xl md:text-9xl lg:text-[11rem]" : "text-6xl md:text-9xl"} text-foreground-2 duration-700 ease-in-out`}>
        <div className="flex" style={{ perspective: 1000 }}>
          {transitions((style, item, index) => (
            <a.span key={`${item}-${index}`} style={style}>
              {item === ":" ? <span className="animate-pulse mx-1 text-accent">:</span> : item}
            </a.span>
          ))}
        </div>
      </h1>
      <p className="text-foreground-2 text-2xl font-bold p-1.5">{meridiem}</p>
    </div>
  );
}