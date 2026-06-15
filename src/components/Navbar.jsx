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
    const onScroll = () => setScrolled(window.scrollY > 40)
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
      className={`top-navbar top-navbar--dock ${scrolled ? 'top-navbar--scrolled' : ''}`}
      aria-label="Main navigation"
    >
      <div className="top-navbar__dock">
        <a
          href="#"
          className="top-navbar__brand"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <img
            src="/zihontech.png"
            alt=""
            className="top-navbar__logo-mark"
            width={32}
            height={32}
            loading="eager"
            decoding="async"
          />
          <span className="font-mono text-text-primary text-base sm:text-lg tracking-wide font-bold">
            Zihon Tech
          </span>
        </a>

        {isDesktop && (
          <div className="top-navbar__links">
            {navLinks.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => handleNavClick(link.href)}
                className="top-navbar__link"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => handleNavClick('#contact')}
          className="top-navbar__cta shrink-0"
        >
          {isDesktop ? 'Start a Project' : 'Start Project'}
        </button>
      </div>
    </motion.nav>
  )

  if (typeof document === 'undefined') return null

  return createPortal(nav, document.body)
}
