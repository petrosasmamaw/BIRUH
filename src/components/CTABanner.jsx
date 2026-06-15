import { motion } from 'framer-motion'
import { scrollAnimationProps } from '../hooks/useScrollAnimation'

export default function CTABanner() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div {...scrollAnimationProps} className="glass-panel rounded-2xl p-8 sm:p-12">
          <p className="font-mono text-gold text-xs uppercase tracking-widest mb-3">Get Started</p>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4 leading-tight">
            Ready to innovate
            <br />
            your business?
          </h2>
          <p className="text-text-secondary text-lg mb-10">
            Let&apos;s build something that lasts — together.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <button
              onClick={() => scrollTo('#contact')}
              className="w-full sm:w-auto bg-gold text-white font-semibold px-6 py-3.5 sm:py-3 rounded-full text-sm hover:bg-gold-dark transition-colors shadow-sm inline-flex items-center justify-center gap-2"
            >
              Start a Project →
            </button>
            <button
              onClick={() => scrollTo('#products')}
              className="w-full sm:w-auto border-2 border-gold text-gold-dark font-semibold px-6 py-3.5 sm:py-3 rounded-full text-sm hover:bg-gold/8 transition-colors"
            >
              View Our Work
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
