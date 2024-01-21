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
        'neural-teal': '#0DA1A1',
        'neural-teal-lighter': '#4FD1C5',
        'neural-purple': '#7B478F',
        'neural-purple-lighter': '#9956A2',
        'network-error': '#CE3240',
        'network-error-lighter': '#DD4C59',
        gray: '#898989',
        'off-white': '#F7F3EE',
        white: '#FFFFFF',
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
