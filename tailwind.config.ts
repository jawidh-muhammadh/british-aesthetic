import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },

      fontFamily: {
        poppinssemi: ["var(--font-poppins-semi)"],
        poppinsbold: ["var(--font-poppins-bold)"],
        poppinsreg: ["var(--font-poppins-reg)"],
        poppinsreg5: ["var(--font-poppins-reg5)"],
        robotolite : ["var(--font-roboto-400)"],
        robotosemi : ["var(--font-roboto-700)"],
        robotobold : ["var(--font-roboto-900)"]

    
        
   
      },

    },
  },
  plugins: [
    nextui(),
    require('tailwind-scrollbar-hide') , 
  ],
};
export default config;
