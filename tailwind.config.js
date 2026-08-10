/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      colors: {
        ivory: {
          50: "#FFFFFF",
          100: "#FAFAFA",
          200: "#F5F5F5",
        },
        champagne: {
          100: "#F7F7F7",
          200: "#EFEFEF",
          300: "#E5E5E5",
        },
        gold: {
          400: "#B8B8B8",
          500: "#9A9A9A",
          600: "#6B6B6B",
        },
        rose: {
          200: "#F0F0F0",
          300: "#E8E8E8",
          400: "#D4D4D4",
        },
        ink: {
          400: "#737373",
          500: "#525252",
          600: "#404040",
          700: "#262626",
        },
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        brand: ["'Great Vibes'", "cursive"],
        body: ["'Jost'", "sans-serif"],
        arabic: ["'Aref Ruqaa'", "serif"],
      },
      letterSpacing: {
        widest2: "0.35em",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        floaty: "floaty 7s ease-in-out infinite",
        shimmer: "shimmer 3.5s linear infinite",
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(0, 0, 0, 0.08)",
        card: "0 12px 40px -12px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [],
};
