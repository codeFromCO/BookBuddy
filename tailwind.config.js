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
    screens: {
      sm: '576px',
      // => @media (min-width: 576px) { ... }

      md: '960px',
      // => @media (min-width: 960px) { ... }

      lg: '1440px',
      // => @media (min-width: 1440px) { ... }
    },
  },
  plugins: [],
};

// consider brown and green
