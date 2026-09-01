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
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        border: "var(--border)",
        "border-light": "var(--border-light)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        ring: "var(--ring)",
        // Pure monochrome palette
        pure: {
          black: "#000000",
          white: "#ffffff",
        },
        mono: {
          900: "#111111",
          800: "#1a1a1a",
          700: "#333333",
          500: "#666666",
          400: "#888888",
          200: "#e5e5e5",
          100: "#f5f5f5",
          50: "#fafafa",
        },
      },
      fontFamily: {
        headline: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        body: ["var(--font-source-serif)", "Source Serif 4", "Georgia", "serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "SFMono-Regular", "Menlo", "monospace"],
      },
      borderRadius: {
        none: "0px",
        DEFAULT: "0px",
        sm: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        "2xl": "0px",
        "3xl": "0px",
        full: "0px",
      },
      boxShadow: {
        none: "none",
        DEFAULT: "none",
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
        instant: "100ms",
      },
      transitionTimingFunction: {
        DEFAULT: "linear",
      },
    },
  },
  plugins: [],
};

export default config;
