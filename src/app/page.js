import React from 'react'
import Hero from '../components/home/Hero'
import About from '../components/home/About'
import Education from '../components/home/Education'

function page() {
  return (
    <div>
      <Hero/>
      <About/>
      <Education/>
    </div>
  )
}

export default page