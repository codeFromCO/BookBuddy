/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      width: {
        inputSearchWidth: '250px',
      },
      colors: {
        baseGreen: '#8CC084',
        basePeach: '#FF6F61',
        basePeachLight: '#FFF2ED',
        baseDeepBlue: '#004080',
        baseMidGray: '#DEDEDE',
        baseLightGray: '#F5F5F5'
      },
    },
  },
  plugins: [],
};

// consider brown and green
