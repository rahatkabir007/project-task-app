/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
      extend: {
        fontFamily: {
            poppins: ["Roboto"],
      },
      colors: {
        "customDarkGrey": "#393939",
        "customLightGrey": "#E5E5E5",
        "customLighterGrey": "#F7F7F7",
        "customDarkTeal": "#0E3B3E",
        "customLightDarkTeal": "#03484D",
        "customLightDarkTeal2": "#034E53",
        "customDarkCyan": "#00CAD7",
        "customCyan": "#0AAEB9",
        "customLightCyan": "#15ADB7",
        "customSkyBlue": "#14B1F0",
        "customBeige": "#B8A023",
        "customRed":"#C82020"
      },
    },
  },
  plugins: [],
}