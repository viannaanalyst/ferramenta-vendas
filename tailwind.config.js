/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        roxo: '#6A11CB',
        azul: '#2574FC',
      },
      backgroundImage: {
        'gradient-roxo-azul': 'linear-gradient(135deg, #6A11CB 0%, #2574FC 100%)',
      },
    },
  },
  plugins: [],
}
