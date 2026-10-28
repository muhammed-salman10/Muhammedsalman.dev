"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import FormSubmission from "../common/contact-form/FormSubmission";
import SocialMediaIcons from "../common/social-media/SocialMediaIcons";

/* Hidden start state (all screens). GSAP takes over right after mount. */
const contactCSS = `
.ct-pre .ct-h { opacity: 0; }
`;

export default function Contact() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const formRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    // Reduced motion: show everything, no animation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.remove("ct-pre");
      return;
    }

    // Same breakpoint as the layout (flex-col -> md:flex-row)
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const q = (sel) => Array.from(root.querySelectorAll(sel));
    const observers = [];

    const ctx = gsap.context(() => {
      try {
        const head = q('[data-ct="head"]');
        const form = q('[data-ct="form"]');
        const formItems = q('[data-ct="fi"]');
        const image = q('[data-ct="image"]');
        const zoom = q('[data-ct="zoom"]');
        const overlay = q('[data-ct="oi"]');
        const blobs = q('[data-ct="blob"]');

        /* ---------- Initial states ----------
           Desktop: form from the LEFT, image from the RIGHT
           Mobile : both rise from the bottom, each when it appears */
        gsap.set(head, { opacity: 0, y: 40 });
        gsap.set(
          form,
          isDesktop ? { opacity: 0, x: -120 } : { opacity: 0, y: 80 },
        );
        gsap.set(formItems, { opacity: 0, y: 30 });
        gsap.set(
          image,
          isDesktop ? { opacity: 0, x: 120 } : { opacity: 0, y: 80 },
        );
        gsap.set(zoom, { scale: 1.3 });
        gsap.set(overlay, { opacity: 0, y: 30 });
        gsap.set(blobs, { opacity: 0, scale: 0.5 });
        root.classList.remove("ct-pre");

        const pulse = (targets) =>
          gsap.to(targets, {
            scale: 1.2,
            duration: 3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });

        /* ---------- Paused animations, played when visible ---------- */
        const headTween = gsap.to(head, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          paused: true,
        });

        const formBlob = form.length
          ? Array.from(form[0].querySelectorAll('[data-ct="blob"]'))
          : [];
        const imageBlob = image.length
          ? Array.from(image[0].querySelectorAll('[data-ct="blob"]'))
          : [];

        const formTl = gsap
          .timeline({
            paused: true,
            defaults: { ease: "power3.out" },
            onComplete: () => pulse(formBlob),
          })
          .to(form, { opacity: 1, x: 0, y: 0, duration: 1.1 })
          .to(
            formItems,
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
            "-=0.5",
          )
          .to(formBlob, { opacity: 1, scale: 1, duration: 1.2 }, "<");

        const imageTl = gsap
          .timeline({
            paused: true,
            defaults: { ease: "power3.out" },
            onComplete: () => pulse(imageBlob),
          })
          .to(image, {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1.1,
            delay: isDesktop ? 0.15 : 0,
          })
          .to(zoom, { scale: 1, duration: 1.8 }, "<")
          .to(
            overlay,
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.14 },
            "-=0.7",
          )
          .to(imageBlob, { opacity: 1, scale: 1, duration: 1.2 }, "<");

        /* ---------- Triggers (IntersectionObserver = real screen position) ---------- */
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

        watch(headRef.current, () => headTween.play(), 0, "-5%");
        watch(formRef.current, () => formTl.play());
        watch(imageRef.current, () => imageTl.play());
      } catch (err) {
        // Failsafe: never leave the section hidden
        console.error("Contact animation failed:", err);
        gsap.set(root.querySelectorAll("*"), { clearProps: "all" });
        root.classList.remove("ct-pre");
      }
    }, root);

    return () => {
      observers.forEach((o) => o.disconnect());
      ctx.revert();
    };
  }, []);

  return (
    <section id="contact-us" ref={sectionRef} className="ct-pre py-16 lg:py-10">
      <style>{contactCSS}</style>

      <div ref={headRef} className="text-center max-w-2xl mx-auto">
        <h2
          data-ct="head"
          className="ct-h text-[24px] md:text-4xl font-[700] mb-6 text-secondary font-primary"
        >
          Let’s Work Together
        </h2>

        <p
          data-ct="head"
          className="ct-h text-primary text-[15px] md:text-[18px] font-secondary leading-relaxed mb-8 mt-4 px-4 lg:px-0"
        >
          Have an idea, project, or collaboration in mind? I’d love to hear from
          you. Share your thoughts and I’ll get back to you as soon as possible.
        </p>
      </div>
      <div className="min-h-screen flex items-center justify-center lg:px-4 px-4 ">
        <div className="max-w-6xl w-full flex flex-col md:flex-row gap-12 items-center">
          {/* LEFT SIDE GLASS FORM */}
          <div
            ref={formRef}
            data-ct="form"
            className="
                ct-h
                w-full md:w-[75%] order-2 md:order-1
                p-8 sm:p-10
                rounded-3xl
                bg-white/80
                backdrop-blur-2xl
                border border-white/40
                shadow-2xl
                relative
              "
          >
            <div
              data-ct="blob"
              className="ct-h absolute -top-6 -left-6 w-20 h-20 bg-black/10 rounded-full blur-2xl"
            />

            <h3
              data-ct="fi"
              className="ct-h lg:text-3xl text-[22px] font-semibold mb-4 font-primary text-[#000080]"
            >
              Let’s Talk !
            </h3>

            <p
              data-ct="fi"
              className="ct-h text-[#000080] mb-8 font-secondary lg:text-[18px] text-[14px]"
            >
              Have a project in mind? Feel free to send a message.
            </p>

            <div data-ct="fi" className="ct-h">
              <FormSubmission />
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div
            ref={imageRef}
            data-ct="image"
            className="ct-h relative w-full md:w-[45%] h-[450px] md:h-[450px] order-1 md:order-2"
          >
            <div
              data-ct="blob"
              className="ct-h absolute -top-10 -right-10 w-60 h-60 bg-black/10 rounded-full blur-3xl"
            />

            <div className="absolute top-0 right-0 md:right-20 w-full h-full rounded-3xl overflow-hidden shadow-2xl">
              {/* zoom wrapper: GSAP zoom-out on entry, your hover zoom stays on the Image */}
              <div data-ct="zoom" className="absolute inset-0">
                <Image
                  src="/assets/images/contact.webp"
                  title="contact"
                  alt="contact"
                  fill
                  sizes="(max-width: 767px) 100vw, 45vw"
                  className="object-cover hover:scale-105 transition duration-700 "
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

              <div className="absolute bottom-6 left-6 text-white">
                <h3
                  data-ct="oi"
                  className="ct-h text-xl sm:text-2xl font-semibold font-primary"
                >
                  Let’s Build Something Amazing
                </h3>

                <p
                  data-ct="oi"
                  className="ct-h text-sm text-white/80 mt-2 font-secondary"
                >
                  Clean design. Modern development.
                </p>

                {/* Social Media Icons */}
                <div data-ct="oi" className="ct-h flex gap-4 mt-4">
                  <SocialMediaIcons />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
