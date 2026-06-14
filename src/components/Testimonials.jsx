import { motion } from 'framer-motion'
import { scrollAnimationProps, staggerContainer, staggerItem } from '../hooks/useScrollAnimation'

const testimonials = [
  {
    quote:
      'Biruh built our entire café menu system in 2 weeks. Our customers love the QR code experience.',
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

export default function Testimonials() {
  return (
    <div className="py-14 sm:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...scrollAnimationProps} className="text-center mb-14 glass-panel rounded-2xl p-8 sm:p-10">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Trusted by Ethiopian businesses
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.author}
              variants={staggerItem}
              className="glass-card rounded-xl p-6 sm:p-8 border border-border relative"
            >
              <span className="font-display text-6xl text-gold/30 leading-none absolute top-4 left-5 select-none">
                &ldquo;
              </span>
              <p className="text-text-primary leading-relaxed mb-6 pt-8 relative z-10">
                {t.quote}
              </p>
              <p className="font-mono text-text-secondary text-sm">— {t.author}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
