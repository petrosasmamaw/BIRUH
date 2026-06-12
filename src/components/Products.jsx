import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { scrollAnimationProps } from '../hooks/useScrollAnimation'

const products = [
  {
    name: 'Whaatachi',
    accent: '#E91E8C',
    description: 'Ethiopian dating & relationship app with smart matching',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    status: 'Live',
    statusColor: 'bg-success/20 text-success',
  },
  {
    name: 'yebuna.com',
    accent: '#F5A623',
    description: 'QR-based digital café menu platform for Ethiopian restaurants',
    tags: ['React', 'Supabase'],
    status: 'Live',
    statusColor: 'bg-success/20 text-success',
  },
  {
    name: 'Biruh LMS',
    accent: '#2DBE6C',
    description: 'Full learning management system with payments, exams, and video',
    tags: ['Next.js', 'PostgreSQL', 'Cloudinary'],
    status: 'Live',
    statusColor: 'bg-success/20 text-success',
  },
  {
    name: 'Qandil AI',
    accent: '#5B7FFF',
    description: 'LLM-powered personalized learning platform',
    tags: ['React', 'Gemini API'],
    status: 'Beta',
    statusColor: 'bg-gold/20 text-gold-light',
  },
  {
    name: 'Hospital Hub',
    accent: '#A78BFA',
    description: 'Hospital management ecosystem — 3 portals for staff, patients, admin',
    tags: ['MERN Stack'],
    status: 'Delivered',
    statusColor: 'bg-text-secondary/20 text-text-secondary',
  },
]

export default function Products() {
  return (
    <section id="products" className="py-20 sm:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...scrollAnimationProps} className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Products We&apos;ve Built
          </h2>
          <p className="text-text-secondary text-lg">
            Real software, running in Ethiopia today.
          </p>
        </motion.div>

        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true, margin: '-50px' }}
              className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-auto snap-start bg-surface-elevated rounded-lg overflow-hidden cursor-pointer group hover:-translate-y-1 transition-transform duration-300 hover:shadow-[0_12px_40px_rgba(245,166,35,0.12)]"
            >
              <div className="h-1.5" style={{ backgroundColor: product.accent }} />
              <div
                className="h-32 sm:h-36 flex items-center justify-center relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${product.accent}15 0%, #161616 100%)`,
                }}
              >
                <div
                  className="w-16 h-24 rounded-lg border border-white/10 shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform duration-300"
                  style={{
                    background: `linear-gradient(180deg, ${product.accent}30 0%, #111 100%)`,
                  }}
                />
                <div
                  className="absolute w-20 h-28 rounded-lg border border-white/5 -right-2 top-6 transform -rotate-6 opacity-50"
                  style={{ background: '#0A0A0A' }}
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-text-primary text-lg">{product.name}</h3>
                  <span className={`font-mono text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${product.statusColor}`}>
                    {product.status}
                  </span>
                </div>
                <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                  {product.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs text-text-secondary bg-background px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-gold-light text-sm font-medium group-hover:gap-2 transition-all">
                  View Project <ArrowRight size={14} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
