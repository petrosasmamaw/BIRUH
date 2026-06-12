import { motion } from 'framer-motion'
import { Home, Layers, Package, GitBranch, Mail } from 'lucide-react'
import { useActiveSection } from '../hooks/useActiveSection'

const navItems = [
  { id: 'home', label: 'Home', href: '#', icon: Home },
  { id: 'services', label: 'Services', href: '#services', icon: Layers },
  { id: 'products', label: 'Products', href: '#products', icon: Package },
  { id: 'process', label: 'Process', href: '#process', icon: GitBranch },
  { id: 'contact', label: 'Contact', href: '#contact', icon: Mail },
]

export default function BottomNav() {
  const active = useActiveSection()

  const handleClick = (href) => {
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-white/92 backdrop-blur-lg pb-[env(safe-area-inset-bottom)]"
      aria-label="Mobile navigation"
    >
      <div className="flex items-stretch justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleClick(item.href)}
              className="relative flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 px-1 min-h-[56px] transition-colors"
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive && (
                <motion.span
                  layoutId="bottom-nav-indicator"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gold rounded-full"
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
    </nav>
  )
}
