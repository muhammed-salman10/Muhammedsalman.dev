"use client";
import React, { useState, useEffect } from "react";
import projectsData from "@/src/data/projectsData.json";
import Image from "next/image";

function Portfolio() {
  const [currentPage, setCurrentPage] = useState(1);
  const [flippedId, setFlippedId] = useState(null);
  const [projectsPerPage, setProjectsPerPage] = useState(6);

  /* ================= Responsive Cards Count ================= */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setProjectsPerPage(4);
      } else {
        setProjectsPerPage(6);
      }
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

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ================= Heading ================= */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary font-primary mb-6">
            Professional Client Projects
          </h2>

          <p className="text-primary max-w-3xl mx-auto text-[15px] md:text-[18px] font-secondary leading-relaxed">
            The following projects were developed during my tenure at
            WebEyeCraft, where I collaborated on real-world client solutions.
            Each project reflects hands-on experience in building scalable,
            high-performance web applications with a strong focus on clean
            architecture, modern UI/UX practices, and production-ready
            standards.
          </p>
        </div>

        {/* ================= Projects Grid ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {currentProjects.map((project) => (
            <div
              key={project.id}
              className="group perspective"
              onClick={() => handleFlip(project.id)}
            >
              <div
                className={`relative w-full h-[300px]  lg:h-[310px]
                transition-transform duration-700
                transform-style-preserve-3d
                cursor-pointer
                ${flippedId === project.id ? "rotate-y-180" : ""}
                sm:group-hover:rotate-y-180`}
              >
                {/* FRONT SIDE */}
                <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition">
                  {/* Mobile Tap Text */}
                  <div className="sm:hidden absolute top-3 right-4 inset-0 flex items-start justify-end z-10">
                    <span className="text-white text-[10px] font-medium tracking-wide px-4 py-1.5 rounded-full backdrop-blur-md bg-black/40">
                      Tap to Flip
                    </span>
                  </div>

                  {/* Image */}
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-bottom  rounded-2xl "
                  />

                  {/* Bottom Title */}
                  <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="text-lg font-semibold text-white text-center font-secondary ">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* BACK SIDE */}
                <div className="absolute inset-0 rotate-y-180 backface-hidden bg-secondary text-white rounded-2xl p-6 flex flex-col justify-between shadow-lg">
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
                          className="bg-white text-secondary px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-white  text-secondary px-4 py-2 rounded-full text-[12px] font-semibold hover:opacity-90 transition"
                      >
                        Visit Website →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= Pagination ================= */}
        <div className="flex justify-center items-center gap-3 mt-10">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-3 py-1.5 text-sm border rounded-full text-primary border-primary disabled:opacity-40 hover:bg-primary hover:text-white transition"
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
              className={`w-8 h-8 text-sm rounded-full transition
                ${
                  currentPage === index + 1
                    ? "bg-secondary text-white shadow-md"
                    : "border border-gray-300 text-gray-600 hover:border-secondary hover:text-secondary"
                }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 text-sm border rounded-full text-primary border-primary disabled:opacity-40 hover:bg-primary hover:text-white transition"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
