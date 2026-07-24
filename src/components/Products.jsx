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
      className={`block glass-card-light rounded-xl overflow-hidden group border border-gold/15 h-full relative ${
        product.url ? 'cursor-pointer' : ''
      }`}
    >
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
      <div className="h-32 sm:h-36 relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
          loading="lazy"
        />
      </div>
      <div className="p-[var(--space-card)]">
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <h3 className="font-semibold text-text-primary text-base sm:text-lg leading-snug">
            {product.name}
          </h3>
          <span
            className={`font-mono type-caption uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 ${
              statusStyles[product.status]
            }`}
          >
            {product.status}
          </span>
        </div>
        <p className="type-body-sm text-text-secondary mb-3">{product.description}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono type-caption text-text-secondary glass-tag px-2.5 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        {product.url && (
          <span className="inline-flex items-center gap-1.5 text-brand type-label font-semibold min-h-10">
            View Live <ExternalLink size={16} aria-hidden="true" />
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
    <div className="section-pad">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...scrollAnimationProps}
          className="text-center mb-7 sm:mb-10 glass-panel rounded-2xl p-5 sm:p-8"
        >
          <p className="font-mono type-caption text-brand uppercase tracking-widest mb-3">
            Our Growth
          </p>
          <h2 className="font-display type-title font-bold text-text-primary mb-3">
            What We&apos;ve Grown
          </h2>
          <p className="type-body text-text-secondary">
            Real software running in Ethiopia today.
          </p>
        </motion.div>

        <div
          className="flex flex-wrap justify-center tap-gap mb-7 sm:mb-8"
          role="tablist"
          aria-label="Filter growth by status"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`btn-touch font-mono type-caption uppercase tracking-wider px-4 rounded-full border transition-colors duration-200 cursor-pointer ${
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5"
        >
          {visible.map((product) => (
            <GrowthCard key={product.name} product={product} />
          ))}
        </motion.div>

        <div className="mt-10 sm:mt-12">
          <MarqueeStrip />
        </div>
      </div>
    </div>
  )
}
