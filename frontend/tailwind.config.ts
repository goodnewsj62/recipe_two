import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xlc: "1500px",
      },
      fontFamily: {
        inter: ["Inter"],
        sansitaSwashed: ["Sansita Swashed"],
      },
      colors: {
        primaryColor: "var(--color-primary-main)",
        primaryColorLight: "var(--color-primary-light)",
        primaryColorDark: "var(--color-primary-dark)",
        primaryTextHighlight: "var(--color-primary-contrastText)", // default text color for blue
        successColor: "var(--color-success-main)",
        successColorLight: "var(--color-success-light)",
        successColorDark: "var(--color-success-dark)",
        successTextHighlight: "var(--color-success-contrastText)", // default text color for success
        errorColor: "var(--color-error-main)",
        errorColorLight: "var(--color-error-light)",
        errorColorDark: "var(--color-error-dark)",
        errorTextHighlight: "var(--color-error-contrastText)", // default text color for error
      },
      boxShadow: {
        checkBox: "0px 1px 3px 0px #E2E2E2 inset",
      },
    },
  },
  plugins: [],
};
export default config;
