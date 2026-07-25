import { socialLinks } from '../data/siteContent'

const serviceLinks = [
  'Websites & Apps',
  'Custom Software',
  'ERP & Automation',
  'LMS / EdTech',
  'Café Menu Systems',
  'AI Solutions',
]

const productLinks = [
  { label: 'Ecommerce site for Addis Electric', href: 'https://addiselectricshop.online/' },
  { label: 'Tamagn Check', href: 'https://tamagncheck.online/' },
  { label: 'Qandil AI', href: null },
  { label: 'Hareg LMS', href: 'https://lms-three-lake-48.vercel.app' },
  { label: 'Electric ERP', href: null },
  { label: 'Hospital Hub', href: null },
  { label: 'Room Reservation', href: null },
  { label: 'Café Menu & Management', href: null },
  { label: 'Food Delivery', href: null },
]

export default function Footer() {
  return (
    <footer className="footer-minimal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-text-primary text-lg sm:text-xl tracking-wide font-bold">
                Hareg Tech
              </span>
            </div>
            <p className="font-mono type-caption text-brand mb-2" lang="am">
              ሐረግ ቴክ · Ethiopian Software
            </p>
            <p className="type-body-sm text-text-secondary mb-4 italic">
              &ldquo;Ethiopian technology, built with purpose.&rdquo;
            </p>
            <p className="type-caption text-text-muted mb-4">
              Also known as Hareg, HaregTech, Ehareg — software solutions from Bahir Dar, Ethiopia.
            </p>
            <p className="type-body-sm text-text-secondary mb-1">Bahir Dar, Ethiopia</p>
            <a
              href="mailto:asmamawpetros@gmail.com"
              className="text-brand type-body-sm hover:underline block mb-1 min-h-10 inline-flex items-center"
            >
              asmamawpetros@gmail.com
            </a>
            <a
              href="tel:+25189886956"
              className="text-text-secondary type-body-sm hover:text-brand transition-colors duration-200 min-h-10 inline-flex items-center"
            >
              +251 89886956
            </a>
            <div className="flex flex-wrap tap-gap mt-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-touch !min-h-10 px-3 font-mono type-caption text-text-secondary hover:text-brand transition-colors duration-200 cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-mono type-caption text-brand uppercase tracking-widest mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <span className="type-body-sm text-text-secondary">{link}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono type-caption text-brand uppercase tracking-widest mb-4">
              Growth
            </h4>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.label}>
                  {link.href ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="type-body-sm text-text-secondary hover:text-brand transition-colors duration-200 inline-flex min-h-10 items-center"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <span className="type-body-sm text-text-secondary">{link.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono type-caption text-brand uppercase tracking-widest mb-4">
              Contact
            </h4>
            <p className="type-body-sm text-text-secondary mb-4">
              Reach us on WhatsApp, Telegram, or email — we reply fast.
            </p>
            <a
              href={socialLinks[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-touch px-5 rounded-full bg-brand text-white type-label font-semibold hover:bg-brand-dark transition-colors duration-200 cursor-pointer"
            >
              Message on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border py-5 px-4 text-center">
        <p className="font-mono type-caption text-brand leading-relaxed">
          © 2026 Hareg Tech (ሐረግ ቴክ) · All rights reserved by Petros Asmamaw · Made in Ethiopia
        </p>
      </div>
    </footer>
  )
}
