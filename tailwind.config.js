/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      width: {
        inputSearchWidth: '250px',
      },
      colors: {
        baseBackgroundPrimary: '#dde5b6',
        baseBackgroundComplementary: '#b64040',
        baseBackgroundSecondary: '#f0ead2',
        baseButtonPrimary: '#a98467',
        baseButtonFocus: '#f0ead2',
        baseTextPrimary: '#4b382f',
        baseTextSecondary: '#a98467',
        baseCardBackground: '#adc178',
      },
    },
  },
  plugins: [],
};

// consider brown and green
