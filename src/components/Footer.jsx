import { socialLinks } from '../data/siteContent'

const serviceLinks = [
  'Custom Software',
  'AI Solutions',
  'LMS / EdTech',
  'ERP & Automation',
  'Landing Pages',
  'Café Menu Systems',
]

const productLinks = [
  { label: 'Qandil AI', href: null },
  { label: 'Zihon LMS', href: 'https://lms-three-lake-48.vercel.app' },
  { label: 'Electric ERP', href: null },
  { label: 'Hospital Hub', href: null },
  { label: 'Room Reservation', href: null },
  { label: 'Café Menu & Management', href: null },
  { label: 'Perfume Shop', href: null },
  { label: 'Food Delivery', href: null },
]

export default function Footer() {
  return (
    <footer className="footer-minimal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-text-primary text-xl tracking-wide font-bold">Zihon Tech</span>
            </div>
            <p className="text-text-secondary text-sm mb-4 italic">
              &ldquo;Ethiopian technology, built with purpose.&rdquo;
            </p>
            <p className="text-text-secondary text-sm mb-1">Bahir Dar, Ethiopia</p>
            <a
              href="mailto:asmamawpetros@gmail.com"
              className="text-gold text-sm hover:underline block mb-1"
            >
              asmamawpetros@gmail.com
            </a>
            <a href="tel:+25189886956" className="text-text-secondary text-sm hover:text-gold transition-colors">
              +251 89886956
            </a>
            <div className="flex flex-wrap gap-3 mt-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-text-secondary hover:text-gold transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-mono text-gold text-xs uppercase tracking-widest mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <span className="text-text-secondary text-sm">{link}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-gold text-xs uppercase tracking-widest mb-4">
              Products
            </h4>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.label}>
                  {link.href ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary text-sm hover:text-gold transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <span className="text-text-secondary text-sm">{link.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-gold text-xs uppercase tracking-widest mb-4">
              Contact
            </h4>
            <p className="text-text-secondary text-sm mb-3">
              Reach us on WhatsApp, Telegram, or email — we reply fast.
            </p>
            <a
              href={socialLinks[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gold text-white text-sm font-semibold hover:bg-gold-dark transition-colors"
            >
              Message on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border py-5 text-center">
        <p className="font-mono text-gold text-xs">
          © 2025 Zihon Tech · All rights reserved by Petros Asmamaw · Made in Ethiopia 🇪🇹
        </p>
      </div>
    </footer>
  )
}
