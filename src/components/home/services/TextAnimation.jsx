"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

function TextAnimation() {
  const [animate, setAnimate] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  // 🔥 Detect screen size
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // 🔥 Intersection Observer (only for desktop)
  useEffect(() => {
    if (isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          setTimeout(() => setAnimate(true), 500);
        } else {
          setAnimate(false);
        }
      },
      { threshold: 0.7 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [isMobile]);

  // 🔥 Hide completely on mobile
  if (isMobile) return null;

  return (
    <section
      ref={sectionRef}
      className="flex items-center justify-center px-4 overflow-hidden"
    >
      <div>
        {/* 🔥 Main Animated Text */}
        <p className="text-[24px] md:text-[40px] lg:text-[60px] max-w-full md:max-w-[1000px] font-[400] leading-snug flex flex-wrap items-center justify-center text-center">
          Building more than websites crafting{" "}
          <span className="flex items-center mx-1">
            Digital Excellence.
            <span
              className={`relative rounded-full flex items-center justify-center ml-2 overflow-hidden transition-all duration-700 ease-out origin-right ${
                animate
                  ? "opacity-100 scale-100 md:w-[80px] w-[50px] md:h-[80px] h-[50px] animate-fade-in-right"
                  : "opacity-0 scale-0 w-0 h-0"
              }`}
            >
              <Image
                src="/assets/images/office-hours.webp"
                alt="Muhammed Salman, Web Developer, seated in an office"
                title="Muhammed Salman-Web Developer"
                fill
                className="object-cover"
                priority
              />
            </span>
            <span className="text-[#000080] ml-2">Performance,</span>
          </span>
          <span className="text-[#000080]">Scalability</span>
          <span
            className={`relative ml-2 transition-all duration-700 ease-out origin-left ${
              animate
                ? "opacity-100 scale-100 w-[60px] h-[30px] sm:w-[80px] sm:h-[40px] md:w-[100px] md:h-[50px] animate-fade-in-left"
                : "opacity-0 scale-0 w-0 h-0"
            }`}
          >
            <Image
              src="/assets/images/services/vision.webp"
              alt="Visual representation of a modern web development vision"
              title="Modern Web Development Vision"
              fill
              className="drop-shadow-lg object-contain"
              priority
            />
          </span>
          <span className="text-[#000080] ml-2">Modern Interfaces.</span>
        </p>

        {/* 🔥 Animated Circular Images */}

        <div className="flex items-center justify-end px-8 mt-6">
          {[
            {
              src: "/assets/images/services/frontend-development-1.webp",
              alt: "Front-end web development with modern user interfaces",
              title: "Front-End Web Development",
            },
            {
              src: "/assets/images/services/responsive-design.webp",
              alt: "Responsive website design for mobile, tablet, and desktop",
              title: "Responsive Web Design",
            },
            {
              src: "/assets/images/services/admin-dashboard.webp",
              alt: "Admin dashboard interface for managing website data",
              title: "Admin Dashboard Development",
            },
            {
              src: "/assets/images/services/website-optimization.webp",
              alt: "Website optimization for improved performance and user experience",
              title: "Website Optimization",
            },
          ].map((service, i) => (
            <div
              key={service.src}
              className={`relative rounded-full overflow-hidden transition-all duration-700 ease-out origin-right
        ${
          animate
            ? "opacity-100 scale-100 w-[60px] h-[60px] sm:w-[75px] sm:h-[75px] md:w-[90px] md:h-[90px] animate-fade-in-right"
            : "opacity-0 scale-0 w-0 h-0"
        }`}
              style={{
                marginLeft: i === 0 ? "0px" : "-20px",
                transitionDelay: animate ? `${i * 150}ms` : "0ms",
              }}
            >
              <Image
                src={service.src}
                alt={service.alt}
                title={service.title}
                fill
                sizes="(max-width: 639px) 60px, (max-width: 767px) 75px, 90px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TextAnimation;
