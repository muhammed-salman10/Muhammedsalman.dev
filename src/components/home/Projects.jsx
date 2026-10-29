"use client";

import React, { useState, useEffect, useRef } from "react";
import projectsData from "@/src/data/projectsData.json";
import Image from "next/image";

const portfolioCSS = `
@keyframes pfUp {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pfCard {
  from {
    opacity: 0;
    transform: translateY(56px) scale(.92);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes pfHint {
  0%, 100% { opacity: .55; }
  50% { opacity: 1; }
}

.backface-hidden {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.pf-pre .pf-up {
  opacity: 0;
}

.pf-anim .pf-up {
  animation: pfUp .8s cubic-bezier(.22, 1, .36, 1) backwards;
  animation-delay: var(--d, 0ms);
}

.pf-hint {
  animation: pfHint 1.8s ease-in-out 1.2s 3;
}

.pf-card {
  opacity: 0;
}

.pf-card.pf-in {
  opacity: 1;
  animation: pfCard .7s cubic-bezier(.22, 1, .36, 1) backwards;
  animation-delay: var(--d, 0ms);
}

.pf-projects-grid {
  scroll-margin-top: 80px;
}

@media (prefers-reduced-motion: reduce) {
  .pf-anim .pf-up,
  .pf-card.pf-in,
  .pf-hint {
    animation: none !important;
  }
}
`;

