import { motion } from 'framer-motion'
import { scrollAnimationProps } from '../hooks/useScrollAnimation'

const faqs = [
  {
    q: 'What is Hareg Tech?',
    a: 'Hareg Tech (ሐረግ ቴክ) is an Ethiopian software company that builds websites, mobile apps, custom software, LMS, ERP, and digital platforms for businesses. The name Hareg means vine or tendril in Amharic.',
  },
  {
    q: 'ሐረግ ቴክ ምንድን ነው?',
    a: 'ሐረግ ቴክ በኢትዮጵያ የሚገኝ የሶፍትዌር ኩባንያ ሲሆን ድረ-ገጾች፣ የሞባይል መተግበሪያዎች እና ብጁ ሶፍትዌር ለንግድ ድርጅቶች ይሰራል። ድረ-ገጻችን https://haregtech.online ነው።',
    lang: 'am',
  },
  {
    q: 'Where is Hareg Tech located?',
    a: 'Hareg Tech is based in Bahir Dar, Ethiopia, and serves clients across Ethiopia including Addis Ababa and other cities.',
  },
  {
    q: 'Is Hareg Tech the same as Ehareg or HaregTech?',
    a: 'Yes. Searches for Hareg Tech, HaregTech, Ehareg, Hareg Tek, Harge Tech, or ሐረግ ቴክ all refer to the same Ethiopian software company at haregtech.online.',
  },
]

export default function Faq() {
  return (
    <section id="faq" className="section-pad !py-10 sm:!py-14" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...scrollAnimationProps} className="text-center mb-7 sm:mb-8">
          <p className="font-mono type-caption text-brand uppercase tracking-widest mb-3">FAQ</p>
          <h2 id="faq-heading" className="font-display type-title font-bold text-text-primary mb-3">
            Common questions
          </h2>
          <p className="type-body text-text-secondary">
            Quick answers about Hareg Tech · ሐረግ ቴክ
          </p>
        </motion.div>

        <motion.div {...scrollAnimationProps} className="space-y-3">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="glass-card-light rounded-xl border border-gold/15 p-[var(--space-card)] group"
            >
              <summary className="cursor-pointer list-none flex items-start justify-between gap-3 font-semibold text-text-primary text-base min-h-11">
                <span lang={item.lang}>{item.q}</span>
                <span
                  className="text-brand shrink-0 transition-transform duration-200 group-open:rotate-45 text-xl leading-none"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p
                className="type-body-sm text-text-secondary mt-3 pt-3 border-t border-border/60"
                lang={item.lang}
              >
                {item.a}
              </p>
            </details>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
