/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand tokens (named gold in components; values are Hareg forest green)
        gold: {
          light: '#6FAF3C',
          DEFAULT: '#3E6B15',
          dark: '#25450C',
        },
        accent: {
          gold: '#C4A35A',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          elevated: '#FBFCFA',
          muted: '#EEF2E8',
        },
        background: '#F6F5F0',
        border: '#D5DDD0',
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
        card: '0 4px 24px rgba(62, 107, 21, 0.08)',
        'card-hover': '0 12px 40px rgba(62, 107, 21, 0.14)',
      },
    },
  },
  plugins: [],
}
