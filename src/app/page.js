"use client";

import React, { useEffect, useState } from "react";

import TerminalIntro from "@/components/TerminalIntro";

import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Education from "../components/home/Education";
import Skills from "../components/home/Skills";
import Projects from "../components/home/Projects";
import Blogs from "../components/home/Blogs";
import Contact from "../components/home/Contact";
import Footer from "../components/common/footer/Footer";
import Services from "../components/home/services/Services";
import Achievements from "../components/home/Achievements";

function Page() {
  const [showIntro, setShowIntro] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const introSeen = localStorage.getItem("salman-intro-seen");

    if (introSeen === "true") {
      // Returning visitor / Refresh
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 700);

      return () => clearTimeout(timer);
    }

    // First visit
    setShowLoader(false);
    setShowIntro(true);
  }, []);

  const handleIntroFinish = () => {
    setFadeOut(true);

    setTimeout(() => {
      localStorage.setItem("salman-intro-seen", "true");
      setShowIntro(false);
    }, 800);
  };

  return (
    <main>
      {/* First Visit Terminal Intro */}
      {showIntro && (
        <div
          className={`fixed inset-0 z-[9999] transition-opacity duration-700 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <TerminalIntro onFinish={handleIntroFinish} />
        </div>
      )}

      {/* Refresh / Returning Visitor Loader */}
      {showLoader && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black text-white">
          <div className="flex flex-col items-center">
            <div className="font-mono text-sm tracking-[0.4em] md:text-base">
              SALMAN
            </div>

            <div className="mt-3 font-mono text-[10px] tracking-[0.3em] text-gray-500 md:text-xs">
              INITIALIZING...
            </div>

            <div className="mt-5 h-[1px] w-32 overflow-hidden bg-gray-800 md:w-40">
              <div className="h-full w-full animate-loader-progress bg-green-400" />
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Sections */}
      <Hero />
      <About />
      <Education />
      <Skills />
      <Services />
      <Projects />
      <Achievements />
      <Blogs />
      <Contact />
      <Footer />
    </main>
  );
}

export default Page;
