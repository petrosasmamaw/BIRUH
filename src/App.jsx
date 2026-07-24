import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'
import Hero from './components/Hero'
import Services from './components/Services'
import Products from './components/Products'
import Approach from './components/Approach'
import CTABanner from './components/CTABanner'
import Footer from './components/Footer'
import VineGrowthLayer from './components/VineGrowthLayer'

function App() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* VineGrowthLayer is locked — do not edit, refactor, or retarget its animation */}
      <VineGrowthLayer />
      <Navbar />
      <BottomNav />
      <main className="relative z-10 pt-[4rem] lg:pt-[4.5rem] max-lg:pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))]">
        {/* 1. Hero */}
        <div data-section="home" className="flow-section-bg">
          <Hero />
        </div>

        {/* 2. Services */}
        <div id="services" className="flow-section-bg">
          <Services />
        </div>

        {/* 3. Growth (+ Roots strip inside); #products for old links */}
        <div id="growth" className="flow-section-bg-alt">
          <div id="products" className="sr-only" aria-hidden="true" />
          <Products />
        </div>

        {/* 4. Approach; legacy #about / #process */}
        <div id="approach" className="flow-section-bg">
          <div id="about" className="sr-only" aria-hidden="true" />
          <div id="process" className="sr-only" aria-hidden="true" />
          <Approach />
        </div>

        {/* 5. CTA (+ testimonials / segments) */}
        <div className="flow-section-bg-alt">
          <CTABanner />
        </div>

        <div id="contact" className="flow-section-bg">
          <Footer />
        </div>
      </main>
    </div>
  )
}

export default App
