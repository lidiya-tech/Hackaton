/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#085041', // deep forest green
          light: '#E1F5EE', // light green bg
        },
        secondary: {
          DEFAULT: '#1D9E75', // mint green
          border: '#9FE1CB', // border mint
        },
        accent: {
          amberBg: '#FAEEDA',
          amberText: '#BA7517',
          purpleBg: '#EEEDFE',
          purpleText: '#534AB7',
          pinkBg: '#FBEAF0',
          pinkText: '#993556',
          coralBg: '#FAECE7',
          coralText: '#993C1D',
          blueBg: '#E6F1FB',
          blueText: '#185FA5',
          grayBg: '#F1EFE8',
          grayText: '#444441',
        }
      },
      fontFamily: {
        sans: [
          'Outfit',
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif'
        ],
      },
    },
  },
  plugins: [],
}
