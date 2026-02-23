import React from "react";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Education from "../components/home/Education";
import Skills from "../components/home/Skills";
import Projects from "../components/home/Projects";
import Blogs from "../components/home/Blogs";

function page() {
  return (
    <div>
      <Hero />
      <About />
      <Education />
      <Skills />
      <Projects />
      <Blogs />
    </div>
  );
}

export default page;
