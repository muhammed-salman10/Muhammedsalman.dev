"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { FaDownload } from "react-icons/fa";
import Link from "next/link";

function About() {
  const triggerRef = useRef(null);

  useEffect(() => {
    const trigger = triggerRef.current;

    if (!trigger) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trigger.closest(".about-section")?.classList.add("about-animate");
          observer.disconnect();
        }
      },
      {
        threshold: 0.7,
      },
    );

    observer.observe(trigger);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about-section about-pre">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center">
          {/* IMAGE */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="about-image relative w-[280px] h-[350px] md:w-[420px] md:h-[610px]">
              <Image
                src="/assets/images/id-card.webp"
                alt="Muhammed Salman-Web Developer ID card portrait"
                title="Muhammed Salman, Web Developer"
                fill
                sizes="(max-width: 767px) 280px, 420px"
                className="object-cover object-top"
              />
            </div>
          </div>

          {/* CONTENT */}
          <div className="w-full lg:w-1/2 text-center lg:text-left lg:py-10">
            {/* THIS IS THE TRIGGER LINE */}
            <span
              ref={triggerRef}
              className="about-item text-[16px] uppercase tracking-widest text-secondary font-[600]"
              style={{ "--about-delay": "0ms" }}
            >
              About Me
            </span>

            <h2
              className="about-item text-2xl md:text-4xl font-bold mt-4 leading-tight text-primary font-primary"
              style={{ "--about-delay": "350ms" }}
            >
              Im{" "}
              <span className="text-secondary about-typing">
                Muhammed Salman
              </span>
              <br />
              Web Developer
            </h2>

            <p
              className="about-item mt-6 text-primary leading-relaxed font-secondary lg:text-[19px] text-[15px]"
              style={{ "--about-delay": "700ms" }}
            >
              I am a passionate Web Developer specializing in frontend
              development, building modern, responsive, and high-performance
              websites and digital experiences using React, Next.js, JavaScript,
              and Tailwind CSS.
            </p>

            <p
              className="about-item mt-4 text-primary leading-relaxed font-secondary lg:text-[19px] text-[15px]"
              style={{ "--about-delay": "1050ms" }}
            >
              I focus on creating clean, intuitive user interfaces with a strong
              emphasis on performance, responsiveness, and user experience. My
              goal is to write clean, maintainable code, turn designs into
              engaging web experiences, and continuously improve my technical
              expertise.
            </p>

            <div
              className="about-item mt-6 flex flex-wrap justify-center lg:justify-start items-center gap-6"
              style={{ "--about-delay": "1400ms" }}
            >
              <a
                href="/resume/muhammed_salman_.pdf"
                target="_blank"
                rel="noopener noreferrer"
                title="View and Download Muhammed Salman's Resume (PDF)"
                aria-label="View and download Muhammed Salman's CV (PDF)"
                className="flex items-center gap-2 bg-secondary text-on-secondary px-4 lg:px-6 py-3 rounded-xl shadow-md hover:bg-secondary transition duration-300"
              >
                <FaDownload aria-hidden="true" />
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
