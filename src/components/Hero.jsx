import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

export default function Hero() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-[100dvh] lg:min-h-screen flex items-center overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-2 lg:pt-4">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-4 items-center min-h-[calc(100dvh-5rem)] lg:min-h-[calc(100vh-5rem)]">
          <div className="order-1 w-full text-center lg:text-left glass-panel p-6 sm:p-8 lg:p-10 rounded-2xl">
            <motion.p
              {...fadeUp(0.1)}
              className="font-mono text-gold text-sm sm:text-base uppercase tracking-widest mb-4 sm:mb-5 font-medium"
            >
              Ethiopian Software · ETHIOPIA
            </motion.p>
            <motion.h1
              {...fadeUp(0.25)}
              className="font-display text-[2.75rem] leading-[1.08] sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-bold text-text-primary mb-5 sm:mb-7"
            >
              Software That
              <br />
              <span className="text-gold">Illuminates.</span>
            </motion.h1>
            <motion.p
              {...fadeUp(0.4)}
              className="text-text-secondary text-base sm:text-xl lg:text-2xl max-w-xl mx-auto lg:mx-0 mb-8 sm:mb-10 leading-relaxed"
            >
              We build AI-powered software, custom platforms,
              and digital products for Ethiopian businesses —
              from Ethiopia to the world.
            </motion.p>
            <motion.div
              {...fadeUp(0.55)}
              className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 sm:gap-4"
            >
              <button
                onClick={() => scrollTo('#products')}
                className="w-full sm:w-auto bg-gold text-white font-semibold px-8 py-4 rounded-full text-base hover:bg-gold-dark transition-colors shadow-sm"
              >
                See Our Work
              </button>
              <button
                onClick={() => scrollTo('#contact')}
                className="w-full sm:w-auto border-2 border-gold text-gold-dark font-semibold px-8 py-4 rounded-full text-base hover:bg-gold/8 transition-colors"
              >
                Start a Project
              </button>
            </motion.div>
          </div>

          <div
            className="order-2 w-full relative h-[28vh] sm:h-[32vh] lg:h-[65vh] shrink-0"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent z-10" />
    </section>
  )
}
