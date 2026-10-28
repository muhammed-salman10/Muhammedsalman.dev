"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import blogs from "@/src/data/blogs.json";
import Link from "next/link";
import { gsap } from "gsap";

/* Hidden start states:
   .bl-hd = heading text, all screens
   .bl-h  = cards/button, DESKTOP ONLY (mobile slider is untouched) */
const blogsCSS = `
.bl-pre .bl-hd { opacity: 0; }
@media (min-width: 1024px) {
  .bl-pre .bl-h { opacity: 0; }
}
`;

function Blogs() {
  const sliderRef = useRef(null);
  const positionRef = useRef(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startPosition = useRef(0);

  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const topGridRef = useRef(null);
  const bottomGridRef = useRef(null);
  const btnRef = useRef(null);

  const [isPaused, setIsPaused] = useState(false);

  const featured = blogs.find((blog) => blog.type === "featured");
  const stacked = blogs.filter((blog) => blog.type === "stack");
  const gridBlogs = blogs.filter((blog) => blog.type === "grid");

  const mobileBlogs = blogs.filter((blog) => [1, 2, 3, 5].includes(blog.id));

  /* ================= DESKTOP ENTRANCE ANIMATION (GSAP) =================
     featured card  -> from the LEFT
     stacked cards  -> from the RIGHT
     bottom grid    -> from the BOTTOM
     Starts when each part actually appears on screen (IntersectionObserver). */

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Reduced motion: no animation, just make sure nothing is hidden
    if (reduce) {
      root.classList.remove("bl-pre");
      return;
    }

    const q = (sel) => Array.from(root.querySelectorAll(sel));
    const observers = [];

    const ctx = gsap.context(() => {
      try {
        const head = q('[data-bl="head"]');
        const left = q('[data-bl="left"]');
        const right = q('[data-bl="right"]');
        const up = q('[data-bl="up"]');
        const btn = q('[data-bl="btn"]');

        /* ---------- Initial states ---------- */
        gsap.set(head, { opacity: 0, y: 40 });
        if (isDesktop) {
          gsap.set(left, { opacity: 0, x: -140 });
          gsap.set(right, { opacity: 0, x: 140 });
          gsap.set(up, { opacity: 0, y: 100 });
          gsap.set(btn, { opacity: 0, y: 30 });
        }
        root.classList.remove("bl-pre");

        /* ---------- Paused animations, played when visible ---------- */
        const headTween = gsap.to(head, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          paused: true,
        });

        const topTl = gsap
          .timeline({ paused: true, defaults: { ease: "power3.out" } })
          .to(left, { opacity: 1, x: 0, duration: 1.1 })
          .to(
            right,
            { opacity: 1, x: 0, duration: 1.1, stagger: 0.2 },
            "<0.15",
          );

        const bottomTween = gsap.to(up, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.18,
          paused: true,
        });

        const btnTween = gsap.to(btn, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          paused: true,
        });

        /* ---------- Triggers ---------- */
        const watch = (el, cb, threshold = 0.1, margin = "-8%") => {
          if (!el) return;
          const io = new IntersectionObserver(
            (entries) => {
              if (entries.some((e) => e.isIntersecting)) {
                io.disconnect();
                cb();
              }
            },
            { threshold, rootMargin: `0px 0px ${margin} 0px` },
          );
          io.observe(el);
          observers.push(io);
        };

        // Heading text: mobile + desktop
        watch(headRef.current, () => headTween.play(), 0, "-5%");

        // Cards + button: desktop only (mobile cards keep their own slider)
        if (isDesktop) {
          watch(topGridRef.current, () => topTl.play());
          watch(bottomGridRef.current, () => bottomTween.play());
          watch(btnRef.current, () => btnTween.play(), 0, "-5%");
        }
      } catch (err) {
        // Failsafe: never leave the section hidden
        console.error("Blogs animation failed:", err);
        gsap.set(root.querySelectorAll("*"), { clearProps: "all" });
        root.classList.remove("bl-pre");
      }
    }, root);

    return () => {
      observers.forEach((o) => o.disconnect());
      ctx.revert();
    };
  }, []);

  /* ================= SMOOTH INFINITE MOBILE SCROLL + MANUAL DRAG ================= */

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    let animationFrame;
    const speed = 1.5;

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

    /* ================= DRAG HANDLERS ================= */

    const getX = (e) => {
      return e.touches ? e.touches[0].clientX : e.clientX;
    };

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

      if (newPosition < 0) {
        newPosition += half;
      }

      if (newPosition >= half) {
        newPosition -= half;
      }

      positionRef.current = newPosition;
    };

    const handleEnd = () => {
      isDragging.current = false;

      setTimeout(() => {
        setIsPaused(false);
      }, 800);
    };

    /* ================= TOUCH EVENTS ================= */

    slider.addEventListener("touchstart", handleStart, {
      passive: true,
    });

    slider.addEventListener("touchmove", handleMove, {
      passive: true,
    });

    slider.addEventListener("touchend", handleEnd);

    /* ================= MOUSE EVENTS ================= */

    slider.addEventListener("mousedown", handleStart);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);

    /* ================= CLEANUP ================= */

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
    <section id="blogs" ref={sectionRef} className="bl-pre lg:py-20 py-10">
      <style>{blogsCSS}</style>

      <div className="max-w-7xl mx-auto lg:px-6 px-4">
        {/* ================= SECTION HEADER ================= */}

        <div ref={headRef} className="text-center max-w-3xl mx-auto mb-14">
          <h2
            data-bl="head"
            className="bl-hd text-[22px] md:text-4xl font-[700] mb-3 lg:mb-6 text-secondary font-primary"
          >
            Insights and Technical Articles
          </h2>

          <p
            data-bl="head"
            className="bl-hd text-primary text-[15px] md:text-[18px] font-secondary leading-relaxed"
          >
            Discover in-depth tutorials, development strategies, and industry
            insights covering modern frontend technologies, performance
            optimization, and scalable architecture patterns.
          </p>
        </div>

        {/* =========================================================
            DESKTOP VIEW
        ========================================================= */}

        <div className="hidden lg:block">
          <div ref={topGridRef} className="grid lg:grid-cols-3 gap-6">
            {/* ================= FEATURED (from the left) ================= */}

            <div
              data-bl="left"
              className="bl-h group lg:col-span-2 bg-white rounded-3xl border border-[#000080] p-6 shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative w-full h-[420px] rounded-2xl overflow-hidden">
                <Image
                  src={featured.image}
                  title={featured.title}
                  alt={featured.alt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 66vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <span className="absolute bottom-4 left-4 bg-white text-black text-sm px-4 py-1 rounded-md shadow">
                  {featured.category}
                </span>
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  {/* <span>{featured.date}</span> */}
                  {/* <span>•</span> */}
                  {/* <span>{featured.saves}</span> */}
                </div>

                <h3 className="mt-3 text-[22px] font-semibold text-black">
                  {featured.title}
                </h3>

                <p className="mt-4 text-gray-600 text-[16px] leading-relaxed">
                  {featured.description}
                </p>

                {/* FEATURED BLOG LINK */}

                <Link
                  href={featured.url}
                  target="_blank"
                  title={`${featured.buttonText} — Read ${featured.title}`}
                  aria-label={`${featured.buttonText}: Read ${featured.title}`}
                  rel="noopener noreferrer"
                  className="mt-9 inline-block bg-[#000080] text-white text-[12px] px-4 py-2 rounded-full hover:bg-secondary/90 transition"
                >
                  {featured.buttonText}
                </Link>
              </div>
            </div>

            {/* ================= STACKED BLOGS (from the right) ================= */}

            <div className="flex flex-col gap-6">
              {stacked.map((blog) => (
                <div
                  key={blog.id}
                  data-bl="right"
                  className="bl-h group bg-white rounded-3xl border border-[#000080] p-6 shadow-sm hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative w-full h-[180px] rounded-xl overflow-hidden">
                    <Image
                      src={blog.image}
                      title={blog.title}
                      alt={blog.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <span className="absolute bottom-3 left-3 bg-white text-black text-xs px-3 py-1 rounded shadow">
                      {blog.category}
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      {/* <span>{blog.date}</span> */}
                      {/* <span>•</span> */}
                      {/* <span>{blog.saves}</span> */}
                    </div>

                    <h4 className="mt-2 font-semibold text-[#000080] text-[16px]">
                      {blog.title}
                    </h4>

                    {/* IMPORTANT:
                        blog.url instead of featured.url
                    */}

                    <Link
                      href={blog.url}
                      target="_blank"
                      title={`${blog.buttonText} — Read ${blog.title}`}
                      aria-label={`${blog.buttonText}: Read ${blog.title}`}
                      rel="noopener noreferrer"
                      className="mt-4 inline-block bg-[#000080] text-white text-[12px] px-4 py-2 rounded-full hover:bg-secondary/90 transition"
                    >
                      {blog.buttonText}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= BOTTOM GRID (from the bottom) ================= */}

          <div ref={bottomGridRef} className="grid md:grid-cols-3 gap-6 mt-8">
            {gridBlogs.map((blog) => (
              <div
                key={blog.id}
                data-bl="up"
                className="bl-h group bg-white rounded-3xl border border-[#000080] p-6 shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative w-full h-[240px] rounded-xl overflow-hidden">
                  <Image
                    src={blog.image}
                    title={blog.title}
                    alt={blog.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <span className="absolute bottom-3 left-3 bg-white text-black text-xs px-3 py-1 rounded shadow">
                    {blog.category}
                  </span>
                </div>

                <h4 className="mt-8 text-[16px] font-semibold text-[#000080]">
                  {blog.title}
                </h4>

                {/* GRID BLOG LINK */}

                <Link
                  href={blog.url}
                  target="_blank"
                  title={`${blog.buttonText} — Read ${blog.title}`}
                  aria-label={`${blog.buttonText}: Read ${blog.title}`}
                  rel="noopener noreferrer"
                  className="mt-5 inline-block bg-[#000080] text-white text-[12px] px-4 py-2 rounded-full hover:bg-secondary/90 transition"
                >
                  {blog.buttonText}
                </Link>
              </div>
            ))}
          </div>

          {/* ================= EXPLORE MORE ================= */}

          <div ref={btnRef} className="flex items-center justify-center mt-10">
            <div data-bl="btn" className="bl-h">
              <Link
                href="https://medium.com/@salmanmuhammed827"
                target="_blank"
                title="Explore Muhammed Salman's Articles on Medium"
                aria-label="Explore Muhammed Salman's Articles on Medium"
                rel="noopener noreferrer"
                className="bg-[#000080] text-white text-[16px] px-6 py-2.5 rounded-full hover:bg-secondary/90 transition"
              >
                Explore More
              </Link>
            </div>
          </div>
        </div>

        {/* =========================================================
            MOBILE AUTO SCROLL + MANUAL DRAG (unchanged)
        ========================================================= */}

        <div className="lg:hidden mt-8 overflow-hidden">
          <div
            ref={sliderRef}
            className="flex gap-5 will-change-transform cursor-grab active:cursor-grabbing select-none"
          >
            {[...mobileBlogs, ...mobileBlogs].map((blog, index) => (
              <div
                key={`${blog.id}-${index}`}
                className="flex-shrink-0 w-[240px] bg-white rounded-2xl border border-[#000080] p-4 shadow-sm"
              >
                <div className="relative w-full h-[150px] rounded-xl overflow-hidden">
                  <Image
                    src={blog.image}
                    title={blog.title}
                    alt={blog.alt}
                    fill
                    className="object-cover pointer-events-none"
                    draggable={false}
                  />

                  <span className="absolute bottom-2 left-2 bg-white text-black text-[10px] px-2 py-1 rounded shadow">
                    {blog.category}
                  </span>
                </div>

                <h4 className="mt-4 mb-4 text-[14px] font-semibold text-[#000080] leading-snug">
                  {blog.title}
                </h4>

                {/* MOBILE BLOG LINK */}

                <Link
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${blog.buttonText} — Read ${blog.title}`}
                  aria-label={`${blog.buttonText}: Read ${blog.title}`}
                  className="inline-block bg-[#000080] text-white text-[11px] px-4 py-1.5 rounded-full hover:bg-secondary/90 transition"
                >
                  {blog.buttonText}
                </Link>
              </div>
            ))}
          </div>

          {/* ================= MOBILE EXPLORE MORE ================= */}

          <div className="flex justify-center mt-10">
            <Link
              href="https://medium.com/@salmanmuhammed827"
              target="_blank"
              rel="noopener noreferrer"
              title="Explore Muhammed Salman's Articles on Medium"
              aria-label="Explore Muhammed Salman's Articles on Medium"
              className="bg-[#000080] text-white text-[14px] px-5 py-2 rounded-full hover:bg-secondary/90 transition"
            >
              Explore More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Blogs;
