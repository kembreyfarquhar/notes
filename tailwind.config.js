const colors = require("tailwindcss/colors");
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      indigo: colors.indigo,
      blue: colors.blue,
      red: colors.red,
      purple: colors.purple,
      pink: colors.pink,
      yellow: colors.amber,
      green: {
        light: "#B5FF9F",
        DEFAULT: "#3AFF00",
        dark: "#249F00",
      },
    },
    extend: {},
  },
  variants: {
    extend: {
      cursor: ["hover"],
      padding: ["hover"],
      animation: ["hover"],
      transitionProperty: ["hover"],
    },
  },
  plugins: [],
};
