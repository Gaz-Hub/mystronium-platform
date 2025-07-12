/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#7c3aed',
        secondary: '#06b6d4',
        dark: '#0f0f23',
        accent: '#f59e0b',
        gold: '#FFD700',
        'lumen-blue': '#00F0FF'
      }
    },
  },
  plugins: [],
}