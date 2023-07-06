/** @type {import('tailwindcss').Config} */
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
      'xsm': {'max': '420px'},
      'xs': '420px',
      ...defaultTheme.screens,
    },
  },
  plugins: [],
}
