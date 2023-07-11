/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {

    },
    screens: {
      'xsm': {'max': '455px'},
      'xxs': '370px',
      'xs': '455px',
      'acc': {'max': '855px'},
      ...defaultTheme.screens,
    },
  },
  plugins: [],
}
