import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wine: {
          DEFAULT: "#800000",
          dark: "#5e0000",
          deep: "#2b0000",
          card: "#a50000",
        },
        crimson: "#800000",
        cream: {
          DEFAULT: "#FBF1DB",
          light: "#FCF6E8",
          dark: "#F3E6C8",
          btn: "#FFEED2",
        },
        gold: {
          DEFAULT: "#C9A24B",
          light: "#E3C77A",
          dark: "#A07C2E",
        },
        ink: "#3A2A2A",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        script: ["var(--font-script)", "cursive"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(3deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-6px) scale(1.05)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255,238,210,0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(255,238,210,0.45)" },
        },
        "coin-float": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)", opacity: "0.8" },
          "50%": { transform: "translateY(-10px) rotate(15deg)", opacity: "1" },
        },
        "envelope-open": {
          "0%": { transform: "scale(1) rotateX(0deg)" },
          "50%": { transform: "scale(1.05) rotateX(-8deg)" },
          "100%": { transform: "scale(0.95) rotateX(0deg)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        "fade-in": "fade-in 0.9s ease-out both",
        float: "float 5s ease-in-out infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "coin-float": "coin-float 3s ease-in-out infinite",
        "envelope-open": "envelope-open 0.6s ease-in-out forwards",
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
