"use client";
import React, { useEffect, useState } from "react";
import navbarLinks from "../common/header/navbarLinks";
import ThemeToggle from "../theme/ThemeToggle";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Link from "next/link";

function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      setIsDarkTheme(document.body.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="lg:min-h-screen min-h-[736px] text-secondary flex flex-col justify-between">
      {/* ================= NAVBAR ================= */}
      <header className="border-b border-primary relative font-secondary">
        <div className="max-w-7xl mx-auto flex items-stretch justify-between px-4 sm:px-6">
          {/* Logo */}
          <div className="flex items-center py-4 sm:py-6 pr-6 lg:pr-20 lg:border-r ">
            <div className="text-xs sm:text-sm tracking-widest uppercase">
              Salman.dev
            </div>
          </div>

          {/* Desktop Nav (UNCHANGED visually) */}
          <nav className="hidden md:flex items-center gap-10 text-[14px] font-[500] tracking-wider px-10 border-r  pr-36">
            {navbarLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="relative group hover:text-gray-600 transition"
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Desktop Button */}
          <div className="hidden md:flex items-center py-6 pl-10">
            <button className="border border-primary rounded-full px-6 py-2 text-sm hover:bg-black hover:text-white transition">
              LETS TALK
            </button>
            <ThemeToggle />
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center justify-between py-4 gap-4">
            <ThemeToggle />

            <button className="text-2xl" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {isOpen && (
          <div
            className={`md:hidden fixed inset-0 z-50 overflow-auto transition-all duration-300 ${
              isDarkTheme ? "bg-[#0f0f0f] text-white" : "bg-white text-black"
            }`}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between px-6 py-5 border-b ${
                isDarkTheme ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="text-xs tracking-widest uppercase">
                Salman.dev
              </div>

              <button
                className="text-2xl hover:opacity-70 transition"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Menu */}
            <div className="flex flex-col px-6 py-8 gap-6 text-sm tracking-wider">
              {navbarLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className={`transition-colors duration-300 ${
                    isDarkTheme ? "hover:text-gray-300" : "hover:text-gray-600"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}

              <button
                className={`mt-2 rounded-full px-6 py-3 text-sm border transition-all duration-300 ${
                  isDarkTheme
                    ? "border-white hover:bg-white hover:text-black"
                    : "border-black hover:bg-black hover:text-white"
                }`}
              >
                LETS TALK
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ================= HERO CENTER ================= */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden px-4 ">
        {/* Responsive Heading */}
        <h1 className="relative text-[10vw] sm:text-[11vw] lg:text-[9vw] leading-none font-[900] tracking-[-0.04em] font-primary text-primary text-center">
          PORTFOLIO
        </h1>

        {/* Glass Left (Desktop Only - UNCHANGED) */}
        <div
          className="hidden lg:block absolute top-[50%] left-[22%] w-[400px] h-[90px] rounded-full 
          backdrop-blur-[2px]
          bg-white/5 
          border border-white/20 
          shadow-[inset_0_0_30px_rgba(255,255,255,0.08),0_0_40px_rgba(0,0,0,0.8)] 
          before:absolute before:inset-0 before:bg-gradient-to-r 
          before:from-transparent before:via-white/20 before:to-transparent 
          before:opacity-40 before:rounded-full"
        />

        {/* Glass Right (Desktop Only - UNCHANGED) */}
        <div
          className="hidden lg:block absolute top-[35%] right-[22%] w-[300px] h-[90px] rounded-full 
          backdrop-blur-[2px]
          bg-white/5 
          border border-white/20 
          shadow-[inset_0_0_30px_rgba(255,255,255,0.08),0_0_40px_rgba(0,0,0,0.8)] 
          before:absolute before:inset-0 before:bg-gradient-to-r 
          before:from-transparent before:via-white/20 before:to-transparent 
          before:opacity-40 before:rounded-full"
        />

        {/* Name (Responsive position) */}
        <div className="absolute bottom-[15%] sm:bottom-[22%] lg:bottom-[27%] right-[8%] sm:right-[18%] lg:right-[23%] flex items-center gap-2 sm:gap-3">
          <span className="w-2 h-2 sm:w-3 sm:h-3 bg-[#f5f5eb] rounded-full border" />
          <span className="bg-[#f5f5eb] text-black font-secondary px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium border">
            Muhammed Salman
          </span>
        </div>

        {/* Year (Responsive position) */}
        <div className="absolute top-[20%] sm:top-[25%] lg:top-[30%] left-[8%] sm:left-[18%] lg:left-[23%] flex items-center gap-2 sm:gap-3">
          <span className="w-2 h-2 sm:w-3 sm:h-3 bg-[#f5f5eb] rounded-full border" />
          <span className="bg-[#f5f5eb] text-black font-secondary px-6 sm:px-10 py-1 rounded-full text-xs sm:text-sm font-medium border">
            2026
          </span>
        </div>
      </div>

      {/* ================= FOOTER INFO ================= */}
      <div className="border-t border-primary font-secondary border-b">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row text-[14px]">
          <div className="flex-1 px-5 sm:px-6 lg:pr-16 py-5 lg:py-8 lg:border-b lg:border-b-0 lg:border-r  text-left">
            <p className="mb-3 uppercase tracking-wider text-primary">
              Expertise
            </p>
            <p className="leading-relaxed text-sm lg:text-[14px]">
              Frontend Development · UI Implementation · Responsive Design · Web
              Animation · SEO Fundamentals
            </p>
          </div>

          <div className="flex-1 px-5 sm:px-6 lg:px-16 py-5 lg:py-8 lg:border-b lg:border-b-0 lg:border-r  text-left lg:text-center">
            <p className="mb-3 uppercase tracking-wider text-primary">
              WHAT I BUILD
            </p>
            <p className="leading-relaxed text-sm lg:text-[14px]">
              Modern websites and digital experiences for businesses, brands,
              and ideas that deserve a strong online presence.
            </p>
          </div>

          <div className="flex-1 px-5 sm:px-6 lg:pl-16 py-5 lg:py-8 text-left lg:text-center">
            <p className="mb-3 uppercase tracking-wider text-primary">
              LET'S CONNECT
            </p>

            <div className="flex flex-col gap-2">
              <Link
                href="mailto:salmanmuhammed827@gmail.com"
                className="flex items-center gap-2 text-sm lg:text-[14px] hover:opacity-80 transition-opacity"
              >
                <MdEmail size={17} className="text-[#EA4335]" />
                <span>salmanmuhammed827@gmail.com</span>
              </Link>

              <Link
                href="https://www.instagram.com/freekicker_10/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm lg:text-[14px] hover:opacity-80 transition-opacity"
              >
                <FaInstagram size={16} className="text-[#E4405F]" />
                <span>freekicker_10</span>
              </Link>

              <Link
                href="https://www.linkedin.com/in/muhammed-salman-dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm lg:text-[14px] hover:opacity-80 transition-opacity"
              >
                <FaLinkedinIn size={16} className="text-[#0A66C2]" />
                <span>muhammed-salman-dev</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
