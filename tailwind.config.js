const { mauve, violet } = require("@radix-ui/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...mauve,
        ...violet,
        primary: violet.violet10,
        "primary-content": "#ffffff",
        secondary: violet.violet5,
        "secondary-content": mauve.mauve11,
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
