/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      black: "#000000",
      white: "#FFFFFF",
      teal: {
        50: "#99E3E3",
        100: "#009595",
        200: "#007070",
        300: "#004A4A",
        400: "#0172B4",
      },
      red: {
        50: "#EFA5A6",
        100: "#D61E20",
        200: "#AB181A",
        300: "#801213",
        400:'#FAE4E4'
      },
      neutral: {
        50: "#F0F0F0",
        100: "#CCCCCC",
        200: "#333333",
        300: "#E6E6E6",
        400: "#7F7F7F",
      },
      green:{
        50:'#E3F6E9'
      }
    },
  },
  plugins: [],
};
