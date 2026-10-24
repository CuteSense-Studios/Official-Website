/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './pages/**/*.html',
    './assets/js/**/*.{js,json}',
    './projects/**/*.{json,md}',
  ],
  theme: {
    extend: {
      colors: {
        'cs-pink': '#F4C6C9',
        'cs-pink-hover': '#F08DA1',
        'cs-pink-dark': '#B83A4B',
        'cs-pink-light': '#FFB3BC',
        'cs-blue': '#B9E1F1',
        'cs-blue-hover': '#98D0E8',
        'cs-blue-dark': '#2B799E',
        'cs-blue-light': '#E0F2FE',
        'cs-lilac': '#A178AF',
        'cs-lilac-hover': '#8C559E',
        'cs-lilac-dark': '#6D3D7E',
        'cs-lilac-light': '#E2CBEB',
        'cs-cream': '#FFF9F4',
        'cs-dark': '#1A161D',
        'cs-dark-surface': '#1F1925',
        'cs-dark-card': '#251D2C',
      },
      fontFamily: {
        sans: ['Quicksand', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Fredoka', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        brand: ['Borel', 'cursive'],
      },
    },
  },
  plugins: [],
};
