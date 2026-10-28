import { MotionConfig } from 'framer-motion'
import { useEffect } from 'react'
import { Footer } from './components/layout/Footer'
import { MobileCtaBar } from './components/layout/MobileCtaBar'
import { Navbar } from './components/layout/Navbar'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Faq } from './components/sections/Faq'
import { FinalCta } from './components/sections/FinalCta'
import { Gallery } from './components/sections/Gallery'
import { Hero } from './components/sections/Hero'
import { Intro } from './components/sections/Intro'
import { Marquee } from './components/sections/Marquee'
import { Music } from './components/sections/Music'
import { Offer } from './components/sections/Offer'
import { Process } from './components/sections/Process'
import { Testimonials } from './components/sections/Testimonials'
import { SkipLink } from './components/ui/SkipLink'

export default function App() {
  // Wejście z linku z kotwicą (np. /?typ=wesele#kontakt) — przewiń po renderze
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <SkipLink />
      <Navbar />
      <main id="main">
        <Hero />
        <Marquee />
        <Intro />
        <Offer />
        <Gallery />
        <Music />
        <Process />
        <About />
        <Testimonials />
        <Faq />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
      <MobileCtaBar />
    </MotionConfig>
  )
}
