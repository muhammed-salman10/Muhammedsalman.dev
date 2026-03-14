"use client";

import React, { useState } from "react";

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

  const [showIntro, setShowIntro] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const handleIntroFinish = () => {
    setFadeOut(true);

    setTimeout(() => {
      setShowIntro(false);
    }, 800);
  };

  return (
    <div>

      {showIntro && (
        <div
          className={`fixed inset-0 z-50 transition-opacity duration-700 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <TerminalIntro onFinish={handleIntroFinish} />
        </div>
      )}

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

    </div>
  );
}

export default Page;