/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#f59e0b',

          secondary: '#8b5cf6',

          accent: '#8b5cf6',

          neutral: '#000000',

          'base-100': '#44403c',

          info: '#f59e0b',

          success: '#00ffc8',

          warning: '#fca5a5',

          error: '#dc2626',
        },
      },
    ],
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('tailwind-scrollbar-hide'),
    require('daisyui'),
  ],
}
