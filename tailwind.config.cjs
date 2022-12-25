/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './src/**/*.css'],
  theme: {
    extend: {
      boxShadow: {
        tree: '0 12px 24px -6px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
