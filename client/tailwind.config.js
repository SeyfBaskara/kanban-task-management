/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
   darkMode: 'class',
   theme: {
      screens: {
         sm: '480px',
         md: '768px',
         lg: '976px',
         xl: '1440px',
      },
      extend: {
         colors: {
            black: '#000112',
            veryDarkGrey: '#20212C',
            darkGrey: '#2B2C37',
            linesDark: '#3E3F4E',
            mediumGrey: '#828FA3',
            linesLight: '#E4EBFA',
            lightGrey: '#F4F7FD',
            white: '#FFFFFF',
            purple: '#635FC7',
            purpleHover: '#A8A4FF',
            red: '#EA5555',
            redHover: '#FF9898',
            todoColor: '#49C4E5',
            doingColor: '#8471F2',
            doneColor: '#67E2AE',
         },
      },
   },
   plugins: [],
}
