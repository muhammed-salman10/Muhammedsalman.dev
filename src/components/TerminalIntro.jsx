"use client";

import React, { useEffect, useState } from "react";

export default function TerminalIntro({ onFinish }) {

  const terminalLines = [
    "salman@portfolio:~$ npm run start",
    "",
    "> salman-portfolio@1.0.0 start",
    "> next build",
    "",
    "▲ Next.js 14.0.0",
    "- Creating optimized production build...",
    "✓ Compiled successfully",
    "",
    "Collecting page data...",
    "Generating static pages (6/6)",
    "Finalizing page optimization...",
    "",
    "✔ Build completed successfully",
    "",
    "Starting development server...",
    "Local: http://localhost:3000",
    "",
    "✔ Server ready",
    "",
    "Launching Developer Portfolio..."
  ];

  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {

    if (lineIndex >= terminalLines.length) {
      setTimeout(() => {
        onFinish();
      }, 1200);
      return;
    }

    const line = terminalLines[lineIndex];

    if (charIndex < line.length) {
      const timeout = setTimeout(() => {
        setCurrentLine((prev) => prev + line[charIndex]);
        setCharIndex(charIndex + 1);
      }, 25);

      return () => clearTimeout(timeout);
    }

    const nextLineTimeout = setTimeout(() => {
      setDisplayedLines((prev) => [...prev, currentLine]);
      setCurrentLine("");
      setCharIndex(0);
      setLineIndex(lineIndex + 1);
    }, 200);

    return () => clearTimeout(nextLineTimeout);

  }, [charIndex, lineIndex, currentLine, terminalLines, onFinish]);

  return (
    <div className="fixed inset-0 bg-black text-green-400 font-mono p-6 md:p-10 text-sm md:text-base overflow-hidden">

      {displayedLines.map((line, index) => (
        <p key={index}>{line}</p>
      ))}

      <p>
        {currentLine}
        <span className="animate-pulse">█</span>
      </p>

    </div>
  );
}