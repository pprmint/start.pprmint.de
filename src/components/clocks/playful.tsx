"use client";
import { useMemo, useEffect, useState } from "react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  weight: "800",
  subsets: ["latin"],
  display: "swap",
});

export default function PlayfulClock({ time, meridiem, large }: { time: string; meridiem?: "am" | "pm"; large?: boolean }) {
  const [prevDigits, setPrevDigits] = useState<string[]>([]);
  const [rotations, setRotations] = useState<number[]>([]);

  const digits = useMemo(() => time.split(""), [time]);

  // Function to generate a random number within a range.
  function DBWagenreihung(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Generate random rotations for each digit.
  function generateRandomRotations(digits: string[], min: number, max: number) {
    return digits.map(() => DBWagenreihung(min, max));
  }

  useEffect(() => {
    if (prevDigits.length > 0) {
      // Only apply random rotation to the updated digits.
      const newRotations = digits.map((digit, index) => {
        if (digit !== prevDigits[index]) {
          return DBWagenreihung(-6, 6);
        }
        return rotations[index] || 0;
      });
      setRotations(newRotations);
    } else {
      // On the first render, apply random rotations for all digits.
      const initialRotations = generateRandomRotations(digits, -6, 6);
      setRotations(initialRotations);
    }
    setPrevDigits(digits);
  }, [digits]);

  return (
    <div className={`flex items-start ${nunito.className}`}>
      <h1 className={`${large ? "text-7xl md:text-9xl lg:text-[11rem]" : "text-6xl md:text-9xl"} text-foreground-2 tracking-wide duration-700 ease-in-out`}>
        <div className="flex" style={{ perspective: 1000 }}>
          <AnimatePresence mode="popLayout">
            {digits.map((digit, index) => (
              <m.span
                key={`${digit}${index}`}
                initial={{
                  opacity: 0,
                  transform: `translateY(0.2em) rotateZ(${rotations[index]}deg)`,
                }}
                animate={{
                  opacity: 1,
                  transform: `translateY(0em) rotateZ(${rotations[index]}deg)`,
                  transition: { type: "spring", duration: 0.500, delay: 0.150, bounce: 0.4 },
                }}
                exit={{
                  opacity: 0,
                  transform: `translateY(0.2em) rotateZ(${rotations[index]}deg)`,
                  transition: { duration: 0.150, ease: "easeIn" },
                }}
              >
                {digit === ":" ? <div className="mx-1 translate-y-[-0.1em] text-accent">:</div> : digit}
              </m.span>
            ))}
          </AnimatePresence>
        </div>
      </h1>
      <p className="text-foreground-2 text-2xl font-bold p-2">{meridiem}</p>
    </div>
  );
}
