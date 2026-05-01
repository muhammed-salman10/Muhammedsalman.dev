// src/components/home/About.jsx
"use client";
import React from "react";
import Image from "next/image";
import { FaDownload } from "react-icons/fa";

function About() {
  return (
    <section className="">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center">
          {/* ================= LEFT SIDE IMAGE ================= */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-[280px] h-[350px] md:w-[420px] md:h-[600px]">
              <Image
                src="/assets/images/idcard-1.png"
                alt="Developer Salman"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          {/* ================= RIGHT SIDE CONTENT ================= */}
          <div className="w-full lg:w-1/2 text-center lg:text-left lg:py-10">
            <span className="text-[16px] uppercase tracking-widest text-secondary font-[600]">
              About Me
            </span>

            <h2 className="text-2xl md:text-4xl font-bold mt-4 leading-tight text-black font-primary">
              Im <span className="text-secondary ">Muhammed Salman</span>
              <br />
              Full Stack Developer
            </h2>

            <p className="mt-6 text-primary leading-relaxed font-secondary lg:text-[19px] text-[15px] ">
              I am a passionate Full Stack Developer specializing in building
              modern, scalable, and high-performance web applications using
              React, Next.js, and Tailwind CSS.
            </p>

            <p className="mt-4 text-primary leading-relaxed font-secondary lg:text-[19px] text-[15px]">
              I focus on creating clean user interfaces combined with powerful
              backend systems. My goal is to deliver smooth user experiences,
              write clean maintainable code, and continuously improve my
              technical expertise.
            </p>

            {/* ================= BUTTON + SOCIAL ================= */}
            <div className="mt-6 flex flex-wrap justify-center lg:justify-start items-center gap-6">
              {/* Download CV Button */}
              <a
                href="/Salman-CV.pdf"
                download
                className="flex items-center lg:text-[14px] text-[12px] gap-2 bg-secondary text-white lg:px-6 px-4 lg:py-3 py-3 rounded-xl shadow-md hover:bg-secondary transition duration-300"
              >
                <FaDownload />
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
