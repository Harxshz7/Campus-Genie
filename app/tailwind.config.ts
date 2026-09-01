import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#000000",
        mono: {
          black: "#000000",
          white: "#ffffff",
          offwhite: "#fafafa",
          light: "#f0f0f0",
          mid: "#888888",
          dark: "#1a1a1a",
          darker: "#111111",
        },
      },
      fontFamily: {
        headline: ["'Playfair Display'", "Georgia", "serif"],
        body: ["'Source Serif 4'", "'Times New Roman'", "Georgia", "serif"],
        mono: ["'JetBrains Mono'", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      borderRadius: {
        none: "0px",
        DEFAULT: "0px",
        sm: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        "2xl": "0px",
        full: "0px",
      },
      borderWidth: {
        DEFAULT: "1px",
        "2": "2px",
        "3": "3px",
        "4": "4px",
        "8": "8px",
      },
      transitionDuration: {
        DEFAULT: "100ms",
        fast: "100ms",
      },
    },
  },
  plugins: [],
};

export default config;
