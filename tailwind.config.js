/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Diagnostic-console palette — warm near-black with an ember accent
        ink: "#09090B",
        surface: "#0F0F12",
        "surface-2": "#16161B",
        "surface-3": "#1C1C22",
        line: "#26262E",
        "line-soft": "#1E1E25",
        paper: "#EDEBE3",
        muted: "#9A9AA6",
        faint: "#62626E",
        ember: "#F1A23C",
        "ember-bright": "#FFC062",
        "ember-dim": "#A86E26",
        // Per-model series colors (carried over from the v10 report)
        pi0: "#9381FF",
        pi05: "#FF8FA3",
        xvla: "#FFD670",
        inva: "#75CFB8",
        lingbot: "#34D27B",
        qwen: "#F97316",
      },
      fontFamily: {
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        sans: ['"Hanken Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      maxWidth: {
        content: "1180px",
      },
      boxShadow: {
        panel: "0 1px 0 rgba(255,255,255,0.03) inset, 0 24px 60px -28px rgba(0,0,0,0.9)",
        glow: "0 0 0 1px rgba(241,162,60,0.25), 0 0 40px -8px rgba(241,162,60,0.35)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        ticker: {
          "0%": { opacity: "0.35" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0.35" },
        },
        "scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        ticker: "ticker 2.4s ease-in-out infinite",
        scan: "scan 6s linear infinite",
      },
    },
  },
  plugins: [],
};
