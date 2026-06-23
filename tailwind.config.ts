import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx,mdx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Variant B "Resultatlöftet" — ljus-editorial. LOCKED tokens.
        // rgb(var(--*-c) / <alpha-value>) so opacity modifiers work.
        canvas: "rgb(var(--canvas-c) / <alpha-value>)",
        ink: "rgb(var(--ink-c) / <alpha-value>)",
        muted: "rgb(var(--muted-c) / <alpha-value>)",
        accent: "rgb(var(--accent-c) / <alpha-value>)",
        accsoft: "rgb(var(--accsoft-c) / <alpha-value>)",
        line: "rgb(var(--line-c) / <alpha-value>)",
        soft: "rgb(var(--soft-c) / <alpha-value>)",
        card: "rgb(var(--card-c) / <alpha-value>)",
      },
      fontFamily: {
        // display = Newsreader (serif), body/UI = Hanken Grotesk
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "68ch",
        shell: "1180px",
      },
      borderRadius: {
        card: "14px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
