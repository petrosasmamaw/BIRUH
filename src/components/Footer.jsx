const serviceLinks = [
  'Custom Software',
  'AI Solutions',
  'LMS / EdTech',
  'ERP & Automation',
  'Landing Pages',
  'Café Menu Systems',
]

const productLinks = [
  'Whaatachi',
  'yebuna.com',
  'Biruh LMS',
  'Qandil AI',
  'Hospital Hub',
]

const connectLinks = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Upwork (5★ rated)', href: 'https://upwork.com' },
  { label: 'Telegram', href: 'https://t.me' },
]

export default function Footer() {
  return (
    <footer id="contact" className="bg-surface border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-gold-light text-xl font-bold">ብሩህ</span>
              <span className="font-mono text-white text-xl tracking-widest">BIRUH</span>
            </div>
            <p className="text-text-secondary text-sm mb-4 italic">
              &ldquo;Software that illuminates.&rdquo;
            </p>
            <p className="text-text-secondary text-sm mb-1">Bahir Dar, Ethiopia</p>
            <a
              href="mailto:asmamawpetros@gmail.com"
              className="text-gold-light text-sm hover:underline block mb-1"
            >
              asmamawpetros@gmail.com
            </a>
            <a href="tel:+25189886956" className="text-text-secondary text-sm hover:text-gold-light transition-colors">
              +251 89886956
            </a>
          </div>

          <div>
            <h4 className="font-mono text-gold-light text-xs uppercase tracking-widest mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <span className="text-text-secondary text-sm hover:text-text-primary transition-colors cursor-pointer">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-gold-light text-xs uppercase tracking-widest mb-4">
              Products
            </h4>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link}>
                  <span className="text-text-secondary text-sm hover:text-text-primary transition-colors cursor-pointer">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-gold-light text-xs uppercase tracking-widest mb-4">
              Connect
            </h4>
            <ul className="space-y-2">
              {connectLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary text-sm hover:text-gold-light transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-6 text-center">
        <p className="font-mono text-gold text-xs">
          © 2025 BIRUH · Made in Ethiopia 🇪🇹
        </p>
      </div>
    </footer>
  )
}
