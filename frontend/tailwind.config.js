/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/@ionic/**/*.{js,ts,html}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        customGreen: "#8ABFA3",
      },
      animation: {
        blob: "float 20s ease-in-out infinite both alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": {
            transform: "none",
          },
          "50%": {
            transform: "translate(50%, 20%) rotateY(10deg) scale(1.2)",
          },
        },
      },
    },
    plugins: [require("@tailwindcss/line-clamp")],
  },
};
