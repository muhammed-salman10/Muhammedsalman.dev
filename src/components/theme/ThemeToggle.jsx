"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      setDark(true);
    }
  }, []);

  // Toggle function
  const toggleTheme = () => {
    if (dark) {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDark(!dark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-md"
    >
      {dark ? "☀️ " : "🌙"}
    </button>
  );
}