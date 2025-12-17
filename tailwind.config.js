module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          500: '#7c3aed',
          600: '#6d28d9',
          700: '#4c1d95',
        },
        accent: {
          DEFAULT: '#06b6d4',
          soft: '#67e8f9'
        },
        peach: '#ffedd5'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },
      boxShadow: {
        glow: '0 10px 30px rgba(124,58,237,0.15)'
      }
    }
  },
  plugins: []
}
