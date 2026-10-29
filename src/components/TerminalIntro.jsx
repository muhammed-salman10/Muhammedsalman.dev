"use client";

import React, { useEffect, useRef, useState } from "react";

const TERMINAL_LINES = [
  "salman@developer:~$ initialize portfolio",
  "",
  "Initializing Developer Environment...",
  "Loading personal profile.................. ✓",
  "Loading technical expertise............... ✓",
  "Loading selected projects.................. ✓",
  "Loading experience & achievements.......... ✓",
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

const CHAR_DELAY = 20;
const LINE_DELAY = 150;
const FINISH_DELAY = 1000;

export default function TerminalIntro({ onFinish }) {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState("");
  const onFinishRef = useRef(onFinish);

  // Keep the latest callback without restarting the typing animation.
  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  useEffect(() => {
    let cancelled = false;
    let timeoutId;

    let lineIndex = 0;
    let charIndex = 0;
    let typedLine = "";

    const typeNext = () => {
      if (cancelled) return;

      if (lineIndex >= TERMINAL_LINES.length) {
        timeoutId = window.setTimeout(() => {
          if (!cancelled) {
            onFinishRef.current?.();
          }
        }, FINISH_DELAY);

        return;
      }

      const line = TERMINAL_LINES[lineIndex];

      if (charIndex < line.length) {
        typedLine += line[charIndex];
        charIndex += 1;

        setCurrentLine(typedLine);

        timeoutId = window.setTimeout(typeNext, CHAR_DELAY);
        return;
      }

      timeoutId = window.setTimeout(() => {
        if (cancelled) return;

        setDisplayedLines((previous) => [...previous, typedLine]);
        setCurrentLine("");

        lineIndex += 1;
        charIndex = 0;
        typedLine = "";

        typeNext();
      }, LINE_DELAY);
    };

    typeNext();

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-black p-6 font-mono text-sm text-green-400 md:p-10 md:text-base">
      <div className="max-w-4xl">
        {displayedLines.map((line, index) => (
          <p
            key={index}
            className={
              line === "Portfolio system ready."
                ? "font-semibold text-white"
                : line === "Welcome to Salman.dev"
                  ? "font-semibold text-cyan-400"
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
