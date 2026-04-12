/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          light: "var(--primary-light)",
          dark: "var(--primary-dark)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          light: "var(--accent-light)",
        },
        green: "var(--green)",
        red: "var(--red)",
        amber: "var(--amber)",
        pink: "var(--pink)",
        bg: {
          DEFAULT: "var(--bg)",
          2: "var(--bg2)",
          3: "var(--bg3)",
        },
        card: {
          DEFAULT: "var(--card)",
          2: "var(--card2)",
          3: "var(--card3)",
        },
        text: {
          DEFAULT: "var(--text)",
          2: "var(--text2)",
          3: "var(--text3)",
        },
        border: {
          DEFAULT: "var(--border)",
          2: "var(--border2)",
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
