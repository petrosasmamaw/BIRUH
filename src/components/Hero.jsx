import { motion } from 'framer-motion'
import { socialLinks } from '../data/siteContent'
import { openProjectModal } from '../api'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: 'easeOut' },
})

const socialIcons = {
  WhatsApp: 'https://cdn.simpleicons.org/whatsapp/25D366',
  Telegram: 'https://cdn.simpleicons.org/telegram/26A5E4',
  Instagram: 'https://cdn.simpleicons.org/instagram/3E6B15',
}

const heroStats = [
  { value: '5+', label: 'Years' },
  { value: '8', label: 'Products' },
  { value: '3', label: 'Sectors' },
]

export default function Hero() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero-section relative overflow-hidden section-pad !py-8 sm:!py-10 lg:!py-12">
      <div className="hero-vine-pocket lg:hidden" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          <div className="order-1 w-full text-left max-lg:max-w-[calc(100%-4.25rem)] lg:max-w-xl xl:max-w-2xl">
            <motion.p
              {...fadeUp(0.08)}
              className="font-mono type-caption text-brand uppercase tracking-widest mb-3 sm:mb-4 font-medium"
            >
              Ethiopian Software · ሐረግ ቴክ
            </motion.p>
            <motion.h1
              {...fadeUp(0.2)}
              className="font-display type-display font-bold text-text-primary mb-4 sm:mb-5"
            >
              Websites, Apps &amp; Software
              <br />
              <span className="text-brand">That Grow.</span>
            </motion.h1>
            <motion.p
              {...fadeUp(0.32)}
              className="type-body text-text-secondary max-w-lg mb-5 sm:mb-6"
            >
              We build websites, mobile apps, and AI-powered platforms for Ethiopian
              businesses — from a single shoot to systems that scale.
            </motion.p>

            <motion.div
              {...fadeUp(0.42)}
              className="flex flex-col sm:flex-row flex-wrap tap-gap mb-5"
            >
              <button
                type="button"
                onClick={() => scrollTo('#growth')}
                className="btn-touch w-full sm:w-auto bg-brand text-white font-semibold px-6 rounded-full type-label sm:text-sm hover:bg-brand-dark transition-colors duration-200 shadow-sm cursor-pointer"
              >
                See Our Growth
              </button>
              <button
                type="button"
                onClick={openProjectModal}
                className="btn-touch w-full sm:w-auto border-2 border-gold text-brand-dark font-semibold px-6 rounded-full type-label sm:text-sm hover:bg-brand/8 transition-colors duration-200 cursor-pointer"
              >
                Start a Project
              </button>
            </motion.div>

            <motion.div
              {...fadeUp(0.5)}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-5 font-mono type-caption text-text-secondary"
            >
              {heroStats.map((stat, i) => (
                <span key={stat.label} className="inline-flex items-baseline gap-1.5">
                  {i > 0 && (
                    <span className="text-gold/55 mr-2.5" aria-hidden="true">
                      ·
                    </span>
                  )}
                  <span className="text-brand font-bold text-base">{stat.value}</span>
                  <span className="uppercase tracking-wider text-text-muted">{stat.label}</span>
                </span>
              ))}
            </motion.div>

            <motion.div {...fadeUp(0.58)} className="flex flex-wrap items-center tap-gap">
              <span className="font-mono type-caption uppercase tracking-widest text-text-muted w-full sm:w-auto">
                Reach Out
              </span>
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="btn-touch !min-h-10 px-3 rounded-full border border-gold/25 bg-background/85 backdrop-blur-[2px] text-text-secondary hover:text-brand hover:border-gold/45 transition-colors duration-200 cursor-pointer"
                >
                  <img
                    src={socialIcons[link.name]}
                    alt=""
                    className="w-4 h-4 shrink-0"
                    loading="lazy"
                  />
                  <span className="font-mono type-caption ml-1.5">{link.name}</span>
                </a>
              ))}
            </motion.div>
          </div>

          <div className="order-2 hidden lg:block w-full pointer-events-none" aria-hidden="true" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent z-10" />
    </section>
  )
}
