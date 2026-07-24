import { motion } from 'framer-motion'
import { Target, Zap, HeartHandshake, Sprout, Leaf, TreePine, Flower2 } from 'lucide-react'
import { scrollAnimationProps } from '../hooks/useScrollAnimation'

const pillars = [
  {
    icon: Target,
    title: 'Ethiopian-built',
    description:
      "We build from the ground up — local banks, languages, and how businesses here actually run.",
  },
  {
    icon: Zap,
    title: 'Smart where it helps',
    description:
      'We add automation and AI only when they cut cost or save time — never as the pitch itself.',
  },
  {
    icon: HeartHandshake,
    title: 'Speed without compromise',
    description:
      "MVPs in weeks, not months — because Ethiopian businesses can't afford to wait.",
  },
]

const steps = [
  {
    icon: Sprout,
    title: 'Seed',
    description: 'We learn your business, users, and goals. One call is enough to start.',
  },
  {
    icon: Leaf,
    title: 'Sprout',
    description: 'Wireframes and UI in days. You approve before we write a line of code.',
  },
  {
    icon: TreePine,
    title: 'Grow',
    description: 'Agile sprints with weekly demos you can actually use.',
  },
  {
    icon: Flower2,
    title: 'Bloom',
    description: 'Deploy, train your team, and stay with 30-day support after go-live.',
  },
]

export default function Approach() {
  return (
    <div className="section-pad">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...scrollAnimationProps}
          className="text-center mb-8 sm:mb-10 glass-panel rounded-2xl p-5 sm:p-8"
        >
          <p className="font-mono type-caption text-brand uppercase tracking-widest mb-3">
            Approach
          </p>
          <h2 className="font-display type-title font-bold text-text-primary mb-3">
            Why Hareg · How We Work
          </h2>
          <p className="type-body text-text-secondary max-w-xl mx-auto">
            The roots behind every project — and the growth cycle we follow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          <motion.div {...scrollAnimationProps}>
            <h3 className="font-mono type-caption uppercase tracking-widest text-brand mb-4">
              Why us
            </h3>
            <div className="space-y-3">
              {pillars.map((pillar) => {
                const Icon = pillar.icon
                return (
                  <div
                    key={pillar.title}
                    className="glass-card border-l-2 border-l-gold rounded-xl p-[var(--space-card)] flex gap-3"
                  >
                    <Icon className="text-brand shrink-0 mt-0.5" size={22} aria-hidden="true" />
                    <div>
                      <h4 className="text-text-primary font-semibold text-base mb-1.5">
                        {pillar.title}
                      </h4>
                      <p className="type-body-sm text-text-secondary">{pillar.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          <motion.div {...scrollAnimationProps}>
            <h3 className="font-mono type-caption uppercase tracking-widest text-brand mb-4">
              Growth cycle
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {steps.map((step, i) => {
                const Icon = step.icon
                return (
                  <div
                    key={step.title}
                    className="glass-card-light rounded-xl p-[var(--space-card)] border border-gold/15"
                  >
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="font-mono type-caption text-gold">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <Icon className="text-brand" size={18} aria-hidden="true" />
                      <h4 className="text-text-primary font-semibold text-base">{step.title}</h4>
                    </div>
                    <p className="type-body-sm text-text-secondary">{step.description}</p>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
