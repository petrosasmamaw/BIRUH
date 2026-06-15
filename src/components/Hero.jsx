import { motion } from 'framer-motion'
import { heroProofLine, socialLinks } from '../data/siteContent'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

const socialIcons = {
  WhatsApp: 'https://cdn.simpleicons.org/whatsapp/25D366',
  Telegram: 'https://cdn.simpleicons.org/telegram/26A5E4',
  Instagram: 'https://cdn.simpleicons.org/instagram/C47A12',
}

export default function Hero() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden py-5 sm:py-6 lg:py-8">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-8 items-start">
          <div className="order-1 w-full text-center lg:text-left lg:max-w-xl xl:max-w-2xl">
            <motion.p
              {...fadeUp(0.1)}
              className="font-mono text-gold text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 font-medium"
            >
              Ethiopian Software · ETHIOPIA
            </motion.p>
            <motion.h1
              {...fadeUp(0.25)}
              className="font-display text-3xl leading-[1.1] sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-bold text-text-primary mb-4 sm:mb-5"
            >
              Software That
              <br />
              <span className="text-gold">Innovates.</span>
            </motion.h1>
            <motion.p
              {...fadeUp(0.4)}
              className="text-text-secondary text-sm sm:text-base lg:text-lg max-w-lg mx-auto lg:mx-0 mb-4 sm:mb-5 leading-relaxed"
            >
              We build AI-powered software, custom platforms,
              and digital products for Ethiopian businesses —
              from Ethiopia to the world.
            </motion.p>
            <motion.p
              {...fadeUp(0.48)}
              className="font-mono text-[10px] sm:text-xs text-gold-dark/90 uppercase tracking-wider mb-5 sm:mb-6"
            >
              {heroProofLine}
            </motion.p>

            <motion.div
              {...fadeUp(0.55)}
              className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-2.5 sm:gap-3 mb-5"
            >
              <button
                onClick={() => scrollTo('#products')}
                className="w-full sm:w-auto bg-gold text-white font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-gold-dark transition-colors shadow-sm"
              >
                See Our Work
              </button>
              <button
                onClick={() => scrollTo('#contact')}
                className="w-full sm:w-auto border-2 border-gold text-gold-dark font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-gold/8 transition-colors"
              >
                Start a Project
              </button>
            </motion.div>

            <motion.div
              {...fadeUp(0.62)}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2"
            >
              <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted mr-0.5">
                Connect
              </span>
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-gold/25 bg-white/50 text-text-secondary hover:text-gold hover:border-gold/45 transition-colors"
                >
                  <img
                    src={socialIcons[link.name]}
                    alt=""
                    className="w-3.5 h-3.5 shrink-0"
                    loading="lazy"
                  />
                  <span className="font-mono text-[10px] sm:text-xs">{link.name}</span>
                </a>
              ))}
            </motion.div>
          </div>

          <div
            className="order-2 hidden lg:block w-full pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent z-10" />
    </section>
  )
}
