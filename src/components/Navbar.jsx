import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Products', href: '#products' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href) => {
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${
        scrolled
          ? 'bg-white/85 shadow-sm border-b border-gold/25'
          : 'bg-white/70 lg:bg-transparent border-b border-border/50 lg:border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 lg:h-16 flex items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-1.5 sm:gap-2"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <span className="font-mono text-gold text-lg sm:text-xl font-bold">ብሩህ</span>
          <span className="font-mono text-text-primary text-lg sm:text-xl tracking-widest">BIRUH</span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
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

        <button
          onClick={() => handleNavClick('#contact')}
          className="lg:hidden bg-gold text-white font-semibold px-4 py-1.5 rounded-full text-xs hover:bg-gold-dark transition-colors shadow-sm"
        >
          Start Project
        </button>
      </div>
    </motion.nav>
  )
}
