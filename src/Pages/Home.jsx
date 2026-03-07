import React from 'react'
import Hero from '../Components/Hero'
import AboutUsCurvedCentered from '../Components/AboutUs'
import Projects from '../Components/Projects/Projects'
import Mission from '../Components/Mission'
import Blog from '../Components/Blog'
import FooterCTA from '../Components/FooterCTA'
import Contact from '../Components/Contact'
import Socials from '../Components/Socials'
import Reveal from '../Components/Reveal'

const Home = () => {
  return (
    <div>
      <Hero />
      <Socials />
      <AboutUsCurvedCentered />
      <div id="projects">
        <Reveal>
          <Projects />
        </Reveal>
      </div>
      <Mission />
      <Blog />
      <FooterCTA />
      <div className="" id="contact">
        <Contact />
      </div>
    </div>
  )
}

export default Home