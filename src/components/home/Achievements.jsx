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
`;

export default function Achievements() {
  const [showCertificate, setShowCertificate] = useState(false);
  const [showProjectVideo, setShowProjectVideo] = useState(false);
  const [activeVideo, setActiveVideo] = useState("/assets/videos/video.mp4");

  const sectionRef = useRef(null);
  const imagesRef = useRef(null);
  const textRef = useRef(null);

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
    },
  ];

  // Prevent background scrolling while a modal is open.
  useEffect(() => {
    const modalIsOpen = showCertificate || showProjectVideo;
    document.body.style.overflow = modalIsOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [showCertificate, showProjectVideo]);

  // Close modals with Escape.
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

  // Achievements section animations.
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const q = (selector) => Array.from(root.querySelectorAll(selector));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.remove("ac-pre");
      return;
    }

    const observers = [];
    let refreshTimer;

    const onLoad = () => ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      try {
        const main = q('[data-ac="main"]');
        const mainImg = q('[data-ac="mainimg"]');
        const second = q('[data-ac="second"]');
        const textItems = q('[data-ac="text"]');
        const cards = q(".ac-card");

        gsap.set(main, {
          x: -120,
          clipPath: "inset(0 100% 0 0 round 16px)",
        });

        gsap.set(mainImg, { scale: 1.3 });
        gsap.set(second, { opacity: 0, x: -150, rotate: -6 });
        gsap.set(textItems, { opacity: 0, x: 110 });
        gsap.set(cards, { opacity: 0, y: 70, scale: 0.94 });
        gsap.set(q('[data-ac="icon"]'), { scale: 0 });

        root.classList.remove("ac-pre");

        const imagesTl = gsap
          .timeline({
            paused: true,
            defaults: { ease: "power3.out" },
          })
          .to(main, {
            x: 0,
            clipPath: "inset(0 0% 0 0 round 16px)",
            duration: 1.4,
            ease: "power4.inOut",
          })
          .to(mainImg, { scale: 1, duration: 1.8 }, "<")
          .to(
            second,
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

        const reveal = (list) => {
          const gap = 0.2;

          gsap.to(list, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: gap,
            overwrite: true,
          });

          list.forEach((card, i) => {
            const delay = i * gap;
            const cardImage = card.querySelector('[data-ac="cimg"]');

            if (cardImage) {
              gsap.fromTo(
                cardImage,
                { scale: 1.15 },
                {
                  scale: 1,
                  duration: 1.5,
                  ease: "power3.out",
                  delay,
                },
              );
            }

            gsap.to(card.querySelectorAll('[data-ac="icon"]'), {
              scale: 1,
              duration: 0.6,
              ease: "back.out(2.2)",
              stagger: 0.1,
              delay: delay + 0.5,
            });

            const soon = card.querySelector('[data-ac="soon"]');

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

        const watch = (
          elements,
          callback,
          threshold = 0.15,
          margin = "-8%",
        ) => {
          const validElements = elements.filter(Boolean);
          if (!validElements.length) return;

          const observer = new IntersectionObserver(
            (entries) => {
              const visible = entries.filter((entry) => entry.isIntersecting);
              if (!visible.length) return;

              visible.forEach((entry) => observer.unobserve(entry.target));
              callback(visible.map((entry) => entry.target));
            },
            {
              threshold,
              rootMargin: `0px 0px ${margin} 0px`,
            },
          );

          validElements.forEach((element) => observer.observe(element));
          observers.push(observer);
        };

        watch([imagesRef.current], () => imagesTl.play(), 0, "-5%");
        watch([textRef.current], () => textTween.play());

        watch(cards, (list) =>
          reveal(
            list.sort((a, b) => Number(a.dataset.i) - Number(b.dataset.i)),
          ),
        );

        gsap.fromTo(
          second,
          { y: 30 },
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

        window.addEventListener("load", onLoad);
        refreshTimer = setTimeout(onLoad, 1200);
      } catch (error) {
        console.error("Achievements animation failed:", error);
        gsap.set(root.querySelectorAll("*"), { clearProps: "all" });
        root.classList.remove("ac-pre");
      }
    }, root);

    return () => {
      observers.forEach((observer) => observer.disconnect());
      window.removeEventListener("load", onLoad);
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  const openAchievementVideo = (videoUrl) => {
    if (!videoUrl) return;
    setActiveVideo(videoUrl);
    setShowProjectVideo(true);
  };

  return (
    <section
      ref={sectionRef}
      className="ac-pre w-full mt-8 mb-16 px-2 md:px-16"
    >
      <style>{achievementsCSS}</style>

      <div className="container">
        {/* Top section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 py-10 md:py-16">
          <div
            ref={imagesRef}
            className="relative w-full md:w-1/2 flex flex-col md:flex-row items-center md:justify-start gap-6 md:gap-0"
          >
            <div className="relative w-full lg:block hidden md:max-w-[480px] h-[350px] md:h-[460px] lg:translate-x-10">
              <div
                data-ac="main"
                className="relative w-full h-full overflow-hidden rounded-2xl"
              >
                <div data-ac="mainimg" className="relative w-full h-full">
                  <Image
                    src="/assets/images/achievements/quiet-builder.webp"
                    alt="Muhammed Salman working on web development projects"
                    title="Quiet Builder"
                    fill
                    className="object-cover rounded-2xl"
                    priority
                  />
                </div>
              </div>
            </div>

            <div
              data-ac="second"
              className="ac-h relative w-full h-[350px] md:absolute md:bottom-16 md:-right-6 md:w-[280px] md:h-[290px]"
            >
              <div className="relative w-full h-full animate-floatX">
                <Image
                  src="/assets/images/achievements/debug-hour.webp"
                  alt="working on web development projects at a coding workstation"
                  title="Debug Hours"
                  fill
                  className="object-cover rounded-2xl md:rounded-none border-0 md:border-8 border-[#e9eae5]"
                />
              </div>
            </div>
          </div>

          <div
            ref={textRef}
            className="w-full md:w-1/2 space-y-4 md:space-y-6 text-center md:text-left"
          >
            <h2
              data-ac="text"
              className="ac-h text-secondary font-primary font-bold tracking-wide text-[22px] md:text-[22px]"
            >
              Achievements and Awards
            </h2>

            <h3
              data-ac="text"
              className="ac-h font-secondary text-secondary text-xl md:text-[30px] leading-snug"
            >
              Milestones that reflect <br className="hidden md:block" />
              dedication and growth
            </h3>

            <p
              data-ac="text"
              className="ac-h text-primary font-secondary text-[14px] md:text-lg leading-relaxed"
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

        {/* Achievement cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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
                onKeyDown={(event) => {
                  if (
                    isInteractive &&
                    (event.key === "Enter" || event.key === " ")
                  ) {
                    event.preventDefault();

                    if (isCertificate) {
                      setShowCertificate(true);
                    } else if (isVideoCard) {
                      openAchievementVideo(item.video);
                    }
                  }
                }}
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
                  className={`group h-full flex flex-col bg-[#000080] border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ${
                    item.comingSoon
                      ? "border-dashed border-white/40"
                      : "border-gray-200"
                  }`}
                >
                  {/* Card image / video thumbnail */}
                  <div className="relative w-full h-66 md:h-58 overflow-hidden">
                    <div data-ac="cimg" className="relative w-full h-full">
                      <Image
                        src={item.image}
                        title={item.title}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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

                  {/* Card content */}
                  <div className="p-4 md:p-5 flex-1">
                    <h3 className="text-base md:text-lg font-semibold mb-2 text-white">
                      {item.title}
                    </h3>

                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-4">
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
                        className="inline-flex items-center gap-2 text-white hover:text-pink-400 transition-colors text-sm"
                      >
                        <FaInstagram size={18} />
                        <span>View on Instagram</span>
                      </a>
                    )}

                    {item.socialLinks?.length > 0 && (
                      <div className="flex gap-4 items-center">
                        {item.socialLinks.map((social) => (
                          <a
                            key={social.platform}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            aria-label={social.platform}
                            title={social.platform}
                            className="text-white hover:text-blue-400 transition-colors"
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

      {/* Certificate preview modal */}
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
              className="absolute -right-2 -top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-3xl leading-none text-white shadow-lg transition-colors hover:bg-red-700"
            >
              &times;
            </button>

            <div className="relative mx-auto h-[70vh] w-full sm:h-[82vh]">
              {/* Mobile certificate */}
              <Image
                src="/assets/images/achievements/certificate-potraite.webp"
                alt="Muhammed Salman P N's professional certificate from Luminar Technolab"
                title="Muhammed Salman P N-Luminar Technolab Certificate"
                fill
                sizes="100vw"
                className="object-contain sm:hidden"
                priority
              />

              {/* Desktop and tablet certificate */}
              <Image
                src="/assets/images/achievements/certificate-landscape.webp"
                alt="Muhammed Salman P N's professional certificate from Luminar Technolab"
                title="Muhammed Salman P N-Luminar Technolab Certificate"
                fill
                sizes="(max-width: 768px) 96vw, 90vw"
                className="hidden object-contain sm:block"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Shared video modal for both 3rd and 4th cards */}
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
              className="absolute -right-3 -top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-3xl text-white hover:bg-red-700"
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
