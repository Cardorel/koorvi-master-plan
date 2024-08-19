/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        "black-100":"#242424",
        "white-100": "#FFFFFF",
        "gray-70" : "#93979C",
        "gray-30": "#D0D3D4",
        "gray-10": "#EFF0F1",
        "gray-5": "#F7F8F8",
        "blue-100": "#086BCD",
        "system-delete": "#E41E1E",
        "user-gray": "#656661",
        "user-salmon": "#FF8079",
        "user-lilac" : "#9F82F8",
        "user-blue" : "#45C2FF",
      },
      screens: {
        'sm': '300px',
        'md': '768px',
        'lg': '1024px',
      }
    },
  },
  plugins: [],
}

