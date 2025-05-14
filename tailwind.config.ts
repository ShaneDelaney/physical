import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern color palette
        primary: {
          DEFAULT: "hsl(230, 85%, 60%)",
          50: "hsl(230, 85%, 96%)",
          100: "hsl(230, 85%, 90%)",
          200: "hsl(230, 85%, 80%)",
          300: "hsl(230, 85%, 70%)",
          400: "hsl(230, 85%, 65%)",
          500: "hsl(230, 85%, 60%)",
          600: "hsl(230, 85%, 50%)",
          700: "hsl(230, 85%, 40%)",
          800: "hsl(230, 85%, 30%)",
          900: "hsl(230, 85%, 20%)",
          950: "hsl(230, 85%, 15%)",
        },
        accent: {
          DEFAULT: "hsl(333, 71%, 51%)",
          50: "hsl(333, 71%, 96%)",
          100: "hsl(333, 71%, 90%)",
          200: "hsl(333, 71%, 80%)",
          300: "hsl(333, 71%, 70%)",
          400: "hsl(333, 71%, 60%)",
          500: "hsl(333, 71%, 51%)",
          600: "hsl(333, 71%, 45%)",
          700: "hsl(333, 71%, 35%)",
          800: "hsl(333, 71%, 25%)",
          900: "hsl(333, 71%, 17%)",
          950: "hsl(333, 71%, 10%)",
        },
        success: {
          DEFAULT: "hsl(160, 84%, 39%)",
          50: "hsl(160, 84%, 96%)",
          100: "hsl(160, 84%, 90%)",
          200: "hsl(160, 84%, 80%)",
          300: "hsl(160, 84%, 70%)",
          400: "hsl(160, 84%, 50%)",
          500: "hsl(160, 84%, 39%)",
          600: "hsl(160, 84%, 35%)",
          700: "hsl(160, 84%, 25%)",
          800: "hsl(160, 84%, 20%)",
          900: "hsl(160, 84%, 15%)",
          950: "hsl(160, 84%, 10%)",
        },
        warning: {
          DEFAULT: "hsl(35, 92%, 50%)",
          50: "hsl(35, 92%, 96%)",
          100: "hsl(35, 92%, 90%)",
          200: "hsl(35, 92%, 80%)",
          300: "hsl(35, 92%, 70%)",
          400: "hsl(35, 92%, 60%)",
          500: "hsl(35, 92%, 50%)",
          600: "hsl(35, 92%, 45%)",
          700: "hsl(35, 92%, 35%)",
          800: "hsl(35, 92%, 25%)",
          900: "hsl(35, 92%, 17%)",
          950: "hsl(35, 92%, 10%)",
        },
        danger: {
          DEFAULT: "hsl(352, 100%, 62%)",
          50: "hsl(352, 100%, 96%)",
          100: "hsl(352, 100%, 90%)",
          200: "hsl(352, 100%, 80%)",
          300: "hsl(352, 100%, 70%)",
          400: "hsl(352, 100%, 65%)",
          500: "hsl(352, 100%, 62%)",
          600: "hsl(352, 100%, 50%)",
          700: "hsl(352, 100%, 40%)",
          800: "hsl(352, 100%, 30%)",
          900: "hsl(352, 100%, 20%)",
          950: "hsl(352, 100%, 15%)",
        },
        neutral: {
          50: "hsl(220, 20%, 98%)",
          100: "hsl(220, 15%, 95%)",
          200: "hsl(220, 15%, 91%)",
          300: "hsl(220, 10%, 82%)",
          400: "hsl(220, 10%, 65%)",
          500: "hsl(220, 10%, 50%)",
          600: "hsl(220, 10%, 35%)",
          700: "hsl(220, 15%, 25%)",
          800: "hsl(220, 15%, 15%)",
          900: "hsl(220, 20%, 10%)",
          950: "hsl(220, 20%, 5%)",
        },
      },
      fontFamily: {
        primary: ["var(--font-primary)", ...fontFamily.sans],
        display: ["var(--font-display)", ...fontFamily.sans],
      },
      borderRadius: {
        'sm': '0.25rem',
        DEFAULT: '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        'full': '9999px',
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-in-out',
        'slide-up': 'slide-up 0.4s ease-out',
        'slide-down': 'slide-down 0.4s ease-out',
        'slide-left': 'slide-left 0.4s ease-out',
        'slide-right': 'slide-right 0.4s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'bounce-gentle': 'bounce-gentle 2s infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-left': {
          '0%': { transform: 'translateX(10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-right': {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'bounce-gentle': {
          '0%, 100%': { 
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': { 
            transform: 'translateY(-15px)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          },
        },
      },
    },
  },
  plugins: [],
  safelist: [
    // For dynamic classes
    {
      pattern: /bg-(primary|accent|success|warning|danger|neutral)(-\d+)?/,
    },
    {
      pattern: /text-(primary|accent|success|warning|danger|neutral)(-\d+)?/,
    },
    {
      pattern: /border-(primary|accent|success|warning|danger|neutral)(-\d+)?/,
    },
    {
      pattern: /animate-(fade-in|slide-up|slide-down|slide-left|slide-right|scale-in|bounce-gentle)/,
    },
  ],
};

export default config; 