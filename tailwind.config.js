/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [typography],
  theme: {
    extend: {
      keyframes: {
        "arrow-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(10px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
        fadeIn: {
          "0%": {
            opacity: 0,
            transform: "translateY(50px) scale(0.90)",
            filter: "blur(4px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0) scale(1)",
            filter: "blur(0)",
          },
        },
        growLine: {
          "0%": { width: "0%" },
          "100%": { width: "5rem" },
        },
      },
      animation: {
        "arrow-bounce": "arrow-bounce 0.6s ease-in-out infinite",
        wiggle: "wiggle 0.5s ease-in-out infinite",
        "fade-in": "fadeIn 2s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in-delayed":
          "fadeIn 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in-slow": "fadeIn 2s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        grow: "growLine 2s ease-out forwards",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        system: {
          purple10: "#240643",
          purple15: "#300b60",
          purple20: "#401075",
          purple30: "#5a1ba9",
          purple40: "#7526e3",
          purple50: "#9050e9",
          purple60: "#ad7bee",
          purple65: "#b78def",
          purple70: "#c29ef1",
          purple80: "#d7bff2",
          purple90: "#ece1f9",
          purple95: "#f6f2fb",

          green10: "#071b12",
          green15: "#0c2912",
          green20: "#1c3326",
          green30: "#194e31",
          green40: "#396547",
          green50: "#2e844a",
          green60: "#3ba755",
          green65: "#41b658",
          green70: "#45c65a",
          green80: "#91db8b",
          green90: "#cdefc4",
          green95: "#ebf7e6",
          green100: "#202b23",
        },
      },
    },
  },
};
