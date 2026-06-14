import { motion } from 'framer-motion'
import Marquee from './Marquee'
import {
  heroProofLine,
  productMarqueeImages,
  socialLinks,
  techStack,
} from '../data/siteContent'

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

function ProductMarquee() {
  return (
    <Marquee speed={32} className="hero-marquee hero-marquee--products">
      {productMarqueeImages.map((item) => (
        <div key={item.alt} className="hero-marquee__product">
          <img src={item.src} alt={item.alt} loading="lazy" />
        </div>
      ))}
    </Marquee>
  )
}

function TechMarquee() {
  return (
    <Marquee speed={40} direction="right" className="hero-marquee hero-marquee--tech">
      {techStack.map((tech) => (
        <div key={tech.name} className="hero-marquee__tech">
          {tech.icon ? (
            <img src={tech.icon} alt="" className="hero-marquee__tech-icon" loading="lazy" />
          ) : (
            <span className="hero-marquee__tech-dot" aria-hidden="true" />
          )}
          <span className="font-mono text-[10px] sm:text-xs text-text-secondary whitespace-nowrap">
            {tech.name}
          </span>
        </div>
      ))}
    </Marquee>
  )
}

export default function Hero() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-[100dvh] lg:min-h-screen flex items-center overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-2 lg:pt-4">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:grid-rows-[auto_auto] gap-6 lg:gap-x-6 lg:gap-y-8 items-center min-h-[calc(100dvh-5rem)] lg:min-h-[calc(100vh-5rem)]">
          <div className="order-1 lg:col-start-1 lg:row-start-1 w-full text-center lg:text-left">
            <motion.p
              {...fadeUp(0.1)}
              className="font-mono text-gold text-sm sm:text-base uppercase tracking-widest mb-4 sm:mb-5 font-medium"
            >
              Ethiopian Software · ETHIOPIA
            </motion.p>
            <motion.h1
              {...fadeUp(0.25)}
              className="font-display text-[2.75rem] leading-[1.08] sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-bold text-text-primary mb-5 sm:mb-7"
            >
              Software That
              <br />
              <span className="text-gold">Illuminates.</span>
            </motion.h1>
            <motion.p
              {...fadeUp(0.4)}
              className="text-text-secondary text-base sm:text-xl lg:text-2xl max-w-xl mx-auto lg:mx-0 mb-6 leading-relaxed"
            >
              We build AI-powered software, custom platforms,
              and digital products for Ethiopian businesses —
              from Ethiopia to the world.
            </motion.p>
            <motion.p
              {...fadeUp(0.48)}
              className="font-mono text-xs sm:text-sm text-gold-dark/90 uppercase tracking-wider"
            >
              {heroProofLine}
            </motion.p>
          </div>

          <div className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 w-full space-y-4 lg:space-y-5 shrink-0">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-2 text-center lg:text-left">
                Our Products
              </p>
              <ProductMarquee />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-2 text-center lg:text-left">
                Tech We Use
              </p>
              <TechMarquee />
            </div>
            <div className="hidden lg:block relative h-[12vh] shrink-0" aria-hidden="true" />
          </div>

          <div className="order-3 lg:col-start-1 lg:row-start-2 w-full text-center lg:text-left">
            <motion.div
              {...fadeUp(0.55)}
              className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-6"
            >
              <button
                onClick={() => scrollTo('#products')}
                className="w-full sm:w-auto bg-gold text-white font-semibold px-8 py-4 rounded-full text-base hover:bg-gold-dark transition-colors shadow-sm"
              >
                See Our Work
              </button>
              <button
                onClick={() => scrollTo('#contact')}
                className="w-full sm:w-auto border-2 border-gold text-gold-dark font-semibold px-8 py-4 rounded-full text-base hover:bg-gold/8 transition-colors"
              >
                Start a Project
              </button>
            </motion.div>

            <motion.div
              {...fadeUp(0.62)}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted mr-1">
                Connect
              </span>
              {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-gold/25 bg-white/50 text-text-secondary hover:text-gold hover:border-gold/45 transition-colors text-sm"
                  >
                    <img
                      src={socialIcons[link.name]}
                      alt=""
                      className="w-4 h-4 shrink-0"
                      loading="lazy"
                    />
                    <span className="font-mono text-xs">{link.name}</span>
                  </a>
                ))}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent z-10" />
    </section>
  )
}
