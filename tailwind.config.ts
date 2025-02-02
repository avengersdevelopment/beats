import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1200px",
    },
    extend: {
      fontFamily: {
        joystix: ["var(--font-joystix)"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "20px",
          lg: "80px",
        },
      },
      animation: {
        shake: "shake 0.5s ease-in-out",
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%, 75%": { transform: "translate(-4px, 4px)" },
          "50%": { transform: "translate(4px, -4px)" },
        },
      },
      dropShadow: {
        purple: '0 5px #C2A2FF',
        darker: '0 5px #402F5C'
      }
    },
  },
  plugins: [],
};

export default config;
