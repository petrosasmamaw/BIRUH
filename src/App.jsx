import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import WhyBiruh from './components/WhyBiruh'
import Products from './components/Products'
import WhoWeServe from './components/WhoWeServe'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import CTABanner from './components/CTABanner'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyBiruh />
        <Products />
        <WhoWeServe />
        <Process />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </div>
  )
}

export default App
