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
  { value: 5, suffix: '+', context: 'Years', label: 'building in Ethiopia' },
  { value: 8, suffix: '', context: 'Products', label: 'in our portfolio' },
  { value: 3, suffix: '', context: 'Sectors', label: 'education · health · enterprise' },
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
                <div key={stat.context}>
                  <CountUp value={stat.value} suffix={stat.suffix} />
                  <p className="font-mono text-xs uppercase tracking-widest text-gold mt-2">
                    {stat.context}
                  </p>
                  <p className="text-text-secondary mt-1 text-sm sm:text-base">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-8">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="glass-card border-l-2 border-gold/50 pl-6 rounded-r-xl py-3"
                >
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-text-primary mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
