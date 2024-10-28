import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary:"#f7a30f"
      },
      backgroundColor:{
        'primary': '#f7a30f',
        // 'primary-hover': '#2779bd',
      },
      keyframes: {
        'pulse-scale': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        }
      },
      animation: {
        'pulse-scale': 'pulse-scale 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
  corePlugins:{
    preflight:false,
  }
};
export default config;
