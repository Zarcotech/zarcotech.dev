// Tailwind configuration generated per visual redesign plan
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.tsx'],
  darkMode: 'class', // Use prefers-color-scheme media query
  theme: {
    extend: {
      colors: {
        primary: '#000000', // black
        background: '#ffffff', // light mode background
        backgroundDark: '#000000', // dark mode background
        accent: '#7c3aed', // purple (violet-600)
        gray: require('tailwindcss/colors').neutral,
      },
      fontFamily: {
        sans: ['var(--font-ubuntu)', 'system-ui'],
      },
      spacing: {
        0: '0px',
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        16: '4rem',
      },
    },
  },
  plugins: [],
};