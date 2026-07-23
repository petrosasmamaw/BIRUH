/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Primary — Hareg forest green (logo)
        brand: {
          light: '#6FAF3C',
          DEFAULT: '#3E6B15',
          dark: '#25450C',
        },
        // Secondary — warm gold (borders, frames, soft accents)
        gold: {
          light: '#E8C992',
          DEFAULT: '#C4A35A',
          dark: '#8F7340',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          elevated: '#FBFCFA',
          muted: '#EEF2E8',
        },
        background: '#F6F5F0',
        border: '#E2D9C8',
        'text-primary': '#152018',
        'text-secondary': '#4A5648',
        'text-muted': '#748074',
        success: '#3E6B15',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(196, 163, 90, 0.12)',
        'card-hover': '0 12px 40px rgba(62, 107, 21, 0.12)',
      },
    },
  },
  plugins: [],
}
