/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: {
          750: '#2d3748', // Custom shade between 700 and 800
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
