/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: "#050608",
          900: "#090d12",
          850: "#0d1218",
          800: "#121820",
          700: "#1a2430",
          600: "#2a3542"
        },
        beam: {
          cyan: "#33d6ff",
          blue: "#2f80ff",
          steel: "#9cc9d9",
          laser: "#ff4d2e",
          amber: "#ffb547"
        }
      },
      boxShadow: {
        glow: "0 0 32px rgba(51, 214, 255, 0.22)",
        laser: "0 0 24px rgba(255, 77, 46, 0.35)",
        panel: "0 24px 70px rgba(0, 0, 0, 0.38)"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ],
        mono: [
          "JetBrains Mono",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "Liberation Mono",
          "monospace"
        ]
      },
      backgroundImage: {
        "radial-grid":
          "radial-gradient(circle at 20% 10%, rgba(51, 214, 255, 0.11), transparent 28rem), radial-gradient(circle at 80% 0%, rgba(255, 77, 46, 0.08), transparent 24rem), linear-gradient(180deg, #050608 0%, #090d12 48%, #050608 100%)"
      }
    }
  },
  plugins: []
};
