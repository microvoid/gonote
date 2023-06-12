const { mauve, violet } = require("@radix-ui/colors");
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...mauve,
        ...violet,
        primary: {
          DEFAULT: violet.violet10,
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: violet.violet5,
          foreground: mauve.mauve11,
        },
        "primary-content": "#ffffff",
        "secondary-content": mauve.mauve11,
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
    nextui(),
  ],
};
