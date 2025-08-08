/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // ⬇️ Añadimos más animaciones sin eliminar las existentes
      animation: {
        'text-gradient': 'textGradient 4s linear infinite',
        float: 'float 6s ease-in-out infinite',
        floatSm: 'floatSm 10s ease-in-out infinite',
        floatXs: 'floatXs 14s ease-in-out infinite',
      },
      // ⬇️ Añadimos nuevos keyframes
      keyframes: {
        textGradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatSm: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        floatXs: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      colors: {
        primary: '#8B5CF6',
        secondary: '#EF4444',
        accent: '#FBBF24'
      },
      fontFamily: {
        'vibras': ['Arial Black', 'sans-serif', '"Rock Salt"', 'cursive']
      }
    }
  },
  plugins: []
}