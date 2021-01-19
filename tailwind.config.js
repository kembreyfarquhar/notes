module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
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
