/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#EAE6DE',
        primary: '#D8D3CA',
        primaryOnWhite: '#EAE6DE',
        buttonDark: 'black',
        buttonDarkFocus: '#4D4D4D',
        buttonLight: 'white',
        buttonLightFocus: '#EAE6DE',
        textOnDark: 'white',
        textOnLight: 'black',
        primaryFocus: '#8F8E82',
        primaryAccent: '#D1CDC6',
        error: '#FEE2E2',
        textOnError: '#EF4444',
      },
      boxShadow: {
        thick: '0 45px 75px -20px rgba(0, 0, 0, 0.7)',
      },
      keyframes: {
        'slide-modal-in-from-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-modal-in-from-left': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-modal-down-from-top': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-in-from-right':
          'slide-modal-in-from-right 0.25s ease-out forwards',
        'slide-in-from-left':
          'slide-modal-in-from-left 0.25s ease-out forwards',
        'slide-down-from-top':
          'slide-modal-down-from-top 0.25s ease-out forwards',
      },
      screens: {
        sm: '576px',
        md: '960px',
        lg: '1440px',
      },
    },
  },
  plugins: [],
};
