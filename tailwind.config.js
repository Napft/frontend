module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // You can add customizations to the default theme here
      // For example, to add a new color:
      colors: {
        primary: "#FF0000", // Replace with your desired color
      },
    },
  },
  variants: {
    extend: {
      // You can extend or disable utility variants here
    },
  },
  plugins: [
    // You can add third-party plugins here
  ],
};
