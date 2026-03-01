"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

function TextAnimation() {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
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
  }, []);

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
                src="/assets/images/services/contact-3.jpeg"
                alt="UI Preview"
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
                ? "opacity-100 scale-100  w-[60px] h-[30px] sm:w-[80px] sm:h-[40px] md:w-[100px] md:h-[50px] animate-fade-in-left"
                : "opacity-0 scale-0 w-0 h-0"
            }`}
          >
            <Image
              src="/assets/images/services/vision.jpg"
              alt="Service Icon"
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
            "/assets/images/services/front-end-development.jpg",
            "/assets/images/services/responsive.jpg",
            "/assets/images/services/admin-dashboard.jpg",
            "/assets/images/services/seo.jpg",
          ].map((src, i) => (
            <div
              key={i}
              className={`relative rounded-full overflow-hidden transition-all duration-700 ease-out origin-right
        ${
          animate
            ? "opacity-100 scale-100 w-[60px] h-[60px] sm:w-[75px] sm:h-[75px] md:w-[90px] md:h-[90px] animate-fade-in-right"
            : "opacity-0 scale-0 w-0 h-0"
        }`}
              style={{
                marginLeft: i === 0 ? "0px" : "-20px", // 🔥 Overlap all except first
                transitionDelay: animate ? `${i * 150}ms` : "0ms",
              }}
            >
              <Image
                src={src}
                alt="Service Preview"
                fill
                className="object-cover"
                priority
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TextAnimation;
