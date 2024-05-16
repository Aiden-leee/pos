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
      defaultBg: "#f5f5f5", // 기본 페이지 배경색상
      point: "#2fb0e1", // point 색상
      pointLight: "#f4fcff", // point 색상의 light
      active: "#fffa0c", // yellow 계열
      default: "#333", // 폰트색상 등의 사용
      white: "#ffffff", // white
      borderColor: "#ddd", // 연한 회색계열 테두리 색상
      iconColor: "#b9b9b9", // 연한 회색계열 아이콘 색상
      occupied: "#f63325", // red 계열
      vacant: "#1ca933", // green 계열
      orderHold: "#3174fb", // skyblue 계열
    },
  },
  plugins: [],
};

export default config;
