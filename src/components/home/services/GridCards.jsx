"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaEye } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function GridCards() {
  const sectionRef = useRef(null);
  const leftImageRef = useRef(null);
  const cardsRef = useRef(null);

  const [activeCard, setActiveCard] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const services = [
    {
      title: "Front-End Development",
      images: [
        "/assets/images/services/front-end-development.jpg",
        "/assets/images/services/front-end-1.jpg",
        "/assets/images/services/front-end-2.jpg",
      ],
      description: "Modern, scalable web applications using React & Next.js.",
      details:
        "I build fast, scalable, and production-ready web applications using React, Next.js, and Tailwind CSS. My focus is on performance, clean architecture, reusable components, and SEO-friendly structure.",
      features: [
        "Modern responsive websites",
        "Pixel-perfect UI implementation",
        "Component-based architecture",
        "SEO-friendly and optimized structure",
      ],
    },
    {
      title: "Responsive UI Development",
      images: [
        "/assets/images/services/responsive.jpg",
        "/assets/images/services/responsive-3.jpg",
        "/assets/images/services/responsive-2.jpg",
      ],
      description: "Mobile-first responsive interfaces across all devices.",
      details:
        "I design mobile-first user interfaces that adapt seamlessly across devices using CSS Grid, Flexbox, and performance optimization techniques.",
      features: [
        "Mobile-first approach",
        "Cross-browser compatibility",
        "CSS Grid & Flexbox layouts",
        "Performance optimization",
      ],
    },
    {
      title: "Admin Dashboard Development",
      images: [
        "/assets/images/services/admin-dashboard.jpg",
        "/assets/images/services/admin-dashboard-1.jpg",
        "/assets/images/services/dashboard-2.jpg",
      ],
      description: "Structured dashboards with analytics & data management.",
      details:
        "I develop structured and scalable admin dashboards with interactive charts, clean UI architecture, and reusable components.",
      features: [
        "Custom admin panels",
        "Analytics dashboards & charts",
        "Reports & data integration",
        "Clean component-based structure",
      ],
    },
    {
      title: "Website Redesign & Optimization",
      images: [
        "/assets/images/services/seo.jpg",
        "/assets/images/services/seo-1.jpg",
        "/assets/images/services/seo-2.jpg",
      ],
      description: "Transforming outdated websites into modern platforms.",
      details:
        "I modernize and optimize existing websites by improving UI design, restructuring code, and enhancing speed performance.",
      features: [
        "UI modernization",
        "Speed optimization",
        "Code refactoring",
        "Improved UX structure",
      ],
    },
  ];

  // GSAP animation (Desktop only)
  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=1500",
        scrub: true,
        pin: true,
      },
    });

    tl.fromTo(
      leftImageRef.current,
      { y: -300, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "bounce.out" },
    );

    tl.fromTo(
      cardsRef.current.children,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.5",
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  // ESC close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setActiveCard(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock background scroll
  useEffect(() => {
    if (activeCard) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
      setCurrentImageIndex(0);
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, [activeCard]);

  // Auto image change
  useEffect(() => {
    if (!activeCard) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === activeCard.images.length - 1 ? 0 : prev + 1,
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [activeCard]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 px-4 sm:px-6 md:px-16 overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full max-w-7xl mx-auto gap-10 md:gap-12">
        {/* LEFT VIDEO */}
        <div
          ref={leftImageRef}
          className="w-full lg:w-1/2 h-[250px] sm:h-[320px] md:h-[400px] lg:h-[450px] rounded-2xl shadow-xl overflow-hidden"
        >
          <video
            src="/assets/videos/video-2.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT CARDS */}
        <div ref={cardsRef} className="flex flex-col gap-6 w-full lg:w-1/2">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-4 flex items-center gap-4 hover:shadow-2xl transition"
            >
              <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                <Image
                  src={service.images[0]}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <h4 className="lg:text-lg text-[15px] font-bold text-[#000080]">
                  {service.title}
                </h4>
                <p className="lg:text-sm text-[13px] text-gray-600">
                  {service.description}
                </p>
              </div>

              <button
                onClick={() => setActiveCard(service)}
                className="text-[#000080] hover:scale-110 transition"
              >
                <FaEye size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {activeCard && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setActiveCard(null)}
        >
          <div
            className="bg-white w-full max-w-md lg:max-w-[35%] rounded-2xl max-h-[75vh] overflow-y-auto p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveCard(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            <div className="relative w-full lg:h-82 h-55 rounded-xl overflow-hidden mb-4 mt-5">
              <Image
                key={currentImageIndex}
                src={activeCard.images[currentImageIndex]}
                alt={activeCard.title}
                fill
                className="object-cover transition-opacity duration-700"
              />
            </div>

            {/* Dots */}
            <div className="flex justify-center mt-2 gap-2">
              {activeCard.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    currentImageIndex === index ? "bg-[#000080]" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <h3 className="lg:text-2xl font-bold text-[#000080] mt-4 mb-3">
              {activeCard.title}
            </h3>

            <p className="lg:text-base text-[14px] text-gray-700 mb-4 leading-relaxed">
              {activeCard.details}
            </p>

            <ul className="list-disc pl-5 space-y-2 lg:text-base text-[14px] text-gray-600">
              {activeCard.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
