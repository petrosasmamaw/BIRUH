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
    <div id="trusted" className="relative py-14 sm:py-20 lg:py-24 overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...scrollAnimationProps} className="text-center mb-8">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-text-muted mb-3">
            Trusted across
          </p>
          <p className="font-mono text-[11px] sm:text-xs text-text-secondary tracking-wide">
            {segments.join(' · ')}
          </p>
        </motion.div>

        <motion.div
          {...scrollAnimationProps}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 sm:mb-12"
        >
          {testimonials.map((t) => (
            <blockquote
              key={t.author}
              className="glass-card-light rounded-xl p-4 sm:p-5 border border-gold/15 text-left"
            >
              <p className="text-text-secondary text-sm leading-relaxed mb-3">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="font-mono text-[10px] text-text-muted">— {t.author}</footer>
            </blockquote>
          ))}
        </motion.div>

        <motion.div {...scrollAnimationProps} className="glass-panel rounded-2xl p-8 sm:p-12 text-center">
          <p className="font-mono text-brand text-xs uppercase tracking-widest mb-3">Get Started</p>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4 leading-tight">
            Ready to grow
            <br />
            your business?
          </h2>
          <p className="text-text-secondary text-base sm:text-lg mb-8 sm:mb-10">
            Let&apos;s build something that lasts — together.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <button
              onClick={() => scrollTo('#contact')}
              className="w-full sm:w-auto bg-brand text-white font-semibold px-6 py-3.5 sm:py-3 rounded-full text-sm hover:bg-brand-dark transition-colors shadow-sm inline-flex items-center justify-center gap-2"
            >
              Start a Project →
            </button>
            <button
              onClick={() => scrollTo('#growth')}
              className="w-full sm:w-auto border-2 border-gold text-brand-dark font-semibold px-6 py-3.5 sm:py-3 rounded-full text-sm hover:bg-brand/8 transition-colors"
            >
              See Our Growth
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
