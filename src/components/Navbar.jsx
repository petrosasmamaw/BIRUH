import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'

const MOBILE_BREAKPOINT = 1024

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Products', href: '#products' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.innerWidth >= MOBILE_BREAKPOINT,
  )
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT}px)`)
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href) => {
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  const nav = (
    <motion.nav
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      className={`top-navbar ${scrolled ? 'top-navbar--scrolled' : ''}`}
    >
      <div className="top-navbar__inner">
        <a
          href="#"
          className="flex items-center gap-1.5 sm:gap-2 min-w-0 shrink"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <span className="font-mono text-gold text-base sm:text-xl font-bold">ብሩህ</span>
          <span className="font-mono text-text-primary text-base sm:text-xl tracking-widest truncate">
            BIRUH
          </span>
        </a>

        {isDesktop ? (
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-text-secondary hover:text-gold transition-colors text-sm font-medium"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('#contact')}
              className="bg-gold text-white font-semibold px-5 py-2 rounded-full text-sm hover:bg-gold-dark transition-colors shadow-sm"
            >
              Start a Project
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleNavClick('#contact')}
            className="shrink-0 bg-gold text-white font-semibold px-3 py-1.5 sm:px-4 rounded-full text-[11px] sm:text-xs hover:bg-gold-dark transition-colors shadow-sm whitespace-nowrap"
          >
            Start Project
          </button>
        )}
      </div>
    </motion.nav>
  )

  if (typeof document === 'undefined') return null

  return createPortal(nav, document.body)
}
