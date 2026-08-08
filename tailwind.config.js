/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#FFF8F0',
        'warm-white': '#FFFBF5',
        'soft-pink': '#FFE5E5',
        'dusty-rose': '#D4A5A5',
        'burgundy': '#8B4049',
        'dark-brown': '#5C3A3A',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
