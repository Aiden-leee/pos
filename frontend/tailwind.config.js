/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        tableImage: "url('/public/assets/images/table.svg')",
      },
    },
    colors: {
      transparent: "transparent",
      point: "#2fb0e1",
      pointLight: "#f4fcff",
      active: "#fffa0c",
      default: "#333",
      white: "#ffffff",
      defaultBg: "#f5f5f5",
      borderColor: "#ddd",
      iconColor: "#b9b9b9",
      occupied: "#f63325",
      vacant: "#1ca933",
      orderHold: "#3174fb",
    },
  },
  plugins: [],
};

export default config;
