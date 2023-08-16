/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
      },
      backgroundImage: {
        "login-bg": "url('/assets/login-bg.jpg')",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
