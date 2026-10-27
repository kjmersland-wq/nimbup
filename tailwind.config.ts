import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#09090b",
        surface: "#18181b",
        foreground: "#fafafa",
        muted: { DEFAULT: "#27272a", foreground: "#a1a1aa" },
        accent: { DEFAULT: "#8b5cf6", glow: "#6366f1" },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: { shimmer: "shimmer 1.8s ease-in-out infinite" },
    },
  },
  plugins: [animate],
};
export default config;
