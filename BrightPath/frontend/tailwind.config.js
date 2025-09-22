module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Adjust paths to match your project structure
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5F6FFF', // Define your custom primary color
      },
      gridTemplateColumns:{
        'auto': 'repeat(auto-fill, minmax(200px , 1fr))'
      }
    },
  },
  plugins: [],
};
