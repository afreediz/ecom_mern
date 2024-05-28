/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        screens:{
          'max-sm':{'max':'640px'},
          'max-md':{'max':'768px'},
          'max-lg':{'max':'1024px'},
          'max-xl':{'max':'1280px'},
          'max-2xl':{'max':'1536px'}
        },
        spacing:{
          '80vh':'80vh',
          '50vh':'50vh'
        }
      },
    },
    plugins: [],
  }