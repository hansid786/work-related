/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        atelier: {
          surface: '#FCF9F5',
          surfaceDim: '#DCDAD6',
          surfaceLowest: '#FFFFFF',
          onSurface: '#1C1C1A',
          muted: '#6B6560',
          hairline: '#E8E2D9',
          primary: '#745548',
          roseTaupe: '#A17E70',
          secondary: '#6F5B3F',
          gold: '#D6BD9A',
          tertiary: '#292522',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Montserrat"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
