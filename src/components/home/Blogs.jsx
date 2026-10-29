
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import blogs from "@/src/data/blogs.json";
import { gsap } from "gsap";

const blogsCSS = `
.bl-pre .bl-hd {
  opacity: 0;
}

@media (min-width: 1024px) {
  .bl-pre .bl-h {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bl-pre .bl-hd,
  .bl-pre .bl-h {
    opacity: 1 !important;
    transform: none !important;
  }
}
`;

const MOBILE_BLOG_IDS = [1, 2, 3, 5];
const SLIDER_SPEED = 1.5;
const RESUME_DELAY = 800;

function Blogs() {
  const sliderRef = useRef(null);
  const positionRef = useRef(0);
  const isDragging = useRef(false);
  const isPausedRef = useRef(false);
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

  const mobileBlogs = blogs.filter((blog) =>
    MOBILE_BLOG_IDS.includes(blog.id),
  );

  // Use meaningful link text from the existing blog data.
  const getLinkTitle = (blog) =>
    `${blog.buttonText} — Read ${blog.title}`;

  // Desktop and heading entrance animations.
  useEffect(() => {
    const root = sectionRef.current;

    if (!root) return;

    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (reducedMotionQuery.matches) {
      root.classList.remove("bl-pre");
      return;
    }

    const query = (selector) =>
      Array.from(root.querySelectorAll(selector));

    const observers = [];

    const ctx = gsap.context(() => {
      const head = query('[data-bl="head"]');
      const left = query('[data-bl="left"]');
      const right = query('[data-bl="right"]');
      const up = query('[data-bl="up"]');
      const btn = query('[data-bl="btn"]');

      gsap.set(head, {
        opacity: 0,
        y: 40,
      });

      if (desktopQuery.matches) {
        gsap.set(left, {
          opacity: 0,
          x: -140,
        });

        gsap.set(right, {
          opacity: 0,
          x: 140,
        });

        gsap.set(up, {
          opacity: 0,
          y: 100,
        });

        gsap.set(btn, {
          opacity: 0,
          y: 30,
        });
      }

      root.classList.remove("bl-pre");

      const headTween = gsap.to(head, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
        paused: true,
      });

      const topTimeline = gsap
        .timeline({
          paused: true,
          defaults: {
            ease: "power3.out",
          },
        })
        .to(left, {
          opacity: 1,
          x: 0,
          duration: 1.1,
        })
        .to(
          right,
          {
            opacity: 1,
            x: 0,
            duration: 1.1,
            stagger: 0.2,
          },
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

      const buttonTween = gsap.to(btn, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        paused: true,
      });

      const watch = (
        element,
        callback,
        threshold = 0.1,
        bottomMargin = "-8%",
      ) => {
        if (!element) return;

        const observer = new IntersectionObserver(
          (entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
              observer.disconnect();
              callback();
            }
          },
          {
            threshold,
            rootMargin: `0px 0px ${bottomMargin} 0px`,
          },
        );

        observer.observe(element);
        observers.push(observer);
      };

      watch(headRef.current, () => headTween.play(), 0, "-5%");

      if (desktopQuery.matches) {
        watch(topGridRef.current, () => topTimeline.play());
        watch(bottomGridRef.current, () => bottomTween.play());
        watch(btnRef.current, () => buttonTween.play(), 0, "-5%");
      }
    }, root);

    return () => {
      observers.forEach((observer) => observer.disconnect());
      ctx.revert();
    };
  }, []);

  // Mobile infinite slider.
  // Cache the slider width instead of reading scrollWidth every frame.
  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    const mobileQuery = window.matchMedia("(max-width: 1023px)");

    let animationFrame = 0;
    let resumeTimeout = 0;
    let resizeObserver;
    let cachedHalfWidth = 0;
    let lastAppliedPosition = -1;
    let active = false;

    const measureSlider = () => {
      cachedHalfWidth = slider.scrollWidth / 2;

      if (cachedHalfWidth > 0) {
        positionRef.current =
          ((positionRef.current % cachedHalfWidth) + cachedHalfWidth) %
          cachedHalfWidth;

        lastAppliedPosition = -1;
      }
    };

    const applyTransform = () => {
      if (lastAppliedPosition === positionRef.current) return;

      slider.style.transform =
        `translate3d(-${positionRef.current}px, 0, 0)`;

      lastAppliedPosition = positionRef.current;
    };

    const getX = (event) => {
      if (event.touches) {
        return event.touches[0]?.clientX ?? startX.current;
      }

      return event.clientX;
    };

    const animate = () => {
      if (!active) return;

      if (
        !isPausedRef.current &&
        !isDragging.current &&
        cachedHalfWidth > 0
      ) {
        positionRef.current += SLIDER_SPEED;

        if (positionRef.current >= cachedHalfWidth) {
          positionRef.current %= cachedHalfWidth;
        }

        applyTransform();
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    const handleStart = (event) => {
      if (event.type === "mousedown" && event.button !== 0) return;

      window.clearTimeout(resumeTimeout);

      isDragging.current = true;
      isPausedRef.current = true;

      startX.current = getX(event);
      startPosition.current = positionRef.current;
    };

    const handleMove = (event) => {
      if (!isDragging.current || cachedHalfWidth <= 0) return;

      const delta = startX.current - getX(event);

      let nextPosition = startPosition.current + delta;

      nextPosition =
        ((nextPosition % cachedHalfWidth) + cachedHalfWidth) %
        cachedHalfWidth;

      positionRef.current = nextPosition;
      applyTransform();
    };

    const handleEnd = () => {
      if (!isDragging.current) return;

      isDragging.current = false;

      window.clearTimeout(resumeTimeout);

      resumeTimeout = window.setTimeout(() => {
        isPausedRef.current = false;
      }, RESUME_DELAY);
    };

    const stopSlider = () => {
      active = false;

      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(resumeTimeout);

      resizeObserver?.disconnect();
      resizeObserver = undefined;

      slider.removeEventListener("touchstart", handleStart);
      slider.removeEventListener("touchmove", handleMove);
      slider.removeEventListener("touchend", handleEnd);
      slider.removeEventListener("touchcancel", handleEnd);
      slider.removeEventListener("mousedown", handleStart);

      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("blur", handleEnd);

      isDragging.current = false;
      isPausedRef.current = false;
    };

    const startSlider = () => {
      if (active) return;

      active = true;
      measureSlider();

      if ("ResizeObserver" in window) {
        resizeObserver = new ResizeObserver(measureSlider);
        resizeObserver.observe(slider);

        if (slider.firstElementChild) {
          resizeObserver.observe(slider.firstElementChild);
        }
      }

      slider.addEventListener("touchstart", handleStart, {
        passive: true,
      });

      slider.addEventListener("touchmove", handleMove, {
        passive: true,
      });

      slider.addEventListener("touchend", handleEnd);
      slider.addEventListener("touchcancel", handleEnd);
      slider.addEventListener("mousedown", handleStart);

      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("blur", handleEnd);

      animationFrame = window.requestAnimationFrame(animate);
    };

    const updateMode = () => {
      if (mobileQuery.matches) {
        startSlider();
      } else {
        stopSlider();
        slider.style.transform = "";
        lastAppliedPosition = -1;
      }
    };

    updateMode();

    mobileQuery.addEventListener("change", updateMode);

    return () => {
      mobileQuery.removeEventListener("change", updateMode);
      stopSlider();
      slider.style.transform = "";
    };
  }, []);

  // Keep the pause state synchronized with the slider animation.
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  if (!featured) return null;

  return (
    <section
      id="blogs"
      ref={sectionRef}
      aria-labelledby="blogs-heading"
      className="bl-pre py-10 lg:py-20"
    >
      <style>{blogsCSS}</style>

      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        {/* Section Header */}
        <div
          ref={headRef}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <h2
            id="blogs-heading"
            data-bl="head"
            className="bl-hd mb-3 font-primary text-[22px] font-[700] text-secondary md:text-4xl lg:mb-6"
          >
            Insights and Technical Articles
          </h2>

          <p
            data-bl="head"
            className="bl-hd font-secondary text-[15px] leading-relaxed text-primary md:text-[18px]"
          >
            Discover in-depth tutorials, development strategies, and industry
            insights covering modern frontend technologies, performance
            optimization, and scalable architecture patterns.
          </p>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:block">
          <div
            ref={topGridRef}
            className="grid gap-6 lg:grid-cols-3"
          >
            {/* Featured Blog */}
            <article
              data-bl="left"
              className="bl-h group rounded-3xl border border-[#000080] bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl lg:col-span-2"
            >
              <div className="relative h-[420px] w-full overflow-hidden rounded-2xl">
                <Image
                  src={featured.image}
                  title={featured.title}
                  alt={featured.alt}
                  fill
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <span className="absolute bottom-4 left-4 rounded-md bg-white px-4 py-1 text-sm text-black shadow">
                  {featured.category}
                </span>
              </div>

              <div className="mt-6">
                <h3 className="mt-3 text-[22px] font-semibold text-black">
                  {featured.title}
                </h3>

                <p className="mt-4 text-[16px] leading-relaxed text-gray-600">
                  {featured.description}
                </p>

                <Link
                  href={featured.url}
                  target="_blank"
                  title={getLinkTitle(featured)}
                  aria-label={getLinkTitle(featured)}
                  rel="noopener noreferrer"
                  className="mt-9 inline-block max-w-full break-words rounded-full bg-[#000080] px-4 py-2 text-[12px] text-white transition hover:bg-secondary/90"
                >
                  {featured.buttonText}
                </Link>
              </div>
            </article>

            {/* Stacked Blogs */}
            <div className="flex flex-col gap-6">
              {stacked.map((blog) => (
                <article
                  key={blog.id}
                  data-bl="right"
                  className="bl-h group rounded-3xl border border-[#000080] bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl"
                >
                  <div className="relative h-[180px] w-full overflow-hidden rounded-xl">
                    <Image
                      src={blog.image}
                      title={blog.title}
                      alt={blog.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <span className="absolute bottom-3 left-3 rounded bg-white px-3 py-1 text-xs text-black shadow">
                      {blog.category}
                    </span>
                  </div>

                  <div className="mt-4">
                    <h3 className="mt-2 text-[16px] font-semibold text-[#000080]">
                      {blog.title}
                    </h3>

                    <Link
                      href={blog.url}
                      target="_blank"
                      title={getLinkTitle(blog)}
                      aria-label={getLinkTitle(blog)}
                      rel="noopener noreferrer"
                      className="mt-4 inline-block max-w-full break-words rounded-full bg-[#000080] px-4 py-2 text-[12px] text-white transition hover:bg-secondary/90"
                    >
                      {blog.buttonText}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Bottom Grid */}
          <div
            ref={bottomGridRef}
            className="mt-8 grid gap-6 md:grid-cols-3"
          >
            {gridBlogs.map((blog) => (
              <article
                key={blog.id}
                data-bl="up"
                className="bl-h group rounded-3xl border border-[#000080] bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl"
              >
                <div className="relative h-[240px] w-full overflow-hidden rounded-xl">
                  <Image
                    src={blog.image}
                    title={blog.title}
                    alt={blog.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <span className="absolute bottom-3 left-3 rounded bg-white px-3 py-1 text-xs text-black shadow">
                    {blog.category}
                  </span>
                </div>

                <h3 className="mt-8 text-[16px] font-semibold text-[#000080]">
                  {blog.title}
                </h3>

                <Link
                  href={blog.url}
                  target="_blank"
                  title={getLinkTitle(blog)}
                  aria-label={getLinkTitle(blog)}
                  rel="noopener noreferrer"
                  className="mt-5 inline-block max-w-full break-words rounded-full bg-[#000080] px-4 py-2 text-[12px] text-white transition hover:bg-secondary/90"
                >
                  {blog.buttonText}
                </Link>
              </article>
            ))}
          </div>

          {/* Explore More — original text and styling preserved */}
          <div
            ref={btnRef}
            className="mt-10 flex items-center justify-center"
          >
            <div data-bl="btn" className="bl-h">
              <Link
                href="https://medium.com/@salmanmuhammed827"
                target="_blank"
                title="Explore Muhammed Salman's Articles on Medium"
                aria-label="Explore Muhammed Salman's Articles on Medium"
                rel="noopener noreferrer"
                className="rounded-full bg-[#000080] px-6 py-2.5 text-[16px] text-white transition hover:bg-secondary/90"
              >
                Explore More
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Slider */}
        <div className="mt-8 overflow-hidden lg:hidden">
          <div
            ref={sliderRef}
            className="flex cursor-grab select-none gap-5 active:cursor-grabbing"
          >
            {[...mobileBlogs, ...mobileBlogs].map((blog, index) => (
              <article
                key={`${blog.id}-${index}`}
                className="w-[240px] flex-shrink-0 rounded-2xl border border-[#000080] bg-white p-4 shadow-sm"
              >
                <div className="relative h-[150px] w-full overflow-hidden rounded-xl">
                  <Image
                    src={blog.image}
                    title={blog.title}
                    alt={blog.alt}
                    fill
                    sizes="240px"
                    className="pointer-events-none object-cover"
                    draggable={false}
                  />

                  <span className="absolute bottom-2 left-2 rounded bg-white px-2 py-1 text-[10px] text-black shadow">
                    {blog.category}
                  </span>
                </div>

                <h3 className="mb-4 mt-4 text-[14px] font-semibold leading-snug text-[#000080]">
                  {blog.title}
                </h3>

                <Link
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={getLinkTitle(blog)}
                  aria-label={getLinkTitle(blog)}
                  className="inline-block max-w-full break-words rounded-full bg-[#000080] px-4 py-1.5 text-[11px] text-white transition hover:bg-secondary/90"
                >
                  {blog.buttonText}
                </Link>
              </article>
            ))}
          </div>

          {/* Mobile Explore More — original text and styling preserved */}
          <div className="mt-10 flex justify-center">
            <Link
              href="https://medium.com/@salmanmuhammed827"
              target="_blank"
              rel="noopener noreferrer"
              title="Explore Muhammed Salman's Articles on Medium"
              aria-label="Explore Muhammed Salman's Articles on Medium"
              className="max-w-full rounded-full bg-[#000080] px-5 py-2 text-center text-[14px] text-white transition hover:bg-secondary/90"
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
