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
          background: 'linear-gradient(135deg, rgba(240,168,48,0.2) 0%, rgba(250,246,240,0) 60%)',
        }}
      />
      <div className="light-ray-bloom opacity-60" />

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
              className="bg-gold text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-gold-dark transition-colors shadow-sm inline-flex items-center gap-2"
            >
              Start a Project →
            </button>
            <button
              onClick={() => scrollTo('#products')}
              className="border-2 border-gold text-gold-dark font-semibold px-6 py-3 rounded-full text-sm hover:bg-gold/8 transition-colors"
            >
              View Our Work
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
