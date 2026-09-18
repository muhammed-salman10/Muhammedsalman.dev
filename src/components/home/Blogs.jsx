// src/components/home/Blogs.jsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import blogs from "@/src/data/blogs.json";

function Blogs() {
  const sliderRef = useRef(null);
  const positionRef = useRef(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startPosition = useRef(0);

  const [isPaused, setIsPaused] = useState(false);

  const featured = blogs.find((blog) => blog.type === "featured");
  const stacked = blogs.filter((blog) => blog.type === "stack");
  const gridBlogs = blogs.filter((blog) => blog.type === "grid");

  const mobileBlogs = blogs.filter((blog) => [1, 2, 3, 5].includes(blog.id));

  /* ================= SMOOTH INFINITE MOBILE SCROLL + MANUAL DRAG ================= */
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animationFrame;
    const speed = 1.5; // lower = smoother

    const animate = () => {
      if (!isDragging.current && !isPaused) {
        positionRef.current += speed;

        const half = slider.scrollWidth / 2;
        if (positionRef.current >= half) {
          positionRef.current = 0;
        }
      }

      slider.style.transform = `translate3d(-${positionRef.current}px, 0, 0)`;
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    /* ---------- Drag handlers (touch + mouse) ---------- */
    const getX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

    const handleStart = (e) => {
      isDragging.current = true;
      setIsPaused(true);
      startX.current = getX(e);
      startPosition.current = positionRef.current;
    };

    const handleMove = (e) => {
      if (!isDragging.current) return;
      const currentX = getX(e);
      const delta = startX.current - currentX;
      let newPosition = startPosition.current + delta;

      const half = slider.scrollWidth / 2;

      // wrap around so infinite-loop feel is preserved while dragging
      if (newPosition < 0) newPosition += half;
      if (newPosition >= half) newPosition -= half;

      positionRef.current = newPosition;
    };

    const handleEnd = () => {
      isDragging.current = false;
      // short delay before auto-scroll resumes, feels more natural
      setTimeout(() => setIsPaused(false), 800);
    };

    slider.addEventListener("touchstart", handleStart, { passive: true });
    slider.addEventListener("touchmove", handleMove, { passive: true });
    slider.addEventListener("touchend", handleEnd);

    slider.addEventListener("mousedown", handleStart);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);

    return () => {
      cancelAnimationFrame(animationFrame);
      slider.removeEventListener("touchstart", handleStart);
      slider.removeEventListener("touchmove", handleMove);
      slider.removeEventListener("touchend", handleEnd);
      slider.removeEventListener("mousedown", handleStart);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
    };
  }, [isPaused]);

  if (!featured) return null;

  return (
    <section className="lg:py-20">
      <div className="max-w-7xl mx-auto lg:px-6 px-4">
        {/* ================= SECTION HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-[22px] md:text-4xl font-[700] mb-3 lg:mb-6 text-secondary font-primary">
            Insights and Technical Articles
          </h2>
          <p className=" text-primary text-[15px] md:text-[18px] font-secondary leading-relaxed">
            Discover in-depth tutorials, development strategies, and industry
            insights covering modern frontend technologies, performance
            optimization, and scalable architecture patterns.
          </p>
        </div>

        {/* ================= DESKTOP VIEW (UNCHANGED) ================= */}
        <div className="hidden lg:block">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* FEATURED */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-[#000080] p-6 shadow-sm">
              <div className="relative w-full h-[420px] rounded-2xl overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute bottom-4 left-4 bg-white text-black text-sm px-4 py-1 rounded-md shadow">
                  {featured.category}
                </span>
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{featured.date}</span>
                  <span>•</span>
                  <span>{featured.saves}</span>
                </div>

                <h3 className="mt-3 text-[22px] font-semibold text-black">
                  {featured.title}
                </h3>

                <p className="mt-4 text-gray-600 text-[16px] leading-relaxed">
                  {featured.description}
                </p>

                <button className="mt-9 bg-[#000080] text-white text-[12px] px-4 py-2 rounded-full hover:bg-secondary/90 transition">
                  {featured.buttonText}
                </button>
              </div>
            </div>

            {/* STACKED */}
            <div className="flex flex-col gap-6">
              {stacked.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white rounded-3xl border border-[#000080] p-6 shadow-sm"
                >
                  <div className="relative w-full h-[180px] rounded-xl overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute bottom-3 left-3 bg-white text-black text-xs px-3 py-1 rounded shadow">
                      {blog.category}
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{blog.date}</span>
                      <span>•</span>
                      <span>{blog.saves}</span>
                    </div>

                    <h4 className="mt-2 font-semibold text-[#000080] text-[16px]">
                      {blog.title}
                    </h4>

                    <button className="mt-4 bg-[#000080] text-white text-[12px] px-4 py-2 rounded-full hover:bg-secondary/90 transition">
                      {blog.buttonText}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM GRID */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {gridBlogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-3xl border border-[#000080] p-6 shadow-sm"
              >
                <div className="relative w-full h-[240px] rounded-xl overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute bottom-3 left-3 bg-white text-black text-xs px-3 py-1 rounded shadow">
                    {blog.category}
                  </span>
                </div>

                <h4 className="mt-8 text-[16px] font-semibold text-[#000080]">
                  {blog.title}
                </h4>

                <button className="mt-5 bg-[#000080] text-white text-[12px] px-4 py-2 rounded-full hover:bg-secondary/90 transition">
                  {blog.buttonText}
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center mt-10">
            <button className="bg-[#000080] text-white text-[16px] px-6 py-2.5 rounded-full hover:bg-secondary/90 transition">
              Explore More
            </button>
          </div>
        </div>

        {/* ================= MOBILE AUTO SCROLL + MANUAL DRAG ================= */}
        <div className="lg:hidden mt-8 overflow-hidden">
          <div
            ref={sliderRef}
            className="flex gap-5 will-change-transform cursor-grab active:cursor-grabbing select-none"
          >
            {[...mobileBlogs, ...mobileBlogs].map((blog, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[240px] bg-white rounded-2xl border border-[#000080] p-4 shadow-sm"
              >
                <div className="relative w-full h-[150px] rounded-xl overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover pointer-events-none"
                    draggable={false}
                  />

                  <span className="absolute bottom-2 left-2 bg-white text-black text-[10px] px-2 py-1 rounded shadow">
                    {blog.category}
                  </span>
                </div>

                <h4 className="mt-4 text-[14px] font-semibold text-[#000080] leading-snug">
                  {blog.title}
                </h4>

                <button className="mt-4 bg-[#000080] text-white text-[11px] px-4 py-1.5 rounded-full hover:bg-secondary/90 transition">
                  {blog.buttonText}
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <button className="bg-[#000080] text-white text-[14px] px-5 py-2 rounded-full hover:bg-secondary/90 transition">
              Explore More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Blogs;
