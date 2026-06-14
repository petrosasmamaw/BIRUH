import { motion } from 'framer-motion'
import { Code2, Brain, GraduationCap, BarChart3, Globe, UtensilsCrossed } from 'lucide-react'
import { scrollAnimationProps, staggerContainer, staggerItem } from '../hooks/useScrollAnimation'

const services = [
  {
    icon: Code2,
    title: 'Custom Software & SaaS',
    description: 'Web apps and platforms built for your exact business — not a template.',
  },
  {
    icon: Brain,
    title: 'AI-Powered Solutions',
    description: 'LLM integration, automation, and intelligent features that save time and money.',
  },
  {
    icon: GraduationCap,
    title: 'LMS & EdTech Platforms',
    description: 'Full learning management systems for schools and universities, with payments and exams.',
  },
  {
    icon: BarChart3,
    title: 'Business Automation & ERP',
    description: 'Automate operations — inventory, HR, finance — built for Ethiopian enterprise.',
  },
  {
    icon: Globe,
    title: 'Landing Pages & Websites',
    description: 'High-converting, fast, beautiful websites for any business in days, not weeks.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Café Menu & Management',
    description: 'Digital QR menus and order management systems for cafés and restaurants.',
  },
]

const handleMouseMove = (e) => {
  if (window.matchMedia('(hover: none)').matches) return
  const rect = e.currentTarget.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
  const y = -((e.clientY - rect.top) / rect.height - 0.5) * 20
  e.currentTarget.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`
}

const handleMouseLeave = (e) => {
  e.currentTarget.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0px)'
}

export default function Services() {
  return (
    <div className="py-14 sm:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...scrollAnimationProps} className="text-center mb-14 glass-panel rounded-2xl p-8 sm:p-10">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            What We Build
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Every product, platform, and pixel — made for Ethiopia.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                variants={staggerItem}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="glass-card border-t-2 border-t-gold rounded-xl p-5 sm:p-6 transition-all duration-300 hover:border-gold/40 hover:shadow-[0_8px_32px_rgba(196,122,18,0.12)]"
                style={{ transition: 'transform 0.15s ease, box-shadow 0.3s ease, border-color 0.3s ease' }}
              >
                <Icon className="text-gold mb-4" size={28} />
                <h3 className="text-text-primary font-semibold text-sm sm:text-base mb-2">
                  {service.title}
                </h3>
                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
