import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";

export const metadata = {
  metadataBase: new URL("https://muhammedsalman.me"),

  title: {
    default: "Muhammed Salman | Frontend Developer",
    template: "%s | Muhammed Salman",
  },

  description:
    "Muhammed Salman is a frontend developer specializing in React, Next.js, JavaScript, and Tailwind CSS. Explore his projects, skills, and web development work.",

  applicationName: "Muhammed Salman Portfolio",

  authors: [
    {
      name: "Muhammed Salman",
      url: "https://muhammedsalman.me",
    },
  ],
  publisher: "Muhammed Salman",

  creator: "Muhammed Salman",

  alternates: {
    canonical: "/",
  },

  // openGraph: {
  //   type: "website",
  //   url: "/",
  //   siteName: "Muhammed Salman Portfolio",
  //   title: "Muhammed Salman | Frontend Developer",
  //   description:
  //     "Explore Muhammed Salman's frontend development projects, skills, and web development work using React, Next.js, JavaScript, and Tailwind CSS.",
  //   locale: "en_IN",
  //   // Add images after creating the social preview image.
  //   // images: ["/og-image.png"],
  // },

  // twitter: {
  //   card: "summary",
  //   title: "Muhammed Salman | Frontend Developer",
  //   description:
  //     "Frontend developer specializing in modern web experiences with React, Next.js, JavaScript, and Tailwind CSS.",
  //   // Add images after creating the social preview image.
  //   // images: ["/og-image.png"],
  // },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "technology",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