function Portfolio() {
  const [currentPage, setCurrentPage] = useState(1);
  const [flippedId, setFlippedId] = useState(null);
  const [projectsPerPage, setProjectsPerPage] = useState(6);

  const projectsTopRef = useRef(null);
  const sectionRef = useRef(null);
  const isFirstRender = useRef(true);

  // Reveal the section once it enters the viewport.
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.remove("pf-pre");
          section.classList.add("pf-anim");
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Reveal cards as they enter the viewport.
  useEffect(() => {
    const grid = projectsTopRef.current;

    if (!grid) return;

    const cards = grid.querySelectorAll(".pf-card");

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => Number(a.target.dataset.i) - Number(b.target.dataset.i),
          );

        visibleEntries.forEach((entry, index) => {
          const card = entry.target;

          card.style.setProperty("--d", `${index * 300}ms`);
          card.classList.add("pf-in");

          observer.unobserve(card);
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [currentPage, projectsPerPage]);

  // Update the card count only when the mobile breakpoint changes.
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");

    const updateProjectsPerPage = () => {
      setProjectsPerPage((previous) => {
        const next = mediaQuery.matches ? 4 : 6;
        return previous === next ? previous : next;
      });
    };

    updateProjectsPerPage();
    mediaQuery.addEventListener("change", updateProjectsPerPage);

    return () => {
      mediaQuery.removeEventListener("change", updateProjectsPerPage);
    };
  }, []);

  const totalPages = Math.max(
    1,
    Math.ceil(projectsData.length / projectsPerPage),
  );

  // Keep the current page valid if the responsive card count changes.
  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;

  const currentProjects = projectsData.slice(indexOfFirst, indexOfLast);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;

    setCurrentPage(page);
    setFlippedId(null);
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  const handleFlip = (id) => {
    setFlippedId((previous) => (previous === id ? null : id));
  };

  // Scroll to the projects grid after pagination changes.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      projectsTopRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [currentPage]);

  return (
    <section id="projects" ref={sectionRef} className="pf-pre py-10 lg:py-16">
      <style>{portfolioCSS}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Heading */}
        <div className="mb-10 text-center sm:mb-14">
          <h2
            style={{ "--d": "100ms" }}
            className="pf-up mb-6 font-primary text-[22px] font-bold tracking-wide text-secondary lg:text-[38px]"
          >
            Professional Client Projects
          </h2>

          <p
            style={{ "--d": "250ms" }}
            className="pf-up mx-auto max-w-3xl font-secondary text-[15px] leading-relaxed text-primary md:text-[18px]"
          >
            The following projects were developed during my tenure at
            WebEyeCraft, where I collaborated on real-world client solutions.
            Each project reflects hands-on experience in building scalable,
            high-performance web applications with a strong focus on clean
            architecture, modern UI/UX practices, and production-ready
            standards.
          </p>
        </div>

        {/* Projects Grid */}
        <div
          ref={projectsTopRef}
          className="pf-projects-grid grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3"
        >
          {currentProjects.map((project, index) => {
            const isFlipped = flippedId === project.id;

            return (
              <div
                key={`${currentPage}-${project.id}`}
                data-i={index}
                className="pf-card group perspective transition-transform duration-300 sm:hover:-translate-y-2"
                onClick={() => handleFlip(project.id)}
              >
                <div
                  className={`relative h-[320px] w-full cursor-pointer transform-style-preserve-3d transition-transform duration-700 lg:h-[310px] ${
                    isFlipped ? "rotate-y-180" : ""
                  } sm:group-hover:rotate-y-180`}
                >
                  {/* Front Side */}
                  <div
                    className={`absolute inset-0 overflow-hidden rounded-2xl shadow-md transition hover:shadow-xl backface-hidden ${
                      isFlipped ? "pointer-events-none" : ""
                    }`}
                  >
                    {/* Mobile Tap Hint */}
                    <div className="pointer-events-none absolute inset-0 z-10 flex items-start justify-end pt-3 pr-4 sm:hidden">
                      <span className="pf-hint rounded-full bg-black/40 px-4 py-1.5 text-[10px] font-medium tracking-wide text-white backdrop-blur-md">
                        Tap to Flip
                      </span>
                    </div>

                    <Image
                      src={project.image}
                      alt={project.alt}
                      title={project.title}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="rounded-2xl object-cover object-bottom"
                    />

                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-center font-secondary text-lg font-semibold text-white">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div
                    className={`absolute inset-0 flex rotate-y-180 flex-col justify-between rounded-2xl bg-[#000080] p-6 text-white shadow-lg backface-hidden ${
                      isFlipped
                        ? "pointer-events-auto"
                        : "pointer-events-none sm:pointer-events-auto"
                    }`}
                  >
                    <div>
                      <h3 className="mb-3 font-primary text-lg font-bold sm:text-xl">
                        {project.title}
                      </h3>

                      <p className="mb-4 font-secondary text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="font-secondary">
                      <p className="mb-2 text-sm font-semibold">Tech Stack:</p>

                      <div className="mb-4 flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={`${project.id}-${tech}-${techIndex}`}
                            className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#000080]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          title={`Visit ${project.title} Live Website`}
                          aria-label={`Visit ${project.title} live website`}
                          rel="noopener noreferrer"
                          onClick={(event) => event.stopPropagation()}
                          className="inline-block rounded-full bg-white px-4 py-2 text-[12px] font-semibold text-[#000080] transition hover:opacity-90"
                        >
                          Visit Website →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div
          style={{ "--d": "900ms" }}
          className="pf-up mt-10 flex items-center justify-center gap-3"
        >
          <button
            type="button"
            onClick={prevPage}
            disabled={currentPage === 1}
            aria-label="Previous projects page"
            className="rounded-full border border-primary px-3 py-1.5 text-sm text-primary transition hover:bg-primary hover:text-white active:scale-95 disabled:opacity-40"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            const isCurrentPage = currentPage === page;

            return (
              <button
                type="button"
                key={page}
                onClick={() => goToPage(page)}
                aria-label={`Go to projects page ${page}`}
                aria-current={isCurrentPage ? "page" : undefined}
                className={`h-8 w-8 rounded-full text-sm transition active:scale-90 ${
                  isCurrentPage
                    ? "scale-110 bg-[#000080] text-white shadow-md"
                    : "border border-gray-300 text-gray-600 hover:border-secondary hover:text-secondary"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            type="button"
            onClick={nextPage}
            disabled={currentPage === totalPages}
            aria-label="Next projects page"
            className="rounded-full border border-primary px-3 py-1.5 text-sm text-primary transition hover:bg-primary hover:text-white active:scale-95 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
