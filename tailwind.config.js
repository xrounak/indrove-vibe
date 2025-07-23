module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        background: '#0F0F0F',
        primary: '#14B8A6',
        card: '#1F2937',
        accent: '#14B8A6',
        text: '#b5b5b5',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        satoshi: ['Satoshi', 'sans-serif'],
      },
      borderRadius: {
        full: '9999px',
      },
    },
  },
  plugins: [],
}; 