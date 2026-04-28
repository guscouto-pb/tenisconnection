/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        tc: {
          orange: '#C96B2A',
          'orange-dark': '#A8561F',
          'orange-light': '#E07A32',
          gold: '#D4A820',
          'gold-dark': '#B8901A',
        },
      },
    },
  },
  plugins: [],
}

