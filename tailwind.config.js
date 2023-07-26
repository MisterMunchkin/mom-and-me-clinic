/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require("tailwindcss/colors");

module.exports = withMT({
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e3ab68',
        'primary-hover': '#ebc393',
        gray: {
          650: '#5B5B5B'
        },
        white: {
          'ivory': '#FBF6F6',
          'coffee': '#EDDDD9',
          DEFAULT: colors.white
        },
        'pastel-pink': '#E2A5A6',
        'melon': '#F7BFB0'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      transitionProperty: {
        'top': 'top'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
});
