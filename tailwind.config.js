/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      primary: '#040622',
      red: '#F56E6E',
      red2: '#D2505B',
      darkRed2: '#B0374C',
      blue: '#3B76E1',
      darkBlue: '#2B5BC1',
      green: '#63AD6F',
      darkGreen: '#48945B',
      background: '#F1F3F7',
      black: '#3D3F55',
      title: '#5A5990',
      text: '#AAA3BD',
      gray: '#A9ACCC',
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
