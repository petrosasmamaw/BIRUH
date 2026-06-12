import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { Home, Layers, Package, GitBranch, Mail } from 'lucide-react'
import { useActiveSection } from '../hooks/useActiveSection'

const MOBILE_BREAKPOINT = 1024

const navItems = [
  { id: 'home', label: 'Home', href: '#', icon: Home },
  { id: 'services', label: 'Services', href: '#services', icon: Layers },
  { id: 'products', label: 'Products', href: '#products', icon: Package },
  { id: 'process', label: 'Process', href: '#process', icon: GitBranch },
  { id: 'contact', label: 'Contact', href: '#contact', icon: Mail },
]

export default function BottomNav() {
  const active = useActiveSection()
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT,
  )
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const handleClick = (href) => {
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  if (!isMobile || typeof document === 'undefined') return null

  return createPortal(
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      <div className="mobile-bottom-nav__inner">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleClick(item.href)}
              className="mobile-bottom-nav__item"
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive && (
                <motion.span
                  layoutId="bottom-nav-indicator"
                  className="mobile-bottom-nav__indicator"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <Icon
                size={20}
                className={isActive ? 'text-gold' : 'text-text-muted'}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={`font-mono text-[10px] tracking-wide ${
                  isActive ? 'text-gold font-bold' : 'text-text-secondary'
                }`}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>,
    document.body,
  )
}
