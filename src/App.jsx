import React, { useState } from 'react'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Orbit from './components/Orbit'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Certifications from './components/Certifications'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [showServices, setShowServices] = useState(false)

  return (
    <>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <Navbar onOpenFreelance={() => setShowServices(true)} />
      <Hero />
      <Marquee />
      <About />
      <Orbit />
      <Experience />
      <Projects />
      <Achievements />
      <Certifications />
      <Contact />
      <Footer />
      <Services isOpen={showServices} onClose={() => setShowServices(false)} />
    </>
  )
}

export default App
