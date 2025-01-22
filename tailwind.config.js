/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#060606",
        foreground: "#ffffff",
      },
      fontFamily: {
        "press-start": ["var(--font-press-start-2p)"],
      },
    },
  },
  plugins: [],
} 