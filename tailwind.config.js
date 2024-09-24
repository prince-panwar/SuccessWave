/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1c3b51',  // Dark blue from the logo
        accent: '#2b7a77',   // Teal color inspired by the wave
        light: '#e6f7f7',    // Lighter shade for accents
        white: '#ffffff',    // White for text and background
      },
    },
  },
  plugins: [],
};
