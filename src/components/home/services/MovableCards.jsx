"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextAnimation from "./TextAnimation";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Website Optimization & Redesign",
    image: "/assets/images/services/website-optimization.webp",
    alt: "Website optimization and redesign service for improved user experience and modern web design",
    rotate: "12deg",
  },
  {
    title: "Admin Dashboard Development",
    image: "/assets/images/services/admin-dashboard.webp",
    alt: "Custom admin dashboard development with a clean and organized user interface",
    rotate: "8deg",
  },
  {
    title: "Responsive UI Design",
    image: "/assets/images/services/responsive-design.webp",
    alt: "Responsive user interface design for mobile, tablet, and desktop screens",
    rotate: "-10deg",
  },
  {
    title: "Front-End Web Development",
    image: "/assets/images/services/frontend-development.webp",
    alt: "Front-end web development using modern web technologies and responsive layouts",
    rotate: "-2deg",
  },
];

const movableCSS = `
@keyframes mvUp {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes mvLine {
  from {
    transform: translateY(110%);
  }
  to {
    transform: none;
  }
}

@keyframes mvCard {
  from {
    opacity: 0;
    transform: translateY(90px) scale(.8) rotate(-6deg);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.mv-pre .mv-up,
.mv-pre .mv-card {
  opacity: 0;
}

.mv-pre .mv-line {
  transform: translateY(110%);
}

.mv-line-wrap {
  display: block;
  overflow: hidden;
  padding-bottom: .1em;
}

.mv-line {
  display: block;
}

.mv-anim .mv-up {
  animation: mvUp .8s cubic-bezier(.22,1,.36,1) backwards;
  animation-delay: var(--d, 0ms);
}

.mv-anim .mv-line {
  animation: mvLine .9s cubic-bezier(.22,1,.36,1) backwards;
  animation-delay: var(--d, 0ms);
}

.mv-anim .mv-card {
  animation: mvCard 1s cubic-bezier(.22,1,.36,1) backwards;
  animation-delay: var(--d, 0ms);
}

@media (prefers-reduced-motion: reduce) {
  .mv-anim .mv-up,
  .mv-anim .mv-line,
  .mv-anim .mv-card {
    animation: none !important;
  }
}
`;

export default function MovableCards() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const contentRef = useRef(null);
  const mainHeadingRef = useRef(null);
  const textAnimationRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  // Observe the section once; stop observing after its entrance animation starts.
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) {
      section.classList.remove("mv-pre");
      section.classList.add("mv-anim");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        section.classList.remove("mv-pre");
        section.classList.add("mv-anim");
        observer.disconnect();
      },
      { threshold: 0.3 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Track only the mobile breakpoint instead of running state updates
  // on every window resize event.
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const updateScreenSize = () => {
      setIsMobile((previous) =>
        previous === mediaQuery.matches ? previous : mediaQuery.matches,
      );
    };

    updateScreenSize();
    mediaQuery.addEventListener("change", updateScreenSize);

    return () => {
      mediaQuery.removeEventListener("change", updateScreenSize);
    };
  }, []);

  // Keep GSAP animations scoped to this section so cleanup does not
  // kill ScrollTriggers belonging to other components.
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) return;

    const cards = cardsRef.current.filter(Boolean);
    const content = contentRef.current;
    const heading = mainHeadingRef.current;
    const animatedText = textAnimationRef.current;

    const ctx = gsap.context(() => {
      if (!isMobile && animatedText) {
        gsap.set(animatedText, {
          x: "100%",
          opacity: 0,
        });
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: isMobile ? "+=900" : "+=2500",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Cards move upward and fade out.
      timeline.to(cards, {
        y: -500,
        opacity: 0,
        stagger: {
          each: 0.3,
          from: "end",
        },
        ease: "power2.inOut",
      });

      // Content and heading move out of view.
      timeline.to(
        [content, heading].filter(Boolean),
        {
          xPercent: -150,
          opacity: 0,
          ease: "power2.inOut",
          duration: 1,
        },
        "-=0.4",
      );

      // Text animation runs only on desktop.
      if (!isMobile && animatedText) {
        timeline.to(
          animatedText,
          {
            x: "0%",
            opacity: 1,
            ease: "power3.out",
            duration: 1.2,
          },
          "-=0.2",
        );
      }
    }, section);

    return () => {
      ctx.revert();
    };
  }, [isMobile]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="mv-pre relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:min-h-screen lg:px-8"
    >
      <style>{movableCSS}</style>

      {/* TOP CONTENT */}
      <div
        ref={contentRef}
        className="absolute top-8 flex flex-col items-center px-4 py-6 text-center"
      >
        <h2
          style={{ "--d": "100ms" }}
          className="mv-up font-primary text-[26px] font-bold tracking-wide text-secondary lg:text-[38px]"
        >
          Our Services
        </h2>

        <p
          style={{ "--d": "250ms" }}
          className="mv-up mt-3 font-secondary text-[15px] leading-relaxed text-primary md:text-[18px] lg:max-w-2xl"
        >
          I design and develop modern, high-performance web applications that
          blend creativity with functionality. From responsive interfaces to
          scalable front-end architectures, I transform ideas into seamless
          digital experiences that elevate brands and drive business growth.
        </p>
      </div>

      {/* MAIN HEADING */}
      <h3
        ref={mainHeadingRef}
        className="select-none text-center font-primary text-[30px] font-semibold leading-tight text-[#000080] md:text-[clamp(2rem,7vw,6rem)] lg:mt-10 lg:text-[50px]"
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
      </h3>

      {/* IMAGE STACK */}
      <div className="absolute left-1/2 top-[380px] z-10 mt-20 h-[160px] w-[160px] -translate-x-1/2 -translate-y-1/2 sm:h-[190px] sm:w-[190px] md:h-[210px] md:w-[210px] lg:h-[240px] lg:w-[240px]">
        {services.map((service, index) => (
          <div
            key={service.title}
            ref={(element) => {
              cardsRef.current[index] = element;
            }}
            style={{
              transform: `rotate(${service.rotate})`,
              backfaceVisibility: "hidden",
            }}
            className="absolute h-[230px] w-[180px] sm:h-[220px] sm:w-[180px] md:h-[290px] md:w-[250px]"
          >
            {/* Inner wrapper keeps entrance animation separate from GSAP transforms. */}
            <div
              style={{ "--d": `${700 + index * 140}ms` }}
              className="mv-card h-full w-full transition-transform duration-300 hover:scale-[1.04]"
            >
              <div className="relative h-full w-full overflow-hidden rounded-[16px] border-2 border-[#C2BFBF] bg-white shadow-2xl sm:rounded-[18px] md:rounded-[20px]">
                <Image
                  src={service.image}
                  alt={service.alt}
                  title={service.title}
                  fill
                  sizes="(max-width: 767px) 180px, 250px"
                  className="object-cover"
                />

                <div className="absolute inset-0 flex items-end bg-black/40 p-4">
                  <h4 className="text-sm font-semibold leading-snug text-white md:text-base">
                    {service.title}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP TEXT ANIMATION */}
      {!isMobile && (
        <div
          ref={textAnimationRef}
          className="absolute flex h-full w-full items-center justify-center"
        >
          <TextAnimation />
        </div>
      )}
    </section>
  );
}
