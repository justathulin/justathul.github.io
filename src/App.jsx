import React from 'react'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Orbit from './components/Orbit'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Orbit />
      <Projects />
      <Achievements />
      <Certifications />
      <Contact />
      <Footer />
    </>
  )
}

export default App
