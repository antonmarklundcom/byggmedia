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
        canvas: "var(--canvas)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        accsoft: "var(--accsoft)",
        line: "var(--line)",
        soft: "var(--soft)",
        card: "var(--card)",
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
