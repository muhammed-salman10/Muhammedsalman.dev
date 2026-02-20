import React from 'react'
import Hero from '../components/home/Hero'
import About from '../components/home/About'
import Education from '../components/home/Education'
import Skills from '../components/home/Skills'

function page() {
  return (
    <div>
      <Hero/>
      <About/>
      <Education/>
      <Skills/>
    </div>
  )
}

export default page