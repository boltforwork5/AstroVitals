/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        space: {
          bg: '#070B14',
          surface: '#0F1626',
          border: '#1C2740',
        },
        ink: {
          DEFAULT: '#E6ECF8',
          muted: '#8A97B5',
        },
        accent: '#22D3EE',
        status: {
          normal: '#22C55E',
          caution: '#F59E0B',
          critical: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 24px rgba(34, 211, 238, 0.15)',
        'glow-cyan-lg': '0 0 40px rgba(34, 211, 238, 0.25)',
      },
    },
  },
  plugins: [],
};
