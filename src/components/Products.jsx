import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { scrollAnimationProps } from '../hooks/useScrollAnimation'

const products = [
  {
    name: 'Qandil AI',
    description:
      'LLM-powered personalized learning platform with adaptive study paths, AI tutoring, and generative content for Ethiopian students.',
    tags: [
      'React',
      'Express',
      'Node.js',
      'MongoDB',
      'AI Integration',
      'Generative AI',
      'Redux Toolkit',
      'Tailwind',
    ],
    images: ['/qandliai1.png'],
    status: 'Beta',
  },
  {
    name: 'Zihon LMS',
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
  },
  {
    name: 'Electric ERP',
    description:
      'Enterprise resource planning for Ethiopian electric utilities — billing, inventory, HR, and operations in one system.',
    tags: ['React', 'Express', 'Node.js', 'PostgreSQL', 'Redux Toolkit', 'Tailwind'],
    images: ['/electric%20erp.jpg'],
    status: 'Delivered',
  },
  {
    name: 'Hospital Hub',
    description:
      'Hospital management ecosystem — admin, staff, and patient portals with records, scheduling, and media uploads.',
    tags: ['React', 'Express', 'Node.js', 'MongoDB', 'Redux Toolkit', 'Tailwind', 'Cloudinary'],
    images: ['/hospitalAdmin.png'],
    status: 'Delivered',
  },
  {
    name: 'Room Reservation',
    description:
      'Smart room and venue booking system — availability, scheduling, payments, and admin dashboard for hotels and offices.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind', 'Redux Toolkit'],
    images: ['/room.png'],
    status: 'Live',
  },
  {
    name: 'Café Menu & Management',
    description:
      'Digital QR menus, order tracking, and café management built for Ethiopian restaurants and coffee shops.',
    tags: ['React', 'Supabase', 'QR Code', 'Tailwind'],
    images: ['/cafe%20menu.png'],
    status: 'Live',
  },
  {
    name: 'Perfume Shop',
    description:
      'Online perfume store with product catalog, cart, checkout, and admin inventory — built for Ethiopian retail.',
    tags: ['React', 'Express', 'Node.js', 'MongoDB', 'Redux Toolkit', 'Tailwind', 'Cloudinary'],
    images: ['/perfume%20shop.jpg'],
    status: 'Live',
  },
  {
    name: 'Food Delivery',
    description:
      'Food ordering and delivery platform — browse restaurants, place orders, track delivery, and manage vendors.',
    tags: ['React', 'Express', 'Node.js', 'MongoDB', 'Redux Toolkit', 'Tailwind', 'Chapa Payments'],
    images: ['/food%20delivery.jpg'],
    status: 'Live',
  },
]

const statusStyles = {
  Live: 'bg-success/15 text-success',
  Beta: 'bg-gold/15 text-gold-dark',
  Delivered: 'bg-text-secondary/15 text-text-secondary',
}

function ProductPreview({ product }) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (product.images?.length) {
    return (
      <div className="relative h-full w-full">
        <img
          src={product.images[activeIndex]}
          alt={`${product.name} screenshot ${activeIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-x-0 bottom-0 flex gap-1 p-2 bg-gradient-to-t from-black/40 to-transparent">
          {product.images.length > 1 &&
            product.images.map((src, idx) => (
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
    <div className="w-16 h-24 rounded-lg border border-gold/20 bg-gradient-to-b from-gold/10 to-white shadow-sm" />
  )
}

function ProductCard({ product }) {
  const Wrapper = product.url ? 'a' : 'div'
  const wrapperProps = product.url
    ? {
        href: product.url,
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {}

  return (
    <Wrapper
      {...wrapperProps}
      className="block glass-card-light rounded-xl overflow-hidden cursor-pointer group border border-gold/15 h-full"
    >
      <div className="h-1 bg-gold/35" />
      <div
        className={`h-32 sm:h-36 relative overflow-hidden ${
          product.images?.length ? '' : 'flex items-center justify-center bg-surface-elevated'
        }`}
      >
        <ProductPreview product={product} />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-text-primary text-lg">{product.name}</h3>
          <span
            className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap ${
              statusStyles[product.status] || statusStyles.Delivered
            }`}
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
              className="font-mono text-[10px] sm:text-xs text-text-secondary glass-tag px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="inline-flex items-center gap-1 text-gold text-sm font-medium">
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
  )
}

export default function Products() {
  return (
    <div className="py-14 sm:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...scrollAnimationProps} className="text-center mb-14 glass-panel rounded-2xl p-8 sm:p-10">
          <p className="font-mono text-gold text-xs uppercase tracking-widest mb-3">Portfolio</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Products We&apos;ve Built
          </h2>
          <p className="text-text-secondary text-lg">
            Real software, running in Ethiopia today.
          </p>
        </motion.div>

        <motion.div
          {...scrollAnimationProps}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory"
        >
          {products.map((product) => (
            <div
              key={product.name}
              className="flex-shrink-0 w-[min(85vw,300px)] sm:w-[300px] md:w-auto snap-center snap-always snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
