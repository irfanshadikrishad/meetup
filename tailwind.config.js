/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#DDFFAB",

          secondary: "#f46b49",

          accent: "#ef1ac8",

          neutral: "#1B2227",

          "base-100": "#FFFFFF",

          info: "#35A9D0",

          success: "#14B892",

          warning: "#AB6312",

          error: "#F07586",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
