"use client";
import Image from "next/image";
import { FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export default function Achievements() {
  const achievements = [
    {
      title: "Best Developer Award",
      image: "/assets/images/services/front-end-1.jpg",
      comingSoon: false,
    },
    {
      title: "Top UI Designer",
      image: "/assets/images/services/front-end-1.jpg",
      comingSoon: false,
    },
    {
      title: "Innovation Excellence",
      image: "/assets/images/services/front-end-1.jpg",
      comingSoon: false,
    },
    {
      title: "Coming Soon",
      image: "/assets/images/services/front-end-1.jpg",
      comingSoon: true,
    },
  ];

  return (
    <section className="w-full mt-8 mb-16 px-2 md:px-16">
      <div className="container">
        {/* Top Layout */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 py-10 md:py-16">
          {/* Left Images */}
          <div className="relative w-full md:w-1/2 flex flex-col md:flex-row items-center md:justify-start gap-6 md:gap-0">
            {/* Main Image */}
            <div className="relative w-full lg:block hidden md:max-w-[480px] h-[350px] md:h-[460px] lg:translate-x-10">
              <Image
                src="/assets/images/contact-1.jpeg"
                alt="Mechanic working on car"
                fill
                className="object-cover rounded-2xl"
                priority
              />
            </div>

            {/* Second Image */}
            <div
              className="
    relative w-full h-[350px] 
    md:absolute md:bottom-16 md:-right-6 md:w-[280px] md:h-[290px]
    animate-floatX
  "
            >
              <Image
                src="/assets/images/contact-2.jpeg"
                alt="Mechanic with customer"
                fill
                className="object-cover rounded-2xl md:rounded-none border-0 md:border-8 border-[#e9eae5]"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full md:w-1/2 space-y-4 md:space-y-6 text-center md:text-left">
            <p className="text-secondary font-primary font-bold tracking-wide text-[22px] md:text-[22px]">
              Achievements and Awards
            </p>

            <h2 className="font-secondary text-secondary text-xl md:text-[30px] leading-snug">
              Milestones that reflect <br className="hidden md:block" />
              dedication and growth
            </h2>

            <p className="text-primary font-secondary text-[14px] md:text-lg leading-relaxed">
              Over the years, I have consistently focused on improving my
              skills, delivering high-quality projects, and pushing creative
              boundaries. From successfully completing real-world client
              projects to earning recognition for technical excellence, each
              achievement represents my commitment to continuous learning and
              innovation. These milestones highlight not just awards and
              certifications, but also the trust earned from clients,
              collaboration with teams, and the passion that drives my journey
              as a developer.
            </p>
          </div>
        </div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="bg-secondary border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="relative w-full h-55 md:h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4 md:p-5">
                <h4 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-white">
                  {item.title}
                </h4>

                {!item.comingSoon && (
                  <div className="flex gap-4 text-white text-sm justify-start">
                    <FaInstagram className="hover:text-black cursor-pointer transition" />
                    <FaLinkedinIn className="hover:text-black cursor-pointer transition" />
                    <FaTwitter className="hover:text-black cursor-pointer transition" />
                  </div>
                )}

                {item.comingSoon && (
                  <p className="text-gray-400 text-xs md:text-sm text-center md:text-left">
                    More achievements on the way...
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
