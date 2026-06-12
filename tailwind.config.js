/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#F5A623',
          DEFAULT: '#D4891A',
          dark: '#A86A10',
        },
        surface: {
          DEFAULT: '#111111',
          elevated: '#161616',
        },
        background: '#0A0A0A',
        'text-primary': '#F0EDE6',
        'text-secondary': '#9A9080',
        success: '#2DBE6C',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
