/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#171614",
          darker: "#0f0e0d",
          surface: "#21201d",
          light: "#efe9de",
          lightCard: "#f7f4ed",
          lime: "#c9f04c",
          limeHover: "#b6db3c",
          orange: "#e85d2f",
          orangeHover: "#d44c1f",
          border: "#dfd8cc",
          muted: "#76736c",
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        wider: '0.05em',
        widest: '0.15em',
      }
    },
  },
  plugins: [],
}
