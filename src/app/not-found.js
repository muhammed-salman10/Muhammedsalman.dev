"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) {
        setDark(saved === "dark");
      } else {
        // No saved theme: follow the device setting
        setDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
      }
    } catch {
      // localStorage blocked: keep light theme
    }
  }, []);

  return (
    <main
      className={`min-h-screen lg:flex items-center justify-center px-6 transition-colors duration-500 ${
        dark ? "bg-[#0f0f0f] text-white" : "bg-white text-black"
      }`}
    >
      <div className="w-full max-w-4xl text-center">
        {/* Terminal Label */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm mb-8 mt-20 lg:mt-0 ${
            dark
              ? "border-white/20 text-white/60"
              : "border-black/10 text-black/60"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
          404 — Page Not Found
        </div>

        {/* 404 */}
        <h1 className="text-[130px] sm:text-[180px] md:text-[180px] font-black leading-none tracking-[-0.08em]">
          4 0 4
        </h1>

        {/* Description */}
        <div className="mt-6">
          <p
            className={`text-lg sm:text-xl font-medium ${
              dark ? "text-white/80" : "text-black/80"
            }`}
          >
            Looks like you took a wrong turn.
          </p>

          <p
            className={`mt-2 text-sm sm:text-base ${
              dark ? "text-white/50" : "text-black/50"
            }`}
          >
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>

        {/* Terminal */}
        <div
          className={`max-w-md mx-auto mt-8 p-4 rounded-xl text-left font-mono text-xs sm:text-sm border ${
            dark
              ? "bg-white/[0.03] border-white/10 text-white/60"
              : "bg-black/[0.03] border-black/10 text-black/60"
          }`}
        >
          <p>
            <span className="text-green-500">salman@portfolio</span>
            <span className={dark ? "text-white/40" : "text-black/40"}>
              :~$
            </span>{" "}
            find page
          </p>

          <p className="mt-2">
            <span className="text-red-500">Error:</span> Page not found.
          </p>
        </div>

        {/* Home Button */}
        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-[#000080] text-white px-7 py-3 rounded-full text-sm sm:text-base font-medium hover:opacity-90 transition-all duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#000080]"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Footer Text */}
        <p
          className={`mt-10 text-xs tracking-wider uppercase ${
            dark ? "text-white/30" : "text-black/30"
          }`}
        >
          Muhammed Salman • Web Developer
        </p>
      </div>
    </main>
  );
}