import { motion } from 'framer-motion'
import { scrollAnimationProps } from '../hooks/useScrollAnimation'

const steps = [
  {
    number: '01',
    title: 'Discover',
    description:
      'We learn your business, your users, and your goals. One call is enough to get started.',
  },
  {
    number: '02',
    title: 'Design',
    description:
      'Wireframes and UI in days, not weeks. You approve before we write a line of code.',
  },
  {
    number: '03',
    title: 'Build',
    description:
      'Agile sprints. You see progress every week. We use the best tools — React, AI APIs, PostgreSQL.',
  },
  {
    number: '04',
    title: 'Launch',
    description:
      'Deployed to Vercel/Netlify. Handoff includes docs, training, and 30-day support.',
  },
]

export default function Process() {
  return (
    <section id="process" className="py-20 sm:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...scrollAnimationProps} className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            How we work
          </h2>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-[12.5%] right-[12.5%] h-px border-t-2 border-dashed border-gold/30 -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                viewport={{ once: true, margin: '-50px' }}
                className="relative"
              >
                <div className="bg-surface rounded-xl p-6 relative overflow-hidden border border-border shadow-card hover:border-gold/35 hover:shadow-card-hover transition-all">
                  <span className="absolute -top-2 -right-1 font-mono text-6xl font-bold text-gold/10 select-none">
                    {step.number}
                  </span>
                  <span className="font-mono text-gold text-sm font-bold mb-3 block">
                    {step.number}
                  </span>
                  <h3 className="font-display text-xl font-bold text-text-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed relative z-10">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
