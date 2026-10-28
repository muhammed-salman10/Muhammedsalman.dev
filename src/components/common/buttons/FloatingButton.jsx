"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { IoAdd, IoCall } from "react-icons/io5";
import { IoIosText } from "react-icons/io";
import { MdEmail } from "react-icons/md";

function FloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.body.classList.contains("dark"));
    };

    // Initial theme check
    checkTheme();

    // Detect ThemeToggle changes
    const observer = new MutationObserver(checkTheme);

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const ctaData = [
    {
      title: "whatsapp",
      icon: <FaWhatsapp size={18} />,
      link: "https://wa.me/919539717792",
      className: "bg-[#25D366] text-white border-[#25D366]",
      position: "bottom-[150px]",
    },
    {
      title: "call-us",
      icon: <IoCall size={18} />,
      link: "tel:+919539717792",
      className: isDark
        ? "bg-[#3B82F6] text-white border-[#3B82F6]"
        : "bg-[#2563EB] text-white border-[#2563EB]",
      position: "bottom-[100px]",
    },

    {
      title: "Email Us",
      icon: <MdEmail size={18} />,
      link: "mailto:salmanmuhammed827@gmail.com",
      className: isDark
        ? "bg-[#EA4335] text-white border-[#EA4335]"
        : "bg-[#D93025] text-white border-[#D93025]",
      position: "bottom-[50px]",
    },
  ];

  return (
    <div className="fixed right-5 bottom-5 z-[999]">
      <div className="relative">
        {/* Floating Buttons */}
        {ctaData.map((cta, index) => (
          <Link
            key={cta.title}
            href={cta.link}
            target={cta.link.startsWith("/") ? "_self" : "_blank"}
            rel="noopener noreferrer"
            title={`${cta.title} - ${cta.link.startsWith("/") ? "Navigate to page" : "Open external link"}`}
            aria-label={`${cta.title}${cta.link.startsWith("/") ? "" : " (opens in a new tab)"}`}
            className={`
              absolute
              right-0
              bottom-0
              w-11
              h-11
              mb-1
              flex
              items-center
              justify-center
              rounded-full
              border
              shadow-lg
              transition-all
              duration-500
              ease-[cubic-bezier(0.22,1,0.36,1)]
              ${cta.className}

              ${
                isOpen
                  ? `${cta.position} opacity-100 scale-100 rotate-0`
                  : "opacity-0 scale-50 rotate-[-45deg] pointer-events-none"
              }
            `}
            style={{
              transitionDelay: isOpen
                ? `${index * 80}ms`
                : `${(2 - index) * 50}ms`,
            }}
          >
            {cta.icon}
          </Link>
        ))}

        {/* Main Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle floating menu"
          aria-expanded={isOpen}
          className={`
            relative
            w-12
            h-12
            flex
            items-center
            justify-center
            rounded-full
            border
            shadow-lg
            transition-all
            duration-300
            ${
              isDark
                ? "bg-[#000080] text-white border-white hover:bg-[#000080]"
                : "bg-[#000080] text-white border-black hover:bg-[#000080]"
            }
          `}
        >
          {/* Pulse */}
          {!isOpen && (
            <span
              className={`
                absolute
                inset-0
                rounded-full
                border
                animate-ping
                ${isDark ? "border-white" : "border-black"}
              `}
            />
          )}

          {/* Plus */}
          <IoAdd
            size={22}
            className={`
              relative
              z-10
              transition-transform
              duration-500
              ${isOpen ? "rotate-45" : "rotate-0"}
            `}
          />
        </button>
      </div>
    </div>
  );
}

export default FloatingButton;
