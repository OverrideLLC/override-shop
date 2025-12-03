/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        black: '#000000',
        white: '#FFFFFF',
      },
      borderRadius: {
        DEFAULT: '0px',
        none: '0px',
      }
    },
  },
  plugins: [],
}
