"use client";
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa6";
import Link from "next/link";

export default function SocialMediaIcons() {
  const socialLinks = [
    {
      id: 1,
      name: "GitHub",
      icon: FaGithub,
      url: "https://github.com/muhammed-salman10",
      title: "Visit Muhammed Salman's GitHub Profile",
      hover: "hover:bg-black",
    },
    {
      id: 2,
      name: "LinkedIn",
      icon: FaLinkedinIn,
      url: "https://www.linkedin.com/in/muhammed-salman-dev/",
      title: "Connect with Muhammed Salman on LinkedIn",
      hover: "hover:bg-[#0A66C2]/80",
    },
    {
      id: 3,
      name: "Instagram",
      icon: FaInstagram,
      url: "https://www.instagram.com/freekicker_10/",
      title: "Follow Muhammed Salman on Instagram",
      hover: "hover:bg-[#E4405F]/80",
    },
    {
      id: 4,
      name: "WhatsApp",
      icon: FaWhatsapp,
      url: "https://wa.me/919539717792",
      title: "Contact Muhammed Salman on WhatsApp",
      hover: "hover:bg-[#25D366]/80",
    },
  ];

  return (
    <div className="flex gap-4">
      {socialLinks.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            title={item.title}
            aria-label={item.title}
            className={`w-9 h-9 flex items-center justify-center rounded-full bg-[var(--social-bg)] text-[var(--social-text)] hover:text-white transition-all duration-300 hover:scale-110 ${item.hover}`}
          >
            <Icon size={16} />
          </Link>
        );
      })}
    </div>
  );
}
