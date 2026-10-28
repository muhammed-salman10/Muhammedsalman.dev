//src/components/home/Skills.jsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import skillsData from "@/data/skillsData.json";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaGitAlt,
  FaFigma,
  FaBrain,
  FaComments,
  FaUsers,
  FaClock,
  FaRocket,
  FaSyncAlt,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiTailwindcss,
  SiVercel,
  SiGooglechrome,
  SiNetlify,
} from "react-icons/si";

import { BiLogoVisualStudio } from "react-icons/bi";
import { FaLightbulb } from "react-icons/fa6";

/* All Skills animations live here, so no globals.css / library changes are needed */
const skillsCSS = `
@keyframes skUp   { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: none; } }
@keyframes skCard { from { opacity: 0; transform: translateY(40px) scale(.94); } to { opacity: 1; transform: none; } }
@keyframes skIcon { 0% { transform: scale(0) rotate(-40deg); } 70% { transform: scale(1.15) rotate(6deg); } 100% { transform: none; } }

/* Hidden until the section scrolls into view */
.sk-pre .sk-up, .sk-pre .sk-card { opacity: 0; }

.sk-anim .sk-up   { animation: skUp .8s cubic-bezier(.22,1,.36,1) backwards; animation-delay: var(--d, 0ms); }
/* "backwards" (not "both") so the cards' hover lift still works after the intro */
.sk-anim .sk-card { animation: skCard .7s cubic-bezier(.22,1,.36,1) backwards; animation-delay: var(--d, 0ms); }
.sk-anim .sk-icon { animation: skIcon .7s cubic-bezier(.34,1.56,.64,1) backwards; animation-delay: calc(var(--d, 0ms) + 250ms); }

@media (prefers-reduced-motion: reduce) {
  .sk-anim .sk-up, .sk-anim .sk-card, .sk-anim .sk-icon { animation: none !important; }
}
`;

function Skills() {
  const [activeTab, setActiveTab] = useState("technical");
  const sectionRef = useRef(null);

  // Plays every time the page loads/refreshes, once the section is visible
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("sk-pre");
          el.classList.add("sk-anim");
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Icon mapping system
  const iconMap = {
    html: <FaHtml5 className="text-orange-500 text-4xl" />,
    css: <FaCss3Alt className="text-blue-500 text-4xl" />,
    js: <FaJs className="text-yellow-400 text-4xl" />,
    react: <FaReact className="text-cyan-400 text-4xl" />,
    next: <SiNextdotjs className="text-white text-4xl" />,
    tailwind: <SiTailwindcss className="text-sky-400 text-4xl" />,
    node: <FaNodeJs className="text-green-500 text-4xl" />,
    git: <FaGitAlt className="text-orange-600 text-4xl" />,
    github: <FaGithub className="text-white text-4xl" />,
    figma: <FaFigma className="text-pink-500 text-4xl" />,
    vercel: <SiVercel className="text-white text-4xl" />,
    vscode: <BiLogoVisualStudio className="text-blue-500 text-4xl" />,
    chrome: <SiGooglechrome className="text-yellow-500 text-4xl" />,
    brain: <FaBrain className="text-purple-400 text-4xl" />,
    comments: <FaComments className="text-blue-400 text-4xl" />,
    users: <FaUsers className="text-green-400 text-4xl" />,
    clock: <FaClock className="text-yellow-400 text-4xl" />,
    rocket: <FaRocket className="text-pink-400 text-4xl" />,
    adaptability: <FaSyncAlt className="text-indigo-400 text-4xl" />,
    creativity: <FaLightbulb className="text-yellow-300 text-4xl" />,
    netlify: <SiNetlify className="text-cyan-400 text-4xl" />,
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="sk-pre w-full py-8 md:py-20"
    >
      <style>{skillsCSS}</style>

      <div className="container mx-auto px-4 sm:px-6 font-secondary">
        {/* HEADING */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 mt-10 lg:mt-0">
          <h2
            style={{ "--d": "100ms" }}
            className="sk-up text-2xl md:text-4xl font-[700] mb-6 text-secondary font-primary"
          >
            Skills and Expertise
          </h2>
          <p
            style={{ "--d": "250ms" }}
            className="sk-up text-primary leading-relaxed text-[15px] md:text-[18px]"
          >
            A combination of technical expertise, modern development tools, and
            strong interpersonal skills that help me build scalable,
            user-friendly, and high-performance web applications.
          </p>
        </div>

        {/* TABS */}
        <div
          style={{ "--d": "400ms" }}
          className="sk-up flex justify-center mb-10 md:mb-14 "
        >
          <div className="flex gap-6 lg:border border-secondary rounded-full p-2 max-md:grid max-md:grid-cols-2 max-md:gap-3 max-md:rounded-2xl max-md:p-3 max-md:w-full max-md:max-w-md">
            {["technical", "tools", "soft"].map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                aria-pressed={activeTab === tab}
                className={`whitespace-nowrap px-5 py-2 text-sm font-medium border lg:border-none  rounded-full transition-all duration-300 ${
                  index === 2
                    ? "max-md:col-span-2 max-md:justify-self-center"
                    : ""
                }
  ${
    activeTab === tab
      ? "bg-secondary text-on-secondary shadow-md "
      : "text-primary hover:bg-secondary/10"
  }`}
              >
                {tab === "technical"
                  ? "Technical Skills"
                  : tab === "tools"
                    ? "Tools & Platforms"
                    : "Soft Skills"}
              </button>
            ))}
          </div>
        </div>

        {/* SKILL CARDS
            key includes the tab name so cards remount and replay their
            entrance animation every time the tab changes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {skillsData[activeTab].map((skill, index) => (
            <div
              key={`${activeTab}-${index}`}
              style={{ "--d": `${Math.min(index * 90, 700)}ms` }}
              className="sk-card group bg-secondary text-on-secondary p-6 md:p-8 rounded-2xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-secondary/40 border-2 border-primary"
            >
              <div
                aria-hidden="true"
                className="sk-icon mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
              >
                {iconMap[skill.icon]}
              </div>

              <h3 className="text-lg md:text-xl font-semibold mb-3 text-center">
                {skill.name}
              </h3>

              <p className="text-on-secondary/80 text-sm leading-relaxed text-center">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Skills;
