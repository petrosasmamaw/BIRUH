import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { scrollAnimationProps } from '../hooks/useScrollAnimation'
import MarqueeStrip from './MarqueeStrip'

const FILTERS = ['All', 'Live', 'Beta', 'Delivered']

const products = [
  {
    name: 'Ecommerce site for Addis Electric',
    description:
      'Online marketplace for an Ethiopian electrical supplier — browse boards, breakers, cables, contactors, and more by name or category, with search, admin tools, and phone ordering for industrial and home use.',
    tags: ['React', 'Tailwind', 'Node.js', 'Express', 'JWT', 'PostgreSQL', 'Neon'],
    image: '/addis-electric.png',
    url: 'https://addiselectricshop.online/',
    status: 'Live',
  },
  {
    name: 'Tamagn Check',
    description:
      'Verifies Ethiopian payment receipts (Telebirr, CBE, Dashen, Bank of Abyssinia) using screenshots, QR codes, payment IDs, or SMS — with a free tier and a paid Verify API for developers.',
    tags: [
      'React',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Cloudinary',
      'Gemini',
      'OCR',
      'QR Code',
      'Better Auth',
      'Tailwind',
    ],
    image: '/tamagn-check.png',
    url: 'https://tamagncheck.online/',
    status: 'Live',
  },
  {
    name: 'Qandil AI',
    description:
      'Personalized AI learning for Ethiopian high school students — adapts to learning level, study style, and goals with quizzes, smart tutoring, and local-context guidance across dashboard and AI tools.',
    tags: ['React', 'Node.js', 'MongoDB', 'AI'],
    image: '/qandliai1.png',
    status: 'Beta',
  },
  {
    name: 'Hareg LMS',
    description:
      'School learning platform with admin tools to manage departments by academic year, courses, and students — plus exams, Chapa payments, and QR attendance for Ethiopian institutions.',
    tags: ['React', 'PostgreSQL', 'Chapa', 'AI'],
    image: '/lms1.png',
    url: 'https://lms-three-lake-48.vercel.app',
    status: 'Live',
  },
  {
    name: 'Electric ERP',
    description:
      'ERP panel for electrical businesses to track store inventory, buy and sell transactions, balances, and detailed electrical reports — with receipt status and batch/item history for smart operations.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind'],
    image: '/electric%20erp.jpg',
    status: 'Delivered',
  },
  {
    name: 'Hospital Hub',
    description:
      'Hospital admin dashboard with fast insights across bookings, doctors, patients, and medical reports — a central hub for staff, patient records, and clinical operations in one place.',
    tags: ['React', 'MongoDB', 'Cloudinary', 'Tailwind'],
    image: '/hospitalAdmin.png',
    status: 'Delivered',
  },
  {
    name: 'Room Reservation',
    description:
      'Hotel room booking for Bahir Dar venues — browse hotels and rooms with Birr pricing, availability badges, ratings, and reserve flows, plus profile and reservation management for guests.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind'],
    image: '/room.png',
    status: 'Live',
  },
  {
    name: 'Café Menu & Management',
    description:
      'Mobile-first café menu and ordering experience with categorized dishes, photos, prices, ratings, and quick add-to-cart — built for cafés and coffee shops to serve customers via QR and digital menus.',
    tags: ['React', 'Supabase', 'QR Code', 'Tailwind'],
    image: '/cafe%20menu.png',
    status: 'Live',
  },
  {
    name: 'Food Delivery',
    description:
      'Food ordering platform where customers browse a diverse menu, add dishes to cart, and place delivery orders — with login/register, search, and a mobile-friendly flow for local restaurants and Ethiopian cuisine.',
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
      className={`block glass-card-light rounded-lg sm:rounded-xl overflow-hidden group border border-gold/15 h-full relative ${
        product.url ? 'cursor-pointer' : ''
      }`}
    >
      <svg
        className="absolute -left-1 top-6 sm:top-8 w-2.5 h-6 sm:w-3 sm:h-8 text-brand/25 pointer-events-none"
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
      <div className="h-0.5 sm:h-1 bg-brand/35" />
      <div className="h-24 sm:h-36 relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
          loading="lazy"
        />
      </div>
      <div className="p-2.5 sm:p-[var(--space-card)]">
        <div className="flex items-start justify-between gap-1.5 sm:gap-3 mb-1.5 sm:mb-2.5">
          <h3 className="font-semibold text-text-primary text-xs sm:text-lg leading-snug">
            {product.name}
          </h3>
          <span
            className={`font-mono text-[10px] sm:type-caption uppercase tracking-wider px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full whitespace-nowrap shrink-0 ${
              statusStyles[product.status]
            }`}
          >
            {product.status}
          </span>
        </div>
        <p className="text-[11px] leading-snug sm:type-body-sm text-text-secondary mb-2 sm:mb-3 line-clamp-4 sm:line-clamp-none">
          {product.description}
        </p>
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] sm:type-caption text-text-secondary glass-tag px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        {product.url && (
          <span className="inline-flex items-center gap-1 sm:gap-1.5 text-brand text-[11px] sm:type-label font-semibold min-h-8 sm:min-h-10">
            View Live{' '}
            <ExternalLink className="size-3 sm:size-4" aria-hidden="true" />
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
          className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5"
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
