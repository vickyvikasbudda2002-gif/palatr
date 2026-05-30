import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        bg: "#070707",
        surface: "#121212",
        "surface-hover": "#1a1a1a",
        muted: "#8d8d8d",
        border: "rgba(255,255,255,0.08)",
        primary: {
          DEFAULT: "#ff2d5e",
          hover: "#e01f4c",
          2: "#ff4d77",
        },
        gem: {
          primary: "#8b5cf6",
          secondary: "#c084fc",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        scaleUp: {
          from: { transform: "scale(0.95)" },
          to: { transform: "scale(1)" },
        },
        gradientBG: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fadeInUp 0.8s ease forwards",
        "fade-in": "fadeIn 0.3s forwards",
        "scale-up": "scaleUp 0.3s forwards",
        "gradient-bg": "gradientBG 10s ease infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
