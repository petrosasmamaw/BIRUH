import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'
import Hero from './components/Hero'
import MarqueeStrip from './components/MarqueeStrip'
import Services from './components/Services'
import WhyHareg from './components/WhyHareg'
import Products from './components/Products'
import WhoWeServe from './components/WhoWeServe'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import CTABanner from './components/CTABanner'
import Footer from './components/Footer'
import VineGrowthLayer from './components/VineGrowthLayer'

function App() {
  return (
    <div className="min-h-screen bg-background relative">
      <VineGrowthLayer />
      <Navbar />
      <BottomNav />
      <main className="relative z-10 pt-[4rem] lg:pt-[4.5rem] max-lg:pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))]">
        <div data-section="home" className="flow-section-bg">
          <Hero />
        </div>
        <MarqueeStrip />
        <div id="services" className="flow-section-bg">
          <Services />
        </div>
        <div id="about" className="flow-section-bg-alt">
          <WhyHareg />
        </div>
        <div id="products" className="flow-section-bg">
          <Products />
        </div>
        <div className="flow-section-bg-alt">
          <WhoWeServe />
        </div>
        <div id="process" className="flow-section-bg">
          <Process />
        </div>
        <div className="flow-section-bg">
          <Testimonials />
        </div>
        <div className="flow-section-bg">
          <CTABanner />
        </div>
        <div id="contact" className="flow-section-bg-alt">
          <Footer />
        </div>
      </main>
    </div>
  )
}

export default App
