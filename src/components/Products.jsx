import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
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
    description:
      'Full learning platform for Ethiopian schools — courses, exams, video lessons, Chapa payments, AI-generated content, QR attendance, and Cloudinary media hosting.',
    tags: [
      'React',
      'Express',
      'Node.js',
      'PostgreSQL',
      'Neon',
      'Chapa Payments',
      'AI Generative',
      'ML',
      'Cloudinary',
      'QR Parser',
      'Redux Toolkit',
      'Tailwind',
    ],
    images: ['/lms1.png', '/lms2.png', '/lms3.png', '/lms4.png'],
    url: 'https://lms-three-lake-48.vercel.app',
    status: 'Live',
    statusColor: 'bg-success/20 text-success',
  },
  {
    name: 'Qandil AI',
    accent: '#5B7FFF',
    description: 'LLM-powered personalized learning platform',
    tags: ['React', 'Gemini API'],
    status: 'Beta',
    statusColor: 'bg-gold/15 text-gold-dark',
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

function ProductPreview({ product }) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (product.images?.length) {
    return (
      <div className="relative h-full w-full">
        <img
          src={product.images[activeIndex]}
          alt={`${product.name} screenshot ${activeIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300"
        />
        <div className="absolute inset-x-0 bottom-0 flex gap-1 p-2 bg-gradient-to-t from-black/40 to-transparent">
          {product.images.map((src, idx) => (
            <button
              key={src}
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setActiveIndex(idx)
              }}
              className={`flex-1 h-1 rounded-full transition-colors ${
                idx === activeIndex ? 'bg-white' : 'bg-white/40'
              }`}
              aria-label={`Show screenshot ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div
        className="w-16 h-24 rounded-lg border border-border shadow-md transform rotate-3 group-hover:rotate-0 transition-transform duration-300"
        style={{
          background: `linear-gradient(180deg, ${product.accent}25 0%, #FFFFFF 100%)`,
        }}
      />
      <div
        className="absolute w-20 h-28 rounded-lg border border-border -right-2 top-6 transform -rotate-6 opacity-60"
        style={{ background: '#FAF6F0' }}
      />
    </>
  )
}

function ProductCard({ product, index }) {
  const Wrapper = product.url ? 'a' : 'div'
  const wrapperProps = product.url
    ? {
        href: product.url,
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {}

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-50px' }}
      className="flex-shrink-0 w-[min(85vw,300px)] sm:w-[300px] md:w-auto snap-center snap-always snap-start"
    >
      <Wrapper
        {...wrapperProps}
        className="block bg-surface rounded-xl overflow-hidden cursor-pointer group hover:-translate-y-1 transition-transform duration-300 shadow-card hover:shadow-card-hover border border-border h-full"
      >
        <div className="h-1.5" style={{ backgroundColor: product.accent }} />
        <div
          className={`h-32 sm:h-36 relative overflow-hidden ${
            product.images?.length ? '' : 'flex items-center justify-center'
          }`}
          style={
            product.images?.length
              ? undefined
              : {
                  background: `linear-gradient(135deg, ${product.accent}18 0%, #FFFCF7 100%)`,
                }
          }
        >
          <ProductPreview product={product} />
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-text-primary text-lg">{product.name}</h3>
            <span
              className={`font-mono text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${product.statusColor}`}
            >
              {product.status}
            </span>
          </div>
          <p className="text-text-secondary text-sm mb-4 leading-relaxed">
            {product.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] sm:text-xs text-text-secondary bg-surface-muted px-2 py-1 rounded border border-border"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="inline-flex items-center gap-1 text-gold text-sm font-medium group-hover:gap-2 transition-all">
            {product.url ? (
              <>
                View Live <ExternalLink size={14} />
              </>
            ) : (
              <>
                View Project <ArrowRight size={14} />
              </>
            )}
          </span>
        </div>
      </Wrapper>
    </motion.div>
  )
}

export default function Products() {
  return (
    <div className="py-14 sm:py-20 lg:py-28">
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
            <ProductCard key={product.name} product={product} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
