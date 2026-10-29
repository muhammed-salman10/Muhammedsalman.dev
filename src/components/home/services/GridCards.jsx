"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaEye } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Front-End Development",
    images: [
      {
        src: "/assets/images/services/frontend-development-1.webp",
        alt: "Front-end web development interface built with modern web technologies",
        title: "Front-End Web Development",
      },
      {
        src: "/assets/images/services/frontend-development-2.webp",
        alt: "Modern website interface showcasing front-end development",
        title: "Modern Front-End Interface",
      },
      {
        src: "/assets/images/services/frontend-development.webp",
        alt: "Front-end development project with a responsive user interface",
        title: "Front-End Development Project",
      },
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
      {
        src: "/assets/images/services/responsive-design-1.webp",
        alt: "Responsive website layout adapted for mobile, tablet, and desktop screens",
        title: "Responsive Website Design",
      },
      {
        src: "/assets/images/services/responsive-design.webp",
        alt: "Responsive user interface designed for multiple screen sizes",
        title: "Responsive UI Design",
      },
      {
        src: "/assets/images/services/responsive-design-2.webp",
        alt: "Mobile-first web interface with a flexible responsive layout",
        title: "Mobile-First UI Development",
      },
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
      {
        src: "/assets/images/services/admin-dashboard.webp",
        alt: "Admin dashboard interface for website data and management",
        title: "Admin Dashboard Development",
      },
      {
        src: "/assets/images/services/admin-dashboard-2.webp",
        alt: "Dashboard interface displaying structured data and analytics",
        title: "Dashboard Analytics Interface",
      },
      {
        src: "/assets/images/services/admin-dashboard-1.webp",
        alt: "Admin panel interface with organized management tools",
        title: "Custom Admin Panel",
      },
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
      {
        src: "/assets/images/services/website-optimization.webp",
        alt: "Website redesign and optimization for a modern user experience",
        title: "Website Redesign and Optimization",
      },
      {
        src: "/assets/images/services/website-optimization-1.webp",
        alt: "Website performance optimization and modern interface design",
        title: "Website Performance Optimization",
      },
      {
        src: "/assets/images/services/website-optimization-2.webp",
        alt: "Modernized website layout with an improved visual structure",
        title: "Modern Website Redesign",
      },
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

export default function GridCards() {
  const sectionRef = useRef(null);
  const leftImageRef = useRef(null);
  const cardsRef = useRef(null);

  const [activeCard, setActiveCard] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Desktop GSAP animation with component-specific cleanup.
  useEffect(() => {
    const section = sectionRef.current;
    const leftImage = leftImageRef.current;
    const cards = cardsRef.current;

    if (!section || !leftImage || !cards) return;

    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (!desktopQuery.matches || reducedMotionQuery.matches) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1500",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline.fromTo(
        leftImage,
        { y: -300, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "bounce.out",
        },
      );

      timeline.fromTo(
        cards.children,
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
    }, section);

    return () => {
      // Revert only this component's GSAP animations and ScrollTriggers.
      ctx.revert();
    };
  }, []);

  // Close the modal with Escape.
  useEffect(() => {
    if (!activeCard) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveCard(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeCard]);

  // Lock background scrolling while the modal is open.
  useEffect(() => {
    if (!activeCard) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;

    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";

    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    setCurrentImageIndex(0);

    return () => {
      // Restore the styles that existed before opening the modal.
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [activeCard]);

  // Rotate gallery images while the modal is open.
  useEffect(() => {
    if (!activeCard) return;

    const imageCount = activeCard.images.length;

    if (imageCount <= 1) return;

    const interval = window.setInterval(() => {
      setCurrentImageIndex((previousIndex) =>
        previousIndex >= imageCount - 1 ? 0 : previousIndex + 1,
      );
    }, 2000);

    return () => {
      window.clearInterval(interval);
    };
  }, [activeCard]);

  const currentImage = activeCard ? activeCard.images[currentImageIndex] : null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden px-4 py-16 sm:px-6 md:px-16 md:py-24"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-10 md:gap-12 lg:flex-row lg:items-center">
        {/* LEFT VIDEO */}
        <div
          ref={leftImageRef}
          className="h-[250px] w-full overflow-hidden rounded-2xl shadow-xl sm:h-[320px] md:h-[400px] lg:h-[450px] lg:w-1/2"
        >
          <video
            src="/assets/videos/video-2.mp4"
            title="Coding AI Video"
            aria-label="Web development project showcase video by Muhammed Salman"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="h-full w-full object-cover"
          />
        </div>

        {/* RIGHT SERVICE CARDS */}
        <div ref={cardsRef} className="flex w-full flex-col gap-6 lg:w-1/2">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-md transition hover:shadow-2xl"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={service.images[0].src}
                  alt={service.images[0].alt}
                  title={service.images[0].title}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="text-[15px] font-bold text-[#000080] lg:text-lg">
                  {service.title}
                </h4>

                <p className="text-[13px] text-gray-600 lg:text-sm">
                  {service.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveCard(service)}
                aria-label={`View ${service.title} details and images`}
                className="shrink-0 text-[#000080] transition hover:scale-110"
              >
                <FaEye size={20} aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICE DETAILS MODAL */}
      {activeCard && currentImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setActiveCard(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
            className="relative max-h-[75vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 lg:max-w-[35%]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveCard(null)}
              aria-label="Close service details"
              className="absolute right-4 top-4 text-xl text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <div className="relative mb-4 mt-5 h-55 w-full overflow-hidden rounded-xl lg:h-82">
              <Image
                key={currentImage.src}
                src={currentImage.src}
                alt={currentImage.alt}
                title={currentImage.title}
                fill
                sizes="(max-width: 767px) 90vw, 450px"
                className="object-cover transition-opacity duration-700"
              />
            </div>

            {/* GALLERY INDICATORS */}
            <div
              className="mt-2 flex justify-center gap-2"
              role="group"
              aria-label="Service image gallery"
            >
              {activeCard.images.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`Show image ${index + 1} of ${activeCard.title}`}
                  aria-pressed={currentImageIndex === index}
                  className={`h-2 w-2 rounded-full transition ${
                    currentImageIndex === index ? "bg-[#000080]" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <h3
              id="service-modal-title"
              className="mt-4 mb-3 font-bold text-[#000080] lg:text-2xl"
            >
              {activeCard.title}
            </h3>

            <p className="mb-4 text-[14px] leading-relaxed text-gray-700 lg:text-base">
              {activeCard.details}
            </p>

            <ul className="list-disc space-y-2 pl-5 text-[14px] text-gray-600 lg:text-base">
              {activeCard.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
