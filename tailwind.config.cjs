/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './src/**/*.css'],
  theme: {
    extend: {
      colors: {
        'main-400': '#2a2b2d',
        'main-500': '#232325',
      },
      boxShadow: {
        tree: '0 12px 24px -6px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
