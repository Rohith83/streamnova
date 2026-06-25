/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0B0F19",
          secondary: "#121826",
        },
        card: "#1B2435",
        accent: {
          primary: "#E50914",
          secondary: "#8B5CF6",
          highlight: "#06B6D4",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#A1A1AA",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.08)",
        },
      },
      fontFamily: {
        display: ["Bebas Neue", "Oswald", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(180deg, rgba(11,15,25,0) 0%, rgba(11,15,25,0.6) 55%, rgba(11,15,25,1) 100%)",
        "card-gradient":
          "linear-gradient(180deg, rgba(11,15,25,0) 0%, rgba(11,15,25,0.9) 100%)",
        "glow-radial":
          "radial-gradient(circle at 50% 0%, rgba(229,9,20,0.25), transparent 60%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(229,9,20,0.25)",
        "glow-purple": "0 0 40px rgba(139,92,246,0.25)",
        card: "0 10px 30px rgba(0,0,0,0.45)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        shimmer: "shimmer 1.6s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
    },
  },
  plugins: [],
};
