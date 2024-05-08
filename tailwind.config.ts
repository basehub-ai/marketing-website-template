import type {Config} from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: "var(--font-geist-sans)",
      mono: "var(--font-geist-mono)",
    },
    colors: {
      // Dynamic colors
      black: "#000",
      white: "#fff",
      transparent: "transparent",
      neutral: {
        50: "rgb(var(--neutral-rgb-50) / <alpha-value>)",
        100: "rgb(var(--neutral-rgb-100) / <alpha-value>)",
        200: "rgb(var(--neutral-rgb-200) / <alpha-value>)",
        300: "rgb(var(--neutral-rgb-300) / <alpha-value>)",
        400: "rgb(var(--neutral-rgb-400) / <alpha-value>)",
        500: "rgb(var(--neutral-rgb-500) / <alpha-value>)",
        600: "rgb(var(--neutral-rgb-600) / <alpha-value>)",
        700: "rgb(var(--neutral-rgb-700) / <alpha-value>)",
        800: "rgb(var(--neutral-rgb-800) / <alpha-value>)",
        900: "rgb(var(--neutral-rgb-900) / <alpha-value>)",
        950: "rgb(var(--neutral-rgb-950) / <alpha-value>)",
      },
      dark: {
        text: {
          primary: "#FAFAFA",
          secondary: "#A1A1AA",
          tertiary: "#787882",
        },
        surface: {
          primary: "#09090B",
          secondary: "#151519",
          tertiary: "#252528",
        },
        border: {
          DEFAULT: "#252528",
        },
        control: {
          DEFAULT: "#FF6C02",
        },
      },
      text: {
        primary: "#09090B",
        secondary: "#52525B",
        tertiary: "#787882",
      },
      surface: {
        primary: "#FAFAFA",
        secondary: "#F7F7F8",
        tertiary: "#EFEFF1",
      },
      border: {
        DEFAULT: "#D4D4D8",
      },
      control: {
        DEFAULT: "#FF6C02",
      },
    },
    extend: {
      gridTemplateColumns: {
        header: "1fr max-content 1fr",
      },
      keyframes: {
        enterFromRight: {
          from: {opacity: "0", transform: "translateX(200px)"},
          to: {opacity: "1", transform: "translateX(0)"},
        },
        enterFromLeft: {
          from: {opacity: "0", transform: "translateX(-200px)"},
          to: {opacity: "1", transform: "translateX(0)"},
        },
        exitToRight: {
          from: {opacity: "1", transform: "translateX(0)"},
          to: {opacity: "0", transform: "translateX(200px)"},
        },
        exitToLeft: {
          from: {opacity: "1", transform: "translateX(0)"},
          to: {opacity: "0", transform: "translateX(-200px)"},
        },
        scaleIn: {
          from: {opacity: "0", transform: "rotateX(-10deg) scale(0.9)"},
          to: {opacity: "1", transform: "rotateX(0deg) scale(1)"},
        },
        scaleOut: {
          from: {opacity: "1", transform: "rotateX(0deg) scale(1)"},
          to: {opacity: "0", transform: "rotateX(-10deg) scale(0.95)"},
        },
        fadeIn: {
          from: {opacity: "0"},
          to: {opacity: "1"},
        },
        fadeOut: {
          from: {opacity: "1"},
          to: {opacity: "0"},
        },
      },
      fontSize: {
        "2xs": ["11px", {lineHeight: "1.3", letterSpacing: "-0.3", fontWeight: "400"}],
      },
    },
    animation: {
      scaleIn: "scaleIn 200ms ease",
      scaleOut: "scaleOut 200ms ease",
      fadeIn: "fadeIn 200ms ease",
      fadeOut: "fadeOut 200ms ease",
      enterFromLeft: "enterFromLeft 250ms ease",
      enterFromRight: "enterFromRight 250ms ease",
      exitToLeft: "exitToLeft 250ms ease",
      exitToRight: "exitToRight 250ms ease",
    },
  },
  plugins: [],
};

export default config;
