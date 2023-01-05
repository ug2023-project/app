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
          400: '#2a2b2d',
          500: '#232325',
        },
        alpha: {
          400: 'rgba(255,255,255,0.13)',
        },
      },
      boxShadow: {
        tree: '0 12px 24px -6px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
