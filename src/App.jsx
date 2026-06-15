import { useRef } from 'react'
import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'
import Hero from './components/Hero'
import MarqueeStrip from './components/MarqueeStrip'
import Services from './components/Services'
import WhyZihon from './components/WhyZihon'
import Products from './components/Products'
import WhoWeServe from './components/WhoWeServe'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import CTABanner from './components/CTABanner'
import Footer from './components/Footer'
import ScrollFlowLayer from './components/ScrollFlowLayer'

function App() {
  const sectionRefs = useRef([])

  const setRef = (index) => (el) => {
    sectionRefs.current[index] = el
  }

  return (
    <div className="min-h-screen bg-background relative">
      <ScrollFlowLayer sectionRefs={sectionRefs} />
      <Navbar />
      <BottomNav />
      <main className="relative z-10 pt-[4rem] lg:pt-[4.5rem] max-lg:pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))]">
        <div ref={setRef(0)} data-section="home" className="flow-section-bg">
          <Hero />
        </div>
        <MarqueeStrip />
        <div ref={setRef(1)} id="services" className="flow-section-bg">
          <Services />
        </div>
        <div ref={setRef(2)} className="flow-section-bg-alt">
          <WhyZihon />
        </div>
        <div ref={setRef(3)} id="products" className="flow-section-bg">
          <Products />
        </div>
        <div ref={setRef(4)} className="flow-section-bg-alt">
          <WhoWeServe />
        </div>
        <div ref={setRef(5)} id="process" className="flow-section-bg">
          <Process />
        </div>
        <div ref={setRef(6)} className="flow-section-bg">
          <Testimonials />
        </div>
        <div ref={setRef(7)} className="flow-section-bg">
          <CTABanner />
        </div>
        <div ref={setRef(8)} id="contact" className="flow-section-bg-alt">
          <Footer />
        </div>
      </main>
    </div>
  )
}

export default App
