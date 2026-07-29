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
      url: "https://github.com/yourusername",
      hover: "hover:bg-black",
    },
    {
      id: 2,
      name: "LinkedIn",
      icon: FaLinkedinIn,
      url: "https://linkedin.com/in/yourusername",
      hover: "hover:bg-[#0A66C2]/80",
    },
    {
      id: 3,
      name: "Instagram",
      icon: FaInstagram,
      url: "https://instagram.com/yourusername",
      hover: "hover:bg-[#E4405F]/80",
    },
    {
      id: 4,
      name: "WhatsApp",
      icon: FaWhatsapp,
      url: "https://wa.me/919999999999",
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
            aria-label={item.name}
className={`w-9 h-9 flex items-center justify-center rounded-full
bg-[var(--social-bg)]
text-[var(--social-text)]
hover:text-white
transition-all duration-300
hover:scale-110
${item.hover}`}          >
            <Icon size={16} />
          </Link>
        );
      })}
    </div>
  );
}
