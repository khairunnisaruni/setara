// 1. Import 'defaultTheme'
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  // 2. Isi 'content' agar Tailwind tahu file mana yang harus di-scan
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 3. Langsung saya tambahkan 'fontFamily' untuk "Inter"
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}

