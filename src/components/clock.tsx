"use client";
import DigitalClock from "./clocks/digital"

export default function Clock() {
    const lsClock = localStorage.getItem("clock");
    return (
        lsClock === "none" ? null : <DigitalClock />
    )
}