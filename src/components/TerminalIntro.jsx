"use client";

import React, { useEffect, useState } from "react";

export default function TerminalIntro({ onFinish }) {
  const terminalLines = [
    "salman@developer:~$ initialize portfolio",
    "",
    "Initializing Developer Environment...",
    "Loading personal profile.................. ✓",
    "Loading technical expertise............... ✓",
    "Loading selected projects.................. ✓",
    "Loading experience & achievements.......... ✓",
    "",
    // "Environment",
    // "→ Frontend Development",
    // "→ React / Next.js",
    // "→ JavaScript / Tailwind CSS",
    // "→ GSAP / Modern Web Animation",
    // "",
    "Optimizing visual experience............... ✓",
    "Initializing interactive interface........ ✓",
    "Checking responsive layouts................ ✓",
    "",
    "Portfolio system ready.",
    "",
    "Welcome to Salman.dev",
    "Frontend Developer • Creative Developer",
    "",
    "Launching portfolio...",
  ];

  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= terminalLines.length) {
      const finishTimeout = setTimeout(() => {
        onFinish();
      }, 1000);

      return () => clearTimeout(finishTimeout);
    }

    const line = terminalLines[lineIndex];

    if (charIndex < line.length) {
      const timeout = setTimeout(() => {
        setCurrentLine((prev) => prev + line[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 20);

      return () => clearTimeout(timeout);
    }

    const nextLineTimeout = setTimeout(() => {
      setDisplayedLines((prev) => [...prev, currentLine]);
      setCurrentLine("");
      setCharIndex(0);
      setLineIndex((prev) => prev + 1);
    }, 150);

    return () => clearTimeout(nextLineTimeout);
  }, [charIndex, lineIndex, currentLine, onFinish]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black text-green-400 font-mono p-6 md:p-10 text-sm md:text-base overflow-hidden">
      <div className="max-w-4xl">
        {displayedLines.map((line, index) => (
          <p
            key={index}
            className={
              line === "Portfolio system ready."
                ? "text-white font-semibold"
                : line === "Welcome to Salman.dev"
                ? "text-cyan-400 font-semibold"
                : ""
            }
          >
            {line || "\u00A0"}
          </p>
        ))}

        <p>
          {currentLine}
          <span className="animate-pulse">█</span>
        </p>
      </div>
    </div>
  );
}

