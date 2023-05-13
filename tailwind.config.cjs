/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', ':global(.dark)'],
  content: [
    './*.html',
    './src/**/*.css',
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.ts',
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      colors: {
        main: {
          200: '#cacbce',
          300: '#36373a',
          400: '#ffffff',
          500: '#f9f9ff',
          600: '#62748c',
          700: '#1f2e4d',
        },
        alpha: {
          400: 'rgba(255,255,255,0.13)',
        },
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
      boxShadow: {
        tree: '0 12px 24px -6px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
