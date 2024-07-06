/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      width: {
        inputSearchWidth: '350px',
      },
      colors: {
        baseBackgroundPrimary: '#EAE6DE',
        // baseBackgroundComplementary: '#b64040',
        baseBackgroundSecondary: '#8F8E82',
        baseButtonPrimary: '#a98467',
        baseButtonFocus: '#4D4D4D',
        baseButtonFocus2: '#EAE6DE',
        baseTextPrimary: 'black',
        baseCardBackground: '#D1CDC6',
        baseAlertText: '#EF4444',
        baseAlertBackground: '#FEE2E2',
        baseSidebar: '#D8D3CA',
      },
      boxShadow: {
        thick: '0 45px 75px -20px rgba(0, 0, 0, 0.7)',
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
