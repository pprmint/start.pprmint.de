"use client";
import SearchBar from "src/components/searchBar";
import Clock from "src/components/clock";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Home() {
  const mainRef = useRef<HTMLElement | null>(null);
  const [showOther, setShowOther] = useState(true);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleMouseMove = () => {
      setShowOther(true);
      clearTimeout(timer);

      if (mainRef.current) {
        timer = setTimeout(() => {
          setShowOther(false);
        }, 3000);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);
  return (
    <>
      <main
        ref={mainRef}
        className="flex flex-col gap-9 items-center justify-center min-h-svh p-6 max-w-7xl mx-auto"
      >
        <div
          className={`absolute w-full md:w-2/3 max-w-3xl top-2/3 ${
            showOther ? "-translate-y-3/4" : "opacity-0"
          } duration-700 ease-in-out`}
        >
          <SearchBar />
        </div>
        <div
          className={`absolute top-1/2 ${
            showOther ? "-translate-y-2/3" : "-translate-y-1/2"
          } duration-700 ease-in-out`}
        >
          <Clock />
        </div>
      </main>
      <footer
        className={`flex items-end justify-between fixed bottom-0 inset-x-0 p-6 text-sm ${
          !showOther && "opacity-0"
        } duration-700 ease-in-out`}
      >
        <p>
          Made by{" "}
          <Link
            className="group text-foreground-2"
            href="https://pprmint.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            pprmint<span className="text-green">.</span>
            <span className="opacity-0 group-hover:opacity-100 duration-200">
              de
            </span>
          </Link>
        </p>
        <Link href="/settings">
          <button className="group p-2 text-foreground-1 hover:bg-elevate-1 hover:text-foreground-2 rounded-full duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              className="fill-current group-hover:rotate-[60deg] group-hover:duration-300 ease-in-out"
            >
              <path d="m9.483 1.531.145 1.361q.42.195.798.461l1.571-.697.243.251a6.6 6.6 0 0 1 1.607 2.785l.096.336-1.389 1.011a5 5 0 0 1 0 .922l1.389 1.011-.096.336a6.6 6.6 0 0 1-1.607 2.785l-.243.251-1.571-.698a5 5 0 0 1-.798.461l-.182 1.709-.338.085a6.6 6.6 0 0 1-3.216 0l-.338-.085-.182-1.708a5 5 0 0 1-.798-.461l-1.571.697-.243-.251a6.6 6.6 0 0 1-1.607-2.785l-.096-.336 1.389-1.011a5 5 0 0 1 0-.922L1.057 6.028l.096-.336A6.6 6.6 0 0 1 2.76 2.907l.243-.251 1.571.698q.378-.267.798-.461l.182-1.709.338-.085a6.6 6.6 0 0 1 3.216 0l.338.085zm-.956.464a5.6 5.6 0 0 0-2.054 0l-.17 1.598-.283.11c-.385.15-.745.358-1.068.617l-.237.19-1.469-.652a5.6 5.6 0 0 0-1.027 1.779l1.299.946-.046.301a4 4 0 0 0 0 1.232l.046.301-1.299.946c.23.651.578 1.254 1.027 1.779l1.469-.652.237.19c.323.259.683.467 1.068.617l.283.11.17 1.598a5.6 5.6 0 0 0 2.054 0l.17-1.598.283-.11c.385-.15.745-.358 1.068-.617l.237-.19 1.469.652a5.6 5.6 0 0 0 1.027-1.779l-1.299-.946.046-.301a4 4 0 0 0 0-1.232l-.046-.301 1.299-.946a5.6 5.6 0 0 0-1.027-1.779l-1.469.652-.237-.19a4 4 0 0 0-1.068-.617l-.283-.11z"></path>
              <path d="M7.5 5.4a2.101 2.101 0 0 1 0 4.2 2.101 2.101 0 0 1 0-4.2m0 1a1.1 1.1 0 1 0 .001 2.201A1.1 1.1 0 0 0 7.5 6.4"></path>
            </svg>
          </button>
        </Link>
      </footer>
    </>
  );
}
