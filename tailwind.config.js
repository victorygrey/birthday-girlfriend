/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#FFFDF9',
        'warm-white': '#FFFBF5',
        'parchment': '#FAF6EE',
        'soft-pink': '#FFEBEF',
        'dusty-rose': '#D49B9B',
        'burgundy': '#731D2D',
        'deep-wine': '#450F1D',
        'dark-brown': '#3D2525',
        'luxury-gold': {
          DEFAULT: '#D4AF37',
          light: '#F5E6BE',
          mid: '#DFB757',
          dark: '#9A7B1C',
        },
        'champagne': {
          DEFAULT: '#F7E7CE',
          light: '#FFF9EF',
          dark: '#DFC397',
        },
      },
      fontFamily: {
        'display': ['"Playfair Display"', 'Georgia', 'serif'],
        'serif': ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        'cursive': ['"Great Vibes"', 'cursive'],
        'royal': ['"Cinzel"', 'serif'],
        'body': ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 25px 60px -15px rgba(115, 29, 45, 0.25)',
        'luxury-gold': '0 15px 40px -10px rgba(212, 175, 55, 0.35)',
        'glow-rose': '0 0 50px rgba(220, 80, 110, 0.25)',
        'glow-gold': '0 0 40px rgba(212, 175, 55, 0.3)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.05)' },
        },
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
