import { motion } from 'framer-motion'
import { scrollAnimationProps } from '../hooks/useScrollAnimation'

const segments = [
  'SMBs',
  'Schools & Universities',
  'Startups',
  'Enterprises & NGOs',
]

const testimonials = [
  {
    quote:
      'Hareg Tech built our entire café menu system in 2 weeks. Our customers love the QR code experience.',
    author: 'Café Owner, Bahir Dar',
  },
  {
    quote:
      'The LMS they delivered completely transformed how we manage our courses and student payments.',
    author: 'University Administrator, Addis Ababa',
  },
  {
    quote:
      'Fast, professional, and they actually understand Ethiopian business. Rare combination.',
    author: 'Startup Founder, Bahir Dar',
  },
]

export default function CTABanner() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div id="trusted" className="relative section-pad overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...scrollAnimationProps} className="text-center mb-7 sm:mb-8">
          <p className="font-mono type-caption uppercase tracking-widest text-text-muted mb-2.5">
            Trusted across
          </p>
          <p className="font-mono type-label text-text-secondary tracking-wide leading-relaxed px-1">
            {segments.join(' · ')}
          </p>
        </motion.div>

        <motion.div
          {...scrollAnimationProps}
          className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 mb-9 sm:mb-12"
        >
          {testimonials.map((t) => (
            <blockquote
              key={t.author}
              className="glass-card-light rounded-xl p-[var(--space-card)] border border-gold/15 text-left"
            >
              <p className="type-body-sm text-text-secondary mb-3">&ldquo;{t.quote}&rdquo;</p>
              <footer className="font-mono type-caption text-text-muted">— {t.author}</footer>
            </blockquote>
          ))}
        </motion.div>

        <motion.div
          {...scrollAnimationProps}
          className="glass-panel rounded-2xl p-6 sm:p-12 text-center"
        >
          <p className="font-mono type-caption text-brand uppercase tracking-widest mb-3">
            Get Started
          </p>
          <h2 className="font-display type-title font-bold text-text-primary mb-4">
            Ready to grow
            <br />
            your business?
          </h2>
          <p className="type-body text-text-secondary mb-8 sm:mb-10 max-w-md mx-auto">
            Let&apos;s build something that lasts — together.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center tap-gap">
            <button
              type="button"
              onClick={() => scrollTo('#contact')}
              className="btn-touch w-full sm:w-auto bg-brand text-white font-semibold px-6 rounded-full type-label hover:bg-brand-dark transition-colors duration-200 shadow-sm cursor-pointer"
            >
              Start a Project →
            </button>
            <button
              type="button"
              onClick={() => scrollTo('#growth')}
              className="btn-touch w-full sm:w-auto border-2 border-gold text-brand-dark font-semibold px-6 rounded-full type-label hover:bg-brand/8 transition-colors duration-200 cursor-pointer"
            >
              See Our Growth
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
