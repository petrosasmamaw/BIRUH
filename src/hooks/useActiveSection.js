import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'home', el: () => document.querySelector('[data-section="home"]') },
  { id: 'services', el: () => document.getElementById('services') },
  { id: 'products', el: () => document.getElementById('products') },
  { id: 'process', el: () => document.getElementById('process') },
  { id: 'contact', el: () => document.getElementById('contact') },
]

export function useActiveSection() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.35

      if (window.scrollY < 120) {
        setActive('home')
        return
      }

      let current = 'home'
      for (const section of SECTIONS) {
        const el = section.el()
        if (!el) continue
        if (y >= el.offsetTop) current = section.id
      }
      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return active
}
