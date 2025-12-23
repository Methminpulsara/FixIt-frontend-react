/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Dark/Light mode සෙට් කරන්න මේක වැදගත්
  theme: {
    extend: {
      colors: {
        primary: "#FEB05D",    // ඔයා එවපු Orange පාට
        secondary: "#5A7ACD",  // ඔයා එවපු Blue පාට
        dark: "#2B2A2A",       // ඔයා එවපු Dark Grey පාට
        light: "#F5F2F2",      // ඔයා එවපු Off-White පාට
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Industry standard font එකක්
      }
    },
  },
  plugins: [],
}