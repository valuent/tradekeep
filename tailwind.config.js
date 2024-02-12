/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },

  daisyui: {
    themes: ["dracula", "cupcake"],
  },

  daisyui: {
    themes: [
      {
        dracula: {
          ...require("daisyui/src/theming/themes")["dracula"],
          primary: "#6e6eff",
        },
      },
      "pastel",
    ],
  },
  plugins: [require("daisyui")],
};
