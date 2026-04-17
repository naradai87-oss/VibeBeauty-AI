import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        vibe: {
          // Luxury Core Palette
          cream: '#FDFCFB',
          slate: '#1E293B',
          charcoal: '#0F172A',
          gold: '#D4AF37',
          silver: '#E2E8F0',
          // Refined Accents
          primary: '#8B5CF6',   // Sophisticated Violet
          secondary: '#F472B6', // Soft Rose
          accent: '#A78BFA',    // Muted Lavender
          surface: 'rgba(255, 255, 255, 0.8)',
          'surface-dark': 'rgba(15, 23, 42, 0.85)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'SF Pro Display', '-apple-system', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Playfair Display', 'serif'],
      },
      borderRadius: {
        'apple-sm': '14px',
        'apple-md': '24px',
        'apple-lg': '40px',
        'apple-xl': '64px',
      },
      boxShadow: {
        'luxury': '0 10px 40px -10px rgba(0, 0, 0, 0.05), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        'luxury-lg': '0 20px 60px -15px rgba(0, 0, 0, 0.08), 0 30px 40px -10px rgba(0, 0, 0, 0.15)',
        'glow-violet': '0 0 30px rgba(139, 92, 246, 0.25)',
        'inner-light': 'inset 0 1px 0 rgba(255, 255, 255, 0.6)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(0.99)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'orb-float-1': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(100px, -50px) scale(1.2)' },
          '66%': { transform: 'translate(-50px, 50px) scale(0.9)' },
        },
        'orb-float-2': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-80px, 100px) scale(1.1)' },
        },
        'orb-float-3': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(50px, 80px)' },
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'orb-1': 'orb-float-1 20s ease-in-out infinite',
        'orb-2': 'orb-float-2 25s ease-in-out infinite',
        'orb-3': 'orb-float-3 18s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
