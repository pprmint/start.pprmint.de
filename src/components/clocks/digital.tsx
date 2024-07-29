"use client";
import dynamic from "next/dynamic";
import { useEffect, useState, useMemo } from "react";
import { useTransition, a, easings } from "@react-spring/web";

function DigitalClock() {
  const lsHideSec = localStorage.getItem("hideSec");
  const [time, setTime] = useState(getTime);
  function getTime() {
    const now = new Date();
    const hour = now.getHours().toString().padStart(2, "0");
    const minute = now.getMinutes().toString().padStart(2, "0");
    const second = now.getSeconds().toString().padStart(2, "0");
    return `${hour}:${minute}${lsHideSec !== "true" ? `:${second}` : ""}`;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [getTime]);

  const digits = useMemo(() => time.split(""), [time]);

  const transitions = useTransition(digits, {
    keys: digits.map((digit, index) => `${digit}-${index}`),
    from: { opacity: 0, transform: "translateY(-20px) rotateX(30deg)" },
    enter: {
      opacity: 1,
      transform: "translateY(0px) rotateX(0deg)",
      config: { duration: 300, easing: easings.easeOutBack },
    },
    leave: {
      opacity: 0,
      transform: "translateY(20px) rotateX(-30deg)",
      config: { duration: 150, easing: easings.easeInCirc },
    },
    exitBeforeEnter: true,
  });

  return (
    <h1 className="font-number text-6xl md:text-9xl text-foreground-2">
      <div className="flex" style={{ perspective: 1000 }}>
        {transitions((style, item, index) => (
          <a.span key={`${item}-${index}`} style={style}>
            {item === ":" ? (
              <span className="animate-pulse mx-1">:</span>
            ) : (
              item
            )}
          </a.span>
        ))}
      </div>
    </h1>
  );
}

export default dynamic(() => Promise.resolve(DigitalClock), {
  ssr: false,
});
