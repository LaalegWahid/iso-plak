import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        steel: "rgb(var(--steel) / <alpha-value>)",
        board: "rgb(var(--board) / <alpha-value>)",
        wool: "rgb(var(--wool) / <alpha-value>)",
        mark: "rgb(var(--mark) / <alpha-value>)",
        paper: "rgb(var(--paper) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
      },
      fontFamily: { display: ["var(--f-display)"], body: ["var(--f-body)"] },
    },
  },
  plugins: [],
};
export default config;
