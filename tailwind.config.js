/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff3131',
        secondary: '#ffffff',
        text: '#333333',
        button: '#ff3131',
        buttonHover: '#ff4747',
        navbar: '#ff3131',
        link: '#007bff',
        linkHover: '#0056b3',
      },
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
