"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

function AnalogClock() {
  const lsHideSec = localStorage.getItem("hideSec");
  const [time, setTime] = useState(getTime);
  function getTime() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    return [hour, minute, second];
  }
  const [seconds, setSeconds] = useState(time[2]);

  const rotateHour = 30 * time[0] + (time[1] / 60) * 30;
  const rotateMinute = 6 * time[1] + 360 * time[0];
  const rotateSecond = 6 * seconds + 12;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getTime);
      setSeconds(seconds + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [getTime]);

  return (
    <div className="relative size-64 border border-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 rounded-full shadow-inner">
      <div className="absolute inset-0 drop-shadow">
        <div
          id="hour"
          className="absolute inset-0 duration-300"
          style={{
            transform: `rotate(${rotateHour}deg)`,
            transitionTimingFunction: "cubic-bezier(0.25, 2, 0.2, 0.75)",
          }}
        >
          <div className="absolute bg-neutral-950 dark:bg-neutral-50 w-2.5 h-24 top-14 left-1/2 -translate-x-1/2" />
        </div>
        <div
          id="minute"
          className="absolute inset-0 duration-300"
          style={{
            transform: `rotate(${rotateMinute}deg)`,
            transitionTimingFunction: "cubic-bezier(0.25, 2, 0.2, 0.75)",
          }}
        >
          <div className="absolute bg-neutral-950 dark:bg-neutral-50 w-1.5 h-32 top-6 left-1/2 -translate-x-1/2" />
        </div>
        {lsHideSec !== "true" && (
          <div
            id="second"
            className="absolute inset-0 duration-1000 ease-linear"
            style={{
              transform: `rotate(${rotateSecond}deg)`,
            }}
          >
            <div className="absolute bg-red w-1 h-32 top-9 left-1/2 -translate-x-1/2" />
            <div className="absolute bg-red size-5 top-7 left-1/2 -translate-x-1/2 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(AnalogClock), {
  ssr: false,
});
