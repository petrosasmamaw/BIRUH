import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { scrollAnimationProps } from '../hooks/useScrollAnimation'

function CountUp({ value, suffix = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, value, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate: (v) => setCount(Math.round(v)),
    })
    return () => controls.stop()
  }, [isInView, value])

  return (
    <span ref={ref} className="font-display text-5xl sm:text-6xl font-bold text-gold">
      {count}{suffix}
    </span>
  )
}

const stats = [
  { value: 5, suffix: '+', label: 'Years building in Ethiopia' },
  { value: 20, suffix: '+', label: 'Products delivered' },
  { value: 100, suffix: '%', label: 'Local understanding' },
]

const pillars = [
  {
    title: 'Ethiopian-built',
    description:
      "We don't adapt foreign templates. We build from the ground up knowing the local context, banks, languages, and users.",
  },
  {
    title: 'AI-powered by default',
    description:
      'Every product we build has intelligence baked in — from payment automation to content generation.',
  },
  {
    title: 'Speed without compromise',
    description:
      "MVPs in weeks, not months. We move fast because Ethiopian businesses can't afford to wait.",
  },
]

export default function WhyBiruh() {
  return (
    <div className="py-14 sm:py-20 lg:py-28 relative overflow-hidden ethiopian-cross-bg">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...scrollAnimationProps} className="glass-panel rounded-2xl p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="space-y-10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <CountUp value={stat.value} suffix={stat.suffix} />
                  <p className="text-text-secondary mt-2 text-sm sm:text-base">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-8">
              {pillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  viewport={{ once: true, margin: '-50px' }}
                  className="glass-card border-l-2 border-gold/50 pl-6 rounded-r-xl py-3"
                >
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-text-primary mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">{pillar.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
