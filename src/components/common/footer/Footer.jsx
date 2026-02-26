//src/components/common/footer/Footer.jsx
"use client";
import React from "react";
import navbarLinks from "../header/navbarLinks";
import SocialMediaIcons from "../social-media/SocialMediaIcons";
import Link from "next/link";
import { FaEnvelope, FaPhone } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <h1 className="text-center text-2xl md:text-3xl py-10 font-semibold tracking-wide font-primary">
          Portfolio
        </h1>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base font-secondary">
          {navbarLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="relative group transition duration-300 hover:text-gray-400"
            >
              {link.label}
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Contact + Social Section */}
        <div className="flex flex-col md:flex-row items-center  justify-center gap-8 md:gap-20 mt-12 pb-8 border-b border-gray-700 text-sm md:text-base text-gray-300 font-secondary">
          {/* Email */}
          <Link
            href="mailto:salmanmuhammed827@gmail.com"
            className="flex items-center gap-2 hover:text-white transition block lg:hidden"
          >
            <FaEnvelope className="text-lg" />
            <span className="break-all text-[12px]">
              salmanmuhammed827@gmail.com
            </span>
          </Link>

          {/* Phone */}
          <Link
            href="tel:+919539717792"
            className="flex items-center gap-2 hover:text-white transition block lg:hidden"
          >
            <FaPhone className="text-lg" />
            <span className="text-[12px]">+91 9539717792</span>
          </Link>
          {/* Social Icons */}
          <div className="flex justify-center">
            <SocialMediaIcons />
          </div>
        </div>

        {/* Copyright */}
        <div className="flex items-center justify-center lg:justify-between">
          {/* Email – Desktop only */}
          <Link
            href="mailto:salmanmuhammed827@gmail.com"
            className="hidden lg:flex items-center gap-2 hover:text-white transition"
          >
            <FaEnvelope className="text-lg" />
            <span className="break-all text-[12px]">
              salmanmuhammed827@gmail.com
            </span>
          </Link>

          {/* Copyright – Mobile & Desktop */}
          {/* Mobile Version ( Animation) */}
          <p className="text-center text-xs py-6 text-gray-400 font-primary block lg:hidden animate-marquee">
            © {new Date().getFullYear()} Muhammed Salman. All Rights Reserved.
          </p>

          {/* Desktop Version (No Animation) */}
          <p className="text-center text-sm py-6 text-gray-400 font-primary hidden lg:block ">
            © {new Date().getFullYear()} Muhammed Salman. All Rights Reserved.
          </p>

          {/* Phone – Desktop only */}
          <Link
            href="tel:+919539717792"
            className="hidden lg:flex items-center gap-2 hover:text-white transition"
          >
            <FaPhone className="text-lg" />
            <span className="text-[12px]">+91 95397 17792</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
