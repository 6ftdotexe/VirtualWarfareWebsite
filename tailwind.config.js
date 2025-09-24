export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        soft: "0 8px 24px rgba(0,0,0,0.08)",
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};