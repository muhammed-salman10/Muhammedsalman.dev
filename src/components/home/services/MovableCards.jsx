// src/components/home/services/MovableCards.jsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextAnimation from "./TextAnimation";

gsap.registerPlugin(ScrollTrigger);

/* Entrance animations. They run on INNER elements only, so they never clash
   with the GSAP scroll timeline that moves the outer elements. */
const movableCSS = `
@keyframes mvUp   { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }
@keyframes mvLine { from { transform: translateY(110%); } to { transform: none; } }
@keyframes mvCard { from { opacity: 0; transform: translateY(90px) scale(.8) rotate(-6deg); } to { opacity: 1; transform: none; } }

/* Hidden until the section is on screen */
.mv-pre .mv-up, .mv-pre .mv-card { opacity: 0; }
.mv-pre .mv-line { transform: translateY(110%); }

.mv-line-wrap { display: block; overflow: hidden; padding-bottom: .1em; }
.mv-line { display: block; }

/* "backwards" fill so hover effects keep working after the intro */
.mv-anim .mv-up   { animation: mvUp .8s cubic-bezier(.22,1,.36,1) backwards; animation-delay: var(--d, 0ms); }
.mv-anim .mv-line { animation: mvLine .9s cubic-bezier(.22,1,.36,1) backwards; animation-delay: var(--d, 0ms); }
.mv-anim .mv-card { animation: mvCard 1s cubic-bezier(.22,1,.36,1) backwards; animation-delay: var(--d, 0ms); }

@media (prefers-reduced-motion: reduce) {
  .mv-anim .mv-up, .mv-anim .mv-line, .mv-anim .mv-card { animation: none !important; }
}
`;

export default function MovableCards() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const contentRef = useRef(null);
  const mainHeadingRef = useRef(null);
  const textAnimationRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  const services = [
    {
      title: "Website Optimization & Redesign",
      image: "/assets/images/services/seo.jpg",
      rotate: "12deg",
    },
    {
      title: "Admin Dashboard Development",
      image: "/assets/images/services/admin-dashboard.jpg",
      rotate: "8deg",
    },
    {
      title: "Responsive UI Design",
      image: "/assets/images/services/resppp.png",
      rotate: "-10deg",
    },
    {
      title: "Front-End Web Development",
      image: "/assets/images/services/f1.png",
      rotate: "-2deg",
    },
  ];

  // Start the entrance animation (on every load/refresh) once the section is visible
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("mv-pre");
          el.classList.add("mv-anim");
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Detect mobile
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(cardsRef.current, { willChange: "transform, opacity" });
      gsap.set([contentRef.current, mainHeadingRef.current], {
        willChange: "transform, opacity",
      });

      if (!isMobile) {
        gsap.set(textAnimationRef.current, { x: "100%", opacity: 0 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: isMobile ? "+=900" : "+=2500",
          scrub: true,
          pin: true,
        },
      });

      // Cards move up
      tl.to(cardsRef.current, {
        y: -500,
        opacity: 0,
        stagger: { each: 0.3, from: "end" },
        ease: "power2.inOut",
      });

      // Content + Heading move
      tl.to(
        [contentRef.current, mainHeadingRef.current],
        {
          xPercent: -150,
          opacity: 0,
          ease: "power2.inOut",
          duration: 1,
        },
        "-=0.4",
      );

      // Text animation only desktop
      if (!isMobile && textAnimationRef.current) {
        tl.to(
          textAnimationRef.current,
          {
            x: "0%",
            opacity: 1,
            ease: "power3.out",
            duration: 1.2,
          },
          "-=0.2",
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="mv-pre relative flex flex-col items-center justify-center 
      lg:min-h-[100vh] min-h-[90vh] overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      <style>{movableCSS}</style>

      {/* Top Content */}
      <div
        ref={contentRef}
        className="absolute top-8 flex flex-col items-center text-center px-4 py-6"
      >
        <span
          style={{ "--d": "100ms" }}
          className="mv-up lg:text-[38px] text-[26px] font-bold text-secondary font-primary tracking-wide "
        >
          Our Services
        </span>

        <p
          style={{ "--d": "250ms" }}
          className="mv-up mt-3 lg:max-w-2xl text-primary text-[15px] md:text-[18px] leading-relaxed font-secondary"
        >
          I design and develop modern, high-performance web applications that
          blend creativity with functionality. From responsive interfaces to
          scalable front-end architectures, I transform ideas into seamless
          digital experiences that elevate brands and drive business growth.
        </p>
      </div>

      {/* Main Heading (lines slide up from a mask) */}
      <h2
        ref={mainHeadingRef}
        className="text-center font-primary select-none font-semibold text-[#000080] leading-tight
        md:text-[clamp(2rem,7vw,6rem)] lg:text-[50px] text-[30px] lg:mt-10 mt-24"
      >
        <span className="mv-line-wrap">
          <span className="mv-line" style={{ "--d": "400ms" }}>
            Delivering Digital
          </span>
        </span>
        <span className="mv-line-wrap">
          <span className="mv-line" style={{ "--d": "520ms" }}>
            Solutions
          </span>
        </span>
      </h2>

      {/* Image Stack */}
      <div
        className="
          absolute 
          top-[380px] md:top-[380px] 
          left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[160px] h-[160px]
          sm:w-[190px] sm:h-[190px]
          md:w-[210px] md:h-[210px]
          lg:w-[240px] lg:h-[240px]
          z-10 mt-20
        "
      >
        {services.map((service, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            style={{
              transform: `rotate(${service.rotate})`,
              backfaceVisibility: "hidden",
            }}
            className="
              absolute 
              w-[180px] h-[230px]
              sm:w-[180px] sm:h-[220px]
              md:w-[250px] md:h-[290px]
            "
          >
            {/* Entrance animation + hover live on this inner wrapper */}
            <div
              style={{ "--d": `${700 + i * 140}ms` }}
              className="mv-card w-full h-full transition-transform duration-300 hover:scale-[1.04]"
            >
              <div className="relative w-full h-full rounded-[16px] sm:rounded-[18px] md:rounded-[20px] overflow-hidden shadow-2xl border-2 border-[#C2BFBF] bg-white">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  priority
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                  <h3 className="text-white text-sm md:text-base font-semibold leading-snug">
                    {service.title}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Text Animation (Desktop only) */}
      {!isMobile && (
        <div
          ref={textAnimationRef}
          className="absolute w-full h-full flex items-center justify-center"
        >
          <TextAnimation />
        </div>
      )}
    </section>
  );
}