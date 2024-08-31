/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },

    colors: {
      transparent: 'transparent',
      'primary': '#228B22',
      'primary-hover': '#1C6B1C',
      'secondary': '#6B8E23',
      'secondary-hover': '#556B2F',
      'accent': '#C2B280',
      'accent-hover': '#B0A36A', 
      'background': '#E6E6FA',
      'background-hover': '#D3D3D3',
      'highlight' : '#FFD700',
      'highlight-hover': '#FFC107',
      'success': '#3CB371',
      'success-hover': '#2E8B57',
      'warning': '#DAA520',
      'warning-hover': '#B8860B',
      'info': '#87CEEB',
      'info-hover': '#00BFFF',
      'danger': '#B22222',
      'danger-hover': '#8B0000',
      'white': '#fff',
      'black': '#000',
      'fade': '#ccc',
      'grey': '#555'
    }
  },
  plugins: [],
};
