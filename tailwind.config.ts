import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['var(--font-montserrat)'],
        rajdhani: ['var(--font-rajdhani)'],
        orbitron: ['var(--font-orbitron)'],
        kanit: ['var(--font-kanit)'],
        syncopate: ['var(--font-syncopate)'],
      },
    },
  },
  plugins: [],
};
export default config;
