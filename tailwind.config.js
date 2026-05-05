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
        ink: '#0A0A0F',
        bone: '#F5F4F0',
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-roxo-azul': 'linear-gradient(135deg, #6A11CB 0%, #2574FC 100%)',
        'mesh-dark':
          'radial-gradient(at 20% 0%, rgba(106,17,203,0.35) 0px, transparent 50%), radial-gradient(at 80% 50%, rgba(37,116,252,0.25) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(106,17,203,0.20) 0px, transparent 50%)',
        'noise':
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
    },
  },
  plugins: [],
}
