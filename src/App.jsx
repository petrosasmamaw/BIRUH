import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'
import Hero from './components/Hero'
import Services from './components/Services'
import Products from './components/Products'
import Approach from './components/Approach'
import CTABanner from './components/CTABanner'
import Faq from './components/Faq'
import Footer from './components/Footer'
import VineGrowthLayer from './components/VineGrowthLayer'
import ProjectOrderModal from './components/ProjectOrderModal'

function App() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* VineGrowthLayer is locked — do not edit, refactor, or retarget its animation */}
      <VineGrowthLayer />
      <Navbar />
      <BottomNav />
      <ProjectOrderModal />
      <main className="relative z-10 pt-[4rem] lg:pt-[4.5rem] max-lg:pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))]">
        <div data-section="home" className="flow-section-bg">
          <Hero />
        </div>

        <div id="services" className="flow-section-bg">
          <Services />
        </div>

        <div id="growth" className="flow-section-bg-alt">
          <div id="products" className="sr-only" aria-hidden="true" />
          <Products />
        </div>

        <div id="approach" className="flow-section-bg">
          <div id="about" className="sr-only" aria-hidden="true" />
          <div id="process" className="sr-only" aria-hidden="true" />
          <Approach />
        </div>

        <div className="flow-section-bg-alt">
          <CTABanner />
        </div>

        <div className="flow-section-bg">
          <Faq />
        </div>

        <div id="contact" className="flow-section-bg-alt">
          <Footer />
        </div>
      </main>
    </div>
  )
}

export default App
