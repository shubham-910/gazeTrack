/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this if your files are in a different location
  ],
  theme: {
    extend: {
      colors:{
          'theme-background': '#7579E7',
          'theme-primarybutton': '#7579E7',
          'hover-navcolor': '#E5E6FF',
      },
    },
  },
  plugins: [],
}
