/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        tc: {
          orange: '#E2671B',
          'orange-dark': '#C96B2A',
          'orange-light': '#F07830',
          gold: '#D4A820',
          'gold-dark': '#B8901A',
        },
      },
    },
  },
  plugins: [],
}

