import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { initHeroScene } from '../three/HeroScene'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
})

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const cleanup = initHeroScene(canvasRef.current)
    return cleanup
  }, [])

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Golden glow — right side only, fades to white; polygon canvas unchanged */}
      <div
        className="absolute top-0 right-0 bottom-0 w-[58%] pointer-events-none hidden lg:block"
        style={{
          background: 'linear-gradient(270deg, rgba(255,255,255,0.4) 0%, rgba(255,252,247,0.15) 40%, transparent 100%)',
        }}
      />
      <div className="hero-light-bloom" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-[calc(100vh-5rem)]">
          <div className="order-1 lg:order-1">
            <motion.p
              {...fadeUp(0.1)}
              className="font-mono text-gold text-xs sm:text-sm uppercase tracking-widest mb-4 font-medium"
            >
              Ethiopian Software Company · Bahir Dar
            </motion.p>
            <motion.h1
              {...fadeUp(0.25)}
              className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-text-primary leading-tight mb-6"
            >
              Software That
              <br />
              <span className="text-gold">Illuminates.</span>
            </motion.h1>
            <motion.p
              {...fadeUp(0.4)}
              className="text-text-secondary text-base sm:text-lg max-w-lg mb-8 leading-relaxed"
            >
              We build AI-powered software, custom platforms,
              and digital products for Ethiopian businesses —
              from Bahir Dar to the world.
            </motion.p>
            <motion.div
              {...fadeUp(0.55)}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => scrollTo('#products')}
                className="bg-gold text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-gold-dark transition-colors shadow-sm"
              >
                See Our Work
              </button>
              <button
                onClick={() => scrollTo('#contact')}
                className="border-2 border-gold text-gold-dark font-semibold px-6 py-3 rounded-full text-sm hover:bg-gold/8 transition-colors"
              >
                Start a Project
              </button>
            </motion.div>
          </div>

          <div className="order-2 lg:order-2 relative h-[40vh] lg:h-[70vh] z-10">
            <canvas
              ref={canvasRef}
              className="w-full h-full relative z-10"
              style={{ background: 'transparent' }}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  )
}
