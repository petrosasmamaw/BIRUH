import { motion } from 'framer-motion'
import { Globe, Code2, BarChart3, GraduationCap, UtensilsCrossed, Brain } from 'lucide-react'
import { scrollAnimationProps } from '../hooks/useScrollAnimation'

const services = [
  {
    icon: Globe,
    title: 'Websites & Mobile Apps',
    description: 'Fast sites and mobile apps built for Ethiopian users — shipped in days, not weeks.',
  },
  {
    icon: Code2,
    title: 'Custom Software & SaaS',
    description: 'Web apps and platforms shaped to your business — not a template.',
  },
  {
    icon: BarChart3,
    title: 'Business Automation & ERP',
    description: 'Inventory, HR, and finance tools built for Ethiopian enterprise.',
  },
  {
    icon: GraduationCap,
    title: 'LMS & EdTech',
    description: 'Learning systems for schools with courses, exams, and payments.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Café Menu & Management',
    description: 'QR menus and order systems for cafés and restaurants.',
  },
  {
    icon: Brain,
    title: 'AI-Powered Solutions',
    description: 'LLM automation and smart features when they cut cost and save time.',
  },
]

export default function Services() {
  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...scrollAnimationProps} className="text-center mb-10 sm:mb-12 glass-panel rounded-2xl p-6 sm:p-8">
          <p className="font-mono text-brand text-xs uppercase tracking-widest mb-3">Services</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-3">
            What We Build
          </h2>
          <p className="text-text-secondary text-sm sm:text-base max-w-xl mx-auto">
            Every project starts as a shoot — here&apos;s what we grow it into.
          </p>
        </motion.div>

        <motion.div
          {...scrollAnimationProps}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="glass-card border-t-2 border-t-gold rounded-xl p-5"
              >
                <Icon className="text-brand mb-3" size={24} />
                <h3 className="text-text-primary font-semibold text-sm sm:text-base mb-1.5">
                  {service.title}
                </h3>
                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
