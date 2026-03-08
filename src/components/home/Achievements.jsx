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
    <section className="w-full  mt-8 mb-18 px-6 md:px-16">
      <div className="container">
        {/* Section Title */}
        {/* <div className="mb-12 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            Awards & Achievements
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Recognitions and milestones achieved through dedication, creativity,
            and consistent performance in development and design.
          </p>
        </div> */}

        {/* Top Layout */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-16 px-6 md:px-16 py-16 ">
          {/* Left Images */}
          <div className="relative w-full md:w-1/2 flex justify-center md:justify-start">
            {/* Main Image */}
            <div className="relative hidden md:block w-full max-w-[480px] h-[460px]">
              <Image
                src="/assets/images/contact-1.jpeg"
                alt="Mechanic working on car"
                fill
                className="object-cover rounded-2xl"
                priority
              />
            </div>

            {/* Overlapping Image */}
            <div className=" lg:absolute bottom-16 -right-6 w-[280px] h-[290px] animate-floatX">
              <Image
                src="/assets/images/contact-2.jpeg"
                alt="Mechanic with customer"
                fill
                className="object-cover   border-8 border-[#e9eae5]"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full md:w-1/2 space-y-6 text-3xl md:text-[34px]  leading-tight text-black">
            <p className="text-secondary font-primary font-bold  tracking-wide">
              Achievements and Awards
            </p>

            <h2 className=" font-secondary text-secondary md:text-[30px]">
              Milestones that reflect <br className="hidden md:block" />
              dedication and growth
            </h2>

            <p className="text-primary font-secondary text-lg leading-relaxed">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="bg-secondary border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="relative w-full h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h4 className="text-lg font-semibold mb-3 text-white">
                  {item.title}
                </h4>

                {!item.comingSoon && (
                  <div className="flex gap-4 text-white text-sm">
                    <FaInstagram className="hover:text-black cursor-pointer transition" />
                    <FaLinkedinIn className="hover:text-black cursor-pointer transition" />
                    <FaTwitter className="hover:text-black cursor-pointer transition" />
                  </div>
                )}

                {item.comingSoon && (
                  <p className="text-gray-400 text-sm">
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
