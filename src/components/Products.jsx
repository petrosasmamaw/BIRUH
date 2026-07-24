import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { scrollAnimationProps } from '../hooks/useScrollAnimation'
import MarqueeStrip from './MarqueeStrip'

const FILTERS = ['All', 'Live', 'Beta', 'Delivered']

const products = [
  {
    name: 'Qandil AI',
    description: 'LLM tutoring and adaptive study paths for Ethiopian students.',
    tags: ['React', 'Node.js', 'MongoDB', 'AI'],
    image: '/qandliai1.png',
    status: 'Beta',
  },
  {
    name: 'Hareg LMS',
    description: 'Courses, exams, Chapa payments, and QR attendance for schools.',
    tags: ['React', 'PostgreSQL', 'Chapa', 'AI'],
    image: '/lms1.png',
    url: 'https://lms-three-lake-48.vercel.app',
    status: 'Live',
  },
  {
    name: 'Electric ERP',
    description: 'Billing, inventory, and HR for Ethiopian electric utilities.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind'],
    image: '/electric%20erp.jpg',
    status: 'Delivered',
  },
  {
    name: 'Hospital Hub',
    description: 'Admin, staff, and patient portals for hospital operations.',
    tags: ['React', 'MongoDB', 'Cloudinary', 'Tailwind'],
    image: '/hospitalAdmin.png',
    status: 'Delivered',
  },
  {
    name: 'Room Reservation',
    description: 'Venue booking with availability, payments, and admin tools.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind'],
    image: '/room.png',
    status: 'Live',
  },
  {
    name: 'Café Menu & Management',
    description: 'QR menus and order tracking for cafés and coffee shops.',
    tags: ['React', 'Supabase', 'QR Code', 'Tailwind'],
    image: '/cafe%20menu.png',
    status: 'Live',
  },
  {
    name: 'Perfume Shop',
    description: 'Catalog, cart, and inventory for Ethiopian perfume retail.',
    tags: ['React', 'Node.js', 'MongoDB', 'Cloudinary'],
    image: '/perfume%20shop.jpg',
    status: 'Live',
  },
  {
    name: 'Food Delivery',
    description: 'Order, track, and vendor tools for food delivery platforms.',
    tags: ['React', 'Node.js', 'MongoDB', 'Chapa'],
    image: '/food%20delivery.jpg',
    status: 'Live',
  },
]

const statusStyles = {
  Live: 'bg-success/15 text-success',
  Beta: 'bg-brand/15 text-brand-dark',
  Delivered: 'bg-text-secondary/15 text-text-secondary',
}

function GrowthCard({ product }) {
  const Wrapper = product.url ? 'a' : 'div'
  const wrapperProps = product.url
    ? { href: product.url, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Wrapper
      {...wrapperProps}
      className="block glass-card-light rounded-xl overflow-hidden group border border-gold/15 h-full relative"
    >
      {/* Static leaf-accent — decorative only; not part of scroll vine */}
      <svg
        className="absolute -left-1 top-8 w-3 h-8 text-brand/25 pointer-events-none"
        viewBox="0 0 12 32"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 2 C2 14 10 12 10 22 C6 20 2 24 2 30"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
      <div className="h-1 bg-brand/35" />
      <div className="h-28 sm:h-32 relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
          loading="lazy"
        />
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-text-primary text-base sm:text-lg">{product.name}</h3>
          <span
            className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap ${
              statusStyles[product.status]
            }`}
          >
            {product.status}
          </span>
        </div>
        <p className="text-text-secondary text-sm mb-3 leading-relaxed">{product.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] text-text-secondary glass-tag px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        {product.url && (
          <span className="inline-flex items-center gap-1 text-brand text-sm font-medium">
            View Live <ExternalLink size={14} />
          </span>
        )}
      </div>
    </Wrapper>
  )
}

export default function Products() {
  const [filter, setFilter] = useState('All')

  const visible = useMemo(() => {
    if (filter === 'All') return products
    return products.filter((p) => p.status === filter)
  }, [filter])

  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...scrollAnimationProps} className="text-center mb-8 sm:mb-10 glass-panel rounded-2xl p-6 sm:p-8">
          <p className="font-mono text-brand text-xs uppercase tracking-widest mb-3">Our Growth</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-3">
            What We&apos;ve Grown
          </h2>
          <p className="text-text-secondary text-sm sm:text-base">
            Real software running in Ethiopia today.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full border transition-colors ${
                filter === f
                  ? 'bg-brand text-white border-brand'
                  : 'border-gold/30 text-text-secondary hover:border-gold/50 hover:text-brand'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div
          {...scrollAnimationProps}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {visible.map((product) => (
            <GrowthCard key={product.name} product={product} />
          ))}
        </motion.div>

        {/* Our Roots — compact strip inside Growth (not a standalone section) */}
        <div className="mt-10 sm:mt-12">
          <MarqueeStrip />
        </div>
      </div>
    </div>
  )
}
