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
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
    },
  },
  plugins: [],
  safelist: [
    // Add any classes that might be dynamically generated
    {
      pattern: /bg-(primary|secondary|red|blue|amber|green)(-\d+)?/,
    },
    {
      pattern: /hover:bg-(primary|secondary|red|blue|amber|green)(-\d+)?/,
    },
    {
      pattern: /bg-(primary|secondary|red|blue|amber|green)\/\d+/,
    },
    {
      pattern: /hover:bg-(primary|secondary|red|blue|amber|green)\/\d+/,
    },
  ],
};

export default config; 