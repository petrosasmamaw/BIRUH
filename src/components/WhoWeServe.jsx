import { motion } from 'framer-motion'
import { Store, Building2, Rocket, Landmark } from 'lucide-react'
import { scrollAnimationProps, staggerContainer, staggerItem } from '../hooks/useScrollAnimation'

const segments = [
  {
    icon: Store,
    title: 'SMBs — Cafés, Shops, Clinics',
    description:
      'Digital menus, booking systems, and management tools for the businesses that keep Ethiopia running.',
  },
  {
    icon: Building2,
    title: 'Schools & Universities',
    description:
      'LMS platforms, student portals, payment systems — EdTech built for Ethiopian institutions.',
  },
  {
    icon: Rocket,
    title: 'Startups & Founders',
    description:
      'Got an idea? We build your MVP fast. Equity-friendly pricing for early-stage teams.',
  },
  {
    icon: Landmark,
    title: 'Enterprises & NGOs',
    description:
      'Scalable ERP and automation for larger organizations that need reliability and local support.',
  },
]

export default function WhoWeServe() {
  return (
    <section className="py-20 sm:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...scrollAnimationProps} className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Built for every Ethiopian business
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {segments.map((segment) => {
            const Icon = segment.icon
            return (
              <motion.div
                key={segment.title}
                variants={staggerItem}
                className="bg-surface-elevated border border-white/5 rounded-xl p-6 sm:p-8 hover:border-gold/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                  <Icon className="text-gold-light" size={24} />
                </div>
                <h3 className="font-display text-xl font-bold text-text-primary mb-3">
                  {segment.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">{segment.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
