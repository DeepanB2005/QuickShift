/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",   // Indigo
        secondary: "#14b8a6", // Teal
        accent: "#f59e0b",    // Amber
        background: "#f9fafb",// Light gray
        dark: "#0f172a",      // Slate
      },
    },
  },
  plugins: [],
};
