import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        hive: {
          cream: "#FFF8EB",
          line: "#E9D3A8",
          ink: "#352719",
          moss: "#7B8F5B"
        },
        honey: {
          25: "#FFFBF0",
          50: "#FFF7D9",
          100: "#FCECB3",
          200: "#F8D874",
          300: "#F2C559",
          400: "#EEB24B",
          500: "#E69C2C",
          700: "#8C5C16"
        }
      },
      boxShadow: {
        card: "0 12px 32px rgba(104, 67, 16, 0.06), 0 4px 8px rgba(104, 67, 16, 0.04)",
        "card-hover": "0 24px 48px rgba(104, 67, 16, 0.12), 0 8px 16px rgba(104, 67, 16, 0.08)",
        soft: "0 8px 16px rgba(104, 67, 16, 0.05)",
        "soft-md": "0 12px 24px rgba(104, 67, 16, 0.06)"
      },
      spacing: {
        safe: "env(safe-area-inset-bottom)"
      },
      fontSize: {
        xs: ["0.8rem", { lineHeight: "1.2rem", letterSpacing: "0.01em" }],
        sm: ["0.875rem", { lineHeight: "1.5rem", letterSpacing: "0.005em" }],
        base: ["1rem", { lineHeight: "1.6rem", letterSpacing: "0" }],
        lg: ["1.125rem", { lineHeight: "1.75rem", letterSpacing: "0" }],
        xl: ["1.375rem", { lineHeight: "2rem", letterSpacing: "-0.01em" }],
        "2xl": ["1.75rem", { lineHeight: "2.25rem", letterSpacing: "-0.015em" }],
        "3xl": ["2.25rem", { lineHeight: "2.75rem", letterSpacing: "-0.015em" }],
        "4xl": ["3rem", { lineHeight: "3.5rem", letterSpacing: "-0.02em" }],
        "5xl": ["3.75rem", { lineHeight: "4.25rem", letterSpacing: "-0.02em" }]
      },
      opacity: {
        "8": "0.08",
        "12": "0.12"
      },
      transitionDuration: {
        "250": "250ms",
        "350": "350ms"
      }
    }
  },
  plugins: []
};

export default config;

