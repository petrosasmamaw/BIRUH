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
          <div className="order-1 w-full text-center lg:text-left">
            <motion.p
              {...fadeUp(0.1)}
              className="font-mono text-gold text-[11px] sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 font-medium"
            >
              Ethiopian Software · Bahir Dar
            </motion.p>
            <motion.h1
              {...fadeUp(0.25)}
              className="font-display text-[2rem] leading-[1.1] sm:text-5xl lg:text-7xl font-bold text-text-primary mb-4 sm:mb-6"
            >
              Software That
              <br />
              <span className="text-gold">Illuminates.</span>
            </motion.h1>
            <motion.p
              {...fadeUp(0.4)}
              className="text-text-secondary text-sm sm:text-lg max-w-lg mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed"
            >
              We build AI-powered software, custom platforms,
              and digital products for Ethiopian businesses —
              from Bahir Dar to the world.
            </motion.p>
            <motion.div
              {...fadeUp(0.55)}
              className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 sm:gap-4"
            >
              <button
                onClick={() => scrollTo('#products')}
                className="w-full sm:w-auto bg-gold text-white font-semibold px-6 py-3.5 sm:py-3 rounded-full text-sm hover:bg-gold-dark transition-colors shadow-sm"
              >
                See Our Work
              </button>
              <button
                onClick={() => scrollTo('#contact')}
                className="w-full sm:w-auto border-2 border-gold text-gold-dark font-semibold px-6 py-3.5 sm:py-3 rounded-full text-sm hover:bg-gold/8 transition-colors"
              >
                Start a Project
              </button>
            </motion.div>
          </div>

          <div
            className="order-2 w-full relative h-[30vh] sm:h-[36vh] lg:h-[70vh] shrink-0"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent z-10" />
    </section>
  )
}
