/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#F0A830',
          DEFAULT: '#C47A12',
          dark: '#8F5509',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          elevated: '#FFFCF7',
          muted: '#F5EFE6',
        },
        background: '#FAF6F0',
        border: '#E5DDD0',
        'text-primary': '#1A1510',
        'text-secondary': '#5C5248',
        'text-muted': '#8A7E72',
        success: '#1E9B57',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(196, 122, 18, 0.08)',
        'card-hover': '0 12px 40px rgba(196, 122, 18, 0.14)',
      },
    },
  },
  plugins: [],
}
