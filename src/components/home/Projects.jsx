"use client";
import React, { useState, useEffect, useRef } from "react";
import projectsData from "@/src/data/projectsData.json";
import Image from "next/image";

/* All Portfolio animations live here, so no globals.css / library changes are needed */
const portfolioCSS = `
@keyframes pfUp   { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }
@keyframes pfCard { from { opacity: 0; transform: translateY(56px) scale(.92); } to { opacity: 1; transform: none; } }
@keyframes pfHint { 0%,100% { opacity: .55; } 50% { opacity: 1; } }

/* Safari / iOS needs the -webkit- prefix or the hidden face still catches taps */
.backface-hidden {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

/* Hidden until the section scrolls into view */
.pf-pre .pf-up { opacity: 0; }

/* "backwards" fill so the hover lift and the 3D flip keep working afterwards */
.pf-anim .pf-up   { animation: pfUp .8s cubic-bezier(.22,1,.36,1) backwards; animation-delay: var(--d, 0ms); }
.pf-hint { animation: pfHint 1.8s ease-in-out 1.2s 3; }

/* Cards: each one is hidden until JS marks it .pf-in, one after another */
.pf-card { opacity: 0; }
.pf-card.pf-in { opacity: 1; animation: pfCard .7s cubic-bezier(.22,1,.36,1) backwards; animation-delay: var(--d, 0ms); }

@media (prefers-reduced-motion: reduce) {
  .pf-anim .pf-up, .pf-card.pf-in, .pf-hint { animation: none !important; }
}
`;

