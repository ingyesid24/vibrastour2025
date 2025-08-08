/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#8B5CF6',
        secondary: '#EF4444',
        accent: '#FBBF24'
      },
      fontFamily: {
        'vibras': ['Arial Black', 'sans-serif']
      }
    }
  },
  plugins: []
};cl