import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { scrollAnimationProps } from '../hooks/useScrollAnimation'

const segments = [
  'SMBs — Cafés, Shops, Clinics',
  'Schools & Universities',
  'Startups & Founders',
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

export default function TrustedBy() {
  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...scrollAnimationProps} className="text-center mb-8 sm:mb-10 glass-panel rounded-2xl p-6 sm:p-8">
          <p className="font-mono text-brand text-xs uppercase tracking-widest mb-3">Trusted By</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-3">
            Grown Across Ethiopia
          </h2>
          <p className="text-text-secondary text-sm sm:text-base max-w-xl mx-auto">
            Built for every kind of Ethiopian business — and backed by the people who use it.
          </p>
        </motion.div>

        <motion.div
          {...scrollAnimationProps}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10"
        >
          {segments.map((segment) => (
            <span
              key={segment}
              className="font-mono text-[11px] sm:text-xs tracking-wide px-3.5 py-1.5 rounded-full border border-gold/30 text-text-secondary bg-white/40"
            >
              {segment}
            </span>
          ))}
        </motion.div>

        <motion.div
          {...scrollAnimationProps}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5"
        >
          {testimonials.map((t) => (
            <blockquote
              key={t.author}
              className="glass-card-light rounded-xl p-5 sm:p-6 border border-gold/15"
            >
              <Quote className="text-brand/40 mb-3" size={20} />
              <p className="text-text-secondary text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
              <footer className="font-mono text-[11px] text-text-muted">— {t.author}</footer>
            </blockquote>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
