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
    keyframes: {
      'slide-modal-in-from-right': {
        '0%': { transform: 'translateX(100%)', opacity: '0' },
        '100%': { transform: 'translateX(0)', opacity: '1' },
      },
      'slide-nav-text-out-right': {
        '0%': { transform: 'translateX(1.5rem)' },
        '100%': { transform: 'translateX(3.5rem)' },
      },
      'slide-nav-text-in-left': {
        '0%': { transform: 'translateX(3.5rem)' },
        '100%': { transform: 'translateX(-1.5rem)' },
      },
      'slide-down-from-top': {
        '0%': { transform: 'translateY(-100%)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
      },
      'fade-in': {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
    },
    animation: {
      'slide-in': 'slide-modal-in-from-right 0.5s ease-out forwards',
      'slide-down': 'slide-down-from-top 0.5s ease-out forwards',
      'fade-in': 'fade-in 1s ease-out forwards',
      'nav-expand': 'slide-nav-text-out-right 0.25s ease-out forwards',
      'nav-hide': 'slide-nav-text-in-left 0.25s ease-out forwards',
    },
    screens: {
      sm: '576px',
      md: '960px',
      lg: '1440px',
    },
  },
  plugins: [],
};
