/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'terminal-blue': '#110E28',
        'terminal-green': '#121D23',
        'neural-teal': '#24C3C3',
        'neural-purple': '#8932A6',
        'network-error': '#D72200',
        'blue': '#0624d7',
        gray: '#6E6E6E',
        'off-white': '#F9F9F9',
        white: '#FFFFFF',
        black: '#000000'
      },
      screens: {
        sm: '250px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};
