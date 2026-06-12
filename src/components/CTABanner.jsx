import { motion } from 'framer-motion'
import { scrollAnimationProps } from '../hooks/useScrollAnimation'

export default function CTABanner() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative py-24 sm:py-32 bg-background overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(212,137,26,0.15) 0%, transparent 60%)',
        }}
      />
      <div className="light-ray-bloom opacity-40" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div {...scrollAnimationProps}>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4 leading-tight">
            Ready to illuminate
            <br />
            your business?
          </h2>
          <p className="text-text-secondary text-lg mb-10">
            Let&apos;s build something that lasts — together.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => scrollTo('#contact')}
              className="bg-gold-light text-black font-semibold px-6 py-3 rounded-full text-sm hover:bg-gold transition-colors inline-flex items-center gap-2"
            >
              Start a Project →
            </button>
            <button
              onClick={() => scrollTo('#products')}
              className="border border-gold-light text-gold-light font-semibold px-6 py-3 rounded-full text-sm hover:bg-gold-light/10 transition-colors"
            >
              View Our Work
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
