"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaInstagram, FaLinkedinIn, FaPlay } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const achievementsCSS = `
  .ac-pre .ac-h {
    opacity: 0;
  }

  .ac-pre [data-ac="main"] {
    clip-path: inset(0 100% 0 0 round 16px);
  }

  .ac-pre [data-ac="icon"] {
    transform: scale(0);
  }

  @media (prefers-reduced-motion: reduce) {
    .ac-pre .ac-h {
      opacity: 1;
    }

    .ac-pre [data-ac="main"] {
      clip-path: none;
    }

    .ac-pre [data-ac="icon"] {
      transform: none;
    }
  }
`;

const achievements = [
  {
    title: "Employee of the Month",
    alt: "Muhammed Salman receiving Employee of the Month recognition for his professional performance and contribution",
    description:
      "Recognized for my dedication, performance, and contribution to the team.",
    image: "/assets/images/achievements/emp.webp",
    instagramUrl: "https://www.instagram.com/reel/DK1hbMDy2gE/",
    video: "",
    socialLinks: [],
    comingSoon: false,
  },
  {
    title: "Professional Certification",
    alt: "Professional certification recognizing completed training and web development skills",
    description:
      "Successfully completed professional training, strengthening my technical knowledge and web development skills.",
    image: "/assets/images/achievements/certificate-landscape.webp",
    instagramUrl: "",
    video: "",
    socialLinks: [],
    comingSoon: false,
  },
  {
    title: "Project Presentation",
    alt: "Muhammed Salman presenting web development projects and demonstrating frontend development skills",
    description:
      "Presented my web development projects, showcasing my frontend expertise, technical skills, and creative approach to building modern web experiences.",
    image: "/assets/images/achievements/presentation.webp",
    instagramUrl: "",
    video: "/assets/videos/video.mp4",
    socialLinks: [],
    comingSoon: false,
  },
  {
    title: "Future Milestones",
    alt: "Visual representation of continuous learning, professional growth, and future web development goals",
    description:
      "Focused on future goals, embracing modern technologies, building bigger projects, and continuously improving my skills to reach the next level in web development.",
    image: "/assets/images/achievements/growth.webp",
    instagramUrl: "",
    video: "/assets/videos/video3.mp4",
    socialLinks: [],
    comingSoon: false,
  },
];

export default function Achievements() {
  const [showCertificate, setShowCertificate] = useState(false);
  const [showProjectVideo, setShowProjectVideo] = useState(false);
  const [activeVideo, setActiveVideo] = useState("");

  const sectionRef = useRef(null);
  const imagesRef = useRef(null);
  const textRef = useRef(null);

  // Lock body scrolling only while a modal is open.
  // Restore the original styles instead of overwriting them.
  useEffect(() => {
    const modalIsOpen = showCertificate || showProjectVideo;

    if (!modalIsOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [showCertificate, showProjectVideo]);

  // Close the open modal using Escape.
  useEffect(() => {
    if (!showCertificate && !showProjectVideo) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowCertificate(false);
        setShowProjectVideo(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showCertificate, showProjectVideo]);

  // GSAP animations for this section only.
  useEffect(() => {
    const root = sectionRef.current;

    if (!root) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (prefersReducedMotion.matches) {
      root.classList.remove("ac-pre");
      return;
    }

    const queryAll = (selector) => Array.from(root.querySelectorAll(selector));

    const observers = [];
    let refreshTimer;

    const refreshAnimations = () => {
      ScrollTrigger.refresh();
    };

    const ctx = gsap.context(() => {
      const main = queryAll('[data-ac="main"]');
      const mainImages = queryAll('[data-ac="mainimg"]');
      const secondImages = queryAll('[data-ac="second"]');
      const textItems = queryAll('[data-ac="text"]');
      const cards = queryAll(".ac-card");
      const icons = queryAll('[data-ac="icon"]');

      gsap.set(main, {
        x: -120,
        clipPath: "inset(0 100% 0 0 round 16px)",
      });

      gsap.set(mainImages, {
        scale: 1.3,
      });

      gsap.set(secondImages, {
        opacity: 0,
        x: -150,
        rotate: -6,
      });

      gsap.set(textItems, {
        opacity: 0,
        x: 110,
      });

      gsap.set(cards, {
        opacity: 0,
        y: 70,
        scale: 0.94,
      });

      gsap.set(icons, {
        scale: 0,
      });

      root.classList.remove("ac-pre");

      const imagesTimeline = gsap
        .timeline({
          paused: true,
          defaults: {
            ease: "power3.out",
          },
        })
        .to(main, {
          x: 0,
          clipPath: "inset(0 0% 0 0 round 16px)",
          duration: 1.4,
          ease: "power4.inOut",
        })
        .to(
          mainImages,
          {
            scale: 1,
            duration: 1.8,
          },
          "<",
        )
        .to(
          secondImages,
          {
            opacity: 1,
            x: 0,
            rotate: 0,
            duration: 1.2,
          },
          "-=0.9",
        );

      const textTween = gsap.to(textItems, {
        opacity: 1,
        x: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.16,
        paused: true,
      });

      const revealCards = (visibleCards) => {
        const gap = 0.2;

        gsap.to(visibleCards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: gap,
          overwrite: true,
        });

        visibleCards.forEach((card, index) => {
          const delay = index * gap;
          const cardImage = card.querySelector('[data-ac="cimg"]');
          const cardIcons = card.querySelectorAll('[data-ac="icon"]');
          const soon = card.querySelector('[data-ac="soon"]');

          if (cardImage) {
            gsap.fromTo(
              cardImage,
              {
                scale: 1.15,
              },
              {
                scale: 1,
                duration: 1.5,
                ease: "power3.out",
                delay,
              },
            );
          }

          if (cardIcons.length) {
            gsap.to(cardIcons, {
              scale: 1,
              duration: 0.6,
              ease: "back.out(2.2)",
              stagger: 0.1,
              delay: delay + 0.5,
            });
          }

          if (soon) {
            gsap.to(soon, {
              opacity: 0.4,
              duration: 1.2,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: delay + 1,
            });
          }
        });
      };

      const observeElements = (
        elements,
        callback,
        threshold = 0.15,
        bottomMargin = "-8%",
      ) => {
        const validElements = elements.filter(Boolean);

        if (!validElements.length) return;

        const observer = new IntersectionObserver(
          (entries) => {
            const visibleEntries = entries.filter(
              (entry) => entry.isIntersecting,
            );

            if (!visibleEntries.length) return;

            visibleEntries.forEach((entry) => {
              observer.unobserve(entry.target);
            });

            callback(visibleEntries.map((entry) => entry.target));
          },
          {
            threshold,
            rootMargin: `0px 0px ${bottomMargin} 0px`,
          },
        );

        validElements.forEach((element) => observer.observe(element));
        observers.push(observer);
      };

      observeElements(
        [imagesRef.current],
        () => imagesTimeline.play(),
        0,
        "-5%",
      );

      observeElements([textRef.current], () => textTween.play());

      observeElements(cards, (visibleCards) => {
        visibleCards.sort((a, b) => Number(a.dataset.i) - Number(b.dataset.i));

        revealCards(visibleCards);
      });

      // Keep the subtle scroll parallax effect.
      gsap.fromTo(
        secondImages,
        {
          y: 30,
        },
        {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: imagesRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );

      window.addEventListener("load", refreshAnimations);

      refreshTimer = window.setTimeout(refreshAnimations, 1200);
    }, root);

    return () => {
      observers.forEach((observer) => observer.disconnect());

      window.removeEventListener("load", refreshAnimations);
      window.clearTimeout(refreshTimer);

      // Clean up only animations created by this component.
      ctx.revert();
    };
  }, []);

  const openAchievementVideo = (videoUrl) => {
    if (!videoUrl) return;

    setActiveVideo(videoUrl);
    setShowProjectVideo(true);
  };

  const handleAchievementKeyDown = (event, item) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();

    if (item.title === "Professional Certification") {
      setShowCertificate(true);
    } else if (item.video) {
      openAchievementVideo(item.video);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="ac-pre mt-8 mb-16 w-full px-2 md:px-16"
    >
      <style>{achievementsCSS}</style>

      <div className="container">
        {/* TOP SECTION */}
        <div className="flex flex-col items-center justify-between gap-10 py-10 md:flex-row md:gap-16 md:py-16">
          <div
            ref={imagesRef}
            className="relative flex w-full flex-col items-center gap-6 md:w-1/2 md:flex-row md:justify-start md:gap-0"
          >
            <div className="relative hidden h-[350px] w-full md:h-[460px] md:max-w-[480px] lg:block lg:translate-x-10">
              <div
                data-ac="main"
                className="relative h-full w-full overflow-hidden rounded-2xl"
              >
                <div data-ac="mainimg" className="relative h-full w-full">
                  <Image
                    src="/assets/images/achievements/quiet-builder.webp"
                    alt="Muhammed Salman working on web development projects"
                    title="Quiet Builder"
                    fill
                    sizes="(min-width: 1024px) 480px, 0px"
                    className="rounded-2xl object-cover"
                  />
                </div>
              </div>
            </div>

            <div
              data-ac="second"
              className="ac-h relative h-[350px] w-full md:absolute md:right-[-24px] md:bottom-16 md:h-[290px] md:w-[280px]"
            >
              <div className="relative h-full w-full animate-floatX">
                <Image
                  src="/assets/images/achievements/debug-hour.webp"
                  alt="Working on web development projects at a coding workstation"
                  title="Debug Hours"
                  fill
                  sizes="(max-width: 767px) 96vw, 280px"
                  className="rounded-2xl border-0 object-cover md:rounded-none md:border-8 md:border-[#e9eae5]"
                />
              </div>
            </div>
          </div>

          <div
            ref={textRef}
            className="w-full space-y-4 text-center md:w-1/2 md:space-y-6 md:text-left"
          >
            <h2
              data-ac="text"
              className="ac-h font-primary text-[22px] font-bold tracking-wide text-secondary"
            >
              Achievements and Awards
            </h2>

            <h3
              data-ac="text"
              className="ac-h font-secondary text-xl leading-snug text-secondary md:text-[30px]"
            >
              Milestones that reflect <br className="hidden md:block" />
              dedication and growth
            </h3>

            <p
              data-ac="text"
              className="ac-h font-secondary text-[14px] leading-relaxed text-primary md:text-lg"
            >
              Over the years, I have consistently focused on improving my
              skills, delivering high-quality projects, and pushing creative
              boundaries. From successfully completing real-world client
              projects to earning recognition for technical excellence, each
              achievement represents my commitment to continuous learning and
              innovation. These milestones highlight not just awards and
              certifications, but also the trust earned from clients,
              collaboration with teams, and the passion that drives my journey
              as a developer.
            </p>
          </div>
        </div>

        {/* ACHIEVEMENT CARDS */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {achievements.map((item, index) => {
            const isCertificate = index === 1;
            const isVideoCard = Boolean(item.video);
            const isInteractive = isCertificate || isVideoCard;

            return (
              <div
                key={item.title}
                data-i={index}
                className={`ac-card ac-h ${
                  isInteractive ? "cursor-pointer" : ""
                }`}
                onClick={() => {
                  if (isCertificate) {
                    setShowCertificate(true);
                  } else if (isVideoCard) {
                    openAchievementVideo(item.video);
                  }
                }}
                onKeyDown={(event) => handleAchievementKeyDown(event, item)}
                role={isInteractive ? "button" : undefined}
                tabIndex={isInteractive ? 0 : undefined}
                aria-label={
                  isCertificate
                    ? "View professional certificate"
                    : isVideoCard
                      ? `Play ${item.title} video`
                      : undefined
                }
              >
                <div
                  className={`group flex h-full flex-col overflow-hidden rounded-2xl border bg-[#000080] shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                    item.comingSoon
                      ? "border-dashed border-white/40"
                      : "border-gray-200"
                  }`}
                >
                  {/* CARD IMAGE */}
                  <div className="relative h-66 w-full overflow-hidden md:h-58">
                    <div data-ac="cimg" className="relative h-full w-full">
                      <Image
                        src={item.image}
                        title={item.title}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 640px) 96vw, (max-width: 1023px) 46vw, 23vw"
                        className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                          item.comingSoon ? "grayscale opacity-60" : ""
                        }`}
                      />

                      {isVideoCard && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-300 group-hover:bg-black/40">
                          <div
                            data-ac="icon"
                            className="flex h-14 w-14 items-center justify-center rounded-full border border-white/70 bg-white/20 text-white shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
                          >
                            <FaPlay
                              className="ml-1 h-5 w-5"
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CARD CONTENT */}
                  <div className="flex-1 p-4 md:p-5">
                    <h3 className="mb-2 text-base font-semibold text-white md:text-lg">
                      {item.title}
                    </h3>

                    <p className="mb-4 text-xs leading-relaxed text-gray-300 md:text-sm">
                      {item.description}
                    </p>

                    {isCertificate && (
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setShowCertificate(true);
                        }}
                        className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-sm text-white transition-colors duration-200 hover:bg-white hover:text-[#000080]"
                      >
                        View Certificate
                      </button>
                    )}

                    {item.instagramUrl && (
                      <a
                        href={item.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`View ${item.title} on Instagram`}
                        aria-label={`View ${item.title} on Instagram`}
                        onClick={(event) => event.stopPropagation()}
                        className="inline-flex items-center gap-2 text-sm text-white transition-colors hover:text-pink-400"
                      >
                        <FaInstagram size={18} aria-hidden="true" />
                        <span>View on Instagram</span>
                      </a>
                    )}

                    {item.socialLinks?.length > 0 && (
                      <div className="flex items-center gap-4">
                        {item.socialLinks.map((social) => (
                          <a
                            key={social.platform}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            aria-label={social.platform}
                            title={social.platform}
                            className="text-white transition-colors hover:text-blue-400"
                          >
                            {social.platform === "LinkedIn" && (
                              <FaLinkedinIn size={18} aria-hidden="true" />
                            )}

                            {social.platform === "Instagram" && (
                              <FaInstagram size={18} aria-hidden="true" />
                            )}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CERTIFICATE MODAL */}
      {showCertificate && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6"
          onClick={() => setShowCertificate(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Certificate preview"
        >
          <div
            className="relative w-full max-w-6xl rounded-xl bg-white p-2 shadow-2xl sm:p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowCertificate(false)}
              aria-label="Close certificate preview"
              className="absolute -top-2 -right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-3xl leading-none text-white shadow-lg transition-colors hover:bg-red-700"
            >
              &times;
            </button>

            <div className="relative mx-auto h-[70vh] w-full sm:h-[82vh]">
              <Image
                src="/assets/images/achievements/certificate-potraite.webp"
                alt="Muhammed Salman P N's professional certificate from Luminar Technolab"
                title="Muhammed Salman P N-Luminar Technolab Certificate"
                fill
                sizes="(max-width: 639px) 96vw, 0px"
                className="object-contain sm:hidden"
              />

              <Image
                src="/assets/images/achievements/certificate-landscape.webp"
                alt="Muhammed Salman P N's professional certificate from Luminar Technolab"
                title="Muhammed Salman P N-Luminar Technolab Certificate"
                fill
                sizes="(min-width: 640px) 90vw, 0px"
                className="hidden object-contain sm:block"
              />
            </div>
          </div>
        </div>
      )}

      {/* VIDEO MODAL */}
      {showProjectVideo && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setShowProjectVideo(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Achievement video player"
        >
          <div
            className="relative w-full max-w-3xl rounded-xl bg-black p-3 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowProjectVideo(false)}
              aria-label="Close video"
              className="absolute -top-3 -right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-3xl text-white hover:bg-red-700"
            >
              &times;
            </button>

            <video
              key={activeVideo}
              src={activeVideo}
              title={
                activeVideo === "/assets/videos/video.mp4"
                  ? "Project Presentation Video"
                  : activeVideo === "/assets/videos/video3.mp4"
                    ? "Future Milestones Video"
                    : "Achievement Video"
              }
              aria-label={
                activeVideo === "/assets/videos/video.mp4"
                  ? "Watch the project presentation video"
                  : activeVideo === "/assets/videos/video3.mp4"
                    ? "Watch the future milestones video"
                    : "Watch the achievement video"
              }
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="max-h-[80vh] w-full rounded-lg object-cover md:object-contain"
              onError={() => {
                console.error("Unable to load achievement video:", activeVideo);
              }}
            >
              Your browser does not support video playback.
            </video>
          </div>
        </div>
      )}
    </section>
  );
}