function Portfolio() {
  const [currentPage, setCurrentPage] = useState(1);
  const [flippedId, setFlippedId] = useState(null);
  const [projectsPerPage, setProjectsPerPage] = useState(6);
  const projectsTopRef = useRef(null);
  const sectionRef = useRef(null);
  const isFirstRender = useRef(true);

  // Plays every time the page loads/refreshes, once the section is visible
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("pf-pre");
          el.classList.add("pf-anim");
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Reveal cards one by one: each card animates when it enters the screen,
  // and cards entering together (same row) are staggered 300ms apart.
  useEffect(() => {
    const grid = projectsTopRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll(".pf-card");
    const io = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.target.dataset.i - b.target.dataset.i)
          .forEach((e, n) => {
            e.target.style.setProperty("--d", `${n * 300}ms`);
            e.target.classList.add("pf-in");
            io.unobserve(e.target);
          });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [currentPage, projectsPerPage]);

  /* ================= Responsive Cards Count ================= */
  useEffect(() => {
    const handleResize = () => {
      setProjectsPerPage(window.innerWidth < 640 ? 4 : 6);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(projectsData.length / projectsPerPage);

  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = projectsData.slice(indexOfFirst, indexOfLast);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      setFlippedId(null);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      setFlippedId(null);
    }
  };

  const handleFlip = (id) => {
    setFlippedId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const t = setTimeout(() => {
      if (projectsTopRef.current) {
        const y =
          projectsTopRef.current.getBoundingClientRect().top +
          window.scrollY -
          80;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }
    }, 50);

    return () => clearTimeout(t);
  }, [currentPage]);

  return (
    <section id="projects" ref={sectionRef} className="pf-pre lg:py-16 py-10">
      <style>{portfolioCSS}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ================= Heading ================= */}
        <div className="text-center mb-10 sm:mb-14">
          <h2
            style={{ "--d": "100ms" }}
            className="pf-up lg:text-[38px] text-[22px] font-bold text-secondary font-primary tracking-wide mb-6 "
          >
            Professional Client Projects
          </h2>

          <p
            style={{ "--d": "250ms" }}
            className="pf-up text-primary max-w-3xl mx-auto text-[15px] md:text-[18px] font-secondary leading-relaxed"
          >
            The following projects were developed during my tenure at
            WebEyeCraft, where I collaborated on real-world client solutions.
            Each project reflects hands-on experience in building scalable,
            high-performance web applications with a strong focus on clean
            architecture, modern UI/UX practices, and production-ready
            standards.
          </p>
        </div>

        {/* ================= Projects Grid =================
            key includes the page number so cards remount and replay their
            entrance animation every time the page changes */}
        <div
          ref={projectsTopRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {currentProjects.map((project, i) => {
            const isFlipped = flippedId === project.id;

            return (
              <div
                key={`${currentPage}-${project.id}`}
                data-i={i}
                className="pf-card group perspective transition-transform duration-300 sm:hover:-translate-y-2"
                onClick={() => handleFlip(project.id)}
              >
                <div
                  className={`relative w-full h-[320px] lg:h-[310px]
                  transition-transform duration-700
                  transform-style-preserve-3d
                  cursor-pointer
                  ${isFlipped ? "rotate-y-180" : ""}
                  sm:group-hover:rotate-y-180`}
                >
                  {/* FRONT SIDE
                      FIX: when flipped on mobile, the front must not catch taps */}
                  <div
                    className={`absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition
                    ${isFlipped ? "pointer-events-none" : ""}`}
                  >
                    {/* Mobile Tap Text
                        FIX: pointer-events-none so this full-size overlay never blocks taps */}
                    <div className="sm:hidden absolute top-3 right-4 inset-0 flex items-start justify-end z-10 pointer-events-none">
                      <span className="pf-hint text-white text-[10px] font-medium tracking-wide px-4 py-1.5 rounded-full backdrop-blur-md bg-black/40">
                        Tap to Flip
                      </span>
                    </div>

                    {/* Image */}
                    <Image
                      src={project.image}
                      alt={project.alt}
                      title={project.title}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="object-cover object-bottom rounded-2xl"
                    />

                    {/* Bottom Title */}
                    <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent">
                      <h3 className="text-lg font-semibold text-white text-center font-secondary ">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* BACK SIDE
                      FIX: on mobile the back only receives taps once flipped.
                      On sm+ (hover devices) it stays interactive as before. */}
                  <div
                    className={`absolute inset-0 rotate-y-180 backface-hidden bg-[#000080] text-white rounded-2xl p-6 flex flex-col justify-between shadow-lg
                    ${
                      isFlipped
                        ? "pointer-events-auto"
                        : "pointer-events-none sm:pointer-events-auto"
                    }`}
                  >
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold mb-3 font-primary">
                        {project.title}
                      </h3>
                      <p className="text-sm mb-4 leading-relaxed font-secondary">
                        {project.description}
                      </p>
                    </div>

                    <div className="font-secondary">
                      <p className="font-semibold mb-2 text-sm">Tech Stack:</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, index) => (
                          <span
                            key={index}
                            className="bg-white text-[#000080] px-3 py-1 rounded-full text-xs font-medium"
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
                          /* FIX: don't let the tap bubble up to the card's flip handler */
                          onClick={(e) => e.stopPropagation()}
                          className="inline-block bg-white text-[#000080] px-4 py-2 rounded-full text-[12px] font-semibold hover:opacity-90 transition"
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

        {/* ================= Pagination ================= */}
        <div
          style={{ "--d": "900ms" }}
          className="pf-up flex justify-center items-center gap-3 mt-10"
        >
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-3 py-1.5 text-sm border rounded-full text-primary border-primary disabled:opacity-40 hover:bg-primary hover:text-white active:scale-95 transition"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentPage(index + 1);
                setFlippedId(null);
              }}
              className={`w-8 h-8 text-sm rounded-full transition active:scale-90
                ${
                  currentPage === index + 1
                    ? "bg-[#000080] text-white shadow-md scale-110"
                    : "border border-gray-300 text-gray-600 hover:border-secondary hover:text-secondary"
                }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 text-sm border rounded-full text-primary border-primary disabled:opacity-40 hover:bg-primary hover:text-white active:scale-95 transition"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
