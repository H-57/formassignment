/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-rgba': 'rgba(1, 118, 254, 0.5)',
        'gray-rgba': 'rgba(0, 0, 0, 0.5)',
       
      },
    },
  },
  plugins: [],
}

