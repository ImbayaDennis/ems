/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'main-texture': "url('~/src/assets/images/barberry_v3.jpg')",
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
};

module.exports = config;
