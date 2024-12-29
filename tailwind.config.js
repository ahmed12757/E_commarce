/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      screens: {
        "2xl": "1120px",
      },
      colors: {
        primary: {
          50: "#e7f7e7",
          100: "#9dde9d",
          200: "#54c654",
          300: "#3bbd3b",
          400: "#23b523",
          500: "#0aad0a",
          600: "#099c09",
          700: "#088a08",
          800: "#077907",
          900: "#066806",
          950: "#044504",
        },
      },
      fontFamily: {
        cairo: "Cairo Variable",
      },
    },
  },
  plugins: [],
};
