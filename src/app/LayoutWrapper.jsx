"use client";

import { Playfair_Display, Montserrat } from "next/font/google";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export default function LayoutWrapper({ children, className = "" }) {
  return (
    <div
      className={`${playfair.variable} ${montserrat.variable} antialiased relative min-h-screen overflow-x-hidden ${className}`}
    >
      <main>{children}</main>
    </div>
  );
}
