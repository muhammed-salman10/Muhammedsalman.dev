// src/components/home/services/MovableCards.jsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextAnimation from "./TextAnimation";

gsap.registerPlugin(ScrollTrigger);

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
      image: "/assets/images/services/responsive.jpg",
      rotate: "-10deg",
    },
    {
      title: "Front-End Web Development",
      image: "/assets/images/services/front-end-development.jpg",
      rotate: "-2deg",
    },
  ];

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
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center 
      lg:min-h-[100vh] min-h-[90vh] overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Top Content */}
      <div
        ref={contentRef}
        className="absolute top-8 flex flex-col items-center text-center px-4 py-6"
      >
        <span className="lg:text-[38px] text-[26px] font-bold text-[#000080] font-primary tracking-wide ">
          Our Services
        </span>

        <p className="mt-3 lg:max-w-2xl text-primary text-[15px] md:text-[18px] leading-relaxed font-secondary">
          I design and develop modern, high-performance web applications that
          blend creativity with functionality. From responsive interfaces to
          scalable front-end architectures, I transform ideas into seamless
          digital experiences that elevate brands and drive business growth.
        </p>
      </div>

      {/* Main Heading */}
      <h2
        ref={mainHeadingRef}
        className="text-center font-primary select-none font-semibold text-[#000080] leading-tight
        md:text-[clamp(2rem,7vw,6rem)] lg:text-[50px] text-[30px] lg:mt-10 mt-24"
      >
        Delivering Digital <br /> Solutions
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
