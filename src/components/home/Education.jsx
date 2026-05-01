//src/components/about-us/TimeLine.jsx
"use client";
import React, { useState } from "react";

function Education() {
  const [activeYear, setActiveYear] = useState(2025.5);

  const timelineData = [
    {
      year: 2025.5,
      title: "Junior MERN Stack Developer (Jun 2025 – Present)",
      desc: "Promoted to Junior MERN Stack Developer at Webeyecraft Technologies, actively building scalable web applications, optimizing UI/UX performance, and contributing to production-level deployments.",
    },
    {
      year: 2025,
      title: "MERN Stack Intern (Mar 2025 – Jun 2025)",
      desc: "Worked as a MERN Stack Intern at Webeyecraft Technologies, contributing to live projects, improving frontend performance, and collaborating with development teams.",
    },
    {
      year: 2023,
      title: "MERN Stack Internship (2023 – 2024)",
      desc: "Completed MERN Stack Internship at Luminar Technolab, gaining hands-on experience in MongoDB, Express.js, React, and Node.js while working on real-world full-stack projects.",
    },
    {
      year: 2020,
      title: "BSc Computer Science (2020 – 2023)",
      desc: "Graduated in Computer Science from Chinmaya Mission College under Kerala University, developing core knowledge in programming, data structures, and software development principles.",
    },
    {
      year: 2018,
      title: "Higher Secondary Education (2018 – 2020)",
      desc: "Completed Higher Secondary Education from St. Antony's, Pudukad, building a strong academic foundation in science and analytical thinking.",
    },
  ];

  return (
    <section className="lg:py-20 md:py-10 md:mb-46 ">
      <div className="container relative">
        <div className="text-center mb-14 max-w-4xl mx-auto">
          <h2 className=" md:text-4xl text-2xl font-bold text-[#000080] font-primary mt-16 lg:mt-0">
            Academic and Professional Journey
          </h2>

          <p className="text-primary mt-4 text-[15px] md:text-[18px] leading-relaxed font-secondary">
            My academic and professional journey has been a continuous path of
            learning, growth, and practical experience. From building a solid
            foundation in computer science to applying those skills in
            real-world projects, each stage has helped shape my technical
            expertise and professional mindset. Through dedication, hands-on
            development, and constant self-improvement, I continue to evolve as
            a developer committed to delivering meaningful digital solutions.
          </p>
        </div>
        {/* Timeline Line */}
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between lg:max-w-[95%] mx-auto font-secondary">
          {/* Horizontal line (desktop) */}
          <div className="hidden md:block absolute top-3 left-0 w-full h-[2px] bg-gray-300"></div>

          {/* Vertical line (mobile) */}
          <div className="block md:hidden absolute left-[22px] top-0 w-[2px] h-full bg-gray-300"></div>

          {/* Start dot */}
          <div className="relative z-10 flex flex-col items-center md:items-center mb-10 md:mb-0">
            <div className="w-3 h-3 bg-[#000080] border-[3px] border-gray-200 rounded-full md:translate-y-[-19px] translate-x-[17px] md:translate-x-0"></div>
          </div>

          {/* Timeline Items */}
          {timelineData.map((item) => (
            <div
              key={item.year}
              className="relative z-10 flex flex-col md:flex-col items-start md:items-center cursor-pointer mb-12 md:mb-0 md:min-w-[140px]"
              onMouseEnter={() => setActiveYear(item.year)}
              onClick={() => setActiveYear(item.year)}
            >
              {/* Dot */}
              <div className="relative mt-1 ml-[16px] md:ml-0">
                <div
                  className={`w-4 h-4 border-[3px] border-gray-200  rounded-full relative z-10 transition-all duration-300 ${
                    activeYear === item.year ? "bg-[#000080]" : "bg-gray-400"
                  }`}
                ></div>
                {activeYear === item.year && (
                  <span className="absolute -inset-1 rounded-full bg-[#000080] opacity-50 animate-ping"></span>
                )}
              </div>

              {/* Year Label */}
              <div
                className={`mt-3 md:mt-3 ml-10 md:ml-0 px-4 py-1 rounded-md font-semibold transition-all duration-300 text-sm md:text-base ${
                  activeYear === item.year
                    ? "bg-[#000080] text-white"
                    : "bg-gray-200 text-[#000080]"
                }`}
              >
                {item.year}
              </div>

              {/* Info Box (active year only) */}
              {activeYear === item.year && (
                <div className="relative md:absolute md:top-full md:mt-5 lg:left-1/2 md:left-[56px] md:-translate-x-1/2  w-full lg:w-[400px] md:w-[200px] mt-5 md:mb-10">
                  <div className="bg-[#000080] text-white  rounded-lg p-5 relative">
                    {/* Arrow (desktop only) */}
                    <div className="hidden md:block absolute -top-5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[12px] border-l-transparent border-r-transparent border-b-[#000080]"></div>

                    <h3 className="font-semibold text-lg lg:text-[18px] md:text-[14px]">
                      {item.title}
                    </h3>
                    <p className="text-[14px] lg:text-[14px] md:text-[10px] mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* End dot */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-3 h-3 bg-[#000080] border-[3px] border-gray-200 rounded-full lg:translate-y-[-19px] md:translate-y-[-20px] translate-x-[17px] lg:translate-x-0 md:translate-x-[-22px]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
