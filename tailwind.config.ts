import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4CC9F0',
        'primary-dark': '#3AAFE9',
        secondary: '#7B68EE',
        accent: '#FF6B9D',
        'bg-dark': '#0D1B2A',
        'bg-darker': '#0A121C',
        'bg-card': 'rgba(255, 255, 255, 0.05)',
        success: '#4ADE80',
        warning: '#FCD34D',
        error: '#EF4444',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['Quicksand', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 20s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(100px, -100px)' },
          '50%': { transform: 'translate(-100px, -200px)' },
          '75%': { transform: 'translate(-200px, -100px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
