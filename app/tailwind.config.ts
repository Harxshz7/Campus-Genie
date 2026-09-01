import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#fdfbf7",
          light: "#ffffff",
          card: "#faf7f0",
          yellow: "#fff9d2",
          yellowDark: "#fff275",
          green: "#e2f7d8",
          pink: "#ffe3e3",
          blue: "#e6f0fa",
        },
        ink: {
          DEFAULT: "#2d2d2d",
          light: "#4a4a4a",
          muted: "#717171",
        },
        pencil: "#e5e0d8",
        sketch: {
          red: "#ff4d4d",
          blue: "#2d5da1",
          yellow: "#f4c430",
          green: "#48bb78",
        },
      },
      fontFamily: {
        headline: ["var(--font-kalam)", "Kalam", "Comic Sans MS", "cursive"],
        body: ["var(--font-patrick-hand)", "Patrick Hand", "Caveat", "cursive"],
        hand: ["var(--font-kalam)", "Kalam", "cursive"],
      },
      boxShadow: {
        sketchSm: "2px 2px 0px #2d2d2d",
        sketch: "4px 4px 0px #2d2d2d",
        sketchLg: "6px 6px 0px #2d2d2d",
        sketchXl: "8px 8px 0px #2d2d2d",
        sketchRed: "4px 4px 0px #ff4d4d",
        sketchBlue: "4px 4px 0px #2d5da1",
        sketchNone: "0px 0px 0px transparent",
      },
      borderWidth: {
        sketch: "2.5px",
        sketchThick: "3.5px",
      },
      transitionDuration: {
        snappy: "100ms",
      },
    },
  },
  plugins: [],
};

export default config;
